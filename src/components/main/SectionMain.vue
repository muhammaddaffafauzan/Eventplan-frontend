<template>
  <div class="section-main text-center overflow-x-hidden">
    <div class="relative inline-block mb-12">
      <h1 class="text-xl md:text-lg font-bold mr-2 inline">Browsing events in</h1>
      <button type="button" id="dropdownDefaultButton" @click="toggleSearchResults">
        <svg class="w-10 h-10 text-blue-500 dark:text-white cursor-pointer inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
        </svg>
      </button>
      <input
        v-model="searchQuery"
        @input="searchEvents"
        class="mt-2 border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 ml-2 rounded-full placeholder:text-xs"
        type="text"
        placeholder="Search events..."
      />
      <div
      id="dropdown"
      v-if="showResults"
      class="absolute z-10 bg-white rounded-md shadow-xl text-left"
      :style="{ width: dropdownWidth, transform: getTranslateX(), left: '50%' }"
    >
        <ul class="py-2" aria-labelledby="dropdownDefaultButton">
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

    <!-- Category Menu Section -->
    <div class="mb-1">
      <div class="container mx-20 flex space-x-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="{ 'border-b-2 border-blue-500': selectedCategory === category.id }"
          class="text-gray-800 dark:text-white hover:text-blue-500 transition duration-300"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

  <!-- Event Cards -->
  <div class="cards-event min-h-screen overflow-x-hidden mt-8 container mx-auto">
    <div class="text-left mb-8 mx-7">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Related to you to visit</h2>
    </div>
  <div class="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
    <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
      <div class="relative">
        <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
        <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">FREE</p>
      </div>
      <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
      <div class="my-4">
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>1:34:23 Minutes</p>
        </div>
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <p>3 Parts</p>
        </div>
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </span>
          <p>Vanilla JS</p>
        </div>
        <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
      </div>
    </div>
    <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 class="mb-3 text-xl font-bold text-indigo-600">Intermediate</h3>
      <div class="relative">
        <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
        <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">$12</p>
        <p class="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">%20 Discount</p>
      </div>
      <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Write a Gatsby plugin using Typescript</h1>
      <div class="my-4">
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>1:34:23 Minutes</p>
        </div>
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <p>3 Parts</p>
        </div>
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </span>
          <p>TypeScript</p>
        </div>
        <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Start Watching Now</button>
      </div>
    </div>
    <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
      <div class="relative">
        <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
        <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">$50</p>
      </div>
      <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Advanced React Native for Sustainability</h1>
      <div class="my-4">
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>1:34:23 Minutes</p>
        </div>
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <p>3 Parts</p>
        </div>
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </span>
          <p>Vanilla JS</p>
        </div>
        <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
      </div>
    </div>
  </div>
  
</div>  
<!-- See More Button -->
<button class="mt-8 text-xl  before:ease relative h-12 w-40 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
  <span class="relative z-10"> See More</span>
</button>
<!-- end event cards -->

<div class="container mx-auto mt-4">
  <hr class="border-t border-gray-100">
</div>

<!-- Organizer Section -->
<div class="container mx-auto mt-10 overflow-x-auto whitespace-nowrap">
  <div class="flex justify-center items-center mb-8">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-people-fill text-gray-800" viewBox="0 0 16 16">
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
    </svg>
    <h2 class="text-2xl font-bold ml-2 text-gray-800 dark:text-white">Organizers to Follow</h2>
  </div>  
  <div class="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-5 px-10 p-10">
    <!-- Organizer Cards -->
    <div v-for="organizer in organizers" :key="organizer.id" class="w-56 h-60 px-5 py-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow">
      <div class="flex flex-col items-center pb-6">
        <!-- Replace this with your image tag using organizer.image property -->
        <img :src="organizer.image" alt="Organizer image" class="w-24 h-24 mb-3 rounded-full shadow-lg" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ organizer.name }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ organizer.followers }} followers</span>
        <div class="flex mt-4 md:mt-6">
          <a href="/" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Follow</a>
        </div>
      </div>
    </div>    

  </div>
</div>
<!-- End Organizer Section -->
 
  <!-- Popular Events Section -->
  <div class="cards-event min-h-screen overflow-x-hidden">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Popular Events</h2>
    </div>
    <div class="container mx-auto md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
          <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
            <div class="relative">
              <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
              <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">FREE</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
            <div class="my-4">
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p>1:34:23 Minutes</p>
              </div>
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <p>3 Parts</p>
              </div>
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                <p>Vanilla JS</p>
              </div>
              <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
          </div>
          <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Intermediate</h3>
            <div class="relative">
              <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
              <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">$12</p>
              <p class="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">%20 Discount</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Write a Gatsby plugin using Typescript</h1>
            <div class="my-4">
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p>1:34:23 Minutes</p>
              </div>
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <p>3 Parts</p>
              </div>
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                <p>TypeScript</p>
              </div>
              <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Start Watching Now</button>
            </div>
          </div>
          <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
            <div class="relative">
              <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
              <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">$50</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Advanced React Native for Sustainability</h1>
            <div class="my-4">
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p>1:34:23 Minutes</p>
              </div>
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <p>3 Parts</p>
              </div>
              <div class="flex space-x-1 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                <p>Vanilla JS</p>
              </div>
              <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
          </div>
        </div>
 </div>  
  <!-- End Popular Events Section --> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      showResults: false,
      dropdownWidth: '100px',
      searchResults: [
        { id: 1, name: "Event 1" },
        { id: 2, name: "Event 2" },
        // Add more sample results as needed
      ],
      categories: [
        { id: 1, name: "All" },
        { id: 2, name: "Category 1" },
        { id: 3, name: "Category 2" },
        { id: 4, name: "Category 3" },
        { id: 5, name: "Category 4" },
        // Add more categories as needed
      ],
      organizers: [
        { id: 1, name: "Bonnie Green", followers: 15000, image: "path_to_image" },
        { id: 2, name: "Bonnie Green", followers: 15000, image: "path_to_image" },
        { id: 3, name: "Bonnie Green", followers: 15000, image: "path_to_image" },
        { id: 4, name: "Bonnie Green", followers: 15000, image: "path_to_image" },
        { id: 5, name: "Bonnie Green", followers: 15000, image: "path_to_image" },
        // Add more organizer data as needed
      ],
      selectedCategory: null,
    };
  },
  computed: {
    dropdownWidth() {
      const inputElement = this.$el.querySelector("input");
      return inputElement ? `${inputElement.offsetWidth}px` : "100%";
    },
    dropdownLeft() {
      const inputElement = this.$el.querySelector("input");
      return inputElement ? `${inputElement.getBoundingClientRect().left}px` : "0";
    },
    dropdownTop() {
      const inputElement = this.$el.querySelector("input");
      return inputElement ? `${inputElement.getBoundingClientRect().bottom + this.dropdownTopOffset}px` : "0";
    },
  },
  methods: {
    searchEvents() {
      this.showResults = this.searchQuery.length > 0;
      this.searchResults = this.searchResults.filter((result) =>
        result.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    toggleSearchResults() {
      this.showResults = !this.showResults;
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      // You can add additional logic here when a category is selected
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
    getTranslateX() {
      const screenWidth = window.innerWidth;

      // Adjust these values based on your design needs
      if (screenWidth < 640) {
        return 'translateX(-45%)'; // Small screens
      } else if (screenWidth < 1024) {
        return 'translateX(2%)'; // Medium screens
      } else {
        return 'translateX(3%)'; // Large screens
      }
    },
  },
  mounted() {
    this.menuCategory();
  },
};
</script>
<style scoped>
@import './SectionMain.css';
#dropdown {
  transition: top 0.3s; /* Menambahkan transisi agar perubahan posisi terlihat lebih mulus */
}
</style>