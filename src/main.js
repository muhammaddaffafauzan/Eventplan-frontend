import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index";
import store from "./store/index";  
import "./style.css";
import axios from 'axios';
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/base.css';
// import 'element-plus/lib/theme-chalk/index.css';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.request.use(config => {
  // Ambil token dari localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  // Tangani kesalahan pada permintaan
  return Promise.reject(error);
});

const app = createApp(App);     
app.use(store); 
app.use(ElementPlus);
app.use(router).mount('#app');