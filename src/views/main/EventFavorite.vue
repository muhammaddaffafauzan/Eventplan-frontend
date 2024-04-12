<template>
  <!-- Tampilan favorit -->
  <div class="my-16 container mx-auto min-h-screen">
    <div class="pt-16">
      <h1 class="text-5xl text-gray-800 font-extrabold">Favorite</h1>
    </div>
    <div v-if="$store.getters['eventMain/isLoading']" class="animate-pulse">
      <!-- Skeleton loading -->
      <div
        v-for="card in eventFav"
        :key="card.id"
        class="bg-gray-200 p-4 rounded-md mb-4 mt-14"
      >
        <!-- Konten Skeleton -->
      </div>
    </div>
    <el-empty
      v-else-if="isEmpty"
      description="No favorite events found."
      class="mt-16"
    />
    <div
      v-else-if="!isEmpty"
      class="items-left justify-left flex mt-16 flex-col space-y-8"
    >
      <!-- Loop untuk menghasilkan kartu favorit -->
      <div
        v-for="card in eventFav"
        :key="card.id"
        class="bg-white hover:shadow-md rounded-md w-full md:w-[900px]"
      >
        <!-- Konten kartu -->
        <div class="flex flex-row">
          <div class="basis-1/4 justify-center items-center my-5 ml-6">
            <!-- Gambar acara -->
            <img
              :src="card?.event?.url"
              :alt="card?.event?.title"
              class="object-cover w-48 h-28 border border-gray-300"
            />
            <div class="mt-2 flex">
              <!-- Container untuk ikon share & favorite -->
              <div class="flex">
                <span
                  class="cursor-pointer flex hover:bg-gray-100 hover:border transition-all hover:scale-125 hover:border-gray-100 mb-2 mr-2 rounded-full w-10 h-10 font-semibold text-gray-700 items-center justify-center"
                >
                  <!-- Ikon share -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-share"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                    />
                  </svg>
                </span>
                <span
                  class="cursor-pointer flex hover:bg-gray-100 hover:border hover:transition-all hover:scale-125 hover:border-gray-100 mb-2 mr-2 rounded-full w-10 h-10 font-semibold text-gray-700 items-center justify-center"
                  @click="removeEventFav(card.event)"
                >
                  <!-- Ikon hati (heart) -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart"
                    :class="{
                      'text-gray-500': isFavorite(card.event),
                      'text-red-500': !isFavorite(card.event),
                    }"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <!-- Konten Detail acara -->
          <div class="basis-1/2 my-5">
            <span
              class="hover:underline hover:cursor-pointer text-gray-800 font-semibold"
              >{{ card?.event?.title }}</span
            >
            <p class="text-blue-800 font-semibold text-sm">
              <!-- Tanggal dan waktu -->
              {{
                new Date(card?.event?.start_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
              •
              {{
                " " +
                (card?.event?.start_time
                  ? new Date("1970-01-01T" + card?.event?.start_time)
                      .toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })
                      .replace(/^(\d{1}):/, "0$1:") +
                    (parseInt(card?.event?.start_time.split(":")[0]) >= 12
                      ? ""
                      : "")
                  : "Invalid Time")
              }}
            </p>
            <!-- Lokasi dan harga -->
            <div class="mt-2">
              <span class="text-sm text-gray-600">{{
                card?.event?.event_locations[0]?.address
              }}</span>
              <p class="text-gray-600 text-sm">
                {{
                  card?.event?.price
                    ? formatCurrency(card?.event?.price)
                    : "Free"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Selesai loop untuk kartu -->
    </div>
    <el-empty
      v-else
      description="Failed to fetch favorite events. Please try again later."
      class="mt-16"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("eventMain", ["getEventFavorite"]),
    isEmpty() {
      return this.getEventFavorite.length === 0;
    },
    eventFav() {
      return this.getEventFavorite;
    },
  },
  methods: {
    ...mapActions("eventMain", ["fetchEventsFavorite", "addEventsFavorite", "removeEventsFavorite"]),
    formatCurrency(price) {
      // Konversi ke IDR dan tambahkan pemisah ribuan jika diperlukan
      return price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
    async removeEventFav(event) {
      try {
        await this.removeEventsFavorite(event.id);
        // Tampilkan pesan sukses
        this.$message.success("Event successfully removing from favorites");
        // Fetch kembali daftar acara favorit setelah menghapus
        this.fetchEventsFavorite();
      } catch (error) {
        // Tampilkan pesan kesalahan
        console.log(error.message);
      }
    },
    isFavorite(event) {
      // Cek apakah event ada di daftar favorit
      return this.getEventFavorite.some((favEvent) => favEvent.id === event.id);
    },
  },
  mounted() {
    // Fetch data acara favorit saat komponen dimuat
    this.fetchEventsFavorite();
  },
  beforeRouteEnter(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Default Title");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Default Title");
    next();
  },
};
</script>
