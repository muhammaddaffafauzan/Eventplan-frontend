<template>
    <!-- Container for demo purpose -->
    <div class="my-16 mx-auto md:px-6">
      <!-- Section: Design Block -->
      <section class="background-radial-gradient mb-8 text-center lg:text-left">
        <div class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://mdbcdn.b-cdn.net/img/new/standard/nature/071.jpg')] h-[400px]">
          <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
            <div class="flex h-full items-center justify-center">
              <div class="max-w-[800px] px-6 py-6 text-center text-white md:py-0 md:px-12">
                <h2 class="mb-12 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                    Are you ready <br /><span>for an adventure</span>
                </h2>
                <p class="text-base md:text-lg lg:text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia consequatur adipisci tenetur
                    repudiandae rerum quos.
                </p>
            
                <button class="button-find-event group relative mt-8 px-4 py-2 min-h-[40px] md:min-h-[50px] w-[50%] md:w-40 lg:w-[25%] xl:w-[20%] overflow-hidden border border-white text-white-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-white before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-white after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                    <span class="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-white before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-white after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                    <span class="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center text-sm md:text-base lg:text-lg xl:text-sm group-hover:text-gray-700 hover:font-semibold">Find an event now</span>
                </button>
            </div>
            
            </div>
          </div>
        </div>
      </section>
      <!-- Section: Design Block -->
  
      <!-- Section: Category Buttons -->
      <section class="container flex md:justify-center items-center section-category-buttons overflow-x-auto whitespace-nowrap gap-5 px-10 2xl:mx-16">
        <!-- Category Button 1 -->
        <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
        <!-- Category Button 2 -->
        <div class="category-button">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 flex flex-col items-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-brush text-gray-700" viewBox="0 0 16 16">
                    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
                  </svg>
            </button>
            <span class="text-xs text-gray-600">Performing & Visual Arts</span>
          </div>
        
          <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
        <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
        <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
        <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
        <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
        <div class="category-button flex flex-col items-center">
            <button class="rounded-full bg-transparent p-8 mb-3 hover:border-sky-200 border border-gray-300 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-boombox text-gray-700" viewBox="0 0 16 16">
                <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m7.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-7-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm5.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                <path d="M7 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                <path d="M14 0a.5.5 0 0 1 .5.5V2h.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12.5V.5A.5.5 0 0 1 14 0M1 3v3h14V3zm14 4H1v7h14z"/>
              </svg>
          </button>
          <span class="text-xs text-gray-600">Music</span>
        </div>
      </section>
      <!-- Section: Category Buttons -->
    </div>
    <!-- Container for demo purpose -->
  </template>
  
  <script>
  export default {}
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
  
  .category-button button:hover svg{
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
    transform: scale(1.10); /* Scaling tombol saat dihover */
  }
  
  </style>
  