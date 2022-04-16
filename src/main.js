import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

// font awesome icon
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);
dom.watch();

// firebase
const firebaseConfig = {
   apiKey: "AIzaSyD8wIwDeWPahtxLi8VN-EHnT8OaR3f2f3g",
   authDomain: "caramel-comfort-339612.firebaseapp.com",
   databaseURL: "https://caramel-comfort-339612-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "caramel-comfort-339612",
   storageBucket: "caramel-comfort-339612.appspot.com",
   messagingSenderId: "629681051320",
   appId: "1:629681051320:web:a9d0bd3151d9a5f78c864d",
   measurementId: "G-J2LPFP8C4G"
 };
const AppFirebase = initializeApp(firebaseConfig);
getDatabase(AppFirebase);
getAuth(AppFirebase);

const app = createApp(App);
app.use(router);
app.mount('#app');
