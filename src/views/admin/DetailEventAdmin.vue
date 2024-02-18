<template>
  <div class="min-h-screen py-8 relative">
    <div class="mx-auto">
      <!-- Header -->
      <div class="bg-white p-4 mb-4">
        <h2 class="text-3xl font-semibold">{{ event.title }}</h2>
        <p class="text-gray-600">{{ event.organizer }}</p>
      </div>

      <!-- Main Content -->
      <div>
        <!-- Event Image -->
        <img
          v-if="event.image"
          :src="event.image"
          alt="Event Image"
          class="w-full h-48 object-cover mb-4 rounded-lg overflow-hidden"
        />

        <!-- Event Details -->
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-2xl font-semibold mb-4">Event Details</h3>
          <p><strong>Type:</strong> {{ event.type }}</p>
          <p><strong>Category:</strong> {{ event.category }}</p>
          <p><strong>Price:</strong> {{ event.price }}</p>
          <!-- Add more details as needed -->
        </div>

        <!-- Event Description -->
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-2xl font-semibold mb-4">Description</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
    
     <!-- Admin Validation Section -->
     <div v-if="showValidation" class="bg-white p-4 rounded-lg shadow-md fixed bottom-8 right-8">
      <h3 class="text-2xl font-semibold mb-4">Admin Validation</h3>
      <div v-if="!showApproval">
        <button
          class="w-full bg-blue-500 text-white rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600"
          @click="toggleApproval"
        >
          <i class="fas fa-circle-notch fa-spin"></i> <!-- Rounded approval icon -->
        </button>
      </div>
      <div v-else>
        <button
          class="w-full bg-green-500 text-white rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-green-600"
          @click="approveEvent"
        >
          <i class="fas fa-check"></i> <!-- Approved icon -->
        </button>
      </div>

      <button
        class="mt-2 w-full bg-red-500 text-white rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-red-600"
        @click="denyEvent"
      >
        <i class="fas fa-times"></i> <!-- Denied icon -->
      </button>
    </div>

    <!-- Button to Toggle Admin Validation -->
    <div class="relative">
      <button
        class="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                fixed bottom-0 right-5 rounded-lg
                mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
        @click="toggleValidation"
      >
        <div class="p-3 rounded-full border-4 border-white bg-green-600">
          <svg
            class="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        title: "Sample Event",
        organizer: "Event Organizer Inc.",
        image: "https://via.placeholder.com/800x400", // Example image URL
        type: "Conference",
        category: "Technology",
        price: "$50",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      showValidation: false,
      showApproval: false,
    };
  },
  methods: {
    toggleValidation() {
      this.showValidation = !this.showValidation;
    },
    toggleApproval() {
      this.showApproval = !this.showApproval;
    },
    approveEvent() {
      // Implement logic for approving the event
      this.showApproval = false; // Hide the approval button after approving
    },
    denyEvent() {
      // Implement logic for denying the event
      this.showApproval = false; // Hide the approval button after denying
    },
  },
  beforeRouteEnter(to, from, next) {
    document.title = 'EventPlan - ' + (to.meta.title || 'Event Detail');
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = 'EventPlan - ' + (to.meta.title || 'Event Detail');
    next();
  },
};
</script>
