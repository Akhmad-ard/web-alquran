import { createRouter, createWebHistory } from "vue-router";

// components
const Home = require('./../components/Home.vue').default;
const Login = require('./../components/Login.vue').default;
const Profile = require('./../components/Profile.vue').default;
const Register = require('./../components/Register.vue').default;
const Surahs = require('./../components/surah/Surahs.vue').default;
const Surah = require('./../components/surah/Surah.vue').default;
const Juzs = require('./../components/juz/Juzs.vue').default;
const Juz = require('./../components/juz/Juz.vue').default;
const NotFound = require('./../components/NotFound.vue').default;

const routes = [
   {
      name: 'Home',
      path: '/',
      component: Home
   },
   {
      name: 'Register',
      path: '/register',
      component: Register,
      beforeEnter: (to, from) => {
         if(localStorage.isLoggedIn == 'true') {
            return ({ name: 'Profile' })
         } else{
            from.path
            return true
         }
       },
   },
   {
      name: 'Login',
      path: '/login',
      component: Login,
      beforeEnter: (to, from) => {
         if(localStorage.isLoggedIn == 'true') {
            return ({ name: 'Profile' })
         } else{
            from.path
            return true
         }
       },
   },
   {
      name: 'Profile', 
      path: '/profile',
      component: Profile,
      beforeEnter: (to, from) => {
         if(localStorage.isLoggedIn == 'true') {
            return true
         } else {
            from.path
            return ({ name: 'Login' })
         }
      },
   },
   {
      name: 'Surahs',
      path: '/surah',
      component: Surahs
   },
   {
      name: 'Surah',
      path: '/surah/:number',
      component: Surah,
      beforeEnter: (to, from) => {
         if(from.path == '/surah') {
            return true
         } else {
            return ({ name: 'Surahs' })
         }

      },
      params: true
   },
   {
      name: 'Juzs',
      path: '/juz',
      component: Juzs
   },
   {
      name: 'Juz',
      path: '/juz/:number',
      component: Juz,
      beforeEnter: (to, from) => {
         if(from.path == '/juz') {
            return true
         } else {
            return ({ name: 'Juzs' })
         }
      },
      params: true
   },
   {
      path: '/:path',
      component: NotFound
   }
]

const router = createRouter({
   linkActiveClass: 'active',
   history: createWebHistory(process.env.BASE_URL),
   routes
})
export default router