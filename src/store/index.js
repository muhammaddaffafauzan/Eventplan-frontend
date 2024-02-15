import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import eventAdmin from "./modules/admin/eventAdmin";

const store = createStore({
    state: {
        isLoading: false,   
    },
    modules: {
      auth,
      eventAdmin
    },  
});

export default store;