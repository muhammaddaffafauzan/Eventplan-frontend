<template>
  <div class="min-h-screen py-8 relative">
    <div v-if="loadingEvent" class="text-center mt-8">
      <!-- Loading Skeleton -->
      <el-skeleton :loading="loadingEvent" animation="pulse">
        <!-- Header -->
        <div class="bg-white p-4 mb-4">
          <h2 class="text-3xl font-semibold">Loading...</h2>
          <p class="text-gray-600">Loading...</p>
        </div>

        <!-- Main Content -->
        <div>
          <!-- Event Image -->
          <el-skeleton-item v-if="loadingEvent">
            <img
              v-if="event && event.url"
              :src="event.url"
              alt="Event Image"
              class="w-full h-80 object-cover mb-4 rounded-lg overflow-hidden"
            />
          </el-skeleton-item>

          <!-- Event Details -->
          <el-skeleton :loading="loadingEvent">
            <div v-if="event" class="bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 class="text-2xl font-semibold mb-4">Event Details</h3>
              <p><strong>Type:</strong> {{ event.type }}</p>
              <p><strong>Category:</strong> {{ event.category }}</p>
              <p><strong>Price:</strong> {{ event.price }}</p>
              <!-- Display Tags if available -->
              <div v-if="event.tags && Array.isArray(event.tags) && event.tags.length > 0">
                <p><strong>Tags:</strong> {{ event.tags.join(', ') }}</p>
              </div>
            </div>
          </el-skeleton>

          <!-- Event Description -->
          <el-skeleton :loading="loadingEvent">
            <div v-if="event" class="bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 class="text-2xl font-semibold mb-4">Description</h3>
              <p>{{ event.description }}</p>
            </div>
          </el-skeleton>
        </div>
      </el-skeleton>
    </div>

    <div v-else class="mx-auto">
      <!-- Header -->
      <div v-if="event" class="bg-white p-4 mb-4">
        <h2 class="text-3xl font-semibold">{{ event.title }}</h2>
        <p class="text-gray-600">{{ event.organizer }}</p>
      </div>

      <!-- Main Content -->
      <div>
        <!-- Event Image -->
        <img
          v-if="event && event.url"
          :src="event.url"
          alt="Event Image"
          class="w-full h-80 object-cover mb-4 rounded-lg overflow-hidden"
        />

        <!-- Event Details -->
        <div v-if="event" class="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-2xl font-semibold mb-4">Event Details</h3>
          <p><strong>Type:</strong> {{ event.type }}</p>
          <p><strong>Category:</strong> {{ event.category }}</p>
          <p><strong>Price:</strong> {{ event.price  ? `${event.price}` : 'Free' }}</p>
          <div v-if="event.tags" class="flex gap-2">
            <p><strong>Tags:</strong></p>
            <el-tag v-for="(tag, index) in parseTags(event.tags)" :key="index" type="success">{{ tag }}</el-tag>
          </div>
        </div>
        
        <!-- Event Description -->
        <div v-if="event" class="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-2xl font-semibold mb-4">Description</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
    <!-- button validation -->
    <div class="fixed bottom-8 right-8">
      <el-button
      v-if="showValidation && event && event.admin_validation !== undefined && event.admin_validation !== null"
      :type="getButtonType('Approved')"
      :loading="loadingEvent"
      @click="handleValidation('Approved')"
      plain="true"
    >
      Approved
    </el-button>
    <el-button
      v-if="showValidation && event && event.admin_validation !== undefined && event.admin_validation !== null"
      :type="getButtonType('Denied')"
      :loading="loadingEvent"
      @click="handleValidation('Denied')"
      plain="true"
    >
      Denied
    </el-button>
    </div>
  </div>
</template>

<script>
import { ElButton, ElMessageBox, ElSkeleton, ElSkeletonItem, ElTag } from 'element-plus';
import axios from 'axios';

export default {
  data() {
    return {
      showValidation: true,
      isApproved: false,
      showApproval: 'Reviewed',
      loadingEvent: false,
    };
  },
  components: {
    ElButton,
    ElSkeleton,
    ElSkeletonItem,
    ElTag,
  },
  computed: {
    event() {
      const uuid = this.$route.params.uuid;
      return this.$store.getters['eventAdmin/getEventAdminById'](uuid);
    },
    loadingEvent() {
      return this.$store.getters['eventAdmin/isLoading'];
    },
    approveText() {
      return this.showApproval === 'Approved' ? 'Approved' : 'Approve';
    },
    denyText() {
      return this.showApproval === 'Denied' ? 'Denied' : 'Deny';
    },
    getButtonType() {
      return (action) => {
        return this.event && this.event.admin_validation === action ? 'success' : 'danger';
      };
    },
  },
  methods: {
    toggleValidation() {
      this.showValidation = !this.showValidation;
    },
    handleValidation(action) {
      const actionText = action === 'Approved' ? 'approve' : 'deny';
      const uuid = this.$route.params.uuid;

      // Menampilkan pesan konfirmasi sebelum memproses
      this.confirmAction(actionText)
        .then((confirmed) => {
          if (confirmed) {
            this.loadingEvent = true;

            // Memanggil API untuk validasi
            const payload = {
              admin_validation: action,
            };
            const token = localStorage.getItem('token');

            // Membuat instance Axios dengan konfigurasi header Authorization
            const axiosInstance = axios.create({
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Sesuaikan dengan tipe konten yang diharapkan oleh API
              },
            });

            // ...

            // Menggunakan axiosInstance untuk membuat permintaan
            axiosInstance.post(`/event/validation/${uuid}`, payload)
              .then((response) => {
                // Mengupdate status validasi berdasarkan tanggapan API
                if (response && response.data && response.data.success) {
                  this.showApproval = action;
                  this.showValidation = false;
                  this.isApproved = action === 'Approved';

                  const successMessage = `Event ${action.toLowerCase()}d successfully!`;
                  ElMessageBox.alert(successMessage, 'Success', {
                    type: 'success',
                  });
                }
              })
              .catch((error) => {
                console.error('Error validating event:', error);
                const errorMessage = `An error occurred while validating the event. Please try again.`;
                ElMessageBox.alert(errorMessage, 'Error', {
                  type: 'error',
                });
              })
              .finally(() => {
                this.loadingEvent = false;
              });
          }
        })
        .catch((error) => {
          console.error('Error confirming action:', error);
          const errorMessage = `An error occurred while confirming the action. Please try again.`;
          ElMessageBox.alert(errorMessage, 'Error', {
            type: 'error',
          });
        });
    },
    confirmAction(actionText) {
      return ElMessageBox.confirm(`Are you sure you want to ${actionText.toLowerCase()} the event?`, 'Confirmation', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => true).catch(() => false);
    },
    parseTags(tagsString) {
      try {
        // Mencoba mem-parsing string tags sebagai JSON
        const parsedTags = JSON.parse(tagsString);

        // Memeriksa apakah tags yang di-parse adalah array
        if (Array.isArray(parsedTags)) {
          return parsedTags;
        } else {
          console.error("Invalid tags format. Expected an array.");
          return [];
        }
      } catch (error) {
        console.error("Error parsing tags:", error);
        return [];
      }
    },
  },
  mounted() {
    const uuid = this.$route.params.uuid;
    // Check if the event is already available in the store
    const cachedEvent = this.$store.getters['eventAdmin/getEventAdminById'](uuid);
    if (cachedEvent) {
      this.event = cachedEvent;
      this.loadingEvent = false;
    } else {
      // Fetch the event details if not available in the store
      this.loadingEvent = true;
      this.$store.dispatch('eventAdmin/fetchEventAdminById', uuid)
        .then((eventData) => {
          if (eventData) {
            this.event = eventData;
            this.loadingEvent = false;
          } else {
            console.error("Failed to fetch event details");
          }
        });
    }
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
