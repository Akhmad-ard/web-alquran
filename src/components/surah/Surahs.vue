<template>
  <Navbar class="fixed-top" />
  <div
    dir="rtl"
    class="container pt-4 px-0"
  >
    <h1 class="text-center mt-5">Surah</h1>

    <h1
      v-if="surah.length == 0"
      class="text-center my-5 py-5"
    >
      <i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
    </h1>

    <ul
      v-else
      class="list-group list-group-flush px-5"
    >
      <li
        v-for="(surah, index) in surah[0]"
        :key="index"
        class="surah list-group-item px-3 py-3 d-flex justify-content-between bg-light"
      >
        <div class="d-flex">
          <p class="m-0">
            <span class="px-2 py-1 bg-info text-white border border-light rounded-circle">{{ surah.number }}</span>
          </p>
          <router-link
            class="stretched-link text-black me-3 text-decoration-none"
            :to='{ path: `/surah/${surah.number}` }'
          >
            {{ surah.name }}
          </router-link>
        </div>
        <p class="m-0">Ayat: {{ surah.numberOfAyahs }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Navbar from "./../layouts/Navbar.vue";

export default {
  name: "surahs-component",
  components: {
    Navbar,
  },
  data() {
    return {
      surah: [],
    };
  },
  mounted() {
    fetch("http://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((json) => {
        this.surah.push(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.surah:hover {
  background-color: #0dcaf0 !important;
  color: white;
}
</style>