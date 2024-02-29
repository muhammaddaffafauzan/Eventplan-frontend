import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import eventAdmin from "./modules/admin/eventAdmin";
import categories from "./modules/admin/categoryEvent";

const store = createStore({
    state: {
        isLoading: false,   
    },
    modules: {
      auth,
      eventAdmin,
      categories
    },  
});

export default store;