<template>
  <p class="d-none">{{ getNumberJuz($route.params.number) }}</p>
  <NavbarUnique class="fixed-top" />
  <!-- Signed in -->
  <div
    v-if="isLoggedIn == 'true'"
    class="container mt-3 py-4 bg-light"
  >
    <h1 class="text-center">Juz {{ $route.params.number }}</h1>

    <h1
      v-show="juz.ayahs.length == 0 && juz.surah.length == 0"
      class="text-center mt-5"
    >
      <i class="animate__animated animate__rotateIn animate__infinite fa-solid fa-spinner"></i>
    </h1>

    <ul
      dir="rtl"
      class="list-group list-group-flush px-0"
    >
      <li
        class="p-0 list-group-item bg-light"
        v-for="(ayah, index) in juz.ayahs[0]"
        :key="index++"
      >
        <div
          v-if='ayah.numberInSurah != 1'
          class="m-0 py-2 px-3 d-flex cursor-pointer"
          :class="[dataBookmark.number > 0 && dataBookmark.number == ayah.number ? 'bg-info text-white' : '']"
          data-bs-toggle="modal"
          data-bs-target="#bookmark"
          @click='getAyah(ayah.number, ayah.numberInSurah, ayah.surah.englishName)'
        >
          <div class="m-0">
            <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white cursor-pointer">{{ ayah.numberInSurah }}</span>

          </div>
          <p class="m-0 me-1">{{ ayah.text }}</p>
        </div>

        <div
          v-else-if='ayah.numberInSurah != 1 || ayah.numberInSurah == 1 && getFirstAyah(ayah.text) == ""'
          class="m-0 py-2 px-3 d-flex flex-wrap cursor-pointer"
          :class="[dataBookmark.number > 0 && dataBookmark.number == ayah.number ? 'bg-info text-white' : '']"
          data-bs-toggle="modal"
          data-bs-target="#bookmark"
          @click='getAyah(ayah.number, ayah.numberInSurah, ayah.surah.englishName)'
        >
          <h3 class="my-3 w-100 text-center">{{ ayah.surah.name }}</h3>
          <div class="m-0">
            <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white cursor-pointer">{{ ayah.numberInSurah }}</span>
          </div>
          <p class="m-0 me-1">{{ ayah.text }}</p>
        </div>

        <div
          v-else-if='ayah.numberInSurah == 1 && ayah.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")'
          class="m-0 py-2 px-3 d-flex flex-wrap cursor-pointer"
          :class="[dataBookmark.number > 0 && dataBookmark.number == ayah.number ? 'bg-info text-white' : '']"
          data-bs-toggle="modal"
          data-bs-target="#bookmark"
          @click='getAyah(ayah.number, ayah.numberInSurah, ayah.surah.englishName)'
        >
          <h3 class="my-3 w-100 text-center">{{ ayah.surah.name }}</h3>
          <p class="w-100 text-center fs-4">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          <div class="m-0">
            <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white cursor-pointer">{{ ayah.numberInSurah }}</span>
          </div>
          <p class="m-0 me-1">{{ getFirstAyah(ayah.text) }}</p>
        </div>
      </li>
    </ul>

    <!-- Modal -->
    <div
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
              <h4 class="fs-4">Surah: {{ getBookmark.surah }} </h4>
              <h4 class="fs-4">Ayat: {{ getBookmark.numberInSurah }}</h4>
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
  </div>

  <!-- Signed out -->
  <div
    v-else
    class="container mt-3 py-4 bg-light"
  >
    <h1 class="text-center">Juz {{ $route.params.number }}</h1>

    <h1
      v-show="juz.ayahs.length == 0 && juz.surah.length == 0"
      class="text-center mt-5"
    >Loading...</h1>

    <ul
      dir="rtl"
      class="list-group list-group-flush px-0"
    >
      <li
        class="p-0 list-group-item bg-light"
        v-for="(ayah, index) in juz.ayahs[0]"
        :key="index++"
      >
        <div
          v-if='ayah.numberInSurah != 1'
          class="m-0 py-2 px-3 d-flex cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#bookmark"
        >
          <div class="m-0">
            <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white cursor-pointer">{{ ayah.numberInSurah }}</span>
          </div>
          <p class="m-0 me-1">{{ ayah.text }}</p>
        </div>

        <div
          v-else-if='ayah.numberInSurah != 1 || ayah.numberInSurah == 1 && getFirstAyah(ayah.text) == ""'
          class="m-0 py-2 px-3 d-flex flex-wrap cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#bookmark"
        >
          <h3 class="my-3 w-100 text-center">{{ ayah.surah.name }}</h3>
          <div class="m-0">
            <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white cursor-pointer">{{ ayah.numberInSurah }}</span>
          </div>
          <p class="m-0 me-1">{{ ayah.text }}</p>
        </div>

        <div
          v-else-if='ayah.numberInSurah == 1 && ayah.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")'
          class="m-0 py-2 px-3 d-flex flex-wrap cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#bookmark"
        >
          <h3 class="my-3 w-100 text-center">{{ ayah.surah.name }}</h3>
          <p class="w-100 text-center fs-4">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          <div class="m-0">
            <span class="m-0 ms-2 px-2 py-1 border border-light rounded-circle bg-info text-white cursor-pointer">{{ ayah.numberInSurah }}</span>
          </div>
          <p class="m-0 me-1">{{ getFirstAyah(ayah.text) }}</p>
        </div>
      </li>
    </ul>

    <!-- Modal -->
    <div
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
              role="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

          </div>
          <div class="modal-body d-flex justify-content-center">
            <div class="w-50 container">
              <p class="text-center">
                Please login, if you want to use bookmark!!!
              </p>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-dismiss="modal"
              style="transform: rotate(0);"
            >
              <router-link
                class="text-decoration-none text-white stretched-link"
                :to="{ name: 'Login' }"
              >Login</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";
import NavbarUnique from "./../layouts/NavbarUnique.vue";

export default {
  name: "juz-component",
  components: {
    NavbarUnique,
  },
  data() {
    return {
      numberJuz: null,
      juz: {
        ayahs: [],
        surah: [],
      },
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      getBookmark: {
        number: 0,
        numberInSurah: 0,
        surah: undefined,
      },
      dataBookmark: {},
    };
  },
  mounted() {
    fetch(`http://api.alquran.cloud/v1/juz/${this.numberJuz}/quran-uthmani`)
      .then((res) => res.json())
      .then((json) => {
        this.juz.ayahs.push(json.data.ayahs);
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
    getNumberJuz(number) {
      return (this.numberJuz = number);
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
        .then(() => {
          // console.log("data berhasil dikirim");
        })
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
