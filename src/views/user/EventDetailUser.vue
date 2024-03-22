<template>
  <div class="min-h-screen py-8 relative">
    <!-- Container untuk loading -->
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
    <!-- Container untuk konten utama -->
    <el-container v-else>
      <!-- Main Content -->
      <el-row>
        <el-col :span="24">
          <!-- Event Image -->
          <h2 class="text-3xl font-semibold">{{ event?.title }}</h2>
          <p class="text-gray-600 mb-4">{{ event?.organizer }}</p>
          <el-card v-if="event && event.url" class="mb-4">
             <el-image
              :src="event.url"
              style="width: 100%; height: auto;"
              :preview-src-list="[event.url]"
              fit="cover"
            />
          </el-card>
        </el-col>

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
            <p><strong>City:</strong> {{ event.event_locations[0].city }}</p>
            <p><strong>State:</strong> {{ event.event_locations[0].state }}</p>
            <p>
              <strong>Country:</strong> {{ event.event_locations[0].country }}
            </p>
            <p>
              <strong>Address:</strong> {{ event.event_locations[0].address }}
            </p>

            <!-- Google Maps iFrame -->
            <div class="mb-4">
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
                    <el-button type="primary" @click="saveEdit">
                      {{ editMode ? "Save" : "Add" }}
                    </el-button>
                    <el-button @click="cancelEdit">Cancel</el-button>
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
    <!-- Dialog untuk mengedit item checklist -->
    <el-dialog
      :visible.sync="editDialogVisible"
      title="Edit Checklist Item"
      width="30%"
      :before-close="resetEditForm"
    >
      <el-form :model="editForm" ref="editForm" label-width="100px">
        <el-form-item label="Item">
          <el-input v-model="editForm.item"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="saveEdit">
            {{ editMode ? "Save" : "Add" }}
          </el-button>
          <el-button @click="cancelEdit">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      this.editMode = true;
      this.editForm.id = checklistItem.id;
      this.editForm.item = checklistItem.item;
      this.editDialogVisible = true;
    },
    async saveEdit() {
      try {
        const { id, item } = this.editForm;
        const token = localStorage.getItem("token");
        const response = await axios.patch(
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
        console.log("Checklist item updated successfully:", response.data);

        this.resetEditForm();
        this.editDialogVisible = false;

        this.fetchEventDetails();
      } catch (error) {
        console.error("Error updating checklist item:", error);
      }
    },
    async updateChecklistStatus(checklistItem) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
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
