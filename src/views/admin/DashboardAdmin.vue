<template>
    <div class="mt-12">
        <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
  <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
          </svg>
        </div>
        <div class="p-4 text-right">
          <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ totalEvents }} event</h4>
        </div>
        <div class="border-t border-blue-gray-50 p-4">
          <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong :class="{'text-green-500': eventsChange >= 0, 'text-red-500': eventsChange < 0}">
              {{ eventsChange >= 0 ? '+' : '' }}{{ eventsChange }}%
            </strong>&nbsp;than yesterday
          </p>
        </div>
      </div>
      <!-- Statistik Jumlah Pengguna -->
      <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
        </div>
        <div class="p-4 text-right">
          <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ totalUsers }} users</h4>
        </div>
        <div class="border-t border-blue-gray-50 p-4">
          <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong :class="{'text-green-500': usersChange >= 0, 'text-red-500': usersChange < 0}">
              {{ usersChange >= 0 ? '+' : '' }}{{ usersChange }}%
            </strong>&nbsp;than yesterday
          </p>
        </div>
      </div>
      <!-- Statistik Jumlah Views -->
      <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
          </svg>
        </div>
        <div class="p-4 text-right">
          <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ totalViews }} visitor</h4>
        </div>
        <div class="border-t border-blue-gray-50 p-4">
          <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong :class="{'text-green-500': viewsChange >= 0, 'text-red-500': viewsChange < 0}">
              {{ viewsChange >= 0 ? '+' : '' }}{{ viewsChange }}%
            </strong>&nbsp;than yesterday
          </p>
        </div>
      </div>
        </div>
        
        <div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
              <div>
                <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Projects</h6>
                <p class="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-4 w-4 text-blue-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  <strong>30 done</strong> this month
                </p>
              </div>
              <button aria-expanded="false" aria-haspopup="menu" id=":r5:" class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table class="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">companies</p>
                    </th>
                    <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">budget</p>
                    </th>
                    <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">completion</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="flex items-center gap-4">
                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Material XD Version</p>
                      </div>
                    </td>
                    
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">$14,000</p>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="w-10/12">
                        <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">60%</p>
                        <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div class="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style="width: 60%;"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="flex items-center gap-4">
                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Add Progress Track</p>
                      </div>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">$3,000</p>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="w-10/12">
                        <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">10%</p>
                        <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div class="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style="width: 10%;"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="flex items-center gap-4">
                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Fix Platform Errors</p>
                      </div>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">Not set</p>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="w-10/12">
                        <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">100%</p>
                        <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div class="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white" style="width: 100%;"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="flex items-center gap-4">
                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Launch our Mobile App</p>
                      </div>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">$20,500</p>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="w-10/12">
                        <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">100%</p>
                        <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div class="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white" style="width: 100%;"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="flex items-center gap-4">
                        <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Add the New Pricing Page</p>
                      </div>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">$500</p>
                    </td>
                    <td class="py-3 px-5 border-b border-blue-gray-50">
                      <div class="w-10/12">
                        <p class="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">25%</p>
                        <div class="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                          <div class="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style="width: 25%;"></div>
                        </div>
                      </div>
                    </td>
                  </tr>     
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('eventAdmin', ['getEventAdmin']),
    ...mapGetters('usersAdmin', ['getUsersAdmin']),
    totalEvents() {
      // Ambil data jumlah event dari store eventAdmin
      const eventAdmin = this.getEventAdmin;
      return eventAdmin.length;
    },
    totalUsers() {
      // Ambil data jumlah pengguna dari store usersAdmin
      const usersAdmin = this.getUsersAdmin;
      return usersAdmin.length;
    },
      totalViews() {
        // Ambil data jumlah views dari store atau backend
        // Gantilah dengan metode yang sesuai dengan aplikasi Anda
        const views = 249700; // Contoh: 10.000 views
        if (views >= 1000 && views < 1000000) {
          return (views / 1000).toFixed(0) + 'k'; // Format ke ribuan
        } else if (views >= 1000000) {
          return (views / 1000000).toFixed(0) + 'M'; // Format ke jutaan
        } else {
          return views.toString(); // Tidak perlu diubah
        }
      },
    eventsChange() {
      // Hitung perubahan jumlah event dibandingkan dengan kemarin
      // Anda dapat menggunakan data historis dari store atau backend
      return 10; // Contoh: Pertumbuhan 10% dibandingkan kemarin
    },
    usersChange() {
      // Hitung perubahan jumlah pengguna dibandingkan dengan kemarin
      // Anda dapat menggunakan data historis dari store atau backend
      return -5; // Contoh: Penurunan 5% dibandingkan kemarin
    },
    viewsChange() {
      // Hitung perubahan jumlah views dibandingkan dengan kemarin
      // Anda dapat menggunakan data historis dari store atau backend
      return 20; // Contoh: Pertumbuhan 20% dibandingkan kemarin
    },
  },
  methods: {
    ...mapActions('eventAdmin', ['fetchEventAdmin']),
    ...mapActions('usersAdmin', ['fetchUsersAdmin']),
  },
  mounted() {
    this.fetchEventAdmin();
    this.fetchUsersAdmin();
  },
  beforeRouteEnter(to, from, next) {
    document.title = 'EventPlan - ' + (to.meta.title || 'Teks Default');
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = 'EventPlan - ' + (to.meta.title || 'Teks Default');
    next();
  },
};
</script>