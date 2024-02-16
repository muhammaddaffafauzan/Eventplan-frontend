import { ElMessage } from 'element-plus';
import axios from "axios";

const eventAdmin = {
  namespaced: true,
  state: {
    event_admin: [],
    isLoading: false,  // Tambahkan loading state
  },
  getters: {
    getEventAdmin: (state) => state.event_admin,
    isLoading: (state) => state.isLoading,  // Getter untuk status loading
  },
  actions: {
    async fetchEventAdmin({ commit, state }) {
      try {
        // Set status loading menjadi true sebelum memuat data
        commit('SET_LOADING', true);

        // Ambil Bearer Token dari Local Storage
        const token = localStorage.getItem('token'); // Gantilah 'your_token_key' dengan kunci token Anda

        const response = await axios.get('/event/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit('SET_EVENT_ADMIN', response.data);

        // Setelah data dimuat, atur status loading menjadi false
        commit('SET_LOADING', false);

        return response.data;
      } catch (error) {
        console.error("Error fetching event admin data:", error.response.data.msg);
        ElMessage({
          type: 'error',
          message: 'Gagal Mereset Password: ' + (error.response.data.msg || 'Terjadi kesalahan saat mereset password. Silakan coba lagi.'),
        });

        // Jika terjadi error, tetap set status loading menjadi false
        commit('SET_LOADING', false);

        return false;
      }
    },
  },
  mutations: {
    SET_EVENT_ADMIN(state, eventAdmin) {
      state.event_admin = eventAdmin;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
}

export default eventAdmin;
