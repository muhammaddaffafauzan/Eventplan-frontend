<template>
  <!-- Informasi Personal -->
  <div class="grid grid-cols-2 gap-x-8 gap-y-10">
    <p class="absolute right-5 mt-1 text-right text-sm text-gray-500">
      Account Eventplan since {{ formattedCreatedAt }}
    </p>
    <div class="col-span-2">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Personal Information - {{ formData?.username }}
      </h2>
      <hr class="border-gray-300 mb-6" />
    </div>
    <!-- Avatar Pengguna -->
    <div class="col-span-2 sm:col-span-2 flex items-left justify-left relative">
      <div class="relative">
        <!-- Avatar -->
        <img
          class="h-52 w-52 rounded-full border-4 border-gray-400"
          :src="profileImage"
          alt="User's avatar"
        />
      </div>
    </div>
    <!-- Username -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >Username</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.username }}
      </span>
    </div>
    <!-- Nama Depan -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >First Name</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.firstName }}
      </span>
    </div>
    <!-- Nama Belakang -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >Last Name</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.lastName }}
      </span>
    </div>
    <!-- Organisasi -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >Organize</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.organize }}
      </span>
    </div>
    <!-- Nomor Telepon -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >Phone</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.phone }}
      </span>
    </div>
    <!-- Alamat -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >Address</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.address }}
      </span>
    </div>
    <!-- Kota -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >City</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.city }}
      </span>
    </div>
    <!-- Negara Bagian -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >State</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.state }}
      </span>
    </div>
    <!-- Negara -->
    <div class="col-span-2 sm:col-span-1">
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        >Country</label
      >
      <span class="block w-full rounded-md sm:text-sm sm:leading-5">
        {{ formData?.country }}
      </span>
    </div>
  </div>
  <div class="col-span-2 mt-12">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Events - {{ formData?.username }}
      </h2>
      <hr class="border-gray-300 mb-6" />
    </div>
  <!-- Event Cards -->
  <div
    v-if="this.$store.getters['eventMain/isLoading']"
    class="text-center"
  >
    <!-- Skeleton loading -->
    <div
      class="md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0"
    >
      <div
        v-for="index in 6"
        :key="index"
        class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg animate-pulse"
      >
        <div class="relative">
          <div class="w-full h-48 bg-gray-200 rounded-xl"></div>
        </div>
        <div class="mt-4">
          <div class="h-6 bg-gray-200 rounded"></div>
          <div class="h-4 mt-2 bg-gray-200 rounded"></div>
          <div class="h-4 mt-2 bg-gray-200 rounded"></div>
          <div class="h-4 mt-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="displayedEvents.length === 0" class="text-center mb-20">
    <!-- Empty state using Element Plus ElEmpty -->
    <el-empty description="No events found" class="text-center" />
  </div>
  <div
    v-else
    class="md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0"
  >
    <!-- card event -->
    <div
      v-for="(event, index) in displayedEvents"
      :key="event.uuid"
      class="w-full bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg hover:shadow-2xl"
    >
      <div class="relative group">
        <img
          class="w-full h-40 object-cover rounded-lg cursor-pointer"
          :src="event.url"
          alt="Event Image"
          @click="handleDetail(event)"
        />
        <p
          class="absolute top-0 bg-blue-300 group-hover:text-gray-800 text-gray-800 font-semibold py-1 px-2 text-xs rounded-br-lg rounded-tl-lg"
        >
          {{ event?.price === 0 ? "Free" : "Paid" }}
        </p>
      </div>
      <p class="text-left mt-4 text-gray-800 text-lg font-semibold">
        {{
          event?.title?.length > 25
            ? event?.title.substring(0, 25) + "..."
            : event?.title
        }}
      </p>
      <div class="flex space-x-1 items-center pb-1">
        <!-- Format tanggal dan waktu -->
        <p class="text-sm sm:text-xs font-semibold text-gray-800">
          {{
            new Date(event.start_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
          •
          <!-- Gunakan modulus untuk mendapatkan format waktu AM/PM -->
          {{
            " " +
            (event.start_time
              ? new Date("1970-01-01T" + event.start_time)
                  .toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .replace(/^(\d{1}):/, "0$1:") +
                (parseInt(event.start_time.split(":")[0]) >= 12 ? "" : "")
              : "Invalid Time")
          }}
        </p>
      </div>
      <div class="my-1">
        <div
          v-if="event.type_location === 'location'"
          class="flex space-x-1 items-center text-sm text-gray-700"
        >
          <p class="font-semibold">
            {{
              event.event_locations[0]?.address.length > 15
                ? event.event_locations[0]?.address.substring(0, 15) + "..."
                : event.event_locations[0]?.address
            }}
          </p>
        </div>
        <div
          v-else-if="event.type_location === 'Online'"
          class="flex space-x-1 items-center pb-1 text-gray-700"
        >
          <p class="font-semibold">{{ event.type_location }}</p>
        </div>
        <div v-else class="flex space-x-1 items-center text-gray-700">
          <p class="font-semibold">{{ event.type_location }}</p>
        </div>
        <div class="flex items-center text-gray-700 text-sm">
          <p class="font-semibold flex items-center">
            {{ event.organizer }}
          </p>
        </div>
        <span
          class="ml-auto text-xs font-semibold text-gray-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
            />
          </svg>
          <span class="ml-1">{{ event?.followersCount }} Followers</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
        formData: {}, // Menggunakan objek formData untuk menyimpan data pengguna
      displayedEvents: []
    };
  },
  computed: {
    ...mapGetters("usersAdmin", ["getUsersAdminById"]),
    // Menggunakan getter untuk mendapatkan URL profil pengguna
    user() {
      return this.getUsersAdminById;  
    },
    profileImage() {
      const user = this.getUsersAdminById(this.$route.params.uuid);
      if (!user || !user.Profiles || !user.Profiles[0] || !user.Profiles[0].url) {
        return "https://via.placeholder.com/150"; // Menggunakan placeholder jika URL tidak tersedia
      } else {
        return user.Profiles[0].url;
      }
    },
    // Format tanggal createdAt
    formattedCreatedAt() {
      const user = this.getUsersAdminById(this.$route.params.uuid);
      if (user && user.createdAt) {
        const createdAt = new Date(user.createdAt);
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const day = createdAt.getDate();
        const monthIndex = createdAt.getMonth();
        const year = createdAt.getFullYear();
        return `${day} ${monthNames[monthIndex]} ${year}`;
      } else {
        return "N/A"; // Tampilkan "N/A" jika data createdAt tidak tersedia
      }
    },
  },
  methods: {
    ...mapActions("usersAdmin", ["fetchUsersAdminById"]),
    async loadDataUser() {
      await this.fetchUsersAdminById(this.$route.params.uuid); // Perbaiki pemanggilan dengan menambahkan parameter uuid
      const user = this.getUsersAdminById(this.$route.params.uuid);
      if (user && user.Profiles && user.Profiles[0]) {
        // Mengisi formData dengan data profil pengguna
        this.formData = {
          username: user?.username,
          firstName: user?.Profiles[0]?.firstName,
          lastName: user?.Profiles[0]?.lastName,
          organize: user?.Profiles[0]?.organize,
          phone: user?.Profiles[0]?.phone,
          address: user?.Profiles[0]?.address,
          city: user?.Profiles[0]?.city,
          state: user?.Profiles[0]?.state,
          country: user?.Profiles[0]?.country,
        };
        this.displayedEvents = user?.events
      }
      },
       handleDetail(row) {
      this.$router.push({
        name: "DetailEventAdmin",
        params: { uuid: row.uuid },
      });
    },
  },
  // Memuat data profil pengguna saat komponen dimuat
  mounted() {
    this.loadDataUser();
  },
};
</script>

<style scoped>
/* Animasi untuk fade-out */
.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
/* Animasi untuk tampilan modal */
.modal-show {
  display: flex;
  animation: modal-show-animation 0.3s ease-in-out;
}

@keyframes modal-show-animation {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
