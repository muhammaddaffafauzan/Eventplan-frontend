import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import eventAdmin from "./modules/admin/eventAdmin";
import categories from "./modules/admin/categoryEvent";
import eventMain from "./modules/user/eventMain";
import settings from "./modules/auth/settings";

const store = createStore({
  state: {
    isLoading: false,
  },
  modules: {
    auth,
    eventAdmin,
    categories,
    eventMain,
    settings,
  },
});

export default store;