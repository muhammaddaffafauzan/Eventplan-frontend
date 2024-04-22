import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementPlus from "element-plus";
import { createI18n } from "vue-i18n";
import CKEditor from "@ckeditor/ckeditor5-vue";

import enTranslations from "./locales/en.json"; // Import file en.json
import idTranslations from "./locales/id.json"; // Import file id.json

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "en", // Set locale based on saved value or default to 'en'
  messages: {
    en: enTranslations, // Set English translations
    id: idTranslations, // Set Indonesian translations
  },
});

function checkTokenAndRole() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    store.dispatch("auth/logout");
  }
}

checkTokenAndRole();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.use(CKEditor);

app.mount("#app");
