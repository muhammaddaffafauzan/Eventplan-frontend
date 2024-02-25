<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Add Event</h2>

    <!-- Event Form -->
    <el-form ref="addEventForm" :model="eventForm" label-width="120px">
      <!-- Title Field -->
      <el-form-item label="Title" prop="title">
        <el-input v-model="eventForm.title" placeholder="Enter event title"></el-input>
      </el-form-item>

      <!-- Organizer Field -->
      <el-form-item label="Organizer" prop="organizer">
        <el-input v-model="eventForm.organizer" placeholder="Enter organizer"></el-input>
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
        <el-input v-model="eventForm.price" placeholder="Enter event price" type="number"></el-input>
      </el-form-item>

      <!-- Start Date Field -->
      <el-form-item label="Start Date" prop="start_date">
        <el-date-picker v-model="eventForm.start_date" type="date" placeholder="Select start date"></el-date-picker>
      </el-form-item>

      <!-- End Date Field -->
      <el-form-item label="End Date" prop="end_date">
        <el-date-picker v-model="eventForm.end_date" type="date" placeholder="Select end date"></el-date-picker>
      </el-form-item>

      <!-- Start Time Field -->
      <el-form-item label="Start Time" prop="start_time">
        <el-time-picker v-model="eventForm.start_time" placeholder="Select start time"></el-time-picker>
      </el-form-item>

      <!-- End Time Field -->
      <el-form-item label="End Time" prop="end_time">
        <el-time-picker v-model="eventForm.end_time" placeholder="Select end time"></el-time-picker>
      </el-form-item>

      <!-- Type Location Field -->
      <el-form-item label="Type Location" prop="type_location">
        <el-input v-model="eventForm.type_location" placeholder="Enter type location"></el-input>
      </el-form-item>

      <!-- Technical Field -->
      <el-form-item label="Technical" prop="technical">
        <el-input v-model="eventForm.technical" placeholder="Enter technical details"></el-input>
      </el-form-item>

      <!-- Quill Editor Field -->
      <el-collapse>
        <el-collapse-item title="Description" name="description">
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
        </el-collapse-item>
      </el-collapse>
      <!-- Language Field -->
      <el-form-item label="Language" prop="language">
        <el-input v-model="eventForm.language" placeholder="Enter event language"></el-input>
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
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  data() {
    return {
      eventForm: {
        title: '',
        organizer: '',
        categoryId: null,
        price: 0.0,
        start_date: null,
        end_date: null,
        start_time: null,
        end_time: null,
        type_location: '',
        technical: '',
        description: '',
        language: '',
        tags: [],
      },
      categories: [ /* Array of category options */ ],
      tagInput: '',
    };
  }, components: {
    QuillEditor
  },
  methods: {
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
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
