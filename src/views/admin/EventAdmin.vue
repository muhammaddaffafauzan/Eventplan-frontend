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
              <el-option label="Reviewed" value="Reviewed" />
              <el-option label="Approved" value="Approved" />
              <el-option label="Denied" value="Denied" />
              <!-- Tambahkan opsi filter lainnya sesuai kebutuhan -->
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
                    {{ result.title }}
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
              Create Event
            </el-button>
          </div>
          <div
            class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
          >
            <el-skeleton :loading="isLoading" :rows="5" animated />
            <template v-if="!isLoading && !loadingEvent">
              <el-empty
                v-if="filteredEvent.length === 0"
                description="Event Not Found"
                class="text-center"
              >
                <!-- Animasi atau konten tambahan untuk pesan kosong -->
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
                    No events found. Try changing your filters.
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
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      title
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Organizer
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
                  <tr v-for="item in paginatedEvent" :key="item.id">
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                    >
                      <div class="inline-flex items-center gap-x-3">
                        <span>#{{ item.id }}</span>
                      </div>
                    </td>
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                    >
                      <div class="inline-flex items-center gap-x-3">
                        <span>{{
                          new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }).format(new Date(item.createdAt))
                        }}</span>
                      </div>
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                                  {{
              item?.title?.length > 25
                ? item?.title.substring(0, 25) + "..."
                : item?.title
            }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      <div class="flex items-center gap-x-2">
                        <el-avatar>
                          <img :src="item?.user?.Profiles?.url" alt="profile" />
                        </el-avatar>
                        <div>
                          <h2
                            class="text-sm font-medium text-gray-800 dark:text-white"
                          >
                            {{ item?.user?.Profiles?.organize }}
                          </h2>
                          <p
                            class="text-xs font-normal text-gray-600 dark:text-gray-400"
                          >
                            {{ item?.user?.email }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                    >
                      <div
                        class="inline-flex items-center px-3 py-1 rounded-full gap-x-2"
                        :class="getStatusClass(item?.admin_validation)"
                      >
                        <h2 class="text-sm font-normal">
                          {{ item?.admin_validation }}
                        </h2>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="flex items-center gap-x-6">
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
import { ElLoading, ElMessageBox } from "element-plus";

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
  },
  computed: {
    // Remove the duplicate definition of handleSearchResultClick from computed
    ...mapGetters("eventAdmin", ["getEventAdmin", "isLoading"]),
    event() {
      return this.getEventAdmin;
    },
filteredEvent() {
  let filtered = this.event;

  if (this.selectedFilter !== "all") {
    const selectedFilterLower = this.selectedFilter.toLowerCase();
    filtered = filtered.filter((item) => {
      return (
        item.admin_validation &&
        item.admin_validation.toLowerCase() === selectedFilterLower
      );
    });
  }

  if (this.searchKeyword) {
    const keyword = this.searchKeyword.toLowerCase();
    filtered = filtered.filter((item) => {
      return (
        item.id.toString().includes(keyword) ||
        item.createdAt.toLowerCase().includes(keyword) ||
        (item.admin_validation &&
          item.admin_validation.toLowerCase().includes(keyword)) ||
        (item.user &&
          item?.user?.Profiles[0]?.firstName
            .toLowerCase()
            .includes(keyword)) ||
        (item.user &&
          item?.user?.Profiles[0]?.lastName
            .toLowerCase()
            .includes(keyword)) ||
        (item.user && item?.user?.email.toLowerCase().includes(keyword)) ||
        item.title.toLowerCase().includes(keyword)
      );
    });
  }

  // Sort events by creation date in descending order
  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return filtered;
},

    paginatedEvent() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(
        startIndex + this.pageSize,
        this.filteredEvent.length
      ); // Menggunakan this.filteredEvent.length sebagai panjang array
      return this.filteredEvent.slice(startIndex, endIndex);
    },

    pageCount() {
      return Math.ceil(this.event.length / this.pageSize);
    },
  },
  methods: {
    ...mapActions("eventAdmin", ["fetchEventAdmin"]),
    applyFilter() {
      this.fetchEventAdmin();
    },
    handleSearchResultClick(command) {
      this.searchKeyword = command.title;
      this.searchResults = [];
      this.searching = true;

      try {
        // Perform your search logic
        // await this.fetchEventAdmin();
      } finally {
        this.searching = false;
        this.$nextTick(() => {
          this.$refs.searchInput.$refs.input.focus();
        });
      }
    },
    handleArchive(row) {
      console.log("Mengarsipkan acara:", row);
    },
    handleDetail(row) {
      this.$router.push({
        name: "DetailEventAdmin",
        params: { uuid: row.uuid },
      });
    },
     viewItem(item) {
      const uuid = item.uuid; // Ambil UUID dari item
      this.$router.push({
        path: `/admin/event/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
    editItem(item) {
      const { uuid, title } = item; // Ambil UUID dan judul dari item
      this.$router.push({
        path: `/admin/edit/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
     async deleteItem(item) {
      try {
        const confirmed = await ElMessageBox.confirm(
          "Are you sure you want to delete this event?",
          "Confirmation",
          {
            type: "warning",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            center: true,
          }
        );

        if (confirmed) {
          // Dispatch action deleteEvent dengan item.uuid sebagai payload
          await this.$store.dispatch("eventMain/deleteEvent", item.uuid);
          this.fetchEventAdmin();
        } else {
          // Jika pengguna membatalkan penghapusan, tampilkan pesan bahwa penghapusan dibatalkan
          ElMessage.info("Deletion canceled");
        }
      } catch (error) {
        // Handle jika terjadi kesalahan saat penghapusan
        ElMessage.error(`Failed to delete event: ${error.response.data.msg}`);
      }
    },
copyURL(item) {
  // Generate the URL
  const uuid = item.uuid;
  const eventName = item.title.replace(/\s+/g, "-").toLowerCase();
  const url = `${window.location.origin}/event/${eventName}/${uuid}`;

  // Copy URL to clipboard
  const el = document.createElement("textarea");
  el.value = url;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  // Log and/or notify the user
  console.log("URL copied to clipboard:", url);
  // You can also notify the user here, e.g., using a toast or a modal
},
    getStatusClass(status) {
      const statusClassMap = {
        Reviewed: "text-yellow-500 bg-yellow-100/60",
        Approved: "text-emerald-500 bg-emerald-100/60",
        Denied: "text-red-500 bg-red-100/60",
      };

      return statusClassMap[status] || "";
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
    handleSearchResultClick(command) {
      this.searchKeyword = command.title;
      this.searchResults = [];
      this.searching = true;

      try {
        // Perform your search logic
        // await this.fetchEventAdmin();
      } finally {
        this.searching = false;
        this.$nextTick(() => {
          this.$refs.searchInput.$refs.input.focus();
        });
      }
    },
    goToAddEvent() {
      this.$router.push({ name: "AddEventAdmin" });
    },
  },
  mounted() {
    this.loadingEvent = true;
    this.fetchEventAdmin().then(() => {
      this.loadingEvent = false;
    });
  },
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Teks Default");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Teks Default");
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
