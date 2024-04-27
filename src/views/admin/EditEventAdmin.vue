<template>
  <div class="event-form-container">
    <h2 class="text-2xl font-semibold mb-4">Edit Event</h2>
    <!-- Event Form -->
    <el-card>
      <el-form
        ref="eventFormRef"
        :model="eventForm"
        :rules="rules"
        @submit.prevent="submitForm"
      >
        <el-form-item label="Title" prop="title">
          <el-input
            v-model="eventForm.title"
            placeholder="Enter event title"
            required
          ></el-input>
        </el-form-item>

        <!-- Category Field -->
        <el-form-item label="Category" prop="categoryId">
          <el-select
            v-model="eventForm.categoryId"
            placeholder="Select category"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.category"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- Price Field -->
        <el-form-item label="Price" prop="price">
          <el-radio-group v-model="eventForm.price">
            <el-radio label="0">Free</el-radio>
            <el-radio label="1">Paid</el-radio>
          </el-radio-group>
          <el-input
            v-if="eventForm.price === '1'"
            v-model="eventForm.customPrice"
            placeholder="Enter event price"
            type="number"
          ></el-input>
        </el-form-item>

        <!-- Type Location Field -->
        <el-form-item label="Type Location" prop="type_location">
          <el-radio-group v-model="eventForm.type_location">
            <el-radio :label="'location'">Location</el-radio>
            <el-radio :label="'online'">Online</el-radio>
            <el-radio :label="'tba'">TBA</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- Location Form Section -->
        <el-form-item v-show="eventForm.type_location === 'location'">
          <!-- Existing Location Form Fields -->
          <el-form-item label="Country" prop="country" style="width: 100%">
            <el-input
              v-model="location.country"
              placeholder="Enter country"
            ></el-input>
          </el-form-item>

          <!-- State Field -->
          <el-form-item
            label="State"
            prop="state"
            style="width: 100%"
            class="my-3"
          >
            <el-input
              v-model="location.state"
              placeholder="Enter state"
            ></el-input>
          </el-form-item>

          <!-- City Field -->
          <el-form-item
            label="City"
            prop="city"
            style="width: 100%"
            class="my-3"
          >
            <el-input
              v-model="location.city"
              placeholder="Enter city"
            ></el-input>
          </el-form-item>

          <!-- Address Field -->
          <el-form-item label="Address" prop="address">
            <el-input
              v-model="location.address"
              type="textarea"
              placeholder="Enter event address"
              style="width: 100%"
              :rows="4"
              :cols="125"
              class="my-3"
            ></el-input>
          </el-form-item>

          <!-- Leaflet Map -->
          <div
            id="map"
            style="height: 400px; width: 100%"
            class="mt-20 rounded-xl"
          ></div>
        </el-form-item>

        <!-- Technical Section -->
        <el-form-item label="Technical" prop="technical">
          <el-radio-group v-model="eventForm.technical">
            <el-radio label="choose">Choose schedule</el-radio>
            <el-radio label="repeat">Repeat</el-radio>
          </el-radio-group>

          <el-row v-if="eventForm.technical === 'choose'">
            <!-- Event Schedule for "Choose" -->
            <el-col :span="12">
              <el-form-item label="Start Date" prop="start_date">
                <el-date-picker
                  v-model="eventForm.start_date"
                  type="date"
                  placeholder="Select start date"
                  class="my-3"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  :picker-options="startDatePickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Start Time" prop="start_time">
                <el-time-picker
                  v-model="eventForm.start_time"
                  placeholder="Select time"
                  format="HH:mm"
                  value-format="HH:mm"
                ></el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="End Date" prop="end_date">
                <el-date-picker
                  v-model="eventForm.end_date"
                  type="date"
                  placeholder="Select end date"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  :picker-options="endDatePickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="End Time" prop="end_time">
                <el-time-picker
                  v-model="eventForm.end_time"
                  placeholder="Select time"
                  format="HH:mm"
                  value-format="HH:mm"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            <!-- Event Schedule for "Repeat" -->
            <el-col :span="12">
              <el-form-item label="Start Date" prop="start_date">
                <el-date-picker
                  v-model="eventForm.start_date"
                  type="date"
                  placeholder="Select start date"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Start Time" prop="start_time">
                <el-time-picker
                  v-model="eventForm.start_time"
                  placeholder="Select time"
                  format="HH:mm"
                  value-format="HH:mm"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
       
        <el-collapse class="mb-4">
          <el-collapse-item title="Description" name="description">
            <el-col :span="24">
              <el-form-item label="Description" prop="description">
                  <ckeditor :editor="editor" v-model="eventForm.description" :config="editorConfig"></ckeditor>
              </el-form-item>
            </el-col>
          </el-collapse-item>
        </el-collapse>

        <!-- Language Column -->
        <el-form-item label="Language" prop="language">
          <el-select
            v-model="eventForm.language"
            placeholder="Select event language"
            :disabled="isLanguagesLoading"
          >
            <el-option
              v-for="language in filteredLanguages"
              :key="language.iso639_1"
              :label="language.name"
              :value="language.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- Tag Column -->
        <el-form-item label="Tag" prop="tags">
          <el-tag
            v-for="tag in eventForm.tags"
            :key="tag"
            closable
            @close="removeTag(tag)"
            >{{ tag }}</el-tag
          >
          <el-input
            v-model="tagInput"
            @keyup.enter="addTag"
            @keypress.enter="handleTagInputKeyPress"
            placeholder="Enter tag"
          ></el-input>
        </el-form-item>
        <!-- file upload -->
        <el-form-item>
          <label
            for="dropzone-file"
            class="mb-5 mx-20 cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Event Image
            </h2>

            <p class="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your file PNG, JPG or JPEG.
            </p>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              ref="fileInput"
              @change="handleFileUpload"
              name="inputFile"
            />
            <!-- Pratinjau (preview) file -->
            <div class="mt-4">
              <strong>File Preview:</strong>
              <img
                :src="filePreview"
                alt="File Preview"
                class="mt-2 max-w-full"
              />

              <!-- Tombol hapus -->
              <button
                type="button"
                class="mt-2 text-red-600 cursor-pointer"
                @click="deleteFile"
              >
                Delete
              </button>
            </div>
          </label>
        </el-form-item>

        <!-- Submit Button -->
        <el-form-item>
          <el-button
            type="primary"
            plain
            :loading="isLoading"
            native-type="submit"
          >
            Submit
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { mapActions, mapGetters } from "vuex";
import { UploadFilled } from "@element-plus/icons-vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElTimePicker,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElOption,
  ElMessageBox,
} from "element-plus";
import { reactive } from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
       editor: ClassicEditor,
      eventForm: {
        title: "",
        categoryId: null,
        price: "1",
        customPrice: null,
        start_date: null,
        end_date: null,
        start_time: null,
        end_time: null,
        type_location: "location",
        technical: "choose",
        description: "",
        language: "",
        tags: [],
        inputFile: null,
        city: "",
        state: "",
        country: "",
        address: "",
        lat: null,
        long: null,
      },
      location: {
        city: "",
        state: "",
        country: "",
        address: "",
        lat: null,
        long: null,
      },
            toolbar: {
   editorConfig: {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'indent',
          'outdent',
          '|',
          'blockQuote',
          'codeBlock',
          '|',
          'link',
          '|',
          'undo',
          'redo'
        ]
      }
    },
},
      tagInput: "",
      languageOptions: [],
      isLanguagesLoading: false,
      map: null,
      marker: null,
      locationLabel: null,
      filePreview: null,
      originalFilePreview: null,
      isLoading: false,
    };
  },
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElDatePicker,
    ElTimePicker,
    ElRadio,
    ElRadioGroup,
    ElSelect,
    ElOption,
    UploadFilled,
    ElMessageBox,
  },
  computed: {
    ...mapGetters("categories", ["getCategories", "isLoading"]),
    filteredLanguages() {
      const selectedLanguages = this.eventForm.tags.map((tag) =>
        tag.toLowerCase()
      );
      const uniqueLanguages = new Set(selectedLanguages);

      return this.languageOptions.filter((language) => {
        return !uniqueLanguages.has(language.iso639_1.toLowerCase());
      });
    },
    defaultLanguage() {
      return "English"; // Replace with the appropriate English language code
    },
    categories() {
      return this.getCategories;
    },
    event() {
      const uuid = this.$route.params.uuid;
      return this.$store.getters['eventAdmin/getEventAdminById'](uuid);
    },
  },
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("eventMain", ["updateEvent"]),
async loadEventData(uuid) {
  try {
    // Panggil API untuk mendapatkan detail event berdasarkan UUID
  
    const response = await this.$store.dispatch('eventAdmin/fetchEventAdminById', uuid)
    const eventData = this.event;

    const categories = this.getCategories;

    // Temukan ID kategori yang sesuai dengan nama kategori dari data event
    let categoryId = null;
    if (categories && categories.length > 0) {
      const category = categories.find(
        (category) => category.category === eventData.category
      );
      if (category) {
        categoryId = category.id;
      } else {
        console.error("Category not found for event:", eventData.title);
      }
    } else {
      console.error("No categories available.");
    }

    // Isi formulir dengan data event yang dimuat
    this.eventForm = {
      title: eventData.title,
      categoryId: categoryId,
      price: eventData.price.toString(),
      customPrice: eventData.price !== null ? eventData.price : null,
      start_date: eventData.start_date,
      end_date: eventData.end_date,
      start_time: eventData.start_time,
      end_time: eventData.end_time,
      type_location: eventData.type_location,
      technical: eventData.technical,
      description: eventData.description,
      language: eventData.language,
      tags: JSON.parse(eventData.tags),
    };

    this.filePreview = eventData.url;
    this.originalFilePreview = eventData.url;

    this.location = {
      city: eventData.event_locations[0].city,
      state: eventData.event_locations[0].state,
      country: eventData.event_locations[0].country,
      address: eventData.event_locations[0].address,
      lat: eventData.event_locations[0].lat,
      long: eventData.event_locations[0].long,
    };

    // Set marker position based on event location
    this.setLocationMarker(
      eventData.event_locations[0].lat,
      eventData.event_locations[0].long
    );

    // Menyesuaikan nilai radio group berdasarkan harga event
if (eventData.price !== null && parseFloat(eventData.price) > 0) {
  this.eventForm.price = "1"; // Set radio group ke "Paid"
} else {
  this.eventForm.price = "0"; // Set radio group ke "Free"
}

// Jika event memiliki harga lebih dari 0, atur customPrice
if (parseFloat(eventData.price) > 0) {
  this.eventForm.customPrice = parseFloat(eventData.price);
} else {
  this.eventForm.customPrice = null;
}


    this.eventId = uuid;
  } catch (error) {
    ElMessage({
      type: "error",
      message:
        "Failed to load event details: " +
        (error.response.data.msg ||
          "An error occurred while loading the event details. Please try again."),
    });
  }
},

    async fetchLanguages() {
      try {
        this.isLanguagesLoading = true;

        const response = await axios.get("https://restcountries.com/v2/all");
        const languages = response.data
          .map((country) => country.languages)
          .flat()
          .filter((language) => language && language.iso639_1);

        const uniqueLanguagesSet = new Set(
          languages.map((language) => language.iso639_1)
        );

        this.languageOptions = Array.from(uniqueLanguagesSet).map(
          (iso639_1) => {
            const language = languages.find(
              (lang) => lang.iso639_1 === iso639_1
            );
            return {
              iso639_1: language.iso639_1,
              name: language.name || language.nativeName,
            };
          }
        );

        this.eventForm = reactive({
          ...this.eventForm,
          language: this.defaultLanguage,
        });
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        this.isLanguagesLoading = false;
      }
    },

    async submitForm() {
      try {
        this.isLoading = true;

        // Adjusting price
        this.eventForm.price = parseFloat(this.eventForm.price);
        if (this.eventForm.price === 1) {
          this.eventForm.price = parseFloat(this.eventForm.customPrice);
        } else {
          this.eventForm.price = 0.0;
        }

        // Adjusting location type
        if (this.eventForm.type_location !== "location") {
          this.location = {
            country: "",
            state: "",
            city: "",
            address: "",
            lat: null,
            long: null,
          };
        }

        // Adjusting technical details
        if (this.eventForm.technical === "repeat") {
          this.eventForm.end_date = null;
          this.eventForm.end_time = null;
        }

        // Adjusting date and time format before sending to backend
        this.adjustDateTimeFormat();

        // Call isLocation() to ensure lat and long are updated
        this.isLocation();

        // Prepare payload for backend
        const formData = new FormData();
        Object.keys(this.eventForm).forEach((key) => {
          if (key !== "inputFile") {
            formData.append(key, this.eventForm[key]);
          }
        });

        // Check if the file preview has changed before calling convertFilePreviewToFile()
        if (this.filePreview !== this.originalFilePreview) {
          await this.convertFilePreviewToFile();
        }

        // Only append inputFile to formData if it's not null
        if (this.eventForm.inputFile) {
          formData.append("inputFile", this.eventForm.inputFile);
        }

        await this.$store.dispatch("eventMain/updateEvent", {
          uuid: this.$route.params.uuid,
          formData: formData,
        });

        // Redirecting to EventAdmin page
        this.$router.push({ name: "EventAdmin" });
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        this.isLoading = false;
      }
    },

    adjustDateTimeFormat() {
      // Adjust start date format
      if (this.eventForm.start_date) {
        this.eventForm.start_date = this.formatDate(this.eventForm.start_date);
      }

      // Adjust end date format
      if (this.eventForm.end_date) {
        this.eventForm.end_date = this.formatDate(this.eventForm.end_date);
      }

      // Adjust start time format
      if (this.eventForm.start_time) {
        this.eventForm.start_time = this.formatTime(this.eventForm.start_time);
      }

      // Adjust end time format
      if (this.eventForm.end_time) {
        this.eventForm.end_time = this.formatTime(this.eventForm.end_time);
      }
    },

    // Helper function to format date
    formatDate(date) {
      const formattedDate = new Date(date);
      return formattedDate.toISOString().split("T")[0];
    },

    // Helper function to format time
    formatTime(time) {
      const formattedTime = new Date(`1970-01-01T${time}`);
      return formattedTime.toTimeString().split(" ")[0];
    },

    async handleFileUpload(event) {
      const fileInput = event.target.files[0];
      if (!fileInput) return;

      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

      // Check file type
      if (!allowedTypes.includes(fileInput.type)) {
        this.$message.error(
          "Invalid file type. Please upload a valid image file."
        );
        return;
      }

      // Check file size
      if (fileInput.size > maxSize) {
        this.$message.error("Image size must be less than 2MB");
        return;
      }

      // Create a preview URL for the selected image file
      const imageUrl = URL.createObjectURL(fileInput);
      this.filePreview = imageUrl;

      // Set the selected file object to the eventForm
      this.eventForm.inputFile = fileInput; // Langsung menetapkan nilai, tidak perlu menggunakan this.$set
    },

    deleteFile() {
      // Clear the file preview and reset the file input value
      this.clearFileInput();

      // Reload event data with the saved UUID
      this.loadEventData(this.eventId);
    },

    clearFileInput() {
      this.filePreview = null;
      this.eventForm.inputFile = null;
    },

    async convertFilePreviewToFile() {
      try {
        // Check if there's a file preview and inputFile is not set
        if (this.filePreview && !this.eventForm.inputFile) {
          // Check if the file preview is an image
          if (this.isImageFile(this.filePreview)) {
            // Retrieve the file preview from the URL
            const response = await fetch(this.filePreview);
            const blob = await response.blob();
            // Create a file object from the blob
            const file = new File([blob], "preview_file", { type: blob.type });
            // Set the file object to the eventForm.inputFile
            this.eventForm.inputFile = file;
          } else {
            console.error("Invalid file type for preview.");
            // Handle invalid file type for preview
            this.$message.error("Invalid file type for preview.");
          }
        }
      } catch (error) {
        console.error("Error converting file preview to file object:", error);
        // Handle error
        this.$message.error("Error converting file preview to file object.");
      }
    },

    isImageFile(file) {
      return file.type.startsWith("image/");
    },

    addTag() {
      if (this.tagInput && !this.eventForm.tags.includes(this.tagInput)) {
        this.eventForm.tags.push(this.tagInput);
        this.tagInput = "";
      }
    },

    handleTagInputKeyPress(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addTag();
      }
    },

    removeTag(tag) {
      const index = this.eventForm.tags.indexOf(tag);
      if (index !== -1) {
        this.eventForm.tags.splice(index, 1);
      }
    },
    getFormattedDescription() {
      // Handle any formatting or cleaning of the description here if needed
      return this.eventForm.description;
    },

    // New method to set location marker based on coordinates
    setLocationMarker(latitude, longitude) {
      // Update location data
      this.location.lat = latitude;
      this.location.long = longitude;

      // Set marker position
      this.marker.setLatLng([latitude, longitude]);

      // Pan to the user's location
      this.map.panTo([latitude, longitude]);

      // Ensure that the marker remains draggable after setting the location
      this.marker.dragging.enable();
      this.updateLocationFields();
    },

    initializeMap() {
      this.map = L.map("map").setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);

      // Create a draggable marker without adding it to the map initially
      this.marker = L.marker([0, 0], { draggable: true });

      // Add the marker to the map when initializing
      this.marker.addTo(this.map);

      this.marker.bindPopup(this.locationLabel).openPopup();

      // Initialize geocoder control
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
      }).addTo(this.map);

      // Handle 'markgeocode' event
      geocoder.on("markgeocode", async (event) => {
        const { latlng, name, properties } = event.geocode;

        // Pemeriksaan keberadaan latlng
        if (latlng) {
          // Update location data
          this.location.lat = latlng.lat;
          this.location.long = latlng.lng;
          this.location.address = name;

          // Set marker position
          this.marker.setLatLng(latlng);

          // Pan to the searched location
          this.map.panTo(latlng);

          // Ensure that the marker remains draggable after the search
          this.marker.dragging.enable();
          this.updateLocationFields();

          // Log response untuk pemeriksaan lebih lanjut
          console.log("Geocoding Response:", event.geocode);

          // Update City, State, Country based on geocoding result
          this.location.city = (properties && properties.address.city) || "";
          this.location.state = (properties && properties.address.state) || "";
          this.location.country =
            (properties && properties.address.country) || "";
          this.location.address =
            (properties && properties.address.address) || "";

          // Update the form fields based on the location data
          this.eventForm.city = this.location.city;
          this.eventForm.state = this.location.state;
          this.eventForm.country = this.location.country;
          this.eventForm.address = this.location.address;

          // Call isLocation() after obtaining user location
          this.isLocation();
        }
      });

      // Handle 'dragend' event on the marker
      this.marker.on("dragend", async () => {
        const { lat, lng } = this.marker.getLatLng();
        this.location.lat = lat;
        this.location.long = lng;

        // Reverse geocode to get the location name based on coordinates
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          const locationName = response.data.display_name || "Unknown Location";

          // Update locationLabel based on the reverse geocoding result
          this.locationLabel = `Location: ${locationName}`;
          this.marker.setPopupContent(this.locationLabel).openPopup();

          // Update City, State, Country based on reverse geocoding result
          this.location.city =
            (response.data.address && response.data.address.city) || "";
          this.location.state =
            (response.data.address && response.data.address.state) || "";
          this.location.country =
            (response.data.address && response.data.address.country) || "";
          this.location.address =
            (response.data.address && response.data.address.address) || "";

          this.updateLocationFields();

          // Call isLocation() after marker drag ends
          this.isLocation();
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        }
      });
    },

    updateLocationFields() {
      // Update the form fields based on the location data
      this.eventForm.city = this.location.city;
      this.eventForm.state = this.location.state;
      this.eventForm.country = this.location.country;
    },
    isLocation() {
      if (this.eventForm.type_location === "location") {
        this.eventForm.country = this.location.country;
        this.eventForm.state = this.location.state;
        this.eventForm.city = this.location.city;
        this.eventForm.address = this.location.address;
        this.eventForm.lat = this.location.lat;
        this.eventForm.long = this.location.long;
      } else {
        // Jika jenis lokasi bukan 'location', reset nilai objek location
        this.location = {
          country: "",
          state: "",
          city: "",
          address: "",
          lat: null,
          long: null,
        };
        // Reset juga nilai pada eventForm
        this.eventForm.country = "";
        this.eventForm.state = "";
        this.eventForm.city = "";
        this.eventForm.address = "";
        this.eventForm.lat = null;
        this.eventForm.long = null;
      }
    },
  },
  watch: {
    "eventForm.type_location": function (newTypeLocation) {
      if (newTypeLocation === "online" || newTypeLocation === "tba") {
        Object.assign(this.location, {
          country: "",
          state: "",
          city: "",
          address: "",
          lat: null,
          long: null,
        });
      }
    },
  },
  mounted() {
    this.fetchLanguages();
    this.fetchCategories();
    this.initializeMap();
    this.isLocation();
  },
  created() {
    this.fetchCategories();
    // Pemanggilan metode loadEventData dengan UUID dari parameter
    const uuid = this.$route.params.uuid; // Mengambil UUID dari parameter route
    this.loadEventData(uuid);
  },
};
</script>
<style scoped>
.event-form-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.output {
  margin-top: 20px;
}
</style>
