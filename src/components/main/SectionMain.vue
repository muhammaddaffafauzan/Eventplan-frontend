<template>
    <div class="section-main text-center">
      <div class="relative inline-block mb-12">
        <h1 class="text-2xl font-bold mr-2 inline">Browsing events in</h1>
        <!-- Icon -->
        <svg
          @click="toggleSearchResults"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-chevron-down text-blue-500 cursor-pointer inline"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
        <!-- Input for search query -->
        <input
          v-model="searchQuery"
          @input="searchEvents"
          class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 ml-2"
          type="text"
          placeholder="Search events..."
        />
  
        <!-- Dropdown for search results -->
        <div
          v-if="showResults"
          class="absolute z-15 mt-2 bg-white rounded-md shadow-xl text-left"
          :style="{ width: dropdownWidth, left: dropdownLeft }"
        >
          <ul class="py-2">
            <li
              v-for="result in searchResults"
              :key="result.id"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-clockwise mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path
                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
                />
              </svg>
              {{ result.name }}
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Event Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="event in events" :key="event.id" class="bg-white p-4 rounded-md shadow-md">
          <h2 class="text-lg font-semibold mb-2">{{ event.name }}</h2>
          <p class="text-gray-600">{{ event.description }}</p>
          <!-- Add more event details as needed -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
        showResults: false,
        searchResults: [
          { id: 1, name: "Event 1" },
          { id: 2, name: "Event 2" },
          // Add more sample results as needed
        ],
        events: [
          { id: 1, name: "Event A", description: "Description for Event A" },
          { id: 2, name: "Event B", description: "Description for Event B" },
          // Add more sample events as needed
        ],
      };
    },
    computed: {
      dropdownWidth() {
        const inputElement = this.$el.querySelector("input");
        if (inputElement) {
          const inputWidth = inputElement.offsetWidth;
          return `${inputWidth}px`;
        }
        return "100%";
      },
      dropdownLeft() {
        const inputElement = this.$el.querySelector("input");
        if (inputElement) {
          const inputRect = inputElement.getBoundingClientRect();
          return `${inputRect.left}px`;
        }
        return "0";
      },
    },
    methods: {
      searchEvents() {
        // Implement your search logic here
        // For simplicity, the example below filters results based on the searchQuery
        this.showResults = this.searchQuery.length > 0;
        this.searchResults = this.searchResults.filter((result) =>
          result.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      toggleSearchResults() {
        this.showResults = !this.showResults;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  