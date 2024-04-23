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
        class="mt-2 px-4 py-2 placeholder:text-xs border-none focus:border-none focus:ring-0 border-b border-blue-500"
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
        class="absolute mt-1 bg-white rounded-md shadow-xl text-left w-20"
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
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-crosshair text-blue-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                />
              </svg>
            </span>
            <p>Use Location</p>
          </li>
          <li
            @click="filterByTypeLocation('online')"
            class="py-2 px-4 cursor-pointer hover:bg-gray-100"
          >
            <span class="mr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-collection-play text-blue-600"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"
                />
                <path
                  d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"
                />
              </svg>
              <p>Online</p>
            </span>
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
  <h2
    v-if="searchQuery === 'online' || selectedCategory === 3"
    class="text-2xl font-bold text-gray-800 dark:text-white"
  >
    Events Online
  </h2>
  <h2
    v-else-if="currentLocation.length === 0"
    class="text-2xl font-bold text-gray-800 dark:text-white"
  >
    Events in {{ currentLocation }}
  </h2>
  <h2
    v-else-if="selectedCategory === 2"
    class="text-2xl font-bold text-gray-800 dark:text-white"
  >
    Events Popular
  </h2>
  <h2 v-else class="text-2xl font-bold text-gray-800 dark:text-white">
    <!-- Tambahkan penanganan untuk menampilkan judul "Related" -->
    <span v-if="displayedEvents.length === 0">Related:</span> Events in {{ searchQuery }}
  </h2>
</div>
      <div
        v-if="this.$store.getters['eventMain/isLoading']"
        class="text-center"
      >
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
        <!-- card event -->
        <div
          v-for="(event, index) in displayedEvents"
          :key="event.uuid"
          class="w-full bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg hover:shadow-2xl"
        >
          <div class="relative group">
            <img
              class="w-full h-40 object-cover rounded-lg cursor-pointer"
              :src="event.url"
              alt="Event Image"
              @click="toDetailEvent(event)"
            />
            <p
              class="absolute top-0 bg-blue-300 group-hover:text-gray-800 text-gray-800 font-semibold py-1 px-2 text-xs rounded-br-lg rounded-tl-lg"
            >
              {{ event?.price === 0 ? "Free" : "Paid" }}
            </p>
           <div class="block md:block sm:block lg:block xl:hidden group-hover:block">
              <span
                v-if="isAuthenticated"
                @click="event.isFavorite ? removeEventFav(event) : addEventToFavorites(event)"
                class="flex absolute cursor-pointer z-15 hover:border hover:transition-all hover:scale-125 hover:border-gray-400 bottom-0 right-0 mb-2 mr-2 bg-gray-100 rounded-full w-8 h-8 font-semibold text-gray-700 items-center justify-center"
              >
            <!-- icon fill -->
            <svg
              v-if="event.isFavorite"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
            <!-- icon no fill -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
              />
            </svg>
          </span>
            </div>
          </div>
          <p class="text-left mt-4 text-gray-800 text-lg font-semibold">
            {{
              event?.title?.length > 25
                ? event?.title.substring(0, 25) + "..."
                : event?.title
            }}
          </p>
          <div class="flex space-x-1 items-center pb-1">
            <!-- Format tanggal dan waktu -->
            <p class="text-sm sm:text-xs font-semibold text-gray-800">
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
                    (parseInt(event.start_time.split(":")[0]) >= 12 ? "" : "")
                  : "Invalid Time")
              }}
            </p>
          </div>
          <div class="my-1">
            <div
              v-if="event.type_location === 'location'"
              class="flex space-x-1 items-center text-sm text-gray-700"
            >
              <p class="font-semibold">
                {{
                  event.event_locations[0]?.address.length > 15
                    ? event.event_locations[0]?.address.substring(0, 15) + "..."
                    : event.event_locations[0]?.address
                }}
              </p>
            </div>
            <div
              v-else-if="event.type_location === 'Online'"
              class="flex space-x-1 items-center pb-1 text-gray-700"
            >
              <p class="font-semibold">{{ event.type_location }}</p>
            </div>
            <div v-else class="flex space-x-1 items-center text-gray-700">
              <p class="font-semibold">{{ event.type_location }}</p>
            </div>
            <div class="flex items-center text-gray-700 text-sm">
              <p class="font-semibold flex items-center">
                {{ event.organizer }}
              </p>
            </div>
            <span
              class="ml-auto text-xs font-semibold text-gray-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                />
              </svg>
              <span class="ml-1">{{ event?.followersCount }} Followers</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- end event cards -->
    <div v-if="isAuthenticated">
      <div v-if="$store.getters['profile/isLoading']">
        <div class="container mx-auto mt-4">
          <hr class="border-t border-gray-100" />
        </div>
        <div class="container mx-auto mt-10 overflow-x-auto whitespace-nowrap">
          <div class="flex justify-center items-center mb-8">
            <div class="bg-gray-300 h-8 w-40 rounded animate-pulse"></div>
          </div>
          <div
            class="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-5 px-10 p-10"
          >
            <!-- Organizer Card Skeleton -->
            <div
              v-for="index in 8"
              :key="index"
              class="w-56 h-60 px-5 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow"
            >
              <div class="flex flex-col items-center pb-6">
                <div
                  class="bg-gray-300 h-24 w-24 rounded-full mb-3 animate-pulse"
                ></div>
                <div
                  class="bg-gray-300 h-6 w-36 rounded mb-1 animate-pulse"
                ></div>
                <div class="bg-gray-300 h-4 w-24 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mx-auto mt-4">
          <hr class="border-t border-gray-100" />
        </div>
      </div>

      <!-- Organizer Section Data -->
      <div v-else>
        <div class="container mx-auto mt-4">
          <hr class="border-t border-gray-100" />
        </div>
        <div class="container mx-auto mt-10 overflow-x-auto whitespace-nowrap">
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
               @click="showFeatureNotification('organizer')"
              class="cursor-pointer w-56 h-60 px-5 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow"
            >
              <div class="flex flex-col items-center pb-6">
                <!-- Replace this with your image tag using organizer.image property -->
                <img
                  :src="organizer?.profile?.url"
                  alt="Organizer image"
                  class="w-24 h-24 mb-3 rounded-full shadow-lg"
                />
                <h5
                  class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                >
                  {{ organizer?.profile?.organize }}
                </h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatNumber(organizer?.followersCount) }} followers
                </span>
                <div class="flex mt-4 md:mt-6">
                  <button
                  
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mx-auto mt-4">
          <hr class="border-t border-gray-100" />
        </div>
      </div>
    </div>
    <div v-else class="container mx-auto mt-4">
      <hr class="border-t border-gray-100" />
    </div>
    <!-- Bagian "More Events" -->
    <div class="mb-16 mt-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white underline">
          More Events
        </h2>
      </div>
      <div
        class="md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0"
      >
        <!-- card event untuk acara tambahan -->
        <div
          v-for="(event, index) in moreEvents"
          :key="event.uuid"
          class="w-full bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg hover:shadow-2xl"
        >
          <div class="relative group">
            <img
              class="w-full h-40 object-cover rounded-lg cursor-pointer"
              :src="event.url"
              alt="Event Image"
              @click="toDetailEvent(event)"
            />
            <p
              class="absolute top-0 bg-blue-300 group-hover:text-gray-800 text-gray-800 font-semibold py-1 px-2 text-xs rounded-br-lg rounded-tl-lg"
            >
              {{ event?.price === 0 ? "Free" : "Paid" }}
            </p>
           <div class="block md:block sm:block lg:block xl:hidden group-hover:block">
              <span
                v-if="isAuthenticated"
                @click="event.isFavorite ? removeEventFav(event) : addEventToFavorites(event)"
                class="flex absolute cursor-pointer z-15 hover:border hover:transition-all hover:scale-125 hover:border-gray-400 bottom-0 right-0 mb-2 mr-2 bg-gray-100 rounded-full w-8 h-8 font-semibold text-gray-700 items-center justify-center"
              >
            <!-- icon fill -->
            <svg
              v-if="event.isFavorite"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
            <!-- icon no fill -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
              />
            </svg>
          </span>
            </div>
          </div>
          <p class="text-left mt-4 text-gray-800 text-lg font-semibold">
            {{
              event?.title?.length > 25
                ? event?.title.substring(0, 25) + "..."
                : event?.title
            }}
          </p>
          <div class="flex space-x-1 items-center pb-1">
            <!-- Format tanggal dan waktu -->
            <p class="text-sm sm:text-xs font-semibold text-gray-800">
              {{
                new Date(event.start_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
              •
              {{
                " " +
                (event.start_time
                  ? new Date("1970-01-01T" + event.start_time)
                      .toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })
                      .replace(/^(\d{1}):/, "0$1:") +
                    (parseInt(event.start_time.split(":")[0]) >= 12 ? "" : "")
                  : "Invalid Time")
              }}
            </p>
          </div>
          <div class="my-1">
            <div
              v-if="event.type_location === 'location'"
              class="flex space-x-1 items-center text-sm text-gray-700"
            >
              <p class="font-semibold">
                {{
                  event.event_locations[0]?.address.length > 15
                    ? event.event_locations[0]?.address.substring(0, 15) + "..."
                    : event.event_locations[0]?.address
                }}
              </p>
            </div>
            <div
              v-else-if="event.type_location === 'Online'"
              class="flex space-x-1 items-center pb-1 text-gray-700"
            >
              <p class="font-semibold">{{ event.type_location }}</p>
            </div>
            <div v-else class="flex space-x-1 items-center text-gray-700">
              <p class="font-semibold">{{ event.type_location }}</p>
            </div>
            <div class="flex items-center text-gray-700 text-sm">
              <p class="font-semibold flex items-center">
                {{ event.organizer }}
              </p>
            </div>
            <span
              class="ml-auto text-xs font-semibold text-gray-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                />
              </svg>
              <span class="ml-1">{{ event?.followersCount }} Followers</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage, ElNotification } from "element-plus";
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
      recentSearches: [],
      moreEvents: [],
      organizers: [],
      isFavorite: false,
      categories: [
        { id: 1, name: "All" },
        { id: 2, name: "Popular" },
        { id: 3, name: "Online" },
      ],
    };
  },
  computed: {
    ...mapGetters("eventMain", ["getEventMain", "getEventFavorite"]),
    ...mapGetters("auth", ["isAuthenticated", "getMe"]),
    events() {
      return this.getEventMain;
    },
    eventFav() {
       // Periksa apakah pengguna terautentikasi
      if (!this.isAuthenticated) {
        // Jika tidak terautentikasi, kembalikan array kosong
        return [];
      }

      // Jika terautentikasi, kembalikan daftar event favorit
      return this.$store.getters["eventMain/getEventFavorite"];
    },
    me() {
    // Periksa apakah pengguna terautentikasi
    if (!this.isAuthenticated) {
      // Jika tidak terautentikasi, kembalikan null
      return null;
    }

    // Jika terautentikasi, kembalikan data pengguna
    return this.$store.getters["auth/getMe"];
  },
    filteredResults() {
      return this.searchResults.filter((result) => {
        return result.type === "city" || result.type === "administrative";
      });
    },
  },
  methods: {
    ...mapActions("eventMain", ["fetchEventMain", "fetchEventsFavorite", "addEventsFavorite", "removeEventsFavorite"]),
    ...mapActions("auth", ["fetchMe"]),
   showFeatureNotification(text) {
      this.$store.dispatch('settings/showFeatureNotification', text);
    },
    toDetailEvent(event) {
      const uuid = event.uuid;
      const eventName = event.title.replace(/\s+/g, "-").toLowerCase();
      this.$router.push({
        path: `/event/${eventName}/${uuid}`,
      });
      window.scrollTo(0, 0);
    },
    async fetchOrganizers() {
  try {
    await this.$store.dispatch("profile/fetchAllProfileUsers");
    this.organizers = this.$store.getters["profile/profileData"];

    // Filter out organizers where userId is the same as the currently logged-in user's ID
    const meId = this.me?.profile?.userId;
    this.organizers = this.organizers.filter(
      (organizer) => organizer?.profile?.userId !== meId &&
                     organizer?.profile?.organize && // Filter for presence of organize property
                     organizer?.profile?.url        // Filter for presence of url property
    );

    this.fetchMe();
  } catch (error) {
    console.error("Failed to fetch organizers:", error);
  }
},
    searchEvents() {
      this.showResults = this.searchQuery.length > 0;
      if (this.searchQuery.trim() !== "") {
        this.searchLocations(); // Panggil metode searchLocations untuk mendapatkan hasil pencarian lokasi
      } else {
        this.searchResults = []; // Kosongkan hasil pencarian jika input pengguna kosong
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
    formatNumber(number) {
      // Lakukan konversi format angka
      if (number < 1000) {
        return number;
      } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + "k";
      } else if (number < 1000000000) {
        return (number / 1000000).toFixed(1) + "M";
      } else {
        return (number / 1000000000).toFixed(1) + "B";
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

  let filteredEvents = this.events;

  // Filter berdasarkan kota (lokasi)
  if (
    this.selectedCategory === 1 &&
    this.searchQuery &&
    this.searchQuery.toLowerCase() !== "online"
  ) {
    filteredEvents = filteredEvents.filter((event) => {
      return event.event_locations[0]?.city
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
    });
  }

  // Sortir berdasarkan jumlah tampilan untuk kategori "For you" (id: 2)
  if (this.selectedCategory === 2) {
    filteredEvents.sort((a, b) => b.views - a.views);
  }

  // Filter events berdasarkan type_location: "online" untuk kategori "Online" (id: 3)
  if (this.selectedCategory === 3) {
    filteredEvents = filteredEvents.filter(
      (event) => event.type_location.toLowerCase() === "online"
    );
  }

  // Ambil ID dari semua event favorit yang dimiliki pengguna
  const favoriteEventIds = this.eventFav.map((favEvent) => favEvent.eventId);

  // Perbarui properti isFavorite untuk setiap acara berdasarkan apakah ID event ada di dalam daftar favorit
  filteredEvents.forEach((event) => {
    event.isFavorite = favoriteEventIds.includes(event.id);
  });

  // Jika tidak ada hasil setelah filter, tampilkan acara acak
  if (filteredEvents.length === 0) {
    // Ambil acara acak dari semua acara yang tersedia
    const randomEvents = this.events.slice().sort(() => Math.random() - 0.5);
    // Tampilkan enam acara pertama yang diacak
    this.displayedEvents = randomEvents.slice(0, 6);
    return;
  }

  let allEvents = filteredEvents.slice(); // Salin semua event yang sudah difilter

  // Tampilkan enam event pertama
  this.displayedEvents = allEvents.slice(0, 6);

  this.loadMoreEvents();
},

    filterByLocation() {
      // Filter berdasarkan lokasi
      this.searchQuery = this.currentLocation;
      this.showFilterOptions = false;
      this.selectedCategory = 1;
      this.updateDisplayedEvents();
    },
    filterByTypeLocation(typeLocation) {
      // Lakukan filter berdasarkan type_location
      this.searchQuery = typeLocation;
      this.selectedCategory = 3;
      this.showFilterOptions = false;
    },


async loadMoreEvents() {
  try {
    const additionalEvents = await this.$store.dispatch("eventMain/fetchEventMain", {
      offset: this.displayedEvents.length, // Menggunakan offset untuk memuat event tambahan setelah event yang sudah ditampilkan
      limit: 6, // Anda dapat mengganti 6 dengan jumlah acara tambahan yang ingin Anda tampilkan
    });

    // Filter hanya event yang belum ditampilkan di displayedEvents
    const uniqueEvents = this.filterUniqueMoreEvents(additionalEvents);

    // Ambil ID dari semua event favorit yang dimiliki pengguna
    const favoriteEventIds = this.eventFav.map((favEvent) => favEvent.eventId);

    // Perbarui properti isFavorite untuk setiap acara berdasarkan apakah ID event ada di dalam daftar favorit
    uniqueEvents.forEach((event) => {
      event.isFavorite = favoriteEventIds.includes(event.id);
    });

    this.moreEvents = uniqueEvents;
  } catch (error) {
    console.error("Failed to load more events:", error);
  }
},

filterUniqueMoreEvents(events) {
  // Filter events yang belum ditampilkan di displayedEvents
  const uniqueEvents = events.filter((event) => {
    return !this.displayedEvents.some(
      (displayedEvent) => displayedEvent.uuid === event.uuid
    );
  });
  return uniqueEvents;
},

 async addEventToFavorites(event) {
    // Periksa apakah pengguna terautentikasi
    if (!this.isAuthenticated) {
      // Jika tidak terautentikasi, arahkan pengguna ke halaman login
      this.$router.push("/auth/login");
      // Tampilkan pesan untuk memberi tahu pengguna bahwa mereka harus login terlebih dahulu
      ElMessage({
        type: "warning",
        message: "You need to log in to add events to favorites.",
      });
      return;
    }

    try {
      // Panggil aksi untuk menambahkan event ke daftar favorit
      await this.addEventsFavorite(event.id);
      event.isFavorite = true;
      // Panggil fungsi addEventFav dengan menggunakan this.addEventFav
    } catch (error) {
      console.error("Failed to add event to favorites:", error);
      // Tampilkan pesan kesalahan jika terjadi kesalahan saat menambahkan event ke daftar favorit
      ElMessage({
        type: "error",
        message: "Failed to add event to favorites. Please try again later.",
      });
    }
  },

async removeEventFav(event) {
  try {
    await this.$store.dispatch("eventMain/removeEventsFavorite", event.id);
    // Set isFavorite menjadi false pada objek event yang sesuai
    event.isFavorite = false;
  } catch (error) {
    console.log(error.message);
  }
},

isEventFavorite(event) {
  // Periksa apakah event ada di dalam eventFav
  return this.eventFav.some((favEvent) => favEvent.eventId === event.id);
},
  },
  watch: {
    searchQuery(newValue, oldValue) {
      this.updateDisplayedEvents();
    },
  },
mounted() {
  this.searchQuery = this.currentLocation;
  this.menuCategory();

  // Fetch event data
  this.fetchEventMain()
    .then(() => {
      this.$store.getters["eventMain/isLoading"];
    })
    .catch((error) => {
      console.error("Failed to fetch event data:", error);
      // Tampilkan pesan kesalahan kepada pengguna
      ElMessage.error("Failed to fetch event data. Please try again later.");
    });

  // Fetch current location
  this.fetchCurrentLocation()
    .then(() => {
      // Update displayed events after fetching current location
      this.updateDisplayedEvents();
    })
    .catch((error) => {
      console.error("Failed to fetch current location:", error);
      // Tampilkan pesan kesalahan kepada pengguna
      ElMessage.error("Failed to fetch current location. Please try again later.");
    });

  // Fetch organizers
  this.fetchOrganizers()
    .catch((error) => {
      console.error("Failed to fetch organizers:", error);
      // Tampilkan pesan kesalahan kepada pengguna
      ElMessage.error("Failed to fetch organizers. Please try again later.");
    });

  // Fetch favorite events
  this.fetchEventsFavorite()
    .catch((error) => {
      console.error("Failed to fetch favorite events:", error);
      // Tampilkan pesan kesalahan kepada pengguna
      ElMessage.error("Failed to fetch favorite events. Please try again later.");
    });

  // Load more events
  this.loadMoreEvents();
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
