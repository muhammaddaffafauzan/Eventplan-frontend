<template>
  <div class="notification-settings">
    <div class="col-span-2">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Notification Settings
      </h2>
      <hr class="border-gray-300 mb-6" />
    </div>
    <el-form
      ref="notificationForm"
      :model="notificationSettings"
      label-width="120px"
    >
      <el-switch
        v-model="notificationSettings.enableNotifications"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="saveSettings"
      ></el-switch>
      <span class="text-sm ml-2 text-gray-500">Enable Notifications</span>

      <el-switch
        v-model="notificationSettings.allowBrowserNotifications"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="saveSettings"
        class="ml-2"
      ></el-switch>
      <span class="text-sm ml-2 text-gray-500"
        >Allow Browser Notifications</span
      >

      <el-form-item
        v-if="notificationSettings.enableNotifications"
        label="Event Reminder"
      >
        <el-slider
          v-model="notificationSettings.reminderDays"
          :min="0"
          :max="30"
          :show-input="true"
          @change="saveSettings"
        ></el-slider>
        <span class="days-label text-sm text-gray-500">Days Before Event</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notificationSettings: {
        enableNotifications: false,
        allowBrowserNotifications: false,
        reminderDays: 1, // Default reminder days
      },
    };
  },
  methods: {
    saveSettings() {
      // Save notification settings to local storage
      localStorage.setItem(
        "notificationSettings",
        JSON.stringify(this.notificationSettings)
      );

      // Show success message
      this.$message.success("Notification settings saved.");

      // If browser notifications are enabled and allowed, request permission
      if (
        this.notificationSettings.enableNotifications &&
        this.notificationSettings.allowBrowserNotifications
      ) {
        this.requestNotificationPermission();
      }
    },
    requestNotificationPermission() {
      // Meminta izin notifikasi dari pengguna
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Izin notifikasi diberikan, Anda sekarang dapat menampilkan notifikasi
          this.$message.success("Notification permission granted.");
        } else if (permission === "denied") {
          // Izin notifikasi ditolak oleh pengguna
          this.$message.error("Notification permission denied.");
        } else if (permission === "default") {
          // Pengguna menutup dialog izin notifikasi tanpa memberikan izin atau menolaknya secara eksplisit
          this.$message.warning("Notification permission dismissed.");
        }
      });
    },
    showNotification(title, body) {
      // Show a browser notification
      new Notification(title, { body });
    },
  },
  mounted() {
    // Load notification settings from local storage when the component is mounted
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      this.notificationSettings = JSON.parse(savedSettings);
    }
  },
};
</script>

<style>
.notification-settings {
  max-width: auto;
  margin: 20px auto;
}

.notification-settings h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.days-label {
  margin-left: 10px;
  font-size: 14px;
}
</style>
