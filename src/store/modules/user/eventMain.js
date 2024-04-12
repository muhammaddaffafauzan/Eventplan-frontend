import axios from "axios";
import { ElMessage } from "element-plus";

const eventMain = {
  namespaced: true,
  state: {
    event: [],
    myEvent: [],
    randomEvent: [],
    eventFavorite: [],
    isLoading: false,
  },
  getters: {
    getEventMain: (state) => state.event,
    getMyEvent: (state) => state.myEvent,
    getRandomEvent: (state) => state.randomEvent,
    getEventFavorite: (state) => state.eventFavorite,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchEventMain({ commit }) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get("/events");

        commit("SET_EVENT_MAIN", response.data);
        commit("SHUFFLE_EVENT");
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        ElMessage({
          type: "error",
          message:
            "Gagal memuat acara: " +
            (error.response.data.msg ||
              "Terjadi kesalahan saat memuat acara. Silakan coba lagi."),
        });
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchEventMainByUuid({ commit }, uuid) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get(`/event/${uuid}`);

        commit("SET_EVENT_MAIN", [response.data]); // Simpan detail acara ke dalam state eventMain
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        ElMessage({
          type: "error",
          message:
            "Gagal memuat detail acara: " +
            (error.response.data.msg ||
              "Terjadi kesalahan saat memuat detail acara. Silakan coba lagi."),
        });
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchMyEvents({ commit }) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get("/event/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_MY_EVENT", response.data);
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
    async fetchEventByUuidForUser({ commit }, uuid) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get(`/event/user/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_MY_EVENT", [response.data]); // Simpan detail acara ke dalam state eventMain
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        ElMessage({
          type: "error",
          message:
            "Gagal memuat detail acara: " +
            (error.response.data.msg ||
              "Terjadi kesalahan saat memuat detail acara. Silakan coba lagi."),
        });
        commit("SET_LOADING", false);
        return false;
      }
    },
    async deleteEvent({ commit }, uuid) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`/event/delete/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        ElMessage.success(response.data.msg);
      } catch (error) {
        console.error("Error deleting event:", error.response.data.msg);
        ElMessage.error(
          "Gagal menghapus acara: " +
            (error.response.data.msg ||
              "Terjadi kesalahan saat menghapus acara. Silakan coba lagi.")
        );
      }
    },
    async updateEvent({ commit }, { uuid, formData }) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.put(`/event/update/${uuid}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        commit("SET_LOADING", false);

        ElMessage({
          type: "success",
          message: "Acara berhasil diperbarui!",
        });

        return response.data;
      } catch (error) {
        console.error("Error Update event:", error);

        // Periksa apakah error.response terdefinisi sebelum mencoba mengakses properti 'data'
        const errorMessage = error.response
          ? error.response.data.msg
          : "Terjadi kesalahan saat memperbarui acara. Silakan coba lagi.";

        ElMessage({
          type: "error",
          message: "Gagal memperbarui acara: " + errorMessage,
        });

        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchEventsFavorite({ commit }) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get("/event/favorite/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_EVENT_FAVORITE", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching event favorite data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async addEventsFavorite({ commit }, eventId) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          `/event/favorite/add`,
          { eventId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_EVENT_FAVORITE", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error add event favorite to server:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async removeEventsFavorite({ commit }, eventId) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.delete(`/event/favorite/delete`, {
          data: { eventId }, // Menggunakan "data" untuk mengirim data di body request
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error removing event favorite to server:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_EVENT_MAIN(state, eventMain) {
      state.event = eventMain;
    },
    SET_RANDOM_EVENT(state, randomEvent) {
      state.randomEvent = randomEvent;
    },
    SHUFFLE_EVENT(state) {
      state.randomEvent = state.event.slice().sort(() => Math.random() - 0.5);
    },
    SET_MY_EVENT(state, eventMain) {
      state.myEvent = eventMain;
    },
    SET_EVENT_FAVORITE(state, eventMain) {
      state.eventFavorite = eventMain;
    },
  },
};
export default eventMain;
