<script setup>
const auth = getAuth();
const router = useRouter();

//login with email
const email = ref("");
const password = ref("");

const errorMsg = ref("");
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      userCredential.user;
      router.push({ name: "Profile" });
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/user-not-found":
          errorMsg.value =
            "Akun belum terdaftar, silahkan daftarkan akun anda!!!";
          break;
        default:
          errorMsg.value = "Email atau Password Salah";
          break;
      }
    });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("uid", user.uid);
    }
  });
};
</script>

<template>
  <Navbar class="fixed-top" />
  <main class="form-signin text-center p-5">
    <form @submit.prevent='login'>
      <h1 class="h3 mt-5 mb-3 fw-normal">Login</h1>

      <div
        v-if="errorMsg"
        class="alert alert-danger"
        role="alert"
      >
        {{ errorMsg }}
      </div>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
        >
        <label for="floatingInput">Email address</label>
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

      <div class="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            value="remember-me"
          > Remember me
        </label>
      </div>
      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >Sign in</button>
      <button class="w-25 mt-2 btn btn-lg btn-outline-primary">
        <i class="fa-brands fa-google fa-lg"></i>
      </button>
      <p class="mt-4 mb-3 text-muted">Silahkan <router-link to='/register'>Daftar</router-link> jika belum punya akun</p>
    </form>

    <Footer class="fixed-bottom"></Footer>
  </main>

</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Navbar from "./layouts/Navbar.vue";
import Footer from "./layouts/Footer.vue";

export default {
  name: "Login-component",
  components: {
    Navbar,
    Footer,
  },
  mounted() {},
  methods: {
    signInWithPopup() {
      alert("tes");
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

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>