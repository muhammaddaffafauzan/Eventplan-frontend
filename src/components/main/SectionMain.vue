<template>
  <div class="section-main text-center overflow-x-hidden">
    <!-- browsing event in location -->
    <div class="relative inline-block mb-12">
      <h1 class="text-xl md:text-lg font-bold mr-2 inline">
        Browsing events in
      </h1>
      <button
        type="button"
        id="dropdownDefaultButton"
        @click="toggleFilterOptions"
      >
        <svg
          class="w-10 h-10 text-blue-500 dark:text-white cursor-pointer inline"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>
      <input
        v-model="searchQuery"
        @input="searchLocations"
        class="mt-2 px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 ml-2 rounded-full placeholder:text-xs border-none border-b-2 border-blue-500"
        type="text"
        :placeholder="
          currentLocation
            ? `Search events in ${currentLocation}`
            : 'Search locations...'
        "
      />
      <!-- dropdown results -->
      <div
        id="dropdown"
        v-if="showResults"
        class="absolute z-10 bg-white rounded-md shadow-xl text-left"
        :style="{
          width: dropdownWidth,
          transform: getTranslateX(),
          left: '50%',
        }"
      >
        <ul>
          <li
            v-for="result in filteredResults"
            :key="result.id"
            @click="selectLocation(result)"
            class="py-2 px-4 cursor-pointer hover:bg-gray-100"
          >
            {{ result.name }}
          </li>
          <!-- Tampilkan pesan jika tidak ada hasil pencarian -->
          <li v-if="filteredResults.length === 0" class="py-2 px-4">
            No results found
          </li>
        </ul>
      </div>

      <!-- Dropdown baru untuk filter berdasarkan lokasi atau type_location -->
      <div
        v-show="showFilterOptions"
        class="absolute mt-1 bg-white rounded-md shadow-xl text-left w-56"
        :style="{
          width: dropdownWidth,
          transform: getTranslateX(),
          left: '40%',
        }"
      >
        <ul>
          <li
            @click="filterByLocation"
            class="py-2 px-4 cursor-pointer hover:bg-gray-100"
          >
            <span>Use Location</span>
          </li>
          <li
            @click="filterByTypeLocation('Online')"
            class="py-2 px-4 cursor-pointer hover:bg-gray-100"
          >
            Online
          </li>
        </ul>
      </div>
    </div>

    <!-- end browsing event in location -->
    <!-- Category Menu Section -->
    <div class="mb-1">
      <div class="container mx-20 flex space-x-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="{
            'border-b-2 border-blue-500': selectedCategory === category.id,
          }"
          class="text-gray-800 dark:text-white hover:text-blue-500 transition duration-300"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <!-- Event Cards -->
    <div
      class="cards-event min-h-full overflow-x-hidden mt-8 container mx-auto pb-10"
    >
      <div class="text-left mb-8 mx-7">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Events in {{ currentLocation }}
        </h2>
      </div>
      <div v-if="isLoading" class="text-center">
        <!-- Skeleton loading -->
        <div
          class="md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0"
        >
          <div
            v-for="index in 6"
            :key="index"
            class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg animate-pulse"
          >
            <div class="relative">
              <div class="w-full h-48 bg-gray-200 rounded-xl"></div>
            </div>
            <div class="mt-4">
              <div class="h-6 bg-gray-200 rounded"></div>
              <div class="h-4 mt-2 bg-gray-200 rounded"></div>
              <div class="h-4 mt-2 bg-gray-200 rounded"></div>
              <div class="h-4 mt-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="displayedEvents.length === 0" class="text-center mb-20">
        <!-- Empty state using Element Plus ElEmpty -->
        <el-empty description="No events found" class="text-center" />
      </div>
      <div
        v-else
        class="md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0"
      >
        <!-- card event 1 -->
<div
  v-for="(event, index) in displayedEvents"
  :key="event.uuid"
  class="w-full bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg"
>
          <div class="relative">
            <img
              class="w-full h-48 object-cover rounded-xl"
              :src="event.url"
              alt="Event Image"
            />
            <p
              class="absolute top-0 bg-blue-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg"
            >
              {{ event.price === 0 ? "Free" : "Paid" }}
            </p>
          </div>
          <p
            class="text-left mt-4 text-gray-800 text-2xl font-bold cursor-pointer"
          >
            {{
              event.title.length > 25
                ? event.title.substring(0, 25) + "..."
                : event.title
            }}
          </p>
          <div class="my-4">
            <div class="flex space-x-1 items-center">
              <span>
                <svg
                  class="w-6 h-6 text-blue-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
              </span>
              <!-- Format tanggal dan waktu -->
              <p>
                {{
                  new Date(event.start_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
                •
                <!-- Gunakan modulus untuk mendapatkan format waktu AM/PM -->
                {{
                  " " +
                  (event.start_time
                    ? new Date("1970-01-01T" + event.start_time)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })
                        .replace(/^(\d{1}):/, "0$1:") +
                      (parseInt(event.start_time.split(":")[0]) >= 12
                        ? " PM"
                        : " AM")
                    : "Invalid Time")
                }}
              </p>
            </div>
            <div
              v-if="event.type_location === 'location'"
              class="flex space-x-1 items-center"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-geo-alt text-blue-700"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"
                  />
                  <path
                    d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
                  />
                </svg>
              </span>
              <p>
                {{
                  event.event_locations[0]?.city.length > 15
                    ? event.event_locations[0]?.city.substring(0, 15) + "..."
                    : event.event_locations[0]?.city
                }},
                {{ event.event_locations[0]?.state }}
              </p>
            </div>
            <div
              v-else-if="event.type_location === 'Online'"
              class="flex space-x-1 items-center"
            >
              <span>
                <svg
                  class="w-6 h-6 text-green-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </span>
              <p>{{ event.type_location }}</p>
            </div>
            <div v-else class="flex space-x-1 items-center">
              <p>{{ event.type_location }}</p>
            </div>
            <div class="flex space-x-1 items-center">
              <img
                class="w-8 h-8 rounded-full"
                :src="event.user?.Profiles.url"
                alt="Profile Avatar"
              />
              <p>{{ event.organizer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- See More Button -->
    <button
      class="mt-8 text-xl before:ease relative h-12 w-40 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180"
    >
      <span class="relative z-10"> See More</span>
    </button>
    <!-- end event cards -->

    <div class="container mx-auto mt-4">
      <hr class="border-t border-gray-100" />
    </div>

    <!-- Organizer Section -->
    <div
      v-if="isAuthenticated"
      class="container mx-auto mt-10 overflow-x-auto whitespace-nowrap"
    >
      <div class="flex justify-center items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-people-fill text-gray-800"
          viewBox="0 0 16 16"
        >
          <path
            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
          />
        </svg>
        <h2 class="text-2xl font-bold ml-2 text-gray-800 dark:text-white">
          Organizers to Follow
        </h2>
      </div>
      <div
        class="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-5 px-10 p-10"
      >
        <!-- Organizer Cards -->
        <div
          v-for="organizer in organizers"
          :key="organizer.id"
          class="w-56 h-60 px-5 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow"
        >
          <div class="flex flex-col items-center pb-6">
            <!-- Replace this with your image tag using organizer.image property -->
            <img
              :src="organizer.image"
              alt="Organizer image"
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {{ organizer.name }}
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400"
              >{{ organizer.followers }} followers</span
            >
            <div class="flex mt-4 md:mt-6">
              <a
                href="/"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Follow</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Organizer Section -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [], // Menyimpan hasil pencarian lokasi
      showResults: false,
      dropdownWidth: "100px",
      defaultLocation: "", // Variable to store default location
      useDefaultLocation: false, // Variable to store if current location should be used as default
      currentLocation: "", // Variable to store current location
      userInputLocation: "",
      showFilterOptions: false,
      displayedEvents: [],
      selectedCategory: 1,
      categories: [
        { id: 1, name: "All" },
        { id: 2, name: "Popular" },
      ],
      organizers: [
        {
          id: 1,
          name: "Bonnie Green",
          followers: 15000,
          image: "path_to_image",
        },
        {
          id: 2,
          name: "Bonnie Green",
          followers: 15000,
          image: "path_to_image",
        },
        {
          id: 3,
          name: "Bonnie Green",
          followers: 15000,
          image: "path_to_image",
        },
        {
          id: 4,
          name: "Bonnie Green",
          followers: 15000,
          image: "path_to_image",
        },
        {
          id: 5,
          name: "Bonnie Green",
          followers: 15000,
          image: "path_to_image",
        },
        // Add more organizer data as needed
      ],
    };
  },
  computed: {
    ...mapGetters("eventMain", ["getEventMain", "isLoading"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    events() {
      return this.getEventMain;
    },
    filteredResults() {
      return this.searchResults.filter((result) => {
        return result.type === "city" || result.type === "administrative";
      });
    },
  },
  methods: {
    ...mapActions("eventMain", ["fetchEventMain"]),
    searchEvents() {
      this.showResults = this.searchQuery.length > 0;
      if (this.searchQuery.trim() !== "") {
        if (this.useDefaultLocation) {
          this.searchResults = [{ id: 1, name: this.defaultLocation }];
        } else {
          const filteredResults = this.searchResults.filter((result) =>
            result.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.searchResults = filteredResults;
        }
      } else {
      }
    },
    searchLocations() {
      if (this.searchQuery.trim() !== "") {
        // Lakukan pencarian lokasi berdasarkan input pengguna
        // Misalnya, dengan menggunakan API seperti OpenStreetMap Nominatim
        fetch(
          `https://nominatim.openstreetmap.org/search.php?q=${this.searchQuery}&format=json`
        )
          .then((response) => response.json())
          .then((data) => {
            // Menggunakan data hasil pencarian untuk menampilkan hasil dropdown
            this.searchResults = data.map((location) => ({
              id: location.place_id,
              name: location.display_name,
              type: location.type,
            }));
            this.showResults = true;
          })
          .catch((error) => {
            console.error("Failed to search locations:", error);
            this.searchResults = [];
            this.showResults = false;
          });
      } else {
        // Jika input pengguna kosong, kosongkan hasil pencarian dan sembunyikan dropdown
        this.searchResults = [];
        this.showResults = false;
      }
    },
    selectLocation(location) {
      // Ambil bagian kota dari nama lokasi
      const cityName = location.name.split(",")[0];
      this.searchQuery = cityName.trim(); // Set nilai input pengguna menjadi nama kota
      this.showResults = false;
      // Anda juga dapat melakukan tindakan tambahan setelah pengguna memilih lokasi, seperti memperbarui data atau melakukan pencarian berdasarkan lokasi yang dipilih
    },
    toggleSearchResults() {
      this.showResults = !this.showResults;
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.updateDisplayedEvents();
    },
    handleScroll() {
      const dropdownElement = this.$el.querySelector("#dropdown");
      if (dropdownElement) {
        const scrollDistance = window.scrollY - this.initialDropdownTop;
        this.dropdownTopOffset = Math.max(scrollDistance, 0);
      }
    },
    menuCategory() {
      const defaultCategory = "All";
      const defaultCategoryObject = this.categories.find(
        (category) => category.name === defaultCategory
      );
      if (defaultCategoryObject) {
        this.selectedCategory = defaultCategoryObject.id;
      }
    },
    toggleFilterOptions() {
      this.showFilterOptions = !this.showFilterOptions;
    },
    getTranslateX() {
      const screenWidth = window.innerWidth;

      // Adjust these values based on your design needs
      if (screenWidth < 640) {
        return "translateX(-45%)"; // Small screens
      } else if (screenWidth < 1024) {
        return "translateX(2%)"; // Medium screens
      } else {
        return "translateX(3%)"; // Large screens
      }
    },
    async fetchCurrentLocation() {
      try {
        // Request geolocation API to get current location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
        );
        const data = await response.json();

        const city =
          data.address.city ||
          data.address.county ||
          data.address.town ||
          data.address.village ||
          data.address.hamlet;

        this.currentLocation = city || "Unknown";
        this.searchQuery = this.currentLocation; // Set default location to currentLocation
      } catch (error) {
        console.error("Failed to get location:", error);
      }
    },
    async updateDisplayedEvents() {
      this.isLoading = true; // Set isLoading to true when preparing events

      let filteredEvents = this.events; // Gunakan data event dari Vuex state

      // Filter events based on search query
      filteredEvents = filteredEvents.filter((event) => {
        // Pengecekan apakah event.event_locations[0] dan propertinya ada sebelum mengakses city
        return event.event_locations[0]?.city
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      // Jika tidak ada event di lokasi tersebut, tampilkan semua event
      if (filteredEvents.length === 0) {
        filteredEvents = this.events;
      }

      // Filter events based on type_location if filter is applied
      if (this.searchQuery && this.searchQuery.toLowerCase() === "online") {
        filteredEvents = this.events.filter(
          (event) => event.type_location.toLowerCase() === "online"
        );
      }

      if (this.selectedCategory === 2) {
        // Sort events based on views in descending order
        filteredEvents.sort((a, b) => {
          return b.views - a.views;
        });
      }

      // Update displayed events with the filtered results
      this.displayedEvents = filteredEvents.slice(0, 6); // Limit to 2 rows and 3 columns

      this.isLoading = false; // Set isLoading to false after preparing events
    },
    filterByLocation() {
      // Filter berdasarkan lokasi
      this.searchQuery = this.currentLocation;
      this.showFilterOptions = false; // Sembunyikan dropdown hasil pencarian
      // Anda juga dapat menambahkan logika lain yang diperlukan setelah melakukan filter berdasarkan lokasi
    },
    filterByTypeLocation(typeLocation) {
      // Lakukan filter berdasarkan type_location
      this.searchQuery = typeLocation;
      this.showFilterOptions = false;
    },
  },
  watch: {
    searchQuery() {
      this.updateDisplayedEvents(); // Update displayed events when search query changes
    },
  },
  mounted() {
    this.searchQuery = this.currentLocation;
    this.menuCategory();

    this.isLoading = true;
    this.fetchEventMain().then(() => {
      this.isLoading = false;
    });

    this.fetchCurrentLocation();
    this.updateDisplayedEvents();
  },
};
</script>
<style scoped>
@import "./SectionMain.css";
#dropdown {
  transition: top 0.3s; /* Menambahkan transisi agar perubahan posisi terlihat lebih mulus */
}
</style>
