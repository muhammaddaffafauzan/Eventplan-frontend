<template>
  <div class="flex flex-wrap">
    <div class="flex w-full flex-col md:w-1/2">
      <div class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
        <p class="text-left text-xl font-bold">Eventplan</p>
        <p class="text-left text-4xl mt-2 font-bold">Register</p>
        <p class="mt-3 text-left text-gray-500">
          Join us by filling out the form below.
        </p>
        <!-- Form pendaftaran -->
        <form v-if="!verificationComplete" class="flex flex-col pt-3 md:pt-5">
          <!-- Input email -->
          <div class="flex flex-col pt-2 mb-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="email"
                id="register-email"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Email"
                v-model="registerForm.email"
              />
            </div>
          </div>
          <!-- Tombol verifikasi -->
          <button
            type="button"
            @click="sendVerificationCode"
            class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
          >
            Verify Email
          </button>
        </form>

       <form v-if="verificationComplete && !verificationSuccess" class="flex flex-col pt-3 md:pt-5">
    <!-- Input token -->
    <div class="flex flex-col pt-2">
      <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
        <input
          type="text"
          id="verification-token"
          class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Verification Code"
          v-model="verificationToken"
        />
      </div>
    </div>
    <!-- Tombol resend -->
    <button
      type="button"
      :disabled="resendDisabled"
      @click="resendVerificationCode"
      class="w-full rounded-lg bg-gray-900 px-2 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
    >
      {{ resendButtonText }}
    </button>
    <!-- Tombol submit -->
    <button
      type="button"
      @click="verifyEmail"
      :disabled="!verificationToken"
      class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 mt-2"
    >
      Verify
    </button>
  </form>

        <!-- Form lengkap profil -->
        <form v-if="verificationSuccess" @submit.prevent="completeProfile" class="flex flex-col pt-3 md:pt-5">
          <!-- Input username -->
          <div class="flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="text"
                id="register-username"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Username"
                v-model="registerForm.username"
              />
            </div>
          </div>
          <!-- Input first name -->
          <div class="flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="text"
                id="register-firstname"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="First Name"
                v-model="registerForm.firstName"
              />
            </div>
          </div>
          <!-- Input last name -->
          <div class="flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="text"
                id="register-lastname"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Last Name"
                v-model="registerForm.lastName"
              />
            </div>
          </div>
          <!-- Input password -->
          <div class="flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="password"
                id="register-password"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                v-model="registerForm.password"
              />
            </div>
          </div>
          <!-- Input confirm password -->
          <div class="flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="password"
                id="confirm-password"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Confirm Password"
                v-model="registerForm.confPassword"
              />
            </div>
          </div>
          <!-- Tombol submit -->
          <button
            type="submit"
            :disabled="!isValidForm"
            class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 mt-4"
          >
            Complete Profile
          </button>
        </form>
        <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
          <div class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white border border-gray-200 rounded-full text-center text-sm text-gray-500">
            or
          </div>
        </div>
        <button
          class="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
        >
          <img
            class="mr-2 h-5"
            src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
            alt
          />
          Sign up with Google
        </button>
        <div class="py-12 text-center">
          <p class="whitespace-nowrap text-gray-600">
            do you have an account?
            <a
              href="/auth/login"
              class="underline-offset-4 font-semibold text-gray-900 underline"
              >Sign in now.</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
      <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
        <p class="mb-8 text-3xl font-semibold leading-10">
          We work 10x faster than our competitors and stay consistent. While
          they're bogged down with technical debt, we're releasing new features.
        </p>
        <p class="mb-4 text-3xl font-semibold">John Elmond</p>
        <p class="">Founder, Emogue</p>
        <p class="mb-7 text-sm opacity-70">Web Design Agency</p>
      </div>
      <img
        class="-z-1 absolute top-0 h-full w-full object-fill opacity-90"
        src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      />
    </div>
  </div>
</template>
<script>
import { ElLoading, ElMessage } from "element-plus";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      registerForm: {
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confPassword: "",
      },
      verificationToken: "",
      verificationComplete: false,
      verificationSuccess: false,
      loadingInstance: null,
      passwordTouched: false,
      resendButtonText: "Resend Code", // Teks tombol resend
      resendDisabled: false, // Status tombol resend
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoading"]),
    isValidPassword() {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(this.registerForm.password);
    },
    isValidConfPassword() {
      return this.registerForm.password === this.registerForm.confPassword;
    },
    isValidForm() {
      return (
        this.isValidEmail(this.registerForm.email) &&
        this.isValidUsername(this.registerForm.username) &&
        this.isValidPassword(this.registerForm.password) &&
        this.isValidConfPassword(this.registerForm.confPassword)
      );
    },
  },
  methods: {
    ...mapActions("auth", ["registerGuest", "verifyEmail", "resendVerificationCode"]),
    async sendVerificationCode() {
      // Validasi input sebelum mengirim verifikasi
      if (!this.isValidEmail(this.registerForm.email)) {
        ElMessage.error("Please enter a valid email address");
        return;
      }

      try {
        const formRegist = { email: this.registerForm.email };
        // Panggil aksi registerGuest dari store Vuex
        const success = await this.$store.dispatch("auth/registerGuest", formRegist);
        if (success) {
          // Jika pendaftaran berhasil, set verificationComplete menjadi true
          this.verificationComplete = true;
        } else {
          // Jika pendaftaran gagal, pastikan verificationComplete tetap false
          this.verificationComplete = false;
        }
      } catch (error) {
        ElMessage.error("Failed to send verification code");
        // Jika terjadi kesalahan, pastikan verificationComplete tetap false
        this.verificationComplete = false;
      }
    },
    async verifyEmail() {
      const verificationData = { email: this.registerForm.email, verificationToken: this.verificationToken };
      try {
        // Panggil aksi verifyEmail dari store Vuex
        const success = await this.$store.dispatch("auth/verifyEmail", verificationData);
        if (success) {
          // Jika verifikasi berhasil, set verificationSuccess menjadi true
          this.verificationSuccess = true;
        } else {
          // Jika verifikasi gagal, pastikan verificationSuccess tetap false
          this.verificationSuccess = false;
        }
      } catch (error) {
        ElMessage.error("Failed to verify email");
        // Jika terjadi kesalahan, pastikan verificationSuccess tetap false
        this.verificationSuccess = false;
      }
    },
    async resendVerificationCode() {
      // Implementasi resend kode verifikasi
      try {
        await this.$store.dispatch("auth/resendVerificationCode", this.registerForm.email);
      } catch (error) {
        ElMessage.error("Failed to resend verification code");
      }
    },
    async completeProfile() {
      // Implementasi lengkapkan profil pengguna
      const profileData = {
        username: this.registerForm.username,
        firstName: this.registerForm.firstName,
        lastName: this.registerForm.lastName,
        password: this.registerForm.password,
        confPassword: this.registerForm.confPassword,
      };

      try {
        this.loadingInstance = ElLoading.service({
          fullscreen: true,
          text: "Completing profile...",
        });

        // Panggil aksi completeProfile dari store Vuex
        const success = await this.$store.dispatch("auth/completeProfile", profileData);

        if (success) {
          // Jika lengkapkan profil berhasil, set verificationComplete menjadi true
          this.verificationComplete = true;

          // Contoh sederhana: menampilkan pesan sukses
          ElMessage.success("Profile completed successfully");
          window.location.href = "/";

          // Redirect ke halaman lain atau lakukan aksi lainnya
        } else {
          // Jika lengkapkan profil gagal, pastikan verificationComplete tetap false
          this.verificationComplete = false;
          ElMessage.error("Completing profile failed");
        }
      } catch (error) {
        console.error("Completing profile failed", error);
        ElMessage.error("Completing profile failed");
      } finally {
        if (this.loadingInstance) {
          this.loadingInstance.close();
        }
      }
    },
    // Method untuk memvalidasi email
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    // Method untuk memvalidasi username
    isValidUsername(username) {
      // Menambahkan aturan validasi untuk username, misalnya panjang minimal, karakter yang diperbolehkan, dll.
      // Anda dapat menyesuaikan aturan validasi sesuai kebutuhan aplikasi Anda.
      return username.length >= 4; // Contoh: Username harus memiliki panjang minimal 4 karakter
    },
    // Method untuk memvalidasi password
    isValidPassword(password) {
      // Menambahkan aturan validasi untuk password, misalnya panjang minimal, harus memiliki huruf dan angka, dll.
      // Anda dapat menyesuaikan aturan validasi sesuai kebutuhan aplikasi Anda.
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; // Contoh: Password harus memiliki panjang minimal 8 karakter dan setidaknya satu huruf dan satu angka
      return passwordRegex.test(password);
    },
    // Method untuk memvalidasi konfirmasi password
    isValidConfPassword(confPassword) {
      // Menambahkan aturan validasi untuk konfirmasi password, misalnya harus sesuai dengan password yang dimasukkan sebelumnya, dll.
      // Anda dapat menyesuaikan aturan validasi sesuai kebutuhan aplikasi Anda.
      return confPassword === this.registerForm.password;
    },
  },
};
</script>
