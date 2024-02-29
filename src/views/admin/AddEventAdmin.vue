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
          <el-select v-model="eventForm.categoryId" placeholder="Select category">
            <el-option v-for="item in categories" :key="item.id" :label="item.category" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!-- Price Field -->
        <el-form-item label="Price" prop="price">
          <el-radio-group v-model="eventForm.price">
            <el-radio label="0">Free</el-radio>
            <el-radio label="1">Paid</el-radio>
          </el-radio-group>
          <el-input v-if="eventForm.price === '1'" v-model="eventForm.customPrice" placeholder="Enter event price" type="number"></el-input>
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
        <el-form-item v-if="eventForm.type_location === 'location'">
          <!-- Existing Location Form Fields -->
          <el-form-item label="Country" prop="country" style="width: 100%;">
            <el-input v-model="location.country" placeholder="Enter country"></el-input>
          </el-form-item>

          <!-- State Field -->
          <el-form-item label="State" prop="state" style="width: 100%;" class="my-3">
            <el-input v-model="location.state" placeholder="Enter state"></el-input>
          </el-form-item>

          <!-- City Field -->
          <el-form-item label="City" prop="city" style="width: 100%;" class="my-3">
            <el-input v-model="location.city" placeholder="Enter city"></el-input>
          </el-form-item>

          <!-- Address Field -->
          <el-form-item label="Address" prop="address">
            <el-input v-model="eventForm.address" type="textarea" placeholder="Enter event address" style="width: 100%;" :rows="4" :cols="125" class="my-3"></el-input>
          </el-form-item>
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
                <el-date-picker v-model="eventForm.start_date" type="date" placeholder="Select start date" class="my-3"></el-date-picker>
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
            <!-- Event Schedule for "Repeat" -->
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
      <!-- Quill Editor Column -->
      <el-collapse>
        <el-collapse-item title="Description" name="description">
          <el-col :span="24">
            <el-form-item label="Description" prop="description" class="editor-container">
              <QuillEditor ref="quillEditor" v-model="eventForm.description" theme="snow" style="width: 100%; height: 100%" @change="updateQuillContent"> 
                <!-- Customize toolbar layout -->
                <div slot="toolbar" class="ql-toolbar full-width-toolbar">
                  <!-- Toolbar buttons go here -->
                </div>
              </QuillEditor>
            </el-form-item>
          </el-col>
        </el-collapse-item>
      </el-collapse>

        <!-- Language Column -->
        <el-form-item label="Language" prop="language">
          <el-select v-model="eventForm.language" placeholder="Select event language" :disabled="isLanguagesLoading">
            <el-option v-for="language in filteredLanguages" :key="language.iso639_1" :label="language.name" :value="language.iso639_1"></el-option>
          </el-select>
        </el-form-item>

        <!-- Tag Column -->
        <el-form-item label="Tag" prop="tags">
          <el-tag v-for="tag in eventForm.tags" :key="tag" closable @close="removeTag(tag)">{{ tag }}</el-tag>
          <el-input v-model="tagInput" @keyup.enter="addTag" placeholder="Enter tag"></el-input>
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
import { mapActions, mapGetters } from 'vuex';
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
        technical: 'choose',  // Default to Choose
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
      tagInput: '',
      languageOptions: [],
      isLanguagesLoading: false,
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
  },
  computed: {
    ...mapGetters('categories', ['getCategories', 'isLoading']),
    filteredLanguages() {
      const selectedLanguages = this.eventForm.tags.map(tag => tag.toLowerCase());
      const uniqueLanguages = new Set(selectedLanguages);

      return this.languageOptions.filter(language => {
        return !uniqueLanguages.has(language.iso639_1.toLowerCase());
      });
    },
    defaultLanguage() {
      return 'en'; // Replace with appropriate English language code
    },
    categories(){
      return this.getCategories;
    }
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    async fetchLanguages() {
      try {
        this.isLanguagesLoading = true;

        const response = await axios.get('https://restcountries.com/v2/all');
        const languages = response.data
          .map(country => country.languages)
          .flat()
          .filter(language => language && language.iso639_1);

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
    updateQuillContent() {
    const quillEditor = this.$refs.quillEditor;

    if (quillEditor) {
      const content = quillEditor.quill.root.innerHTML;
      this.$set(this.eventForm, 'description', content);
    }
  },
  },
  watch: {
    'eventForm.type_location': function(newTypeLocation) {
      // Reset form values based on the selected type_location
      if (newTypeLocation === 'online' || newTypeLocation === 'tba') {
        this.location = { country: '', state: '', city: '', address: '', lat: null, long: null };
      }
    },
  },
  mounted() {
  this.fetchLanguages();
  this.fetchCategories();
}
};
</script>

<style scoped>
.event-form-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}
</style>
