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
    async fetchUsersAdmin({ commit }) {
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
        console.error("Error fetching users data:", error.response.data.msg);
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchUsersAdminById({ commit }, uuid) {
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
    async createUser({commit}, userData) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/users/create", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        ElMessage.success(response.data.msg);
        return response.data;
      } catch (error) {
        console.error("Error creating user:", error.response.data.msg);
        return false;
      }
    },
    async deleteUser({ commit }, uuid) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`/users/delete/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        ElMessage.success(response.data.msg);
        return response.data;
      } catch (error) {
        console.error("Error deleting user:", error.response.data.msg);
        return false;
      }
    },
    async resendVerificationCodeAdmin({ commit }, email) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/users/resend-verification",
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        ElMessage.success(response.data.msg);
        return response.data;
      } catch (error) {
        console.error(
          "Error resending verification code:",
          error.response.data.msg
        );
        return false;
      }
    },
    async verifyEmailAdmin({ commit }, { email, verificationToken }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/users/verify-email",
          { email, verificationToken },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        ElMessage.success(response.data.msg);
        return response.data;
      } catch (error) {
        console.error("Error verifying email:", error.response.data.msg);
        return false;
      }
    }
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