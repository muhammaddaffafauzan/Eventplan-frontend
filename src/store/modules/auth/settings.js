import axios from "axios";
import { ElMessage, ElNotification } from "element-plus";

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
    async deleteImageProfile({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete("/profile/image/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        commit("SET_SETTING_PROFILE", response.data.profile);

        ElMessage.success({
          title: "Success",
          message: response.data.msg,
        });
        return response.data.msg;
      } catch (error) {
        console.error(error);
        ElMessage.error({
          title: "Error",
          message: "Failed to delete image user profile",
        });
        throw error;
      }
    },
    async changeEmail({ commit }, { password, newEmail }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/auth/change-email",
          { password, newEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        if (error.response) {
          ElMessage.error(error.response.data.msg);
        } else {
          ElMessage.error("Failed to change email");
        }
        throw error;
      }
    },
    async resendVerificationCode({ commit }, { password, newEmail }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/auth/resend-code-change-email",
          { password, newEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        if (error.response) {
          ElMessage.error(error.response.data.msg);
        } else {
          ElMessage.error("Failed to resend verification code");
        }
        throw error;
      }
    },
    async verifyEmail({ commit }, { verificationToken, newEmail }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/auth/verify-change-email",
          { verificationToken, newEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        if (error.response) {
          ElMessage.error(error.response.data.msg);
        } else {
          ElMessage.error("Failed to verify email");
        }
        throw error;
      }
    },
    async forgotPassword({ commit }, { email }) {
      try {
        const response = await axios.post("/auth/forgot-password", { email });
        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        if (error.response) {
          ElMessage.error(error.response.data.msg);
        } else {
          ElMessage.error("Failed to send reset password instructions");
        }
        throw error;
      }
    },
    async verificationTokenForResetPassword(
      { commit },
      { verificationToken, newPassword, confPassword, email }
    ) {
      try {
        const response = await axios.post(
          "/auth/verification-token-reset-password",
          {
            verificationToken,
            newPassword,
            confPassword,
            email,
          }
        );

        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        ElMessage.error("Failed to reset password");
        throw error;
      }
    },
    async resendCodeEmailForgotPassword({ commit }, { email }) {
      try {
        const response = await axios.post("/auth/resend-code-forgot-password", {
          email,
        });
        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        if (error.response) {
          ElMessage.error(error.response.data.msg);
        } else {
          ElMessage.error("Failed to resend reset code");
        }
        throw error;
      }
    },
    async resetPassword(
      { commit },
      { oldPassword, newPassword, confPassword }
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "/auth/reset-password",
          { oldPassword, newPassword, confPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        ElMessage.success(response.data.msg);
        return response.data.msg;
      } catch (error) {
        console.error(error);
        if (error.response) {
          ElMessage.error(error.response.data.msg);
        } else {
          ElMessage.error("Failed to reset password");
        }
        throw error;
      }
    },
    showFeatureNotification({ commit }, text) {
      ElNotification({
        title: "Information",
        message: `this feature ${text} is coming soon, in development `,
        type: "info",
      });
    },
  },
  mutations: {
    SET_SETTING_PROFILE(state, profile) {
      state.profile = profile;
    },
  },
};

export default settings;
