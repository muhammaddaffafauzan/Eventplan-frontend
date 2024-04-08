<template>
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
        <div class="flex flex-row">
          <div class="w-48 h-28 bg-gray-300 rounded-md mr-6"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-300 rounded-md mb-2"></div>
            <div class="h-3 bg-gray-300 rounded-md mb-1"></div>
            <div class="h-3 bg-gray-300 rounded-md"></div>
          </div>
        </div>
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
      <!-- v-for loop for generating cards -->
      <div
        v-for="card in eventFav"
        :key="card.id"
        class="bg-white hover:shadow-md rounded-md w-full md:w-[900px]"
      >
        <!-- Card content -->
        <div class="flex flex-row">
          <div class="basis-1/4 justify-center items-center my-5 ml-6">
            <img
              :src="card?.event?.url"
              :alt="card?.event?.title"
              class="object-cover w-48 h-28 border border-gray-300"
            />
            <div class="mt-2 flex">
              <!-- Container for share & favorite icons -->
              <div class="flex">
                <span
                  class="cursor-pointer flex hover:bg-gray-100 hover:border transition-all hover:scale-125 hover:border-gray-100 mb-2 mr-2 rounded-full w-10 h-10 font-semibold text-gray-700 items-center justify-center"
                >
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
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart text-gray-800 font-bold"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="basis-1/2 my-5">
            <span
              class="hover:underline hover:cursor-pointer text-gray-800 font-semibold"
              >{{ card?.event?.title }}</span
            >
            <p class="text-blue-800 font-semibold text-sm">
              {{ card?.event?.date }}
            </p>
            <div class="mt-2">
              <span class="text-sm text-gray-600">{{ card?.event?.event_locations?.address }}</span>
              <p class="text-gray-600 text-sm">{{ card?.event?.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- end v-for loop for cards -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {

    };
    },
    computed: {
        ...mapGetters('eventMain', ['getEventFavorite']),
      isEmpty() {
      return this.getEventFavorite.length === 0;
        },
        eventFav() {
            return this.getEventFavorite;
        }
    },
      methods: {
        ...mapActions('eventMain', ['fetchEventsFavorite'])
    },
      mounted() {
    // Fetch event data
    this.fetchEventsFavorite();
  },
  beforeRouteEnter(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Teks Default");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Teks Default");
    next();
  },
};
</script>
