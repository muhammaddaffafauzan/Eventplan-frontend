import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index";
// import store from "./store/index";  
import "./style.css";
// import axios from 'axios';

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://api-absensi-online.cyclic.app/api/v1'
// axios.interceptors.request.use(config => {
//   // Ambil token dari localStorage
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// }, error => {
//   // Tangani kesalahan pada permintaan
//   return Promise.reject(error);
// });

const app = createApp(App);     
// app.use(store); 
app.use(router).mount('#app');