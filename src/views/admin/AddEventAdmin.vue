<template>
  <div class="event-form-container">
    <h2 class="text-2xl font-semibold mb-4">Add Event</h2>
    <!-- Event Form -->
    <el-card>
      <form @submit.prevent="validateBeforeSubmit">
        <el-form-item
          label="Title"
          prop="title"
          :rules="[
            {
              required: true,
              message: 'Please enter event title',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="eventForm.title"
            placeholder="Enter event title"
          ></el-input>
        </el-form-item>

        <!-- Category Field -->
        <el-form-item
          label="Category"
          prop="categoryId"
          :rules="[
            {
              required: true,
              message: 'Please select a category',
              trigger: 'change',
            },
          ]"
        >
          <el-select
            v-model="eventForm.categoryId"
            placeholder="Select category"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.category"
              :value="item.id"
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
        <el-form-item
          label="Type Location"
          prop="type_location"
          :rules="[
            {
              required: true,
              message: 'Please select a location type',
              trigger: 'change',
            },
          ]"
        >
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
        <!-- Quill Editor Column -->
        <el-collapse>
          <el-collapse-item title="Description" name="description">
            <el-col :span="24">
              <el-form-item label="Description" prop="description">
                <quill-editor
                  v-model="eventForm.description"
                  :options="quillOptions"
                ></quill-editor>
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
            :rules="[
              {
                required: true,
                message: 'Please upload an image file',
                trigger: 'change',
              },
              {
                validator: this.validateFile,
                trigger: 'change',
              },
            ]"
          />
          <!-- Pratinjau (preview) file -->
          <div v-if="eventForm.inputFile" class="mt-4">
            <strong>File Preview:</strong>
            <img
              v-if="isImageFile(eventForm.inputFile)"
              :src="filePreview"
              alt="File Preview"
              class="mt-2 max-w-full"
            />
            <span v-else>{{ eventForm.inputFile.name }}</span>

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
      </form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
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
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive } from "vue";

export default {
  data() {
    return {
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
      },
      location: {
        city: "",
        state: "",
        country: "",
        address: "",
        lat: null,
        long: null,
      },
      tagInput: "",
      languageOptions: [],
      isLanguagesLoading: false,
      map: null,
      marker: null,
      locationLabel: "Event Location",
      filePreview: null,
      isLoading: false,
      startDatePickerOptions: {
        // Disable dates before today
        disabledDate(time) {
          return time.getTime() < new Date().setHours(0, 0, 0, 0);
        },
      },
      endDatePickerOptions: {
        // Disable dates before the selected start date
        disabledDate(time) {
          return (
            time.getTime() <=
            new Date(eventForm.start_date).setHours(0, 0, 0, 0)
          );
        },
      },
      quillOptions: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
        placeholder: "Event description...",
        theme: "snow",
      },
    };
  },
  components: {
    QuillEditor,
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
    formattedDescription() {
      // Handle any formatting or cleaning of the description here if needed
      return this.eventForm.description;
    },
  },
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("eventAdmin", ["createEvent"]),
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
    async validateBeforeSubmit() {
      try {
        await this.$refs.eventForm.validate();

        // Jika validasi berhasil, lanjutkan dengan submitForm
        this.submitForm();
      } catch (error) {
        // Jika terdapat error validasi, tampilkan pesan kesalahan
        console.error("Error validasi formulir:", error);
        this.$message.error("Harap isi semua kolom yang diperlukan.");
      }
    },
    async submitForm() {
      try {
        this.isLoading = true;
        // 1. Sesuaikan harga
        this.eventForm.price = parseFloat(this.eventForm.price);
        if (this.eventForm.price === 1) {
          // Jika berbayar, gunakan harga kustom
          this.eventForm.price = parseFloat(this.eventForm.customPrice);
        } else {
          // Jika gratis, set harga ke 0.0
          this.eventForm.price = 0.0;
        }

        // 2. Sesuaikan tipe lokasi
        if (this.eventForm.type_location !== "location") {
          // Jika tipe lokasi bukan 'location', bersihkan informasi lokasi
          this.location = {
            country: "",
            state: "",
            city: "",
            address: "",
            lat: null,
            long: null,
          };
        }

        // 3. Sesuaikan detail teknis
        if (this.eventForm.technical === "repeat") {
          // Jika teknisnya 'repeat', bersihkan tanggal dan waktu selesai
          this.eventForm.end_date = null;
          this.eventForm.end_time = null;
        }

        // 4. Persiapkan payload untuk backend
        const formData = new FormData();

        // Menggunakan `forEach` untuk menghindari masalah dengan for...in pada objek FormData
        Object.keys(this.eventForm).forEach((key) => {
          if (key !== "inputFile" && key !== "fileObject") {
            formData.append(key, this.eventForm[key]);
          }
        });

        // Menambahkan file ke FormData
        formData.append("inputFile", this.eventForm.fileObject);

        // Panggil aksi di toko untuk membuat event
        await this.$store.dispatch("eventAdmin/createEvent", formData); // Reset formulir atau lakukan tindakan lain yang diperlukan
        this.$router.push({ name: "EventAdmin" });
        this.$refs.addEventForm.resetFields();
      } catch (error) {
        this.isLoading = false;
        // Tangani kesalahan jika diperlukan
        console.error("Error creating event:", error);

        // Tampilkan pesan kesalahan jika diperlukan
        this.$message.error("Gagal membuat event. Silakan coba lagi.");
      } finally {
        // Setelah pengiriman data selesai, set isLoading menjadi false
        this.isLoading = false;
      }
    },

    validateFile(rule, value, callback) {
      if (!value) {
        callback(new Error("Please upload an image file"));
      } else {
        const isImage = this.isImageFile(value);
        const isLt2M = value.size / 1024 / 1024 < 2;

        if (!isImage) {
          callback(
            new Error(
              "Invalid image file type. Please upload a valid image file."
            )
          );
        } else if (!isLt2M) {
          callback(new Error("Image size must be less than 2MB"));
        } else {
          callback();
        }
      }
    },
    handleFileUpload(event) {
      const fileInput = event.target; // Use event.target to get the input element
      const file = fileInput.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        this.eventForm.inputFile = file;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          this.$refs.addEventForm.validateField("inputFile");
          return;
        }

        const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
        if (file.size > maxSize) {
          this.$refs.addEventForm.validateField("inputFile");
          return;
        }

        if (URL.createObjectURL) {
          this.filePreview = URL.createObjectURL(file);
        } else {
          this.filePreview = window.URL.createObjectURL(file);
        }
      } else {
        this.eventForm.inputFile = null;
        this.filePreview = null;
      }
      this.$refs.addEventForm.fields.forEach((field) => {
        if (field.prop === "inputFile") {
          field.validate();
        }
      });
    },
    // Fungsi bantuan untuk memeriksa apakah file adalah gambar
    isImageFile(file) {
      return file.type.startsWith("image/");
    },

    deleteFile() {
      // Hapus pratinjau dan reset nilai file input
      this.filePreview = null;
      this.eventForm.inputFile = null;
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

    // Existing method for updating Quill content
    updateQuillContent() {
      const quillEditor = this.$refs.quillEditor;
      console.log("Quill Editor Reference:", quillEditor);

      if (quillEditor) {
        const content = quillEditor.quill.root.innerHTML;
        console.log("Quill Content:", content);

        // Hapus tag <p> yang dibungkus secara otomatis oleh Quill
        const cleanContent = content.replace(/<\/?p>/g, "");

        // Simpan isi ke dalam data eventForm
        this.$set(this.eventForm, "description", cleanContent);
      }
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setLocationMarker(latitude, longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
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
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        }
      });
      this.getUserLocation();
    },
    updateLocationFields() {
      // Update the form fields based on the location data
      this.eventForm.city = this.location.city;
      this.eventForm.state = this.location.state;
      this.eventForm.country = this.location.country;
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
  },
};
</script>
<style scoped>
.event-form-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}
</style>
