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
        </div>
      </div>
    </div>
<div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
  <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
    <p class="mb-8 text-3xl font-semibold leading-10">
      Get a Faster and More Efficient Event Planning Experience with EventPlan. We work 10x faster than our competitors and stay consistent. While they're bogged down with technical debt, we're releasing new features.
    </p>
    <p class="mb-4 text-3xl font-semibold">Daffa Fauzan</p>
    <p class="">Founder, EventPlan</p>
    <p class="mb-7 text-sm opacity-70">Event Planning Application</p>
  </div>
  <img class="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://getout.events/wp-content/uploads/2021/11/event-organizer-1.png" />
</div>

  </div>
</template>

<script>
import { ElLoading } from "element-plus";

export default {
  data() {
    return {
      formKey: {
        identifier: "",
        password: "",
      },
    };
  },
  methods: {
          showFeatureNotification(text) {
      this.$store.dispatch('settings/showFeatureNotification', text);
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
          window.location.href = '/'
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
  },
};
</script>
