<template>
  <!-- Language Settings -->
  <div class="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
    <div class="col-span-2">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Language Settings
      </h2>
      <hr class="border-gray-300 mb-6" />
    </div>
    <div class="col-span-2 sm:col-span-2 flex items-left justify-left relative">
      <div class="relative">
        <label
          for="selectLanguage"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Select Language</label
        >
        <select
          id="selectLanguage"
          v-model="selectedLanguage"
          @change="setLocale(selectedLanguage)"
          class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        >
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
        </select>
      </div>
    </div>
    <div class="col-span-2">
      <hr class="border-gray-300 mb-6" />
    </div>
    <div class="col-span-2 sm:col-span-2">
      <div>
        <p>{{ $t("message.greeting") }}</p>
        <p>{{ $t("message.goodbye") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSettings",
  data() {
    return {
      selectedLanguage: localStorage.getItem("lang") || "en",
    };
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("lang", locale);
    },
  },
  mounted() {
    const savedLocale = localStorage.getItem("lang");
    if (savedLocale) {
      this.$i18n.locale = savedLocale;
    } else {
      // Set bahasa default ke Bahasa Indonesia
      this.setLocale("id");
    }
  },
};
</script>

<style scoped>
/* CSS jika diperlukan */
</style>
