<template>
  <transition name="search-modal">
    <div
      v-if="showSearch"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div class="absolute top-0 right-0 p-4">
        <button
          @click="closeSearch"
          class="text-gray-200 hover:text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col items-center space-y-4">
        <!-- Search Input -->
        <div class="relative w-full">
          <input
            type="text"
            placeholder="Search event..."
            class="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 absolute right-3 bottom-0 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m-2-3a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
            />
          </svg>
        </div>

        <!-- Location Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-geo-alt-fill text-gray-400 h-12 w-12"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
          />
        </svg>

        <!-- Recent Searches -->
        <h2 class="text-xl font-semibold">Recent Searches</h2>
        <div>
          <!-- Riwayat Pencarian -->
          <!-- Tambahkan komponen riwayat pencarian di sini -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
    };
  },
  methods: {
    openSearch() {
      this.showSearch = true;
    },
    closeSearch() {
      this.showSearch = false;
    },
  },
};
</script>

<style scoped>
/* Gaya CSS untuk komponen pencarian */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.search-modal-enter,
.search-modal-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
