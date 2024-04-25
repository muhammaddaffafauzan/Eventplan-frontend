<template>
  <div class="flex flex-wrap">
    <div class="flex w-full flex-col md:w-1/2">
      <div
        class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0"
      >
        <p class="text-left text-xl font-bold">Eventplan</p>
        <p class="text-left text-4xl mt-2 font-bold">Log in</p>
        <p class="mt-3 text-left text-gray-500">
          Welcome back, please enter your details.
        </p>
        <form @submit.prevent="loginUser" class="flex flex-col pt-3 md:pt-5">
          <div class="flex flex-col pt-4">
            <div
              class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition"
            >
              <input
                type="text"
                id="login-email-or-username"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Email or Username"
                v-model="formKey.identifier"
              />
            </div>
          </div>
          <div class="mb-12 flex flex-col pt-4">
            <div
              class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition"
            >
              <input
                type="password"
                id="login-password"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                v-model="formKey.password"
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
          >
            Log in
          </button>
        </form>
        <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
          <div
            class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white border border-gray-200 rounded-full text-center text-sm text-gray-500"
          >
            or
          </div>
        </div>
        <button
          @click="showFeatureNotification('Log in with google')"
          class="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
        >
          <img
            class="mr-2 h-5"
            src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
            alt
          />
          Log in with Google
        </button>

        <div class="py-12 text-center">
          <p class="whitespace-nowrap text-gray-600">
            Don't have an account?
            <a
              href="/auth/register"
              class="underline-offset-4 font-semibold text-gray-900 underline"
              >Sign up for free.</a
            >
          </p>
          <p class="whitespace-nowrap text-gray-600 mt-4">
            Forgot password?
            <a
              href="#"
              @click="showForgotPasswordDialog = true"
              class="underline-offset-4 font-semibold text-gray-900 underline"
              >click me.</a
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Forgot Password Dialog -->
    <el-dialog
      v-model="showForgotPasswordDialog"
      title="Forgot Password"
      :show-close="false"
    >
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
      <div class="mb-4 flex items-center" v-if="!successInputEmail">
        <button
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
          @click="forgotPassword"
        >
          Next
        </button>
      </div>
      <div class="mb-4" v-if="successInputEmail">
        <label
          for="verificationEmail"
          class="block text-sm font-medium text-gray-700"
          >Verification Code</label
        >
        <input
          type="text"
          id="verificationEmail"
          v-model="verificationEmail"
          placeholder="Input Verification Code"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
        />
        <button
          @click="resendVerificationCodeForgotPassword"
          class="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          :disabled="resendDisabled"
        >
          Resend Code <span v-if="timer > 0">{{ timer }}</span>
        </button>
      </div>
      <div class="mb-4" v-if="successInputEmail">
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
      <div class="mb-4" v-if="successInputEmail">
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
      <div class="mb-4 flex items-center" v-if="successInputEmail">
        <button
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
          @click="submitForgotPassword"
        >
          Submit
        </button>
      </div>
    </el-dialog>

    <div
      class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2"
    >
      <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
        <p class="mb-8 text-3xl font-semibold leading-10">
          Get a Faster and More Efficient Event Planning Experience with
          EventPlan. We work 10x faster than our competitors and stay
          consistent. While they're bogged down with technical debt, we're
          releasing new features.
        </p>
        <p class="mb-4 text-3xl font-semibold">Daffa Fauzan</p>
        <p class="">Founder, EventPlan</p>
        <p class="mb-7 text-sm opacity-70">Event Planning Application</p>
      </div>
      <img
        class="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
        src="https://getout.events/wp-content/uploads/2021/11/event-organizer-1.png"
      />
    </div>
  </div>
</template>

<script>
import { ElLoading, ElDialog, ElInput } from "element-plus";

export default {
  components: {
    ElDialog,
    ElInput,
  },
  data() {
    return {
      formKey: {
        identifier: "",
        password: "",
      },
      showForgotPasswordDialog: false,
      email: "",
      newPassword: "",
      confNewPassword: "",
      verificationEmail: "",
      showInputForgotPassword: false,
      successInputEmail: false,
      loadingInstance: null,
      timer: 0, // Timer dimulai dari 0 detik
      resendDisabled: false, // Properti untuk menonaktifkan tombol Resend saat timer aktif
      countdownTimer: null, // Timer countdown
    };
  },
  methods: {
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
    showFeatureNotification(text) {
      this.$store.dispatch("settings/showFeatureNotification", text);
    },
    async loginUser() {
      const credentials = {
        identifier: this.formKey.identifier,
        password: this.formKey.password,
      };

      try {
        // Menampilkan loading full screen dengan delay 5 detik
        this.loadingInstance = ElLoading.service({
          fullscreen: true,
          text: "Logging in...", // Teks yang ditampilkan pada loading
        });

        // Menambahkan delay 5 detik sebelum melanjutkan
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const success = await this.$store.dispatch("auth/login", credentials);

        if (success) {
          // Redirect ke halaman setelah login sukses
          window.location.href = "/";
        }
      } catch (error) {
        console.error("An error occurred during login", error);
      } finally {
        // Sembunyikan loading setelah login selesai
        if (this.loadingInstance) {
          this.loadingInstance.close();
        }
      }
    },
    async forgotPassword() {
      try {
        const success = await this.$store.dispatch("settings/forgotPassword", {
          email: this.email,
        });
        if (success) {
          this.successInputEmail = true;
          this.showInputForgotPassword = true;
        } else {
          this.successInputEmail = false;
          this.showInputForgotPassword = false;
        }
      } catch (error) {
        console.log(error.message);
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
    async submitForgotPassword() {
      try {
        // Kirim permintaan reset password ke server
        const success = await this.$store.dispatch(
          "settings/verificationTokenForResetPassword",
          {
            newPassword: this.newPassword,
            confPassword: this.confNewPassword,
            verificationToken: this.verificationEmail,
            email: this.email,
          }
        );
        if (success) {
          this.successInputEmail = false;
          this.showInputForgotPassword = false;
          this.showForgotPasswordDialog = false;
        } else {
          this.successInputEmail = true;
          this.showInputForgotPassword = true;
        }
        // Reset input fields setelah berhasil mengubah password
        this.verificationEmail = "";
        this.newPassword = "";
        this.confNewPassword = "";
        this.email = "";
        // Tutup dialog lupa password
        this.showForgotPasswordDialog = true;
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  },
};
</script>
