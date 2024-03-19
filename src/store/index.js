import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import eventAdmin from "./modules/admin/eventAdmin";
import categories from "./modules/admin/categoryEvent";
import eventMain from "./modules/user/eventMain";

const store = createStore({
  state: {
    isLoading: false,
  },
  modules: {
    auth,
    eventAdmin,
    categories,
    eventMain,
  },
});

export default store;