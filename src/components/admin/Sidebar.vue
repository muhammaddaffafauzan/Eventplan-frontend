<template>
  <div class="max-h-full bg-gray-100 flex">
    <div class="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r border-opacity-100 group hover:w-56 hover:bg-white">
      <div class="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <div class="w-max p-2.5 relative">
            <span class="text-2xl font-bold transition-all opacity-0 group-hover:opacity-100 group-hover:text-gray-800">
              Admin
            </span>
            <img src="../../assets/img/letter-e.png" class="w-8 absolute z-20 group-hover:hidden transition-transform transform group-hover:scale-110 -my-2" alt="" srcset="" 
            :style="{ transform: ('100%'), left: '9%' }" >
            <p class="text-lg transition-all opacity-0 group-hover:opacity-100 group-hover:text-gray-800">
              EventPlan
            </p>
          </div>
              <ul class="mt-6 space-y-2 tracking-wide">
                <li class="min-w-max">
                    <a
                    href="#"
                    @click="navigateTo('/admin/dashboard')"
                    :class="{ 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white': isActive('/admin/dashboard') }"
                    aria-label="dashboard"
                    class="relative flex items-center space-x-4 px-4 py-3 text-gray-500"
                  >
                    <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" class="fill-current text-cyan-400 dark:fill-slate-600"></path>
                      <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" class="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                      <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" class="fill-current group-hover:text-sky-300"></path>
                    </svg>
                    <span class="-mr-1 font-medium">Dashboard</span>
                  </a>
                </li>
                <li class="min-w-max">
                    <a
                    href="#"
                    @click="navigateTo('/admin/event')"
                    :class="{ 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white': isActive('/admin/event'), 'group': true, 'flex': true, 'items-center': true, 'space-x-4': true, 'px-4': true, 'py-3': true, 'text-gray-600': true }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path class="fill-current text-gray-300 group-hover:text-cyan-300" fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
                      <path class="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                    </svg>
                    <span class="-mr-1 font-medium">Event</span>
                  </a>
                </li>
                <li class="min-w-max">
                    <a
                    href="#"
                    @click="navigateTo('/admin/user')"
                    :class="{ 'bg-gradient-to-r from-sky-600 to-cyan-400 text-white': isActive('/admin/user'), 'group': true, 'flex': true, 'items-center': true, 'space-x-4': true, 'px-4': true, 'py-3': true, 'text-gray-600': true }"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16"> <!-- Tambahkan kelas dinamis untuk warna ikon -->
                  <path  class="fill-current text-gray-600 group-hover:text-cyan-500" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg>
                    <span class="-mr-1 font-medium">&ensp;User</span>
                  </a>
                </li>

                <li class="min-w-max">
                  <a href="#" class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
                      <path class="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                    <span class="group-hover:text-gray-700">Reports</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </template>
  <script>
 export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    isActive(route) {
  return this.$route.path.startsWith(route);
},
  },
};
  </script>
<style>
.sidebar {
  transition: all 0.4s ease-in-out;
}



.group:hover p {
  opacity: 1;
  color: #ffffff; /* Ganti dengan warna yang diinginkan untuk teks "ventPlan" */
}
</style>
  