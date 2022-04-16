<template>
  <Navbar class="fixed-top" />
  <div class="container pt-4">
    <h1 class="text-center mt-5">Profile</h1>
    <div class="container d-flex flex-row">
      <div class="col-sm-1">
        <ul class="list-unstyled">
          <li class="">Nama</li>
          <li class="">Email</li>
          <li class="">Surah</li>
          <li class="">Ayat</li>
        </ul>
      </div>
      <div class="col-sm-11">
        <ul
          v-if="dataUser.length == 0 && bookmarkUser.length == 0"
          class="list-unstyled"
        >
          <li class="">&nbsp;: <i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
          </li>
          <li class="">&nbsp;: <i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
          </li>
          <li class="">&nbsp;: <i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
          </li>
          <li class="">&nbsp;: <i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
          </li>
        </ul>
        <ul
          v-else
          class="list-unstyled"
        >
          <li class="text-capitalize">&nbsp;: {{ dataUser.username }}</li>
          <li class="">&nbsp;: {{ dataUser.email }}</li>
          <li class="">&nbsp;: {{ bookmarkUser.surah }}</li>
          <li class="">&nbsp;: {{ bookmarkUser.numberInSurah }}</li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button
        v-if="bookmarkUser.length == 0"
        class="btn btn-primary"
      ><i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
      </button>
      <button
        v-else
        class="btn btn-primary"
      >Go to surah {{ `${bookmarkUser.surah} ayat ${bookmarkUser.numberInSurah}` }} </button>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import Navbar from "./layouts/Navbar.vue";

export default {
  name: "profile-component",
  components: {
    Navbar,
  },
  data() {
    return {
      dataUser: "",
      bookmarkUser: "",
    };
  },
  mounted() {
    const getUser = ref(getDatabase(), "users/" + localStorage.getItem("uid"));
    onValue(getUser, (data) => {
      this.dataUser = data.val();
      this.bookmarkUser = data.val().bookmark;
    });
  },
};
</script>

