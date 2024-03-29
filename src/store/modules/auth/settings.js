import axios from "axios";
import { ElMessage } from "element-plus";

const settings = {
  namespaced: true,
  state: {
    profile: null,
  },
  getters: {
    getProfile: (state) => state.profile,
  },
  actions: {
    async createOrUpdateProfile({ commit }, formData) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/profile/createOrUpdate", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        commit("SET_SETTING_PROFILE", response.data.profile);
        ElMessage.success(response.data.message);
        return response.data.message;
      } catch (error) {
        console.error(error);
        ElMessage.error("Failed to create or update user profile");
        throw error;
      }
    },
  },
  mutations: {
    SET_SETTING_PROFILE(state, profile) {
      state.profile = profile;
    },
  },
};

export default settings;