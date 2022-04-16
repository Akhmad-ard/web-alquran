<template>
  <Navbar class="fixed-top" />
  <main class="form-signin text-center mt-5 pt-5">
    <form @submit.prevent='registrasi'>
      <h1 class="h3 mb-3 fw-normal">Register</h1>

      <div
        v-if="errorMessage"
        class="alert alert-danger"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="email"
        >
        <label for="email">Email address</label>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="name@example.com"
          v-model="username"
          required
        >
        <label for="username">Username</label>
      </div>

      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
        >
        <label for="floatingPassword">Password</label>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >Sign Up</button>
      <p class="mt-3 mb-3 text-muted">Jika kamu sudah punya akun silahkan <router-link to='/login'>Login</router-link>
      </p>
    </form>
  </main>

  <Footer class="fixed-bottom" />
</template>

<script>
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Navbar from "./layouts/Navbar.vue";
import Footer from "./layouts/Footer.vue";

export default {
  name: "register-component",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      router: useRouter(),
      email: "",
      username: "",
      password: "",
      uid: "",
      errorMessage: "",
    };
  },
  methods: {
    registrasi() {
      // create authentication
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((userCredential) => {
          // Signed in
          updateProfile(getAuth().currentUser, { displayName: this.username })
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });

          // create database
          set(ref(getDatabase(), "users/" + userCredential.user.uid), {
            username: this.username,
            email: this.email,
            bookmark: "",
          });
          set(
            ref(
              getDatabase(),
              "users/" + userCredential.user.uid + "/bookmark/"
            ),
            {
              number: 0,
              numberInSurah: 0,
              surah: "",
            }
          );

          localStorage.setItem("uid", userCredential.user.uid);
          this.router.push({ name: "Home" });
        })
        .catch((error) => {
          // console.log(error.message);
          switch (error.message) {
            case "Firebase: Error (auth/email-already-in-use).":
              this.errorMessage = "Email sudah terdaftar";
              break;
            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
              this.errorMessage = "Masukkan 6 digit password";
              break;
          }
        });
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>