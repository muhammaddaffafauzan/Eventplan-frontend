<!-- NavbarMain.vue -->
<template>
  <nav
    :class="{
      absolute: isEventRoute,
      fixed: !isEventRoute,
      'bg-white': !isEventRoute,
      'dark:bg-gray-900': !isEventRoute,
      'w-full': true,
      'z-20': true,
      'top-0': true,
      'start-0': true,
      'border-b': false,
      'p-0': true,
      'border-gray-100': !isEventRoute,
      'dark:border-gray-600': !isEventRoute,
    }"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3"
    >
      <!-- Brand Logo -->
      <a
        href="/"
        class="flex items-center space-x-3 rtl:space-x-reverse text-lg md:text-2xl font-extrabold whitespace-nowrap text-blue-500"
      >
        <span class="self-center">Eventplan</span>
      </a>
      <!-- Search Input (Desktop) -->
      <div class="hidden md:flex md:relative md:flex-shrink-0">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none md:flex"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search icon</span>
        </div>
        <button
          type="button"
          @click="openSearch"
          id="search-navbar"
          class="flex items-center justify-between w-full md:w-96 h-10 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <span class="text-left flex-grow text-gray-500">Search event...</span>

          <div v-if="currentLocation" class="mr-12 flex items-center">
            <span class="mr-1 text-xl text-gray-400">|</span>
            <span class="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-geo-alt-fill text-gray-400"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                />
              </svg>
            </span>
            <div
              class="text-gray-500 text-sm md:text-base font-semibold my-auto overflow-hidden whitespace-nowrap"
              style="text-overflow: ellipsis"
            >
              {{ currentLocation }}
            </div>
          </div>
        </button>
      </div>
      <!-- Input search -->
      <div class="flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
        <div class="flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
          <div class="md:hidden block right-0">
            <!-- button open search (mobile) -->
            <button
              @click="openSearch"
              class="inline-flex items-center p-2 text-gray-500 rounded-lg"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
          <!-- Component 2 -->
          <div v-if="isAuthenticated && userMe" class="block">
            <div class="inline relative">
              <button
                type="button"
                class="inline-flex items-center relative px-2 md:border rounded-full md:hover:shadow-lg"
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
              >
                <div class="pl-1">
                  <span
                    class="text-sm text-gray-800 truncate dark:text-gray-400 hidden w-full md:flex md:w-auto md:order-1"
                    >{{ userMe?.user?.email }}</span
                  >
                </div>
                <span class="sr-only">Open user menu</span>
                <div class="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-3">
                  <el-avatar
                    class="mr-2 sm:mr-3 md:mr-4 w-10 h-10"
                    :src="profileImage"
                    :round="true"
                  ></el-avatar>
                </div>
              </button>
            </div>
          </div>
          <div v-else>
            <!-- Render login/register buttons for unauthenticated users -->
            <div
              class="flex items-center space-x-4 md:order-2 rtl:space-x-reverse"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                @click.prevent="toLogin"
              >
                Login or Register
              </a>
            </div>
          </div>
        </div>

        <!-- Dropdown menu -->
        <div
          class="z-50 hidden my-4 w-52 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdownHover"
        >
          <div class="px-4 py-3">
            <span
              class="text-sm text-gray-800 truncate dark:text-gray-400 md:hidden md:w-auto md:order-1"
              >{{ userMe?.user?.email }}</span
            >
            <span class="block text-sm text-gray-900 dark:text-white">{{
              userMe?.user?.username
            }}</span>
          </div>
          <ul class="py-2" aria-labelledby="dropdownHoverButton">
            <li>
              <a
                href="/organizer/dashboard"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Manage my event ({{ userMe?.eventCount }})</a
              >
            </li>
            <li>
              <a
                href="/settings/personal"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Settings</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="logoutUser"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
          <div v-if="isAuthenticated" class="mr-4 items-center block xl:hidden">
            <span @click="toCreateEvent" class="inline-block py-2 px-3"> Create an Event </span>
            <p class="py-2 px-3" @click="toFavoriteEvent">Favorite</p>
          </div>
        </div>
      </div>
      <!-- end input search -->
      <div
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
      >
        <div
          v-if="isAuthenticated"
          class="flex mr-4 items-center max-lg:hidden"
        >
          <button
            class="inline-block py-2 px-2 my-auto rounded-full group hover:bg-gray-200 transition duration-300"
             @click="toCreateEvent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg mx-auto text-gray-600 group-hover:text-gray-800"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
            <div
             
              class="flex items-center relative cursor-pointer whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-800 font-medium"
            >
              Create an event
            </div>
          </button>
          <div class="block relative">
            <button
              @click="toFavoriteEvent"
              type="button"
              class="inline-block py-3 px-2 ml-5 rounded-full relative group hover:bg-gray-200 transition duration-300"
            >
              <div class="flex items-center h-5">
                <div class="_xpkakx">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart mx-auto text-gray-600 group-hover:text-gray-800"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                    />
                  </svg>
                  <p
                    class="text-sm font-medium text-gray-600 group-hover:text-gray-800"
                  >
                    Favorite
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- search component -->
  <transition
    enter-active-class="animate-slideInDown"
    leave-active-class="animate-slideOutUp"
  >
    <div
      v-show="isSearchOpen"
      class="search-modal fixed inset-0 z-50 flex items-start justify-start bg-gray-100 p-4"
    >
      <!-- Kolom Pencarian -->
      <div class="flex-1 mr-4 flex flex-col items-center">
        <!-- Search Input -->
        <div class="relative w-full mb-4">
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
          class="bi bi-geo-alt-fill text-gray-400 h-12 w-12 ml-4"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
          />
        </svg>
        <!-- Current Location -->
        <div
          class="text-gray-500 text-sm md:text-base font-semibold ml-2 overflow-hidden whitespace-nowrap"
        >
          {{ currentLocation }}
        </div>

        <!-- Recent Searches -->
        <h2 class="text-xl font-semibold mt-4 mb-2">Recent Searches</h2>
        <div class="overflow-y-auto">
          <!-- Tampilkan riwayat pencarian -->
          <div v-for="(search, index) in recentSearches" :key="index">
            {{ search }}
          </div>
        </div>
      </div>
      <!-- Kolom Kartu Kosong -->
      <div class="flex-1 p-56 text-xl font-semibold">Features are still under development</div>

      <!-- Close Button -->
      <button
        @click="closeSearch"
        class="text-gray-800 hover:text-gray-600 focus:outline-none mt-4"
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
  </transition>
  <!-- end search component -->
</template>
<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      photoProfile: null,
      currentLocation: "",
      isSearchOpen: false,
      maxRecentSearches: 5,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "getMe"]),
    isEventRoute() {
      // Periksa apakah rutenya adalah /event/:eventName/:uuid
      return this.$route.path.startsWith("/event/");
    },
    profileImage() {
      const user = this.getMe;
      const profileUrl = this.getMe?.profile?.url;

      // Check if profile picture is available
      if (!profileUrl) {
        if (user && user?.profile?.firstName && user?.profile?.lastName) {
          // Construct URL using full name
          return `https://ui-avatars.com/api/?name=${user?.profile?.firstName}+${user?.profile?.lastName}&background=random&size=150`;
        } else {
          // If no full name, return placeholder image URL
          return "https://via.placeholder.com/150";
        }
      } else {
        // If profile picture available, use profile picture URL
        return profileUrl;
      }
    },
    userMe() {
      return this.getMe;
    },
  },
  methods: {
    ...mapActions("auth", ["fetchMe", "logout"]),
    toLogin() {
         window.scrollTo(0, 0)
      window.location.href = '/auth/login';
    },
    toCreateEvent() {
      window.scrollTo(0, 0)
       window.location.href = '/organizer/create-event'
    },
    toFavoriteEvent() {
      window.location.href = '/event/favorite';
         window.scrollTo(0, 0)
    },
    logoutUser() {
      this.logout();
      window.location.href = '/auth/login'
    },
    openSearch() {
      this.isSearchOpen = true;
    },
    // Method to close search
    closeSearch() {
      this.isSearchOpen = false;
    },
    handleClickOutside(event) {
      const dropdown = document.getElementById("dropdownHover");
      const button = document.getElementById("dropdownHoverButton");
      if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        this.isModalOpen = false;
      }
    },
    async fetchCurrentLocation() {
      try {
        // Lakukan permintaan ke API Nominatim untuk mendapatkan informasi lokasi berdasarkan koordinat GPS
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Dapatkan informasi lokasi menggunakan Nominatim API
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
        );
        const data = await response.json();

        // Ambil nama kota atau kabupaten dari respons API
        const city =
          data.address.city ||
          data.address.county || // Perubahan disini, menggunakan data kabupaten sebagai alternatif jika nama kota tidak tersedia
          data.address.town ||
          data.address.village ||
          data.address.hamlet;

        // Simpan nama kota atau kabupaten dalam variabel currentLocation
        this.currentLocation = city || "Unknown"; // Jika nama kota tidak tersedia, gunakan "Unknown"
      } catch (error) {
        console.error("Gagal mendapatkan lokasi:", error);
        // Tangani kesalahan jika gagal mendapatkan lokasi
      }
    },
    saveSearch(searchTerm) {
      // Cek apakah localStorage sudah terisi dengan riwayat pencarian sebelumnya
      let searches = localStorage.getItem("recentSearches");
      if (!searches) {
        searches = [];
      } else {
        searches = JSON.parse(searches);
      }

      // Tambahkan pencarian baru ke dalam array riwayat pencarian
      searches.unshift(searchTerm);

      // Batasi jumlah riwayat pencarian yang disimpan
      if (searches.length > this.maxRecentSearches) {
        searches = searches.slice(0, this.maxRecentSearches);
      }

      // Simpan array riwayat pencarian kembali ke dalam localStorage
      localStorage.setItem("recentSearches", JSON.stringify(searches));

      // Perbarui data riwayat pencarian yang ditampilkan di komponen
      this.recentSearches = searches;
    },
  },
  mounted() {
    this.fetchMe();
    const profileData = this.getMe;
    this.photoProfile = profileData?.profile?.url;
    document.addEventListener("click", this.handleClickOutside);
    this.fetchCurrentLocation();
  },
  beforeUnmount() {
    // Clean up event listener when component is unmounted
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
<style scoped>
@media (max-width: 800px) {
  /* Add responsive styles for tablet/iPad here */
  .hidden-md {
    display: none;
  }
}
@keyframes slideInDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideOutUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

.animate-slideInDown {
  animation: slideInDown 1s;
}

.animate-slideOutUp {
  animation: slideOutUp 1s;
}
</style>
