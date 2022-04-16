<template>
  <p class="d-none">{{ getSurah($route.params.number) }}</p>
  <NavbarUnique class="fixed-top" />

  <div
    v-if="surah.length == 0"
    class="text-center mt-5 py-5"
  >
    <h1 class="py-5"><i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i></h1>
  </div>

  <div
    v-else
    dir="rtl"
    class="container mt-3 py-4 bg-light"
  >
    <div
      v-for="(s, index) in surah"
      :key="index"
    >
      <h1 class="text-center mt-4">{{ s.name }}</h1>
      <!-- Signed In -->
      <ul
        v-if="isLoggedIn == 'true'"
        class="list-group list-group-flush p-0 px-3"
      >
        <li
          v-for="(ayah, i) in s.ayahs"
          :key="i"
          class="list-group-item p-0 bg-light cursor-pointer"
        >
          <div
            v-if="ayah.numberInSurah != 1 && ayah.sajda.obligatory == true"
            class="m-0 py-2 px-3 d-flex "
            :class="dataBookmark.number > 0 && dataBookmark.number == ayah.number ? 'bg-info text-white' : ''"
            @click.prevent='getAyah(ayah.number, ayah.numberInSurah, s.englishName)'
            data-bs-toggle="modal"
            data-bs-target="#bookmark"
          >
            <p class="m-0">
              <span
                class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white "
                data-bs-toggle="modal"
                data-bs-target="#bookmark"
              >{{ ayah.numberInSurah }}</span>
            </p>
            <p class="m-0 me-3">{{ ayah.text }}</p>
            <p class="m-0 position-absolute start-0"><span>sajadah</span></p>
          </div>

          <div
            v-else-if='ayah.numberInSurah != 1 || ayah.numberInSurah == 1 && getFirstAyah(ayah.text) == ""'
            class="m-0 py-2 px-3 d-flex "
            :class="dataBookmark.number > 0 && dataBookmark.number == ayah.number ? 'bg-info text-white' : ''"
            @click.prevent='getAyah(ayah.number, ayah.numberInSurah, s.englishName)'
            data-bs-toggle="modal"
            data-bs-target="#bookmark"
          >
            <p class="m-0">
              <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white ">{{ ayah.numberInSurah }}</span>
            </p>
            <p class="m-0 me-3">{{ ayah.text }}</p>
          </div>

          <div
            v-else
            class="m-0 py-2 px-3 d-flex flex-wrap "
            :class="dataBookmark.number > 0 && dataBookmark.number == ayah.number ? 'bg-info text-white' : ''"
            @click.prevent='getAyah(ayah.number, ayah.numberInSurah, s.englishName)'
            data-bs-toggle="modal"
            data-bs-target="#bookmark"
          >
            <p class="w-100 text-center fs-4">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <div class="d-flex">
              <p class="m-0">
                <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white ">{{ ayah.numberInSurah }}</span>
              </p>
              <p class="m-0 me-3">{{ getFirstAyah(ayah.text) }}</p>
            </div>
          </div>

          <!-- Modal -->
          <div
            dir="ltr"
            class="modal fade"
            id="bookmark"
            tabindex="-1"
            aria-labelledby="bookmarkLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="bookmarkLabel"
                  >Bookmark</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                  <div class="w-50 container">
                    <h4 class="fs-4 text-start">Surah: {{ getBookmark.surah }} </h4>
                    <h4 class="fs-4 text-start">Ayat: {{ getBookmark.numberInSurah }}</h4>
                  </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="SignBookmark(getBookmark.number, getBookmark.numberInSurah, getBookmark.surah)"
                  >Sign</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Signed Out -->
      <ul
        v-else
        class="list-group list-group-flush p-0 px-3"
      >
        <li
          v-for="(ayah, i) in s.ayahs"
          :key="i"
          class="list-group-item p-0 bg-light cursor-pointer"
        >
          <div
            v-if="ayah.numberInSurah != 1 && ayah.sajda.obligatory == true"
            class="m-0 py-2 px-3 d-flex "
            data-bs-toggle="modal"
            data-bs-target="#bookmark"
          >
            <p class="m-0">
              <span
                class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white "
                data-bs-toggle="modal"
                data-bs-target="#bookmark"
              >{{ ayah.numberInSurah }}</span>
            </p>
            <p class="m-0 me-3">{{ ayah.text }}</p>
            <p class="m-0 position-absolute start-0"><span>sajadah</span></p>
          </div>

          <div
            v-else-if='ayah.numberInSurah != 1 || ayah.numberInSurah == 1 && getFirstAyah(ayah.text) == ""'
            class="m-0 py-2 px-3 d-flex "
            data-bs-toggle="modal"
            data-bs-target="#bookmark"
          >
            <p class="m-0">
              <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white ">{{ ayah.numberInSurah }}</span>
            </p>
            <p class="m-0 me-3">{{ ayah.text }}</p>
          </div>

          <div
            v-else
            class="m-0 py-2 px-3 d-flex flex-wrap"
            data-bs-toggle="modal"
            data-bs-target="#bookmark"
          >
            <p class="w-100 text-center fs-4">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <div class="d-flex">
              <p class="m-0">
                <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white ">{{ ayah.numberInSurah }}</span>
              </p>
              <p class="m-0 me-3">{{ getFirstAyah(ayah.text) }}</p>
            </div>
          </div>

          <!-- Modal -->
          <div
            dir="ltr"
            class="modal fade"
            id="bookmark"
            tabindex="-1"
            aria-labelledby="bookmarkLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="bookmarkLabel"
                  >Bookmark</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                  <div class="text-center container">
                    <h4>Please Login, if you want use bookmark!!!</h4>
                  </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    style="transform: rotate(0);"
                    data-bs-dismiss="modal"
                  >
                    <router-link
                      class="text-decoration-none text-white stretched-link"
                      style=""
                      :to="{ name: 'Login' }"
                    >Login</router-link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";
import NavbarUnique from "./../layouts/NavbarUnique.vue";

export default {
  name: "surah-component",
  components: {
    NavbarUnique,
  },
  data() {
    return {
      numberSurah: null,
      surah: [],
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      getBookmark: {
        number: 0,
        numberInSurah: 0,
        surah: undefined,
      },
      dataBookmark: "",
    };
  },
  mounted() {
    fetch(`http://api.alquran.cloud/v1/surah/${this.numberSurah}`)
      .then((res) => res.json())
      .then((json) => {
        this.surah.push(json.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // getDatabase
    const getUser = ref(
      getDatabase(),
      "users/" + localStorage.getItem("uid") + "/bookmark/"
    );
    onValue(getUser, (data) => {
      this.dataBookmark = data.val();
    });
  },
  methods: {
    getSurah(number) {
      return (this.numberSurah = number);
    },
    getFirstAyah(text) {
      let firstAyah;
      for (let i = 39; i <= text.length; i++) {
        firstAyah += text.charAt(i);
      }
      const cekUndefined = firstAyah.includes(undefined);
      if (cekUndefined) {
        const FIRSTAYAH = firstAyah.replace("undefined", "");
        return FIRSTAYAH;
      }
    },
    getAyah(number, numberInSurah, surah) {
      this.getBookmark.number = number;
      this.getBookmark.numberInSurah = numberInSurah;
      this.getBookmark.surah = surah;
    },
    SignBookmark(number, numberInSurah, surah) {
      set(
        ref(
          getDatabase(),
          "users/" + localStorage.getItem("uid") + "/bookmark"
        ),
        {
          number,
          numberInSurah,
          surah,
        }
      )
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>