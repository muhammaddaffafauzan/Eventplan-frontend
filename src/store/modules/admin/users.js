import { ElMessage } from "element-plus";
import axios from "axios";

const usersAdmin = {
  namespaced: true,
  state: {
    users: [],
    isLoading: false,
  },
  getters: {
    getUsersAdmin: (state) => state.users,
    getUsersAdminById: (state) => (uuid) => {
      return state.users.find((users) => users.uuid === uuid) || null;
    },
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchUsersAdmin({ commit, state }) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get("users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_USERS_ADMIN", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching users data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchUsersAdminById({ commit, state }, uuid) {
      try {
        commit("SET_LOADING", true);

        const token = localStorage.getItem("token");
        const response = await axios.get(`/users/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_USERS_ADMIN", [response.data]);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching users admin data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
  },
  mutations: {
    SET_USERS_ADMIN(state, usersAdmin) {
      state.users = usersAdmin;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};

export default usersAdmin;
