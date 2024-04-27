<template>
  <div class="min-h-screen py-8 relative">
    <!-- Container untuk loading -->
  <div v-if="$store.getters['eventMain/isLoading']" class="p-4">
      <!-- Skeleton untuk header -->
      <div class="mb-4">
        <h2 class="text-3xl font-semibold bg-gray-300 w-64 h-12 animate-pulse"></h2>
        <p class="text-gray-600 bg-gray-200 w-48 h-6 animate-pulse"></p>
      </div>
      <!-- Skeleton untuk gambar -->
      <div v-if="event && event.url" class="mb-4">
        <div class="bg-gray-200 w-full h-64 animate-pulse"></div>
      </div>
      <!-- Skeleton untuk detail acara -->
      <div>
        <!-- Skeleton untuk setiap detail -->
        <div class="mb-4">
          <div class="flex items-center">
            <div class="bg-gray-200 w-24 h-6 animate-pulse mr-4"></div>
            <div class="bg-gray-200 w-48 h-6 animate-pulse"></div>
          </div>
        </div>
        <!-- Skeleton untuk lokasi -->
        <div v-if="event && event.event_locations && event.event_locations.length > 0" class="mb-4">
          <div class="flex items-center">
            <div class="bg-gray-200 w-24 h-6 animate-pulse mr-4"></div>
            <div class="bg-gray-200 w-48 h-6 animate-pulse"></div>
          </div>
        </div>
        <!-- Skeleton untuk deskripsi -->
        <div class="mb-4">
          <div class="bg-gray-200 w-full h-48 animate-pulse"></div>
        </div>
      </div>
    </div>
    <!-- Container untuk konten utama -->
    <el-container v-else>
      <!-- Main Content -->
      <el-row>
        <el-col :span="24">
          <!-- Event Image -->
          <h2 class="text-3xl font-semibold">{{ event?.title }}</h2>
          <p class="text-gray-600 mb-4">{{ event?.organizer }}</p>
          <el-card v-if="event && event.url" class="mb-4">
        <div class="my-16 container mx-auto md:px-6 relative overflow-hidden">
          <!-- Background blur dengan gambar dari event.url -->
          <div class="absolute inset-0 z-0 flex justify-center items-center">
            <div 
              class="blur-xl bg-center rounded-xl"
              :style="{
                backgroundImage: `url(${event?.url})`,
                width: '100vw' /* Lebar 100% dari lebar viewport */,
                height: '100vh' /* Tinggi 100% dari tinggi viewport */,
              }"
            ></div>
          </div>

          <!-- Kontainer gambar -->
          <div class="relative z-10 overflow-hidden flex justify-center">
            <!-- Gambar dengan efek cover -->
              <el-image
                  :src="event.url"
                  class="w-full sm:h-[500px] sm:w-[600px] md:h-[480px] md:w-[800px] lg:h-[490px] lg:w-[900px] xl:h-[500px] xl:w-[1000px] object-fill mx-auto"  
                  :preview-src-list="[event.url]"
                  fit="cover"
                />
          </div>
        </div>
          </el-card>
        </el-col>
          <!-- event collapse -->
         <el-collapse v-model="isCollapsed" class="mb-4 w-full">
          <el-collapse-item  title="Event detail" name="event-detail">
            <div class="w-full">
                        <el-col :span="24">
          <!-- Event Details -->
          <el-card v-if="event" class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Event Details</h3>
            <el-divider></el-divider>
            <p>
              <strong>Category:</strong> {{ prettifyCategory(event.category) }}
            </p>
            <p>
              <strong>Price:</strong>
              {{ event.price ? `${event.price}` : "Free" }}
            </p>
            <p>
              <strong>Start Date:</strong> {{ formatDate(event.start_date) }}
            </p>
            <p><strong>End Date:</strong> {{ formatDate(event.end_date) }}</p>
            <p>
              <strong>Start Time:</strong> {{ formatTime(event.start_time) }}
            </p>
            <p><strong>End Time:</strong> {{ formatTime(event.end_time) }}</p>
            <div v-if="event.tags && event.tags.length > 0">
              <strong>Tags:</strong>
              <p>
                <el-tag
                  v-for="(tag, index) in parseTags(event.tags)"
                  :key="index"
                  type="primary"
                  class="ml-2"
                  >{{ tag }}</el-tag
                >
              </p>
            </div>
          </el-card>
        </el-col>

        <el-col :span="24">
          <!-- Event Location -->
          <el-card
            v-if="
              event && event.event_locations && event.event_locations.length > 0
            "
            class="mb-4"
          >
            <h3 class="text-2xl font-semibold mb-4">Location</h3>
            <el-divider></el-divider>
            <!-- Kondisional untuk menampilkan informasi lokasi -->
            <template v-if="event.type_location === 'location'">
              <p><strong>City:</strong> {{ event.event_locations[0].city }}</p>
              <p>
                <strong>State:</strong> {{ event.event_locations[0].state }}
              </p>
              <p>
                <strong>Country:</strong> {{ event.event_locations[0].country }}
              </p>
              <p>
                <strong>Address:</strong> {{ event.event_locations[0].address }}
              </p>
            </template>
            <template v-else-if="event.type_location === 'online'">
              <h1 class="text-center font-bold text-3xl text-gray-600">
                Online
              </h1>
            </template>
            <template v-else-if="event.type_location === 'tba'">
              <h1 class="text-center font-bold text-3xl text-gray-600">
                To be announced
              </h1>
            </template>
            <!-- End of kondisional -->
            <!-- Google Maps iFrame -->
            <div v-if="event.type_location === 'location'" class="mb-4">
              <el-collapse>
                <el-collapse-item title="Google Maps">
                  <el-card>
                    <el-button @click="toggleMapHeight">{{
                      collapsedMap ? "Expand Map" : "Collapse Map"
                    }}</el-button>
                    <iframe
                      v-if="!collapsedMap"
                      width="100%"
                      height="600"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      :src="
                        generateGoogleMapsLink(
                          event.event_locations[0].lat,
                          event.event_locations[0].long,
                          event.title
                        )
                      "
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
                      :src="
                        generateGoogleMapsLink(
                          event.event_locations[0].lat,
                          event.event_locations[0].long,
                          event.title
                        )
                      "
                      loading="lazy"
                    ></iframe>
                  </el-card>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </el-col>

        <el-col :span="24">
          <!-- Description -->
          <el-card v-if="event" class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Description</h3>
            <el-empty v-if="!event.description">
              <span slot="description">No description available</span>
            </el-empty>
            <div v-else v-html="event.description"></div>
          </el-card>
        </el-col>
            </div>
          </el-collapse-item>
          </el-collapse>

        <!-- Checklist Section -->
        <el-col :span="24">
          <el-card v-if="event && event.event_checklists" class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Checklist</h3>
            <el-row class="mb-2">
              <el-col :span="20">
                <el-input
                  v-model="newChecklistItem"
                  placeholder="Add new checklist item"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addNewChecklistItem" plain
                  >Add</el-button
                >
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <!-- Checklist Items -->
            <el-row
              v-if="event.event_checklists && event.event_checklists.length > 0"
              class="mb-2"
            >
              <ul
                v-if="
                  event.event_checklists && event.event_checklists.length > 0
                "
                class="mb-2"
              >
                <li
                  v-for="(item, index) in event.event_checklists"
                  :key="index"
                  class="flex items-center"
                >
                  <el-checkbox
                    v-model="item.status"
                    @change="updateChecklistStatus(item)"
                  >
                    <span
                      :class="{ 'text-gray-400 line-through': item.status }"
                    >
                      {{ item.item }} - {{ formatDate(item.date_added) }}
                    </span>
                  </el-checkbox>
                  <div class="ml-auto">
                    <el-button
                      type="text"
                      size="mini"
                      @click="editChecklist(item)"
                      >Edit</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="deleteChecklist(item)"
                      >Delete</el-button
                    >
                  </div>
                </li>
              </ul>
            </el-row>
            <el-row v-else class="mb-2">
              <el-col :span="24">
                <p>No checklist available.</p>
              </el-col>
            </el-row>
            <!-- Add/Edit Checklist Form -->
            <el-row>
              <el-col :span="24">
                <el-form v-if="editMode" :model="editForm" label-width="100px">
                  <el-form-item label="Item">
                    <el-input v-model="editForm.item"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" native-type="button" plain @click="saveEdit">
                      {{ editMode ? "Save" : "Add" }}
                    </el-button>
                    <el-button type="primary" native-type="button" plain @click="cancelEdit">Cancel</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
          <el-card v-else class="mb-4">
            <h3 class="text-2xl font-semibold mb-4">Checklist</h3>
            <el-divider></el-divider>
            <p>No checklist available.</p>
            <el-button type="primary" @click="showAddChecklistDialog">
              Add Checklist
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import {
  ElButton,
  ElCollapse,
  ElCollapseItem,
  ElCard,
  ElDivider,
  ElMessageBox,
  ElSkeleton,
  ElTag,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
} from "element-plus";
import axios from "axios";

export default {
  data() {
    return {
      newChecklistItem: "",
      showImageDialog: false,
      loadingEvent: false,
      collapsedMap: true,
      event: null,
      editDialogVisible: false,
      editForm: {
        id: null,
        item: "",
      },
      editMode: false,
      form: {
        item: "",
      },
      isCollapsed: true,
    };
  },

  components: {
    ElButton,
    ElCollapse,
    ElCollapseItem,
    ElCard,
    ElDivider,
    ElMessageBox,
    ElSkeleton,
    ElTag,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
  },
  methods: {
    showImageDetailDialog() {
      this.showImageDialog = true;
    },
    // Metode untuk menyembunyikan dialog gambar
    hideImageDetailDialog() {
      this.showImageDialog = false;
    },
    toggleMapHeight() {
      this.collapsedMap = !this.collapsedMap;
    },
    parseTags(tagsString) {
      try {
        const parsedTags = JSON.parse(tagsString);
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
      return `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&t=m&output=embed`;
    },
    async fetchEventDetails() {
      try {
        const uuid = this.$route.params.uuid;
        const response = await this.$store.dispatch(
          "eventMain/fetchEventByUuidForUser",
          uuid
        );
        this.event = response;
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    },
    prettifyCategory(category) {
      return category.replace(/\b\w/g, (char) => char.toUpperCase());
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    formatTime(time) {
      const formattedTime = new Date(`1970-01-01T${time}`);
      return formattedTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
    async addNewChecklistItem() {
      if (this.newChecklistItem.trim() !== "") {
        try {
          const token = localStorage.getItem("token"); // Ambil token dari local storage
          const response = await axios.post(
            `/event/checklist/add/${this.event.uuid}`,
            {
              item: this.newChecklistItem.trim(),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Sertakan token sebagai header Authorization
              },
            }
          );

          console.log("Checklist added successfully:", response.data);

          // Tambahkan item checklist ke array event.event_checklists
          this.event.event_checklists.push({
            item: this.newChecklistItem.trim(),
            status: false, // Atur status awal item
            date_added: new Date(), // Atur tanggal tambah item
          });

          // Bersihkan input setelah menambahkan item
          this.newChecklistItem = "";
        } catch (error) {
          console.error("Error adding checklist:", error);
        }
      }
    },
    async editChecklist(checklistItem) {
      this.editMode = !this.editMode;
      this.editForm.id = checklistItem.id;
      this.editForm.item = checklistItem.item;
      this.editDialogVisible = true;
    },
    async saveEdit() {
      try {
        const { id, item } = this.editForm;
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `/event/checklist/update/${this.event.uuid}/${id}`,
          {
            item: item,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.resetEditForm();
        this.editDialogVisible = false;
        this.editMode = false
        this.fetchEventDetails();
      } catch (error) {
        console.error("Error updating checklist item:", error);
      }
    },
    async updateChecklistStatus(checklistItem) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `/event/checklist/update/${this.event.uuid}/${checklistItem.id}`,
          {
            status: checklistItem.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Checklist status updated successfully", response.data);

        // Jika Anda perlu melakukan sesuatu setelah berhasil memperbarui status checklist, Anda dapat menambahkan kode di sini
      } catch (error) {
        console.error("Error updating checklist status:", error);
      }
    },
    cancelEdit() {
      this.editDialogVisible = false;
      this.editMode = false;
      this.resetEditForm();
    },
    resetEditForm() {
      this.editForm.id = null;
      this.editForm.item = "";
    },
    async deleteChecklist(checklistItem) {
      try {
        await this.$confirm(
          "Are you sure you want to delete this checklist item?",
          "Warning",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        );
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `/event/checklist/delete/${checklistItem.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Checklist deleted successfully:", response.data);

        this.fetchEventDetails();
      } catch (error) {
        console.error("Error deleting checklist:", error);
      }
    },
  },
  created() {
    this.fetchEventDetails();
  },
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Event Detail");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Event Detail");
    next();
  },
};
</script>
