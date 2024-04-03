<template>
  <!-- Container for demo purpose -->
  <div class="my-16 mx-auto md:px-6">
    <!-- Section: Design Block -->
    <section class="background-radial-gradient mb-8 text-center lg:text-left">
      <div
        class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://mdbcdn.b-cdn.net/img/new/standard/nature/071.jpg')] h-[400px]"
      >
        <div
          class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed"
        >
          <div class="flex h-full items-center justify-center">
            <div
              class="max-w-[800px] px-6 py-6 text-center text-white md:py-0 md:px-12"
            >
              <h2
                class="mb-12 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight"
              >
                Discover Unforgettable <br /><span>Event Experiences</span>
              </h2>
              <p class="text-base md:text-lg lg:text-xl">
                Dive into the world of event planning with us and discover
                unforgettable experiences tailored to your dreams.
              </p>

              <button
                class="button-find-event group relative mt-8 px-4 py-2 min-h-[40px] md:min-h-[50px] w-[50%] md:w-40 lg:w-[25%] xl:w-[20%] overflow-hidden border border-white text-white-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-white before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-white after:duration-500 hover:text-white hover:before:h-full hover:after:h-full"
              >
                <span
                  class="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-white before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-white after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"
                ></span>
                <span
                  class="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center text-sm md:text-base lg:text-lg xl:text-sm group-hover:text-gray-700 hover:font-semibold"
                  >Find Next</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->

    <!-- Section: Category Buttons -->
    <section
      class="container flex md:justify-center items-center section-category-buttons overflow-x-auto whitespace-nowrap gap-5 px-10 2xl:mx-16"
    >
      <!-- Category Button 1 -->
      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            class="w-46 h-46 text-gray-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Business</span>
      </div>
      <!-- Category Button 2 -->
      <div class="category-button">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 flex flex-col items-center mx-auto"
        >
          <svg
            class="w-46 h-46 text-gray-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Entertainment</span>
      </div>

      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            class="bi bi-backpack2 text-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.04 7.43a4 4 0 0 1 7.92 0 .5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14"
            />
            <path
              fill-rule="evenodd"
              d="M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z"
            />
            <path
              d="M6 2.341V2a2 2 0 1 1 4 0v.341c2.33.824 4 3.047 4 5.659v1.191l1.17.585a1.5 1.5 0 0 1 .83 1.342V13.5a1.5 1.5 0 0 1-1.5 1.5h-1c-.456.607-1.182 1-2 1h-7a2.5 2.5 0 0 1-2-1h-1A1.5 1.5 0 0 1 0 13.5v-2.382a1.5 1.5 0 0 1 .83-1.342L2 9.191V8a6 6 0 0 1 4-5.659M7 2v.083a6 6 0 0 1 2 0V2a1 1 0 0 0-2 0M3 13.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V8A5 5 0 0 0 3 8zm-1-3.19-.724.362a.5.5 0 0 0-.276.447V13.5a.5.5 0 0 0 .5.5H2zm12 0V14h.5a.5.5 0 0 0 .5-.5v-2.382a.5.5 0 0 0-.276-.447L14 10.309Z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Educational</span>
      </div>
      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            class="bi bi-boombox text-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
            />
            <path
              d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Music</span>
      </div>
      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            class="w-46 h-46 text-gray-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Community</span>
      </div>
      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            class="bi bi-boombox text-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
            />
            <path
              d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Sports</span>
      </div>
      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            class="bi bi-boombox text-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
            />
            <path
              d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Arts and Culture</span>
      </div>
      <div class="category-button flex flex-col items-center">
        <button
          class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            class="bi bi-boombox text-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
            />
            <path
              d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
            />
            <path
              d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"
            />
          </svg>
        </button>
        <span class="text-xs text-gray-600">Health and Fitness</span>
      </div>
    </section>
    <!-- Section: Category Buttons -->
  </div>
  <!-- Container for demo purpose -->
</template>

<script>
export default {};
</script>

<style scoped>
/* Tambahkan gaya CSS sesuai kebutuhan Anda */
.section-category-buttons {
  overflow-x: auto; /* Membuat overflow horizontal dapat di-scroll */
  flex-wrap: nowrap; /* Tetapkan flex-wrap ke no-wrap */
}
.category-button button {
  transition: border-color 0.3s ease-in-out;
}

.category-button button:hover svg {
  border-color: rgb(61, 139, 229);
  fill: rgb(61, 139, 229);
}
.category-button button:hover span {
  color: rgb(61, 139, 229); /* Mengganti warna teks saat tombol dihover */
  transition: all 0.3s ease-in-out;
}

/* Gaya CSS untuk tombol Find Event Now */
.button-find-event {
  transition: border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.button-find-event:hover {
  transform: scale(1.1); /* Scaling tombol saat dihover */
}
</style>
