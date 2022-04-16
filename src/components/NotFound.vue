<template>
  <Navbar />
  <div class="container mt-5 d-flex justify-content-center">
    <img
      class="mt-5 img-thumbnail"
      src="./../assets/NotFound.png"
      alt="not found"
    >
  </div>
</template>

<script>
import Navbar from "./layouts/Navbar.vue";

export default {
  props: {
    bookmark: {
      type: Object,
      required: false,
    },
  },
  name: "not-found",
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  background-color: #fff !important;
}
</style>
