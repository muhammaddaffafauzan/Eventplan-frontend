import axios from "axios";
import { ElMessage, ElNotification } from "element-plus";

const notification = {
  namespaced: true,
  state: {
    eventReminders: [], // Menyimpan daftar pengingat acara
  },
  getters: {
    getEventReminders(state) {
      return state.eventReminders;
    },
  },
  actions: {
    updateNotificationSettings({ commit }, settings) {
      commit("SET_NOTIFICATION_SETTINGS", settings);
      localStorage.setItem("notificationSettings", JSON.stringify(settings));
    },

    async sendEventReminders({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/event/reminders", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Menampilkan pesan sukses menggunakan ElNotification
        ElNotification({
          title: "Success",
          message: response.data.msg,
          type: "success",
        });
      } catch (error) {
        console.error("Error sending event reminders:", error);

        // Menampilkan pesan kesalahan menggunakan ElNotification
        ElNotification({
          title: "Error",
          message: `Failed to send event reminders: ${error.response.data.msg}`,
          type: "error",
        });
      }
    },

    async sendEventRemindersToNonAdminUsersWithEvents({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/event/reminders/send", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ElMessage.success(response.data.msg);
      } catch (error) {
        console.error(
          "Error sending event reminders to non-admin users:",
          error
        );
        ElMessage.error("Failed to send event reminders to non-admin users");
      }
    },
    async getEventRemindersForUser({ commit }, req) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/event/reminders/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: req, // Menggunakan params untuk menyertakan data dalam permintaan GET
        });
        const notifications = response.data.notifications;
        commit("SET_EVENT_REMINDERS", notifications);
      } catch (error) {
        console.error("Error getting event reminders:", error);
        ElMessage.error("Failed to get event reminders");
      }
    },
  },
  mutations: {
    SET_EVENT_REMINDERS(state, notifications) {
      state.eventReminders = notifications;
    },
    SET_NOTIFICATION_SETTINGS: (state, settings) => {
      state.notificationSettings = settings;
    },
  },
};

export default notification;
