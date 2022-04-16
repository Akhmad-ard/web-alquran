<template>
  <ul class="nav justify-content-center bg-light">
    <li class="nav-item">
      <router-link
        class="nav-link text-danger"
        :to="{ path: `${url}` }"
      >Back</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "navbar-unique",
  data() {
    return {
      url: this.$route.path.replace(`/${this.$route.params.number}`, ""),
    };
  },
  mounted() {},
};
</script>