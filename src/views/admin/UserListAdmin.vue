<template>
  <section class="container px-4 py-10 mx-auto">
    <div class="flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <!-- Filter Section -->
          <div class="flex items-center gap-x-2 mb-6">
             <el-select
            v-model="selectedFilter"
            placeholder="Select Filter"
            class="w-56"
          >
            <el-option label="All" value="all" />
            <el-option label="Verified" value="verified" />
            <el-option label="Non-Verified" value="non-verified" />
            <el-option label="Role admin" value="admin" />
            <el-option label="Role user" value="user" />
          </el-select>

            <el-input v-model="searchKeyword" placeholder="Search" class="w-56">
              <el-dropdown @command="handleSearchResultClick">
                <el-button slot="suffix" icon="el-icon-search"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="result in searchResults"
                    :key="result.id"
                    :command="result"
                  >
                    {{ result.Profiles[0].firstName }} {{ result.Profiles[0].lastName }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-loading
                :text="searching ? 'Searching...' : ''"
                :visible="searching"
                class="search-loading"
              ></el-loading>
            </el-input>
            <el-button
              @click="goToAddEvent"
              type="primary"
              plain
              class="ml-auto"
            >
              Add User
            </el-button>
          </div>
          <div
            class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
          >
            <el-skeleton :loading="isLoading" :rows="5" animated />
            <template v-if="!isLoading && !loadingEvent">
              <el-empty
                v-if="filteredUsers.length === 0"
                description="Users Not Found"
                class="text-center"
              >
                <!-- Additional content for empty message -->
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-8 h-8 text-gray-400 mx-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <p class="text-gray-500 mt-2">
                    No users found. Try changing your filters.
                  </p>
                </div>
              </el-empty>
              <table
                v-else
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
              >
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Organization
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>
                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                >
                  <tr v-for="item in paginatedUsers" :key="item.id">
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                    >
                      <div class="inline-flex items-center gap-x-3">
                        <span>#{{ item.id }}</span>
                      </div>
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.Profiles[0].firstName }} {{ item.Profiles[0].lastName }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.Profiles[0].organize }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.email }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.role }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                    >
                      <div
                        class="inline-flex items-center px-3 py-1 rounded-full gap-x-2"
                        :class="getStatusClass(item.isVerified)"
                      >
                        <h2 class="text-sm font-normal">
                          {{ item.isVerified ? 'Verified' : 'Non-Verified' }}
                        </h2>
                      </div>
                    </td>
                                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="relative inline-block text-left">
                        <el-dropdown trigger="click">
                          <span class="cursor-pointer">
                            <svg
                              class="w-6 h-6 text-gray-800 dark:text-white"
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
                                stroke-width="2"
                                d="M12 6h.01M12 12h.01M12 18h.01"
                              />
                            </svg>
                          </span>
                          <template #dropdown>
                            <el-dropdown-menu class="text-sm">
                              <el-dropdown-item @click="viewItem(item)"
                                >View</el-dropdown-item
                              >
                              <el-dropdown-item @click="editItem(item)"
                                >Edit</el-dropdown-item
                              >
                              <el-dropdown-item @click="deleteItem(item)"
                                >Delete</el-dropdown-item
                              >
                              <el-dropdown-item @click="copyURL(item)"
                                >Copy URL</el-dropdown-item
                              >
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Previous</span>
      </button>

      <div class="items-center hidden md:flex gap-x-3">
        <span
          v-for="pageNumber in pageCount"
          :key="pageNumber"
          @click="changePage(pageNumber)"
          class="px-2 py-1 text-sm text-gray-500 rounded-md"
          :class="{
            'bg-blue-100/60': currentPage === pageNumber,
            'hover:bg-gray-100': currentPage !== pageNumber,
          }"
          >{{ pageNumber }}</span
        >
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === pageCount || pageCount === 0"
        class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ElLoading, ElDropdown,
  ElDropdownMenu,
  ElDropdownItem, } from "element-plus";

export default {
  data() {
    return {
      selectedFilter: "all",
      searchKeyword: "",
      loadingEvent: false,
      searchResults: [],
      currentPage: 1,
      pageSize: 5,
      searching: false,
    };
  },
  components: {
    ElLoading,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
  },
  computed: {
    ...mapGetters("usersAdmin", ["getUsersAdmin", "isLoading"]),
    users() {
      return this.getUsersAdmin;
    },
filteredUsers() {
  let filtered = this.users;

  if (this.selectedFilter !== "all") {
    const selectedFilterLower = this.selectedFilter.toLowerCase();
    filtered = filtered.filter((item) => {
      if (selectedFilterLower === 'verified' || selectedFilterLower === 'non-verified') {
        return item.isVerified === (selectedFilterLower === 'verified');
      } else if (selectedFilterLower === 'admin' || selectedFilterLower === 'user') {
        return item.role.toLowerCase() === selectedFilterLower;
      }
    });
  }

  if (this.searchKeyword) {
    const keyword = this.searchKeyword.toLowerCase();
    filtered = filtered.filter((item) => {
      return (
        item.id.toString().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.username.toLowerCase().includes(keyword) ||
        (item.Profiles[0]?.firstName.toLowerCase().includes(keyword)) ||
        (item.Profiles[0]?.lastName.toLowerCase().includes(keyword)) ||
        (item.Profiles[0]?.organize.toLowerCase().includes(keyword)) ||
        item.role.toLowerCase().includes(keyword) ||
        (item.isVerified ? 'verified' : 'non-verified').includes(keyword)
      );
    });
  }

  return filtered;
},
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(
        startIndex + this.pageSize,
        this.filteredUsers.length
      );
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
  },
  methods: {
    ...mapActions("usersAdmin", ["fetchUsersAdmin"]),
    viewItem(item) {
      const uuid = item.uuid; // Ambil UUID dari item
      const userName = item.username.replace(/\s+/g, "-").toLowerCase(); // Buat nama acara dan konversikan ke format slug
      this.$router.push({
        path: `/admin/${userName}/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
  // Fungsi untuk mengedit item
  editItem(item) {
    console.log('Editing item:', item);
  },
  // Fungsi untuk menghapus item
  deleteItem(item) {
    console.log('Deleting item:', item);
  },
  // Fungsi untuk menyalin URL item
  copyURL(item) {
    console.log('Copying URL of item:', item);
  },
    handleSearchResultClick(command) {
      this.searchKeyword = command.Profiles[0].firstName + ' ' + command.Profiles[0].lastName;
      this.searchResults = [];
      this.searching = true;

      try {
        // Perform your search logic
      } finally {
        this.searching = false;
        this.$nextTick(() => {
          this.$refs.searchInput.$refs.input.focus();
        });
      }
    },
    getStatusClass(status) {
      return status ? "text-emerald-500 bg-emerald-100/60" : "text-red-500 bg-red-100/60";
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    goToAddEvent() {
      this.$router.push({ name: "AddEventAdmin" });
    },
  },
  mounted() {
    this.loadingEvent = true;
    this.fetchUsersAdmin().then(() => {
      this.loadingEvent = false;
    });
  },
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Text");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Text");
    next();
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.search-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
