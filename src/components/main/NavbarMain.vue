<template>  
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
      <!-- Brand Logo -->
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse text-lg md:text-2xl font-extrabold whitespace-nowrap text-blue-500">
        <span class="self-center">Eventplan</span>
      </a>  
      <!-- Input search -->
      <!-- Search Input (Desktop) -->
      <div class="hidden md:flex md:relative md:flex-shrink-0">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none md:flex">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search icon</span>
        </div>
        <button type="button" @click="toggleModal" id="search-navbar" class="flex items-center w-full md:w-96 h-10 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
          <span class="text-left flex-grow">search event...</span>
        </button>
        <!-- Modal -->
        <div v-if="isModalOpen" class="main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
          <div class="modal-container bg-white w-full h-full mx-4 md:mx-auto rounded shadow-lg overflow-y-auto">
            <div class="modal-content py-4 text-left px-6 h-full flex flex-col">
              <!-- Title and Close button -->
              <div class="flex justify-between items-center pb-3">
                <p class="text-2xl font-bold">Search Event</p>
                <div class="modal-close cursor-pointer z-50 " @click="toggleModal">
                  <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>
              <!-- Body with search form -->
              <form>
                <div class="my-5 flex-grow">
                  <label for="searchInput" class="sr-only">Search Event</label>
                  <input type="text" id="searchInput" placeholder="Search event..." class="w-full h-10 p-2 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500">
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- End Modal -->
      </div>
      <!-- Input search -->
      <div class="flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
        <div class="flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
          <div class="md:hidden block right-0">
            <button @click="toggleModal" class="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
            <!-- Mobile Search Modal -->
            <transition name="fade">
              <div v-if="isModalOpen" class="main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
                <div class="modal-container bg-white w-full h-full mx-4 md:mx-auto rounded shadow-lg overflow-y-auto">
                  <div class="modal-content py-4 text-left px-6 h-full flex flex-col">
                    <!-- Title and Close button -->
                    <div class="flex justify-between items-center pb-3">
                      <p class="text-2xl font-bold">Search Event</p>
                      <div class="modal-close cursor-pointer z-50 " @click="toggleModal">
                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                      </div>
                    </div>
                    <!-- Body with search form -->
                    <form>
                      <div class="my-5 flex-grow">
                        <label for="searchInput" class="sr-only">Search Event</label>
                        <input type="text" id="searchInput" placeholder="Search event..." class="w-full h-10 p-2 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500">
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <!-- Component 2 -->
          <div class="block">
            <div class="inline relative">
              <button type="button" class="inline-flex items-center relative px-2 md:border rounded-full md:hover:shadow-lg" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" >
                <div class="pl-1">
                  <span class="text-sm text-gray-800 truncate dark:text-gray-400 hidden w-full md:flex md:w-auto md:order-1">name@flowbite.com</span>
                </div>
                <span class="sr-only">Open user menu</span>
                <div class="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-3">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style="display: block; height: 100%; width: 100%; fill: rgb(97, 97, 97);"
                  >
                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      
      <!-- Dropdown menu -->
      <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div class="px-4 py-3">
          <span class="text-sm text-gray-800 truncate dark:text-gray-400 md:hidden  md:w-auto md:order-1">name@flowbite.com</span>
          <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
        </div>
        <ul class="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
        <div class="mr-4 items-center block xl:hidden">
          <a class="inline-block py-2 px-3" href="#">
           Create an Event
          </a>
          <p class="py-2 px-3">Favorite</p>
        </div>
        
      </div>
    </div>
    <div class="items-center justify-between w-full md:flex md:w-auto md:order-1">
      <div class="flex mr-4 items-center max-lg:hidden">
        <a class="inline-block py-2 px-2 my-auto hover:bg-gray-200 rounded-full" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg mx-auto" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg>
          <div class="flex items-center relative cursor-pointer whitespace-nowrap text-sm">Create a event</div>
        </a>
        <div class="block relative">
          <button type="button" class="inline-block py-3 px-2 ml-5 hover:bg-gray-200 rounded-full relative ">
            <div class="flex items-center h-5">
              <div class="_xpkakx">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart mx-auto" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
                <p class="text-sm font-medium">favorite</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
    </div>
  </nav>
</template>
<style scoped>
  @media (max-width: 800px) {
    /* Add responsive styles for tablet/iPad here */
    .hidden-md {
      display: none;
    }
  }
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated.faster {
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 2;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 3;
    }

    to {
      opacity: 0;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      isModalOpen: false,
      searchQuery: '',
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    performSearch() {
      // Handle search logic here
      console.log('Performing search:', this.searchQuery);

      // Close modal after search
      this.isModalOpen = false;
    },
  },
};
</script>