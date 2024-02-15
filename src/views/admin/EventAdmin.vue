<template>
<section class="container px-4 py-10 mx-auto">
    <div class="flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div class="items-center hidden md:flex gap-x-3">
                                        <el-select v-model="selectedFilter" placeholder="Select Filter">
                                          <el-option label="All" value="all" />
                                          <el-option label="Paid" value="paid" />
                                          <el-option label="Cancelled" value="cancelled" />
                                          <!-- Tambahkan opsi filter lainnya sesuai kebutuhan -->
                                        </el-select>
                                        <el-button @click="applyFilter">Apply Filter</el-button>
                                      </div>
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Date
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Status
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Organizer
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    title event
                                </th>

                                <th scope="col" class="relative py-3.5 px-4">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            <tr v-for="item in filteredEvent" :key="item.id">
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div class="inline-flex items-center gap-x-3">
                                  <span>#{{ item.id }}</span>
                                </div>
                              </td>
                              <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{{ new Date(item.createdAt).toLocaleDateString() }}</td>
                              <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2" :class="getStatusClass(item.admin_validation)">
                                  <h2 class="text-sm font-normal">{{ item.admin_validation }}</h2>
                                </div>
                              </td>
                              <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div class="flex items-center gap-x-2">
                                  <img class="object-cover w-8 h-8 rounded-full" :src="item.organizer.profilePicture" alt="">
                                  <div>
                                    <h2 class="text-sm font-medium text-gray-800 dark:text-white">{{ item.organizer.firstName }} {{ item.organizer.lastName }}</h2>
                                    <p class="text-xs font-normal text-gray-600 dark:text-gray-400">{{ item.organizer.email }}</p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{{ item.titleEvent }}</td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                                <div class="flex items-center gap-x-6">
                                  <button @click="handleArchive(item)" class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                    Archive
                                  </button>
                                  <button @click="handleDetail(item)" class="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                    Detail
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between mt-6">
        <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
                previous
            </span>
        </a>

        <div class="items-center hidden md:flex gap-x-3">
            <a href="#" class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
            <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
        </div>

        <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
                Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </a>
    </div>
</section>
</template>
<script>
import { ElTable, ElTableColumn, ElInput, ElButton, ElSelect, ElOption } from 'element-plus';
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedFilter: "all",
    };
  },
  computed: {
    ...mapGetters('eventAdmin', ['getEventAdmin']),
    event() {
      return this.getEventAdmin;
    },
    filteredEvent() {
      if (this.selectedFilter === "all") {
        return this.event;
      } else {
        return this.event.filter((item) => item.admin_validation.toLowerCase() === this.selectedFilter);
      }
    },
  },
  methods: {
  ...mapActions('eventAdmin', ['fetchEventAdmin']),
  applyFilter() {
    console.log("Applying filter:", this.selectedFilter);
  },
  handleArchive(row) {
    console.log("Archiving event:", row);
  },
  handleDetail(row) {
    console.log("Showing detail for event:", row);
  },
  getStatusClass(status) {
    // Customize this function based on your requirements
    switch (status) {
      case 'Paid':
        return 'text-emerald-500 bg-emerald-100/60';
      case 'Cancelled':
        return 'text-red-500 bg-red-100/60';
      // Add more cases as needed
      default:
        return '';
    }
  },
},
};
</script>