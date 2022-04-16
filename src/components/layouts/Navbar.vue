<script setup>
const auth = getAuth();
const router = useRouter();
const isLoggedIn = ref();
const uid = ref();

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid.value = user.uid;
    isLoggedIn.value = true;
    localStorage.setItem("isLoggedIn", isLoggedIn.value);
  } else {
    isLoggedIn.value = false;
  }
});

const logout = () => {
  auth.signOut();
  router.push({ name: "Login" });
  localStorage.setItem("isLoggedIn", false);
  localStorage.setItem("uid", "");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <div class="container-fluid px-3 px-sm-5">
      <a
        class="navbar-brand ms-sm-5"
        href="#"
      >Web Al-Quran</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse me-0 me-sm-5"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-sm-auto">
          <li class="nav-item">
            <router-link
              class="nav-link text-center"
              aria-current="page"
              to="/"
            >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-center"
              to="/juz"
            >Juz</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-center"
              to="/surah"
            >Surah</router-link>
          </li>
          <li
            v-if='isLoggedIn'
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle text-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Akun
            </a>
            <ul
              class="dropdown-menu bg-info mt-2 ms-auto"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link
                  class="dropdown-item text-white"
                  :to="{ path:`/profile`}"
                >Profile</router-link>
              </li>
              <li><a
                  class="dropdown-item text-white logout"
                  @click='logout'
                >Logout</a></li>
            </ul>
          </li>
          <li
            v-else
            class="nav-item"
          >
            <router-link
              class="nav-link text-center logout"
              to="/login"
            >Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "navbar-component",
};
</script>

<style>
.logout {
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #0491ad !important;
}

a.dropdown-item .active {
  background-color: #0491ad !important;
}
</style>

