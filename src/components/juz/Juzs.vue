<template>
  <Navbar class="fixed-top" />
  <div class="container p-5 mt-4 bg-light">
    <h1 class="text-center">Juz</h1>
    <ul class="list-group list-group-flush">
      <li
        class="numberJuz list-group-item bg-light text-center"
        v-for="n in numberJuz"
        :key="n"
      >
        <router-link
          class="py-1 px-5 stretched-link text-decoration-none fs-3"
          :to="{ path: `/juz/${n}` }"
        >{{ n }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Navbar from "./../layouts/Navbar.vue";

export default {
  name: "juzs-component",
  components: {
    Navbar,
  },
  data() {
    return {
      numberJuz: [],
    };
  },
  mounted() {
    for (let i = 1; i <= 30; i++) {
      this.numberJuz.push(i);
    }
  },
};
</script>

<style>
.numberJuz:hover {
  background-color: #0dcaf0 !important;
}

.stretched-link:hover {
  color: white !important;
}
</style>
