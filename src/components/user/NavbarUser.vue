<template>
  <nav
    class="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1"
  >
    <div
      class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center"
    >
      <!-- Breadcrumb -->
      <div class="capitalize">
        <nav aria-label="breadcrumb" class="w-max">
          <ol
            class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all"
          >
            <li
              v-for="(breadcrumb, index) in breadcrumbs"
              :key="index"
              class="flex items-center"
            >
              <router-link :to="breadcrumb.to">
                <p
                  class="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {{ breadcrumb.name }}
                </p>
              </router-link>
              <span
                v-if="index < breadcrumbs.length - 1"
                class="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none"
                >/</span
              >
            </li>
          </ol>
        </nav>
        <h6
          class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900"
        >
          {{ breadcrumbs[breadcrumbs.length - 1].name }}
        </h6>
      </div>
      <!-- end breadcrumb -->
      <div class="flex items-center">
        <div class="mr-auto md:mr-4 md:w-56">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
              placeholder=" "
            />
            <label
              class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500"
              >Type here</label
            >
          </div>
        </div>
        <!-- button titik 3 mobile only -->
        <button
          class="relative block md:hidden font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
          type="button"
        >
          <span
            class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="h-6 w-6 text-blue-gray-500"
            >
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </button>
        <!-- button titik 3 mobile only -->
        <button
          v-if="me"
          class="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
          type="button"
        >
          <el-avatar>
            <img :src="profileImage" alt="profile" />
          </el-avatar>
          {{ me.user?.username }}
        </button>

        <button
          v-if="!me"
          class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
          type="button"
        >
          <el-avatar>
            <img :src="profileImage" alt="profile" />
          </el-avatar>
          {{ me.user?.username }}
        </button>
        <!-- Dropdown Settings -->
        <el-dropdown>
          <button
            class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
          >
            <span
              class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-5 text-blue-gray-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="settings" @click="toSettings"
                >Settings</el-dropdown-item
              >
              <hr />
              <el-dropdown-item command="logout" @click="confirmLogout"
                >log out</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- End Dropdown Settings -->
        <!-- Tombol notifikasi -->
        <div class="relative" @click="showNotificationsForMobile">
          <button
            class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
          >
            <span
              class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-5 text-blue-gray-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <div
              v-if="upcomingEvents.length > 0"
              class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full top-0.5 -end-0.5 dark:border-gray-900"
            >
              {{ upcomingEvents.length }}
            </div>
          </button>
          <!-- Menu dropdown untuk notifikasi -->
   <div
        v-if="isNotificationsVisible && upcomingEvents.length"
        class="absolute top-full left-0  md:left-auto md:right-0 md:mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10 w-auto overflow-y-auto h-72"
        :class="{
          'md:left-0': isNotificationsVisible,
          'h-auto': upcomingEvents.length < 4 ,
        }"
        style="min-width: 300px; max-width: 400px"
      >
        <div>
          <el-empty
            v-if="upcomingEvents.length < 0"
            description="No upcoming events"
          ></el-empty>
          <div
            v-else
            v-for="(event, index) in upcomingEvents"
            :key="index"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500 relative"
            style="white-space: normal"
            @click="goToEvent(event)"
          >
            <!-- Tombol X untuk menghapus notifikasi -->
            <button
              class="absolute top-0 right-0 p-1 focus:outline-none"
              @click.stop="removeNotification(event)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-gray-500 hover:text-red-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <!-- Gunakan judul acara sebagai header notifikasi -->
            <span class="font-semibold">{{ event.title }}</span>
            <br />
            <!-- Tambahkan baris ini untuk membuat baris baru -->
            <span class="text-sm">{{
              generateNotificationMessage(event)
            }}</span>
            <hr class="separator" />
            <!-- Tambahkan baris ini untuk menampilkan pesan notifikasi -->
          </div>
        </div>
      </div>
        </div>
        <!-- End Tombol notifikasi -->
      </div>
    </div>
  </nav>
</template>
<script>
import {
  ElLoading,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ArrowDown,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
  },
  data() {
    return {
      isLoading: false,
      isNotificationsVisible: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "getMe"]),
    ...mapGetters("eventMain", ["getMyEvent"]),
    me() {
      return this.getMe || {};
    },
    breadcrumbs() {
      return this.$route.matched.map((route) => {
        return {
          name: route.meta.title || route.name,
          to: route.path,
        };
      });
    },
    profileImage() {
      const user = this.getMe;
      if (!user || !user.profile || !user.profile || !user.profile.url) {
        const profile = user?.profile;
        const firstName = profile?.firstName;
        const lastName = profile?.lastName;
        const initials = firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : '';
        return `https://ui-avatars.com/api/?name=${initials}&background=random&size=150`;
      } else {
        return user.profile.url;
      }
    },
      upcomingEvents() {
          // Pastikan getMyEvent ada dan memiliki data
          if (!this.getMyEvent || !Array.isArray(this.getMyEvent)) {
            return [];
          }

          // Ambil pengaturan notifikasi dari local storage
          const notificationSettings = JSON.parse(
            localStorage.getItem("notificationSettings")
          );

          // Tetapkan hari sebelumnya sebagai default (h-1)
          const defaultNotificationDay = notificationSettings.reminderDays || 1;

          // Pastikan pengaturan notifikasi ada dan diaktifkan
          if (notificationSettings && notificationSettings.enableNotifications) {
            // Dapatkan tanggal hari ini dan tambahkan jumlah hari sesuai dengan pengaturan atau default
            const today = new Date();
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + defaultNotificationDay);

            // Filter event berdasarkan start_date yang akan dimulai dalam waktu tertentu dari sekarang
            return this.getMyEvent.filter((event) => {
              if (event.start_date && event.end_date) {
                const eventStartDate = new Date(event.start_date);
                const eventEndDate = new Date(event.end_date);

                // Filter hanya acara yang dimulai atau berlangsung saat ini dan belum berakhir
                return (eventStartDate <= today && eventEndDate >= today) || (eventStartDate <= futureDate && eventEndDate >= today);
              }
              return false;
            });
          }

          return [];
        },
  },
  methods: {
    ...mapActions("auth", ["fetchMe", "logout"]),
    ...mapActions("eventMain", ["fetchMyEvents"]),
    ...mapActions("notification", ["sendEventReminders"]),
removeNotification(event) {
  // Temukan indeks notifikasi yang akan dihapus di dalam array upcomingEvents
  const index = this.upcomingEvents.findIndex((item) => item.id === event.id);

  // Periksa apakah indeks ditemukan
  if (index !== -1) {
    // Buat salinan array upcomingEvents agar tidak memodifikasi langsung state
    const updatedUpcomingEvents = [...this.upcomingEvents];

    // Hapus notifikasi dari array upcomingEvents yang disalin
    updatedUpcomingEvents.splice(index, 1);

    // Simpan kembali array upcomingEvents yang telah diperbarui ke state
    this.upcomingEvents = updatedUpcomingEvents;

    // Simpan array upcomingEvents yang telah diperbarui ke local storage
    localStorage.setItem('upcomingEvents', JSON.stringify(updatedUpcomingEvents));
  }
},

    generateNotificationMessage(event) {
      // Pastikan event dan properti start_date tersedia sebelum mengaksesnya
      if (event && event.start_date) {
        const eventStartDate = new Date(event.start_date);
        const formattedDate = eventStartDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return `Event starting on ${formattedDate}`;
      } else {
        return "Event starting soon";
      }
    },
    showNotification() {
      ElNotification({
        title: this.upcomingEvents[0].title,
        message: `check notification`,
        type: "info",
        duration: 5000, // Durasi notifikasi (dalam milidetik), 0 untuk tetap terbuka
        position: "bottom-right", // Posisi notifikasi
      });
    },
    goToEvent(event) {
      const { uuid, title } = event; // Ambil UUID dan judul dari event
      const eventName = title.replace(/\s+/g, "-").toLowerCase(); // Buat nama acara dan konversikan ke format slug
      this.$router.push({
        path: `/organizer/event/${eventName}/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
    toSettings() {
      window.location.href = '/settings/personal';
    },
     confirmLogout() {
     this.logout();
     window.location.href = '/auth/login'
    },
    showNotifications() {
      this.isNotificationsVisible = true;
    },
    hideNotifications() {
      this.isNotificationsVisible = false;
    },
    showNotificationsForMobile() {
      this.isNotificationsVisible = !this.isNotificationsVisible;
    },
    showBrowserNotification() {
      if ("Notification" in window) {
        // Memeriksa apakah notifikasi browser didukung oleh browser saat ini
        if (Notification.permission === "granted") {
          // Jika izin telah diberikan, kita bisa langsung menampilkan notifikasi
          new Notification("Event Notification", {
            body: `${this.upcomingEvents[0].title} You have an upcoming event!`,
            icon: "https://i.postimg.cc/zVskvwHM/eventplan-logo.png", // Ganti dengan URL icon notifikasi Anda
          });
        } else if (Notification.permission !== "denied") {
          // Jika izin belum diberikan, kita perlu meminta izin kepada pengguna
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              // Jika izin diberikan, kita bisa langsung menampilkan notifikasi
              new Notification("Event Notification", {
                body: `${this.upcomingEvents[0].title} You have an upcoming event!`,
                icon: "https://i.postimg.cc/zVskvwHM/eventplan-logo.png", // Ganti dengan URL icon notifikasi Anda
              });
            }
          });
        }
      }
    },
  },
mounted() {
  this.fetchMe();
  this.sendEventReminders();
  const notificationSettings = JSON.parse(
    localStorage.getItem("notificationSettings")
  );

  // Pastikan pengaturan notifikasi ada dan diaktifkan
  if (notificationSettings && notificationSettings.enableNotifications) {
    // Lakukan logika untuk menentukan kapan notifikasi harus ditampilkan
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 1); // Set default menjadi 1 hari sebelum acara dimulai

    // Filter event berdasarkan start_date yang akan dimulai dalam 1 hari dari sekarang
    const isEventNear = this.upcomingEvents.some((event) => {
      const eventStartDate = new Date(event.start_date);
      // Memeriksa apakah event dimulai dalam rentang waktu yang ditentukan
      return eventStartDate >= today && eventStartDate <= futureDate
    });

    // Jika ada event dekat, tampilkan notifikasi
    if (isEventNear) {
      this.showNotification();
      if (notificationSettings.allowBrowserNotifications) {
        this.showBrowserNotification();
      }
    }
  }
},
};
</script>
