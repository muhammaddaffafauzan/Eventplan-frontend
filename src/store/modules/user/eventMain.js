import axios from "axios";
import { ElMessage } from "element-plus";

const eventMain = {
  namespaced: true,
  state: {
    event: [],
    myEvent: [],
    isLoading: false,
  },
  getters: {
    getEventMain: (state) => state.event,
    getMyEvent: (state) => state.myEvent,
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchEventMain({ commit }) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get("/events");

        commit("SET_EVENT_MAIN", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        ElMessage({
          type: "error",
          message:
            "Failed to load event: " +
            (error.response.data.msg ||
              "An error occurred while loading the event. Please try again."),
        });
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchMyEvents({ commit, state }) {
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
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_EVENT_MAIN(state, eventMain) {
      state.event = eventMain;
    },
    SET_MY_EVENT(state, eventMain) {
      state.myEvent = eventMain;
    },
  },
};
export default eventMain;
