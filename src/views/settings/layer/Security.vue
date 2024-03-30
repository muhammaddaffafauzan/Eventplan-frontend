<template>
  <!-- Informasi Personal -->
  <div class="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
    <p class="absolute right-5 mt-1 text-right text-sm text-gray-500">
      Account Eventplan since {{ formattedCreatedAt }}
    </p>
    <div class="col-span-2">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Security</h2>
      <hr class="border-gray-300 mb-6" />
    </div>
    <!-- Header untuk Email -->
    <div class="col-span-2">
      <label
        for="email"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <div class="mt-2 flex items-center">
        <input
          type="text"
          name="email"
          id="email"
          v-model="profileEmail"
          disabled
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
        <button
          @click="showChangeEmailDialog = true"
          class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Change Email
        </button>
      </div>
    </div>
    <div class="col-span-2 mt-4">
      <button
        @click="showPasswordDialog"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
      >
        Change Password
      </button>
    </div>
    <!-- Change Password Section -->
    <div v-if="showChangePasswordDialog" class="col-span-2 mt-4">
      <h3 class="text-lg font-semibold mb-4">Change Password</h3>
      <div class="mb-4">
        <label
          for="currentPassword"
          class="block text-sm font-medium text-gray-700"
          >Current Password</label
        >
        <el-input
          type="password"
          id="currentPassword"
          style="width: 100%"
          v-model="currentPassword"
          show-password
          placeholder="Input Current Password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block text-sm font-medium text-gray-700"
          >New Password</label
        >
        <el-input
          type="password"
          id="newPassword"
          v-model="newPassword"
          style="width: 100%"
          placeholder="Input New Password"
          show-password
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label
          for="confPassword"
          class="block text-sm font-medium text-gray-700"
          >Confirm New Password</label
        >
        <el-input
          type="password"
          id="confNewPassword"
          v-model="confNewPassword"
          style="width: 100%"
          placeholder="Input New Password"
          show-password
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
        />
      </div>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md"
        @click="changePassword"
      >
        Change Password
      </button>
      <span class="text-gray-600 text-sm ml-2"
        >Forgot password?<a
          href="#"
          @click="showForgotPassword"
          class="text-blue-400 ml-1"
          >click here</a
        ></span
      >
    </div>
  </div>
  <!-- Dialog untuk mengubah email -->
  <transition name="modal">
    <div v-if="showChangeEmailDialog" class="modal">
      <div class="modal-overlay" @click="cancelChangeEmail"></div>
      <div class="modal-content">
        <h3 class="text-lg font-semibold mb-4">Change Email</h3>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Input Password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="newEmail" class="block text-sm font-medium text-gray-700"
            >New Email</label
          >
          <input
            type="text"
            id="newEmail"
            v-model="newEmail"
            placeholder="Input New Email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <div class="mb-4 flex items-center" v-if="emailChanged">
          <input
            type="text"
            id="verificationEmail"
            v-model="verificationEmail"
            placeholder="Input Verification Code"
            class="mt-1 flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
          />
          <button
            @click="resendVerificationCode"
            class="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
            :disabled="resendDisabled"
          >
            Resend Code <span v-if="timer > 0">{{ timer }}</span>
          </button>
        </div>
        <button
          v-if="emailChanged === true"
          type="button"
          class="px-4 pl mx-2 py-2 bg-blue-600 text-white rounded-md"
          @click="verifyEmail"
        >
          Submit
        </button>
        <button
          v-else
          type="button"
          class="px-4 pl mx-2 py-2 bg-blue-600 text-white rounded-md"
          @click="submitChangeEmail"
        >
          Submit
        </button>
      </div>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="showForgotPasswordDialog" class="modal">
      <div class="modal-overlay" @click="cancelForgotPassword"></div>
      <div class="modal-content">
        <h3 class="text-lg font-semibold mb-4">Forgot Password</h3>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="forgotPasswordEmail"
            v-model="email"
            placeholder="Input Your Email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <div v-if="showInputForgotPassword">
          <div class="mb-4">
            <label
              for="newPassword"
              class="block text-sm font-medium text-gray-700"
              >New Password</label
            >
            <el-input
              type="password"
              id="newPassword"
              v-model="newPassword"
              style="width: 100%"
              placeholder="Input New Password"
              show-password
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label
              for="confPassword"
              class="block text-sm font-medium text-gray-700"
              >Confirm New Password</label
            >
            <el-input
              type="password"
              id="confNewPassword"
              v-model="confNewPassword"
              style="width: 100%"
              placeholder="Input New Password"
              show-password
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
            />
          </div>
          <div class="mb-4 flex items-center" v-if="showInputForgotPassword">
            <input
              type="text"
              id="verificationEmail"
              v-model="verificationEmail"
              placeholder="Input Verification Code"
              class="mt-1 flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
            />
            <button
              @click="resendVerificationCodeForgotPassword"
              class="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
              :disabled="resendDisabled"
            >
              Resend Code <span v-if="timer > 0">{{ timer }}</span>
            </button>
          </div>
        </div>
        <button
          v-if="showInputForgotPassword === true"
          type="button"
          class="px-4 pl mx-2 py-2 bg-blue-600 text-white rounded-md"
          @click="submitForgotPassword"
        >
          Submit password
        </button>
        <button
          v-else
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
          @click="forgotPassword"
        >
          Submit
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showInputForgotPassword: false,
      showForgotPasswordDialog: false,
      showChangeEmailDialog: false,
      showChangeEmailDialog: false,
      showChangePasswordDialog: false,
      currentPassword: "",
      newPassword: "",
      confNewPassword: "",
      emailChanged: false,
      password: "",
      newEmail: "",
      email: "",
      verificationEmail: "",
      timer: 0, // Timer dimulai dari 0 detik
      resendDisabled: false, // Properti untuk menonaktifkan tombol Resend saat timer aktif
      countdownTimer: null, // Timer countdown
    };
  },
  computed: {
    ...mapGetters("auth", ["getMe"]),
    profileEmail() {
      return this.getMe?.user?.email;
    },
    formattedCreatedAt() {
      if (this.getMe && this.getMe.user && this.getMe.user.createdAt) {
        const createdAt = new Date(this.getMe.user.createdAt);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const day = createdAt.getDate();
        const monthIndex = createdAt.getMonth();
        const year = createdAt.getFullYear();
        return `${day} ${monthNames[monthIndex]} ${year}`;
      } else {
        return "N/A";
      }
    },
  },
  methods: {
    ...mapActions("settings", ["changeEmail", "resendVerificationCode"]),
    ...mapActions("auth", ["fetchMe"]),
    async submitChangeEmail() {
      try {
        await this.changeEmail({
          password: this.password,
          newEmail: this.newEmail,
        });
        this.emailChanged = true;
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    cancelChangeEmail() {
      this.showChangeEmailDialog = false;
      // Clear input fields or reset any necessary data
      this.password = "";
      this.newEmail = "";
      this.verificationEmail = "";
      this.timer = 0; // Reset timer
      this.clearCountdownTimer(); // Clear countdown timer
    },
    async resendVerificationCode() {
      try {
        // Kirim ulang kode verifikasi
        await this.$store.dispatch("settings/resendVerificationCode", {
          password: this.password,
          newEmail: this.newEmail,
        });
        // Mulai countdown setelah berhasil mengirim ulang
        this.startCountdown();
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    async resendVerificationCodeForgotPassword() {
      try {
        // Kirim ulang kode verifikasi
        await this.$store.dispatch("settings/resendCodeEmailForgotPassword", {
          email: this.email,
        });
        // Mulai countdown setelah berhasil mengirim ulang
        this.startCountdown();
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    async verifyEmail() {
      try {
        // Kirim ulang kode verifikasi
        await this.$store.dispatch("settings/verifyEmail", {
          newEmail: this.newEmail,
          verificationToken: this.verificationEmail,
        });
        this.showChangeEmailDialog = false;
        this.emailChanged = false;

        this.verificationEmail = "";

        this.fetchMe();
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    validatePasswordStrength(password) {
      // Lakukan validasi sesuai kebutuhan Anda, contoh:
      const minLength = 8; // Panjang minimal password
      const hasUpperCase = /[A-Z]/.test(password); // Cek huruf besar
      const hasLowerCase = /[a-z]/.test(password); // Cek huruf kecil
      const hasNumber = /\d/.test(password); // Cek angka
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Cek karakter khusus

      // Return true jika password memenuhi semua kriteria
      return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar
      );
    },
    async changePassword() {
      try {
        // Validasi kekuatan password sebelum mengirim permintaan ke server
        if (!this.validatePasswordStrength(this.newPassword)) {
          // Tampilkan pesan kesalahan jika password tidak cukup kuat
          this.$message.error(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          );
          return; // Berhenti di sini jika password tidak memenuhi kriteria
        }

        // Kirim permintaan ke server hanya jika password memenuhi kriteria
        await this.$store.dispatch("settings/resetPassword", {
          oldPassword: this.currentPassword,
          newPassword: this.newPassword,
          confPassword: this.confNewPassword,
        });

        // Reset input fields after successful password change
        this.currentPassword = "";
        this.newPassword = "";
        this.confNewPassword = "";

        // Close the change password section
        this.showChangePasswordDialog = false;
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    async forgotPassword() {
      try {
        await this.$store.dispatch("settings/forgotPassword", {
          email: this.email,
        });
        this.showInputForgotPassword = true;
      } catch (error) {
        console.log(error.message);
      }
    },
    async submitForgotPassword() {
      try {
        // Validasi kekuatan password sebelum mengirim permintaan ke server
        if (!this.validatePasswordStrength(this.newPassword)) {
          // Tampilkan pesan kesalahan jika password tidak cukup kuat
          this.$message.error(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          );
          return; // Berhenti di sini jika password tidak memenuhi kriteria
        }

        // Kirim permintaan ke server hanya jika password memenuhi kriteria
        await this.$store.dispatch(
          "settings/verificationTokenForResetPassword",
          {
            newPassword: this.newPassword,
            confPassword: this.confNewPassword,
            verificationToken: this.verificationEmail,
            email: this.email,
          }
        );

        // Reset input fields after successful password change
        this.verificationEmail = "";
        this.newPassword = "";
        this.confNewPassword = "";
        this.email = "";

        // Close the change password section
        this.showForgotPasswordDialog = false;
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    startCountdown() {
      // Menonaktifkan tombol Resend
      this.resendDisabled = true;
      // Set timer countdown menjadi 60 detik
      this.timer = 60;
      // Mulai countdown
      this.countdownTimer = setInterval(() => {
        // Kurangi waktu sisa setiap detik
        this.timer--;
        // Jika sudah mencapai 0, hentikan countdown dan aktifkan tombol Resend
        if (this.timer <= 0) {
          this.clearCountdownTimer();
          this.resendDisabled = false;
        }
      }, 1000); // Update setiap detik
    },
    clearCountdownTimer() {
      // Hentikan countdown timer jika sedang berjalan
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    },
    showPasswordDialog() {
      this.showChangePasswordDialog = !this.showChangePasswordDialog;
    },
    showForgotPassword() {
      this.showForgotPasswordDialog = true;
      this.email = this.getMe?.user?.email;
    },
    // Metode untuk membatalkan dialog lupa password
    cancelForgotPassword() {
      this.showForgotPasswordDialog = false;
      // Bersihkan input field atau reset data yang diperlukan
      this.forgotPasswordEmail = "";
    },
  },
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Title");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Title");
    next();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: fixed;
  z-index: 9; /* Z-index yang lebih rendah dari .modal */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  z-index: 10; /* Z-index yang lebih tinggi dari .modal-overlay */
  width: 400px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
