<template>
  <div
    class="mt-16 lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 pb-12 mx-auto"
  >
    <div class="p-4 col-span-6 md:col-span-2 border-r border-gray-200">
      <div class="grid grid-cols-5">
        <button
          @click="goToPersonal"
          :class="{ active: $route.path === '/settings/personal' }"
          class="md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-indigo-50 text-left"
        >
          <div
            class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0"
          >
            <svg
              class="mx-auto items-center justify-center h-6 w-6 text-gray-600 group-hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>
          </div>
          <div class="flex-auto hidden md:block">
            <span class="block font-semibold text-gray-900"
              >Personal Information</span
            >
            <p class="mt-1 text-gray-600">
              Get a better understanding of your traffic
            </p>
          </div>
        </button>
        <button
          @click="goToSecurity"
          :class="{ active: $route.path === '/settings/security' }"
          class="md:col-span-5 group relative flex items-left justify-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 text-left"
        >
          <div
            class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0"
          >
            <svg
              class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
              />
            </svg>
          </div>
          <div class="flex-auto hidden md:block">
            <span class="block font-semibold text-gray-900">Security</span>
            <p class="mt-1 text-gray-600">
              Your customers’ data will be safe and secure
            </p>
          </div>
        </button>
        <button
          @click="goToNotifications"
          :class="{ active: $route.path === '/settings/notifications' }"
          class="md:col-span-5 group relative flex items-left justify-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 text-left"
        >
          <div
            class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0"
          >
            <svg
              class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
              />
            </svg>
          </div>
          <div class="flex-auto hidden md:block">
            <span class="block font-semibold text-gray-900">Notifications</span>
            <p class="mt-1 text-gray-600">
              Manage your notification preferences
            </p>
          </div>
        </button>
        <button
          @click="goToLanguage"
          :class="{ active: $route.path === '/settings/language' }"
          class="md:col-span-5 group relative flex items-left justify-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 text-left"
        >
          <div
            class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0"
          >
            <svg
              class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.64 4.14c1.464-1.44 3.384-2.4 5.496-2.82a9.061 9.061 0 014.494.198c1.092.33 2.13.84 3.06 1.53 1.566 1.38 2.58 3.528 2.58 5.91 0 1.992-.66 3.768-1.848 5.13-.54.6-1.17 1.14-1.86 1.62-1.02.75-2.19 1.32-3.45 1.68-1.29.36-2.67.54-4.05.54-1.38 0-2.76-.18-4.05-.54-1.26-.36-2.43-.93-3.45-1.68-.69-.48-1.32-1.02-1.86-1.62-1.188-1.362-1.848-3.138-1.848-5.13 0-2.382 1.014-4.53 2.58-5.91.93-.69 1.968-1.2 3.06-1.53a9.061 9.061 0 014.494-.198c2.112.42 4.032 1.38 5.496 2.82 1.566 1.38 2.58 3.528 2.58 5.91 0 1.992-.66 3.768-1.848 5.13a7.307 7.307 0 01-1.86 1.62c-1.02.75-2.19 1.32-3.45 1.68-1.29.36-2.67.54-4.05.54-1.38 0-2.76-.18-4.05-.54-1.26-.36-2.43-.93-3.45-1.68-.69-.48-1.32-1.02-1.86-1.62-1.188-1.362-1.848-3.138-1.848-5.13 0-2.382 1.014-4.53 2.58-5.91zm5.85 9.36l.132.09 1.875 1.251c.792.54 1.65.9 2.568 1.071.288.042.576.042.852.042.564 0 1.128-.09 1.692-.252 1.176-.33 2.352-.9 3.348-1.68.54-.48 1.02-.99 1.47-1.56l1.851-1.74c.252-.24.252-.66 0-.9l-1.824-1.71c-.42-.42-.93-.78-1.47-1.08-.672-.33-1.41-.54-2.148-.66-.732-.12-1.482-.12-2.214 0-.732.12-1.44.33-2.118.66-.732.3-1.41.66-2.034 1.14-.72.57-1.35 1.23-1.86 1.95l-.198.27c-.252.3-.252.78 0 1.08z"
              />
            </svg>
          </div>
          <div class="flex-auto hidden md:block">
            <span class="block font-semibold text-gray-900">Language</span>
            <p class="mt-1 text-gray-600">Choose your preferred language</p>
          </div>
        </button>
        <!-- <button
          @click="goToPrivacy"
          :class="{ active: $route.path === '/settings/privacy' }"
          class="md:col-span-5 group relative flex items-left justify-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 text-left"
        >
          <div
            class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0"
          >
            <svg
              class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12l7-4m2 0l7 4m-7-4v6"
              />
            </svg>
          </div>
          <div class="flex-auto hidden md:block">
            <span class="block font-semibold text-gray-900">Privacy</span>
            <p class="mt-1 text-gray-600">Manage your privacy settings</p>
          </div>
        </button> -->
      </div>
    </div>
    <div class="p-4 col-span-6 md:col-span-4">
     <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {  
  methods: {
    goToPersonal() {
      this.$router.push("/settings/personal");
    },
    goToSecurity() {
      this.$router.push("/settings/security");
    },
    goToNotifications() {
      this.$router.push("/settings/notifications");
    },
    goToLanguage() {
      this.$router.push("/settings/language");
    },
    goToPrivacy() {
      this.$router.push("/settings/privacy");
    },
  },
    beforeRouteEnter(to, from, next) {
      document.title = "EventPlan - " + (to.meta.title || "Teks Default");
      next();
    },
    beforeRouteUpdate(to, from, next) {
      document.title = "EventPlan - " + (to.meta.title || "Teks Default");
      next();
    },
};
</script>

<style scoped>
.active {
  background-color: #edf2f7;
}

.active svg {
  color: #4f46e5;
}
</style>
