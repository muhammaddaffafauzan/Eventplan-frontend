// eventAdmin.js

import { ElMessage } from "element-plus";
import axios from "axios";

const eventAdmin = {
  namespaced: true,
  state: {
    event_admin: [],
    isLoading: false,
  },
  getters: {
    getEventAdmin: (state) => state.event_admin,
    getEventAdminById: (state) => (uuid) => {
      return state.event_admin.find((event) => event.uuid === uuid) || null;
    },
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchEventAdmin({ commit, state }) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get("/event/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_EVENT_ADMIN", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching event admin data:",
          error.response.data.msg
        );
        ElMessage({
          type: "error",
          message:
            "Gagal Mereset Password: " +
            (error.response.data.msg ||
              "Terjadi kesalahan saat mereset password. Silakan coba lagi."),
        });
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchEventAdminById({ commit, state }, uuid) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get(`/event/admin/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_EVENT_ADMIN", [response.data]);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching event admin data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async createEvent({ commit, state }, payload) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.post("/event/create", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Tambahkan header ini karena request menggunakan FormData
          },
        });

        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error("Error creating event:", error.response.data.msg);
        ElMessage({
          type: "error",
          message:
            "Gagal membuat event: " +
            (error.response.data.msg ||
              "Terjadi kesalahan saat membuat event. Silakan coba lagi."),
        });
        commit("SET_LOADING", false);
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
};

export default eventAdmin;
