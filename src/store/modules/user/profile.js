import axios from "axios";
import { ElMessage } from "element-plus";

const profile = {
  namespaced: true,
  state: {
    profileData: [],
    isLoading: false,
  },
  getters: {
    profileData: (state) => state.profileData,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchAllProfileUsers({ commit }) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get(`/profiles`);
        commit("SET_PROFILE_DATA", response.data);
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_LOADING", false);

        console.error("Error fetching all profiles:", error);
        ElMessage.error("Failed to fetch all profiles.");
        throw error;
      }
    },
    async fetchProfileByUuid({ commit }, uuid) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get(`/profile/${uuid}`);
        commit("SET_PROFILE_DATA", [response.data]);
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_LOADING", false);

        console.error("Error fetching profile by UUID:", error);
        ElMessage.error("Failed to fetch profile by UUID.");
        throw error;
      }
    },
  },
  mutations: {
    SET_PROFILE_DATA(state, data) {
      state.profileData = data;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};

export default profile;
