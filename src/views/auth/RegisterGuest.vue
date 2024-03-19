<template>
  <div class="flex flex-wrap">
    <div class="flex w-full flex-col md:w-1/2">
      <div class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
        <p class="text-left text-xl font-bold">Eventplan</p>
        <p class="text-left text-4xl mt-2 font-bold">Register</p>
        <p class="mt-3 text-left text-gray-500">
          Join us by filling out the form below.
        </p>
        <form @submit.prevent="registerUser" class="flex flex-col pt-3 md:pt-5">
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
          <div class="flex flex-col pt-2">
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
          <div class="flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="password"
                id="register-password"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                v-model="registerForm.password"
                @input="validatePassword"
              />
            </div>
            <div v-if="passwordTouched && !isValidPassword" class="text-red-500 mt-1 text-sm">
              Password must be at least 8 characters and meet security criteria.
            </div>
          </div>

          <div class="mb-8 flex flex-col pt-2">
            <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
              <input
                type="password"
                id="confirm-password"
                class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Confirm Password"
                v-model="registerForm.confPassword"
              />
            </div>
            <div v-if="!isValidConfPassword" class="text-red-500 mt-1 text-sm">
              Passwords do not match.
            </div>
          </div>
          <button
            type="submit"
            :disabled="!isValidForm"
            class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
          >
            Register
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
        class="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
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
        username: "",
        email: "",
        password: "",
        confPassword: "",
      },
      passwordTouched: false,
      loadingInstance: null,
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
      return this.isValidPassword && this.isValidConfPassword;
    },
  },
  methods: {
    ...mapActions("auth", ["registerGuest"]),
    async registerUser() {
      const formRegist = {
        username: this.registerForm.username,
        email: this.registerForm.email,
        password: this.registerForm.password,
        confPassword: this.registerForm.confPassword,
      };

      try {
        this.loadingInstance = ElLoading.service({
          fullscreen: true,
          text: 'Registering...',
        });

        // Panggil aksi registerGuest dari store Vuex
        await this.$store.dispatch("auth/registerGuest", formRegist);

        // Jika berhasil, redirect ke halaman verifikasi email
        this.$router.push({ name: 'VerificationEmail' });
      } catch (error) {
        console.error('Registration failed', error);
        ElMessage.error('Registration failed');
      } finally {
        if (this.loadingInstance) {
          this.loadingInstance.close();
        }
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      this.passwordTouched = true;
    },
  },
};
</script>
