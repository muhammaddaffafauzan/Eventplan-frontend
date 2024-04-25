<template>
  <!-- component -->
  <footer class="bg-blue-100 font-sans dark:bg-gray-900">
    <div class="container px-6 py-12 mx-auto">
      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4"
      >
        <div class="sm:col-span-2">
          <h1
            class="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white flex items-center space-x-2"
          >
            <img src="../../assets/img/letter-e.png" alt="Eventplan Logo" class="h-12 w-12">
            <span class="text-3xl font-bold text-gray-800">Eventplan</span>
          </h1>
          <p class="text-gray-600 dark:text-gray-300 mt-2 ml-2">Your ultimate event planning solution.</p>
        </div>
      <div>
        <p class="font-semibold text-gray-800 dark:text-white">Quick Links</p>

        <div class="flex flex-col items-start mt-5 space-y-2">
          <a href="/" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
            Home
          </a>
          <a href="/about" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
            Who We Are
          </a>
        </div>
      </div>

      <div>
        <p class="font-semibold text-gray-800 dark:text-white">Industries</p>

        <div class="flex flex-col items-start mt-5 space-y-2">
          <span class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
            Retail & E-Commerce
          </span>
          <span  class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
            Information Technology
          </span>
          <span class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
            Finance & Insurance
          </span>
        </div>
      </div>
      </div>

      <hr class="my-6 border-gray-200 md:my-8 dark:border-gray-700 h-2" />

      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex flex-1 gap-4 hover:cursor-pointer">
          <img
            src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
            width="130"
            height="110"
            alt=""
          />
          <img
            src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"
            width="130"
            height="110"
            alt=""
          />
        </div>

        <div class="flex gap-4 hover:cursor-pointer">
           <span  @click="showFeatureNotification('facebook')">
             <img
            src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
            width="30"
            height="30"
            alt="fb"
          />
           </span>
         
            <span  @click="showFeatureNotification('twiter/X')">
              <img
            src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg"
            width="30"
            height="30"
            alt="tw"
          />
            </span>
          
          <a href="https://www.instagram.com/daffafznnn_" target="_blank">
             <img
            src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
            width="30"
            height="30"
            alt="inst"
          />
          </a>
         
          <a href="https://github.com/muhammaddaffafauzan" target="_blank">
          <img
            src="https://www.svgrepo.com/show/94698/github.svg"
            class=""
            width="30"
            height="30"
            alt="gt"
          />
          </a>
         
        </div>
      </div>
      <p
        class="font-sans p-8 text-start md:text-center md:text-lg md:p-4 text-gray-500"
      >
        © 2023 Eventplan Inc. All rights reserved.
      </p>
    </div>
  </footer>
</template>
<script>
import { ElNotification } from 'element-plus';

export default {
  methods: {
        showFeatureNotification(text) {
      this.$store.dispatch('settings/showFeatureNotification', text);
    }
  }
};
</script>

