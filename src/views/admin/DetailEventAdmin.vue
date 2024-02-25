<template>
  <div class="min-h-screen py-8 relative">
    <el-container v-if="loadingEvent">
      <!-- Loading Skeleton -->
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="24">
          <el-skeleton :loading="loadingEvent" animation="pulse">
            <!-- Header -->
            <el-card class="mb-4">
              <h2 class="text-3xl font-semibold">Loading...</h2>
              <p class="text-gray-600">Loading...</p>
            </el-card>
          </el-skeleton>
        </el-col>
      </el-row>
    </el-container>

    <el-container v-else>
      <!-- Main Content -->
      <el-row>
        <el-col :span="24">
          <!-- Event Image -->
          <h2 class="text-3xl font-semibold">{{ event?.title }}</h2>
          <p class="text-gray-600 mb-4">{{ event?.organizer }}</p>
          <el-card v-if="event && event.url" class="mb-4">
            <img
              :src="event.url"
              alt="Event Image"
              class="w-full h-80 object-cover rounded-lg overflow-hidden"
            />
          </el-card>
        </el-col>

        <el-col :span="24">
          <!-- Event Details -->
          <el-card v-if="event" class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Event Details</h3>
            <el-divider></el-divider>
            <p><strong>Category:</strong> {{ event.category }}</p>
            <p><strong>Price:</strong> {{ event.price ? `${event.price}` : 'Free' }}</p>
            <p><strong>Start Date:</strong> {{ event.start_date }}</p>
            <p><strong>End Date:</strong> {{ event.end_date }}</p>
            <p><strong>Start Time:</strong> {{ event.start_time }}</p>
            <p><strong>End Time:</strong> {{ event.end_time }}</p>
            <div v-if="event.tags && Array.isArray(event.tags) && event.tags.length > 0">
              <p><strong>Tags:</strong> {{ parseTags(event.tags).join(', ') }}</p>
            </div>
          </el-card>
        </el-col>

        <el-col :span="24">
          <!-- Event Location -->
          <el-card v-if="event && event.event_locations && event.event_locations.length > 0" class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Location</h3>
            <el-divider></el-divider>
            <p><strong>City:</strong> {{ event.event_locations[0].city }}</p>
            <p><strong>State:</strong> {{ event.event_locations[0].state }}</p>
            <p><strong>Country:</strong> {{ event.event_locations[0].country }}</p>
            <p><strong>Address:</strong> {{ event.event_locations[0].address }}</p>

            <!-- Google Maps iFrame -->
            <div class="mb-4">
              <el-collapse>
                <el-collapse-item title="Google Maps">
                  <el-card>
                    <el-button @click="toggleMapHeight">{{ collapsedMap ? 'Expand Map' : 'Collapse Map' }}</el-button>
                    <iframe
                      v-if="!collapsedMap"
                      width="100%"
                      height="600"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      :src="generateGoogleMapsLink(event.event_locations[0].lat, event.event_locations[0].long, event.title)"
                      loading="lazy"
                    ></iframe>
                    <iframe
                      v-else
                      width="100%"
                      height="100"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      :src="generateGoogleMapsLink(event.event_locations[0].lat, event.event_locations[0].long, event.title)"
                      loading="lazy"
                    ></iframe>
                  </el-card>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </el-col>

        <el-col :span="24">
          <el-card v-if="event" class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Description</h3>
            <div v-if="!isApproved">
              <!-- Quill Editor as output (readonly) -->
              <QuillEditor
                :value="event.description"
                theme="snow"
                :readonly="true"
                :options="{ readOnly: true, theme: 'snow' }"
                style="width: 100%; height: 100%;"
              />
            </div>
            <p v-else>{{ event.description }}</p>
          </el-card>
        </el-col>
      </el-row>
      <!-- button validation -->
      <el-row class="fixed bottom-8 right-8">
        <el-col :span="24">
          <el-button
          v-if="showValidation && event && event.admin_validation !== undefined && event.admin_validation !== null"
          :type="getButtonType('Approved')"
          :loading="loadingEvent"
          @click="handleValidation('Approved')"
          :plain="true"
          :class="event.admin_validation === 'Approved' ? 'bg-lime-600 text-white' : 'bg-transparent'"
        >
          Approved
        </el-button>
        
        <el-button
          v-if="showValidation && event && event.admin_validation !== undefined && event.admin_validation !== null"
          :type="getButtonType('Denied')"
          :loading="loadingEvent"
          @click="handleValidation('Denied')"
          :plain="true"
          :class="event.admin_validation === 'Denied' ? 'bg-red-600 text-white' : 'bg-transparent'"
        >
          Denied
        </el-button>
        
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>


<script>
import { ElButton, ElMessageBox, ElSkeleton, ElSkeletonItem, ElTag } from 'element-plus';
import axios from 'axios';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  data() {
    return {
    showValidation: true,
    isApproved: false,
    showApproval: 'Reviewed',
    loadingEvent: false,
    collapsedMap: true,
    event: null,
    };
  },
  components: {
    ElButton,
    ElSkeleton,
    ElSkeletonItem,
    ElTag,
    QuillEditor
  },
  computed: {
    event() {
      const uuid = this.$route.params.uuid;
      return this.$store.getters['eventAdmin/getEventAdminById'](uuid);
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
    toggleMapHeight() {
    this.collapsedMap = !this.collapsedMap;
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
    generateGoogleMapsLink(latitude, longitude, eventTitle) {
  const encodedTitle = encodeURIComponent(eventTitle);
  const markerLabel = 'E';
  return `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&t=m&output=embed`;
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
