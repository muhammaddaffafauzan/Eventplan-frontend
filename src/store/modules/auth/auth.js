import { ElMessage } from 'element-plus';
import axios from "axios";

const auth = {
  namespaced: true,
  state: {
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
    user: [],
    isLoading: false,  // Tambahkan loading state
  },
  getters: {
    isRole: (state) => !!state.role && state.role !== "",
    isAuthenticated: (state) => !!state.token && state.token !== "",
    getMe: (state) => state.user,
    isLoading: (state) => state.isLoading,  // Getter untuk status loading
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post("/auth/login", credentials);

        const user = response.data;
        localStorage.setItem("role", user.role);
        localStorage.setItem("token", user.accessToken);
        commit("SET_USER_LOGIN", null);
        commit("SET_ROLE", user.role);
        commit("SET_TOKEN", user.accessToken);

        // Display success notification using ElMessage
        ElMessage({
          type: 'success',
          message: 'Login success!',
        });

        return true;
      } catch (error) {
        const errorMessage = error.response.data.msg;
        // Display error notification using ElMessage
        ElMessage({
          type: 'error',
          message: 'Login failed: ' + errorMessage,
        });

        return false;
      }
    },
    async fetchMe({ commit }) {
      try {
        // Set status loading menjadi true sebelum memuat data
        commit('SET_LOADING', true);

        // Ambil Bearer Token dari Local Storage
        const token = localStorage.getItem('token'); // Gantilah 'your_token_key' dengan kunci token Anda

        const response = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;
        commit("SET_USER", user);

        // Setelah data dimuat, atur status loading menjadi false
        commit('SET_LOADING', false);

        return user;
      } catch (error) {
        console.error("Error fetching user data:", error.message);

        // Jika terjadi error, tetap set status loading menjadi false
        commit('SET_LOADING', false);

        return false;
      }
    },
    async logout({ commit }) {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      commit("SET_ROLE", "");
      commit("SET_TOKEN", "");
      return true;
    },
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_LOGIN(state, auth) {
      state.user = auth;
    },
    SET_USER(state, auth) {
      state.user = auth;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};

export default auth;
