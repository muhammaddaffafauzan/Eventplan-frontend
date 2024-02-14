import { ElMessage } from 'element-plus'; // Impor komponen ElMessage dari Element Plus
import axios from "axios";

let timeoutId; // Variabel global untuk menyimpan ID timeout

const auth = {
  namespaced: true,
  state: {
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
    user: [],
    tokenExpiration: localStorage.getItem("tokenExpiration") || null,
  },
  getters: {
    isRole: (state) => !!state.role && state.role !== "",
    isAuthenticated: (state) => !!state.token && state.token !== "",
    getMe: (state) => state.user,
  },
  actions: {
    async login({ commit }, credentials) {
        try {
          const response = await axios.post("/auth/login", credentials);
  
          const user = response.data;
          localStorage.setItem("role", user.role);
          localStorage.setItem("token", user.accessToken);
  
          // Set waktu kedaluwarsa token (7 hari dari sekarang)
          const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
          localStorage.setItem("tokenExpiration", expirationTime);
          commit("SET_USER_LOGIN", null);
          commit("SET_ROLE", user.role);
          commit("SET_TOKEN", user.accessToken);
  
          // Set timeout untuk logout setelah 7 hari
          timeoutId = setTimeout(() => {
            commit("SET_ROLE", "");
            commit("SET_TOKEN", "");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            window.location.href = "/";
          }, 7 * 24 * 60 * 60 * 1000); // 7 days
  
          // Tampilkan notifikasi berhasil menggunakan ElMessage
          ElMessage({
            type: 'success',
            message: 'Login success!',
          });
  
          return true;
        } catch (error) {
          const errorMessage = error.response.data.msg;
  
          // Tampilkan notifikasi error menggunakan ElMessage
          ElMessage({
            type: 'error',
            message: 'Login failed: ' + errorMessage,
          });
  
          return false;
        }
      },
      async fetchMe({ commit, dispatch }) {
        // Pemeriksaan token kedaluwarsa sebelum mengambil data pengguna
        await dispatch("checkTokenExpiration");
      
        try {
          const response = await axios.get("/auth/me");
          // Menggunakan array destructuring untuk mengambil data yang diubah dari server
          const { user } = response.data; // Mengambil objek user dari respon JSON
      
          // Committing ke mutations untuk mengubah state
          commit("SET_USER", user);
          return user;
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          return false;
        }
      },
    async logout({ commit }) {
      // Lakukan commit untuk menghapus data pengguna dari toko atau melakukan penanganan lain yang diperlukan
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      commit("SET_ROLE", "");
      commit("SET_TOKEN", "");
      // Hapus timeout untuk menghindari pemanggilan tidak perlu setelah logout
      clearTimeout(timeoutId);
      return true;
    },
    checkTokenExpiration({ commit }) {
      // Periksa apakah token telah kedaluwarsa
      const currentTime = new Date().getTime();
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (tokenExpiration && currentTime > tokenExpiration) {
        // Token telah kedaluwarsa, lakukan logout
        commit("SET_ROLE", "");
        commit("SET_TOKEN", "");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        window.location.href = "/";
      }
    },
    async resetPassword({ commit }, { email }) {
      try {
        const response = await axios.post("/auth/reset-password", { email });

        // Tampilkan notifikasi berhasil menggunakan ElMessage
        ElMessage({
          type: 'success',
          message: 'Reset Password Berhasil! ' + response.data.msg,
        });

        return true;
      } catch (error) {
        // Handle error
        console.error(error);

        // Tampilkan notifikasi error menggunakan ElMessage
        ElMessage({
          type: 'error',
          message: 'Gagal Mereset Password: ' + (error.response.data.msg || 'Terjadi kesalahan saat mereset password. Silakan coba lagi.'),
        });

        return false;
      }
    },

    async changePasswordWithoutToken({ commit }, { resetLink, newPassword }) {
      try {
        const response = await axios.post("/auth/change-password", { resetLink, newPassword });

        // Tampilkan notifikasi berhasil menggunakan ElMessage
        ElMessage({
          type: 'success',
          message: 'Ganti Password Berhasil! ' + response.data.msg,
        });

        return true;
      } catch (error) {
        // Handle error
        console.error(error);

        // Tampilkan notifikasi error menggunakan ElMessage
        ElMessage({
          type: 'error',
          message: 'Gagal Mengganti Password: ' + (error.response.data.msg || 'Terjadi kesalahan saat mengganti password. Silakan coba lagi.'),
        });

        return false;
      }
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
  },
};

export default auth;
