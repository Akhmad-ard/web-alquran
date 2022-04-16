<template>
  <Navbar class="fixed-top" />
  <div
    id="home"
    class="container p-3 p-sm-5 mt-5 bg-light"
  >
    <div class="row flex-row-reverse">
      <div class="col-sm-6 my-3 my-sm-5 d-flex justify-content-center justify-content-sm-end">
        <img
          src="./../assets/al-quran.png"
          alt="kaligrafi-alquran"
        >
      </div>
      <div class="col-sm-6 py-sm-5 my-sm-5">
        <h1 class="text-center text-wrap">Read Quran Everyday. <span> Add on your daily Routine.</span>
        </h1>
        <p class="mt-3 text-muted text-center">
          The Quran is the central relisious text of islam. Muslims believe the Qur'an is the book of divine guidance and direction for mankind.
        </p>
        <div class="container mt-4 d-sm-flex d-grid gap-2 col-6 mx-auto">

          <router-link
            class="btn btn-outline-info"
            :to="{ name: 'Surahs' }"
          >Surah</router-link>

          <router-link
            class="btn btn-outline-info"
            :to="{ name: 'Juzs' }"
          >Juz</router-link>

        </div>
      </div>
    </div>
  </div>
  <Footer class="py-4" />
</template>

<script>
import Footer from "./layouts/Footer.vue";
import Navbar from "./layouts/Navbar.vue";

export default {
  name: "home-component",
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    localStorage.setItem("isLoggedIn", false);
  },
};
</script>

<style>
.btn {
  width: 12rem;
}

.btn:hover {
  color: #fff !important;
}
</style>