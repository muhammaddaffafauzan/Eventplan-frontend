<template>
  <div class="event-form-container">
    <h2 class="text-2xl font-semibold mb-4">Add Event</h2>

    <!-- Event Form -->
    <el-card>
      <el-form ref="addEventForm" :model="eventForm" label-width="120px">
        <!-- Title Field -->
        <el-form-item label="Title" prop="title">
          <el-input v-model="eventForm.title" placeholder="Enter event title"></el-input>
        </el-form-item>

        <!-- Category Field -->
        <el-form-item label="Category" prop="categoryId">
          <!-- Assuming categories is an array of objects with 'label' and 'value' properties -->
          <el-select v-model="eventForm.categoryId" placeholder="Select category">
            <el-option v-for="category in categories" :key="category.value" :label="category.label" :value="category.value"></el-option>
          </el-select>
        </el-form-item>

        <!-- Price Field -->
        <el-form-item label="Price" prop="price">
          <el-radio-group v-model="eventForm.price">
            <el-radio label="0">Free</el-radio>
            <el-radio label="1">Berbayar</el-radio>
          </el-radio-group>
          <el-input v-if="eventForm.price === '1'" v-model="eventForm.customPrice" placeholder="Enter event price" type="number"></el-input>
        </el-form-item>

      <!-- Form Bagian Location -->
      <el-form-item v-if="eventForm.type_location === 'location'" label="Location Details">
        <!-- Form untuk "Location" -->
        <el-input v-model="location.city" placeholder="City"></el-input>
        <el-input v-model="location.state" placeholder="State"></el-input>
        <el-input v-model="location.country" placeholder="Country"></el-input>
        <el-input v-model="location.address" placeholder="Address"></el-input>
        <el-input v-model="location.lat" placeholder="Latitude"></el-input>
        <el-input v-model="location.long" placeholder="Longitude"></el-input>

        <!-- Opsi Kota -->
        <el-form-item label="City" prop="city">
          <el-select v-model="location.city" placeholder="Select city">
            <el-option v-for="city in cities" :key="city" :label="city" :value="city"></el-option>
          </el-select>
        </el-form-item>

        <!-- Opsi Provinsi/State -->
        <el-form-item label="State" prop="state">
          <el-select v-model="location.state" placeholder="Select state">
            <el-option v-for="state in states" :key="state" :label="state" :value="state"></el-option>
          </el-select>
        </el-form-item>

        <!-- Opsi Negara/Country -->
        <el-form-item label="Country" prop="country">
          <el-select v-model="location.country" placeholder="Select country">
            <el-option v-for="country in countries" :key="country" :label="country" :value="country"></el-option>
          </el-select>
        </el-form-item>
         <div id="google-maps" style="height: 300px; margin-top: 10px;"></div>
      </el-form-item>


        <!-- Technical Field -->
        <el-form-item label="Technical" prop="technical">
          <el-radio-group v-model="eventForm.technical">
            <el-radio label="tentukan">set a schedule</el-radio>
            <el-radio label="berulang">Repeat</el-radio>
          </el-radio-group>

          <el-row v-if="eventForm.technical === 'tentukan'">
            <!-- Event Schedule for "Tentukan" -->
            <el-col :span="12">
              <el-form-item label="Start Date" prop="start_date">
                <el-date-picker v-model="eventForm.start_date" type="date" placeholder="Select start date"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Start Time" prop="start_time">
                <el-time-picker v-model="eventForm.start_time" placeholder="Select start time"></el-time-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="End Date" prop="end_date">
                <el-date-picker v-model="eventForm.end_date" type="date" placeholder="Select end date"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="End Time" prop="end_time">
                <el-time-picker v-model="eventForm.end_time" placeholder="Select end time"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-else>
            <!-- Event Schedule for "Berulang" -->
            <el-col :span="12">
              <el-form-item label="Start Date" prop="start_date">
                <el-date-picker v-model="eventForm.start_date" type="date" placeholder="Select start date"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Start Time" prop="start_time">
                <el-time-picker v-model="eventForm.start_time" placeholder="Select start time"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- Quill Editor Field -->
        <el-collapse>
          <el-collapse-item title="Description" name="description">
            <el-col :span="24">
              <el-form-item label="Description" prop="description" class="editor-container">
                <QuillEditor v-model="eventForm.description" theme="snow" style="width: 100%; height: 100%;">
                  <!-- Customize the toolbar style -->
                  <div slot="toolbar" class="ql-toolbar full-width-toolbar">
                    <span class="ql-formats">
                      <select class="ql-font"></select>
                      <select class="ql-size"></select>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-bold"></button>
                      <button class="ql-italic"></button>
                      <button class="ql-underline"></button>
                      <button class="ql-strike"></button>
                    </span>
                    <span class="ql-formats">
                      <select class="ql-color"></select>
                      <select class="ql-background"></select>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-script" value="sub"></button>
                      <button class="ql-script" value="super"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-header" value="1"></button>
                      <button class="ql-header" value="2"></button>
                      <button class="ql-blockquote"></button>
                      <button class="ql-code-block"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-list" value="ordered"></button>
                      <button class="ql-list" value="bullet"></button>
                      <button class="ql-indent" value="-1"></button>
                      <button class="ql-indent" value="+1"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-direction" value="rtl"></button>
                      <select class="ql-align"></select>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-link"></button>
                      <button class="ql-image"></button>
                      <button class="ql-video"></button>
                      <button class="ql-formula"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-clean"></button>
                    </span>
                  </div>
                </QuillEditor>
              </el-form-item>
            </el-col>
          </el-collapse-item>
        </el-collapse>
        <!-- Language Field -->
        <el-form-item label="Language" prop="language">
          <el-select v-model="eventForm.language" placeholder="Select event language" :disabled="isLanguagesLoading">
            <el-option v-for="language in filteredLanguages" :key="language.iso639_1" :label="language.name" :value="language.iso639_1"></el-option>
          </el-select>
        </el-form-item>

        <!-- Tags Field -->
        <el-form-item label="Tags" prop="tags">
          <el-tag v-for="tag in eventForm.tags" :key="tag" closable @close="removeTag(tag)">{{ tag }}</el-tag>
          <el-input v-model="tagInput" @keyup.enter="addTag" placeholder="Enter tags"></el-input>
        </el-form-item>

        <!-- Submit Button -->
        <el-form-item>
          <el-button type="primary" plain @click="submitForm">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import { ElForm, ElFormItem, ElInput, ElDatePicker, ElTimePicker, ElRadio, ElRadioGroup, ElSelect, ElOption } from 'element-plus';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  data() {
    return {
      eventForm: {
        title: '',
        organizer: '',
        categoryId: null,
        price: '0',  // Default to Free
        customPrice: null,
        start_date: null,
        end_date: null,
        start_time: null,
        end_time: null,
        type_location: 'location',  // Default to Location
        technical: 'tentukan',  // Default to Tentukan
        description: '',
        language: '',
        tags: [],
      },
      location: {
        city: '',
        state: '',
        country: '',
        address: '',
        lat: null,
        long: null,
      },
      categories: [ /* Array of category options */ ],
      tagInput: '',
      languageOptions: [],
      isLanguagesLoading: false,
      cities: [],
    states: [],
    countries: [],
    };
  }, components: {
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
  },
  computed: {
    filteredLanguages() {
    const selectedLanguages = this.eventForm.tags.map(tag => tag.toLowerCase());
    const uniqueLanguages = new Set(selectedLanguages);

    return this.languageOptions.filter(language => {
      return !uniqueLanguages.has(language.iso639_1.toLowerCase());
    });
  },
  defaultLanguage() {
    return 'en'; // Ganti dengan kode bahasa Inggris yang sesuai
  },
  },  
  methods: {
    async fetchLanguages() {
  try {
    this.isLanguagesLoading = true;

    const response = await axios.get('https://restcountries.com/v2/all');
    const languages = response.data
      .map(country => country.languages)
      .flat()
      .filter(language => language && language.iso639_1);

    console.log('Languages:', languages);

    // Menghapus duplikat dan membuat set unik
    const uniqueLanguagesSet = new Set(languages.map(language => language.iso639_1));

    // Menyimpan data bahasa yang unik kembali ke bentuk array
    this.languageOptions = Array.from(uniqueLanguagesSet).map(iso639_1 => {
      const language = languages.find(lang => lang.iso639_1 === iso639_1);
      return {
        iso639_1: language.iso639_1,
        name: language.name || language.nativeName,
      };
    });

    // Tetapkan nilai default setelah data diunduh menggunakan computed property
    this.$set(this.eventForm, 'language', this.defaultLanguage);
  } catch (error) {
    console.error('Error fetching languages:', error);
  } finally {
    this.isLanguagesLoading = false;
  }
},
    submitForm() {
      // Add logic to submit the form and create the event
      console.log('Event Form Submitted:', this.eventForm);
    },
    addTag() {
      if (this.tagInput && !this.eventForm.tags.includes(this.tagInput)) {
        this.eventForm.tags.push(this.tagInput);
        this.tagInput = '';
      }
    },
    removeTag(tag) {
      const index = this.eventForm.tags.indexOf(tag);
      if (index !== -1) {
        this.eventForm.tags.splice(index, 1);
      }
    },
    initGoogleMap() {
    // Menampilkan peta Google Maps
    const map = new google.maps.Map(document.getElementById('google-maps'), {
      center: { lat: this.location.lat, lng: this.location.long },
      zoom: 12,
    });

    // Menambahkan marker untuk memilih lokasi
    const marker = new google.maps.Marker({
      position: { lat: this.location.lat, lng: this.location.long },
      map: map,
      draggable: true,
    });

    // Mengupdate koordinat ketika marker digeser
    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.location.lat = event.latLng.lat();
      this.location.long = event.latLng.lng();
    });
  },
  },
  mounted() {
    this.fetchLanguages();
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