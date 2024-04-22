import { ElMessage } from "element-plus";
import axios from "axios";

const auth = {
  namespaced: true,
  state: {
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
    user: [],
    Loading: false, // Tambahkan loading state
    verifyEmail: "",
  },
  getters: {
    isRole: (state) => !!state.role && state.role !== "",
    isAuthenticated: (state) => !!state.token && state.token !== "",
    getMe: (state) => state.user,
    isLoading: (state) => state.Loading, // Getter untuk status loading
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post("/auth/login", credentials);

        const user = response.data;
        localStorage.setItem("role", user.role);
        localStorage.setItem("token", user.accessToken);
        commit("SET_ROLE", user.role);
        commit("SET_TOKEN", user.accessToken);

        // Set timeout untuk logout otomatis ketika token kedaluwarsa
        dispatch("setLogoutTimer", response.data.expiresIn);

        ElMessage({
          type: "success",
          message: "Login success!",
        });

        return true;
      } catch (error) {
        const errorMessage = error.response.data.msg;
        ElMessage({
          type: "error",
          message: "Login failed: " + errorMessage,
        });

        return false;
      }
    },
    async registerGuest({ commit }, formRegist) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.post("/auth/register", formRegist);


        // Tampilkan pesan sukses
        ElMessage({
          type: "success",
          message:
            response.data.msg ||
            "Registration success! Please check your email for verification instructions.",
        });

        commit("SET_LOADING", false);

        return true;
      } catch (error) {
        commit("SET_LOADING", false);
        const errorMessage = error.response
          ? error.response.data.msg
          : error.message;

        // Tampilkan pesan kesalahan
        ElMessage({
          type: "error",
          message: "Registration failed: " + errorMessage,
        });

        return false;
      }
    },
    async completeProfile({ commit }, profileData) {
      try {
        // Set status loading menjadi true sebelum memuat data
        commit("SET_LOADING", true);

        // Ambil Bearer Token dari Local Storage
        const token = localStorage.getItem("token"); // Gantilah 'your_token_key' dengan kunci token Anda

        const response = await axios.post(
          "/auth/complete-profile",
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Setelah data dimuat, atur status loading menjadi false
        commit("SET_LOADING", false);

        ElMessage({
          type: "success",
          message: response.data.msg || "Complete profile success!",
        });
        return true;
      } catch (error) {
        console.error("Error complate user data:", error.message);

        // Jika terjadi error, tetap set status loading menjadi false
        commit("SET_LOADING", false);

        return false;
      }
    },
    async verifyEmail({ commit }, verificationData) {
      try {
        const response = await axios.post(
          "/auth/verify-email",
          verificationData
        );

        // Jika verifikasi berhasil, simpan access token dan role ke dalam local storage dan state
        const { accessToken, role } = response.data;
        localStorage.setItem("role", role);
        localStorage.setItem("token", accessToken);
        commit("SET_ROLE", role);
        commit("SET_TOKEN", accessToken);

        // Optionally, you can commit mutation if needed
        commit("SET_VERIFIED_EMAIL", verificationData.email);

        return true;
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.msg
          : error.message;

        // Handle error message
        ElMessage({
          type: "error",
          message: errorMessage,
        });

        return false;
      }
    },
    async resendVerificationCode({ commit }, email) {
      try {
        const response = await axios.post("/auth/resend-verification", {
          email,
        });
        const message = response.data.msg;

        // Handle success message
        ElMessage({
          type: "success",
          message: message,
        });

        return true;
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.msg
          : error.message;

        // Handle error message
        ElMessage({
          type: "error",
          message: errorMessage,
        });

        return false;
      }
    },

    async fetchMe({ commit }) {
      try {
        // Set status loading menjadi true sebelum memuat data
        commit("SET_LOADING", true);

        // Ambil Bearer Token dari Local Storage
        const token = localStorage.getItem("token"); // Gantilah 'your_token_key' dengan kunci token Anda

        const response = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        commit("SET_USER", user);

        // Setelah data dimuat, atur status loading menjadi false
        commit("SET_LOADING", false);

        return user;
      } catch (error) {
        console.error("Error fetching user data:", error.message);

        // Jika terjadi error, tetap set status loading menjadi false
        commit("SET_LOADING", false);

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
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_VERIFY_EMAIL(state, email) {
      state.verifyEmail = email;
    },
  },
};

export default auth;
