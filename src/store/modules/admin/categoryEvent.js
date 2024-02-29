import axios from "axios";

const categories = {
namespaced: true,
state:{
    categories: [],
    isLoading: false,
},
getters:{
 getCategories: (state) => state.categories,
 isLoading: (state) => state.isLoading
},
actions:{
    async fetchCategories ({commit}){
    try {
        commit('SET_LOADING', true);

        const respose = await axios.get('/event-categories');
        commit('SET_CATEGORIES', respose.data);
        return respose.data
    } catch (error) {
        console.log(error.message);
        commit('SET_LOADING', false);
        return false
    }
    }
},
mutations:{
    SET_CATEGORIES(state, categories){
        state.categories = categories;
    },
    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading;
      },
 }
}

export default categories;