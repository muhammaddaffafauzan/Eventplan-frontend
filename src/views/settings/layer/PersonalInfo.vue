<template>
  <!-- Informasi Personal -->
  <div class="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
    <div class="col-span-2">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Personal Information
      </h2>
      <hr class="border-gray-300 mb-6" />
    </div>
    <!-- Avatar Pengguna -->
    <div class="col-span-2 sm:col-span-2 flex items-left justify-left relative">
      <div class="relative">
        <!-- Avatar -->
        <img
          class="h-52 w-52 rounded-full border-4 border-gray-400"
          :src="profileImage"
          alt="User's avatar"
          @click="openFileManager"
        />
        <span
          class="bottom-1.5 left-40 absolute w-7 h-7 bg-gray-200 dark:border-gray-800 rounded-full"
        >
          <svg
            class="w-6 h-6 ml-0.5 mt-0.5 text-gray-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
            />
          </svg>
        </span>
        <!-- Icon Edit di Dalam Border Avatar -->
        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <svg
            class="w-12 h-12 text-gray-600 hover:text-gray-700 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 9a6 6 0 00-6 6m12 0a6 6 0 01-6-6m6 0a9 9 0 00-9 9m9 0a9 9 0 01-9-9m9 0a12 12 0 00-12 12m12 0a12 12 0 01-12-12m12 0a15 15 0 00-15 15m15 0a15 15 0 01-15-15"
            ></path>
          </svg>
          <input
            type="file"
            accept="image/png,image/jpeg"
            style="display: none"
            ref="avatarInput"
            @change="handleAvatarChange"
            class="hover:bg-gray-800"
          />
        </div>
      </div>
      <!-- Input File untuk Unggah Avatar -->

      <button
        class="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
        @click="openFileManager"
      ></button>
    </div>
    <!-- Form Informasi Personal -->
    <div class="col-span-2 sm:col-span-1">
      <!-- Username -->
      <label
        for="username"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Username</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="username"
          id="username"
          autocomplete="given-name"
          v-model="formData.username"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Nama Depan -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="first-name"
        class="block text-sm font-medium leading-6 text-gray-900"
        >First Name</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="first-name"
          id="first-name"
          autocomplete="given-name"
          v-model="formData.firstName"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Nama Belakang -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="last-name"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Last Name</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="last-name"
          id="last-name"
          autocomplete="family-name"
          v-model="formData.lastName"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Organisasi -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="organize"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Organize</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="organize"
          id="organize"
          autocomplete="organization"
          v-model="formData.organize"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Nomor Telepon -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="phone"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Phone</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="phone"
          id="phone"
          autocomplete="tel"
          :value="formattedPhone"
          @input="updatePhone($event.target.value)"
          class="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Alamat -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="address"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Address</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="address"
          id="address"
          autocomplete="street-address"
          v-model="formData.address"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Kota -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="city"
        class="block text-sm font-medium leading-6 text-gray-900"
        >City</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="city"
          id="city"
          autocomplete="address-level2"
          v-model="formData.city"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Negara Bagian -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="state"
        class="block text-sm font-medium leading-6 text-gray-900"
        >State</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="state"
          id="state"
          autocomplete="address-level1"
          v-model="formData.state"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <!-- Negara -->
    <div class="col-span-2 sm:col-span-1">
      <label
        for="country"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Country</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="country"
          id="country"
          autocomplete="country"
          v-model="formData.country"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
        />
      </div>
    </div>
  </div>
  <!-- Tombol Batal dan Simpan -->
  <div class="col-span-2 sm:col-span-1">
    <label for="phone" class="block text-sm font-medium leading-6 text-gray-900"
      >Phone</label
    >
    <div class="mt-2 flex">
      <select
        v-model="selectedPhoneFormat"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
      >
        <option value="national">National</option>
        <option value="international">International</option>
        <!-- Tambahkan opsi lainnya sesuai kebutuhan -->
      </select>
      <input
        v-if="selectedPhoneFormat === 'international'"
        type="text"
        name="phone"
        id="phone"
        autocomplete="tel"
        :value="formattedInternationalPhone"
        @input="updatePhone($event.target.value)"
        class="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
      />
      <input
        v-else
        type="text"
        name="phone"
        id="phone"
        autocomplete="tel"
        :value="formattedNationalPhone"
        @input="updatePhone($event.target.value)"
        class="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm sm:leading-5"
      />
    </div>
  </div>
  <!-- Modal Crop -->
<div
  v-if="showCropModal"
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
>
  <div class="bg-white p-4 rounded-lg">
    <!-- Tampilan Crop Foto di sini -->
    <vue-cropper
      v-model="cropImage"
      :guides="false"
      :aspect-ratio="1"
      :auto-crop-area="1"
      :movable="false"
      :zoomable="false"
      :rotatable="false"
      :responsive="true"
      v-if="showCropModal"
      @ready="onCropperReady"
      :src="cropImage"
      ref="cropper"
    ></vue-cropper>

    <div class="flex justify-center gap-4 mt-5">
      <button
        @click="cancelCrop"
        class="px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Cancel
      </button>
      <button
        @click="saveCroppedImage"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Crop & Upload
      </button>
    </div>
  </div>
</div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default {
  data() {
    return {
      formData: {
        username: "",
        firstName: "",
        lastName: "",
        organize: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        inputFile: null,
      },
      previewFile: null,
      cropImage: null,
      showCropModal: false,
      cropOptions: {
        // Konfigurasi options untuk cropper
        viewMode: 1,
        aspectRatio: 1,
        autoCropArea: 1,
        responsive: true,
        crop: this.cropImage,
      },
    };
  },
  components: {
    VueCropper,
  },
  methods: {
    ...mapActions("settings", ["createOrUpdateProfile"]),
    async loadDataProfile() {
      await this.$store.dispatch("auth/fetchMe"); // Memastikan data profil sudah dimuat
      const profileData = this.profile;

      if (profileData) {
        this.formData = {
          username: profileData?.user?.username,
          firstName: profileData?.profile?.firstName,
          lastName: profileData?.profile?.lastName,
          organize: profileData?.profile?.organize,
          phone: profileData?.profile?.phone,
          address: profileData?.profile?.address,
          city: profileData?.profile?.city,
          state: profileData?.profile?.state,
          country: profileData?.profile?.country,
        };
        this.previewFile = profileData?.profile?.url;
      }
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Simpan file di data
        this.formData.inputFile = file;
        // Tampilkan modal untuk crop foto
        this.showCropModal = true;
        // Gunakan URL.createObjectURL untuk menampilkan preview foto sebelum di-crop
        this.cropImage = URL.createObjectURL(file);
      }
    },
    // Membuka file manager untuk memilih avatar
    openFileManager() {
      this.$refs.avatarInput.click();
    },

    cancelCrop() {
      // Reset data dan sembunyikan modal crop
      this.cropImage = null;
      this.showCropModal = false;
      this.formData.inputFile = null;
    },
    async uploadCroppedImage() {
      // Lakukan upload foto yang telah di-crop
      try {
        // Lakukan upload dengan formData atau metode yang sesuai dengan kebutuhan Anda
        // Setelah berhasil, sembunyikan modal crop
        this.showCropModal = false;
      } catch (error) {
        console.error("Error uploading cropped image:", error);
        // Tangani kesalahan jika terjadi saat upload
      }
    },
    async saveProfile() {
      try {
        if (this.showCropModal) {
          // Jika sedang dalam proses crop, panggil fungsi saveCroppedImage
          this.saveCroppedImage();
        } else {
          // Jika tidak dalam proses crop, langsung lakukan penyimpanan profil
          await this.createOrUpdateProfile(this.formData);
        }
        // Tampilkan pesan sukses jika diperlukan
      } catch (error) {
        console.error(error);
        // Tangani kesalahan jika diperlukan
      }
    },
    cancel() {
      this.loadDataProfile();
    },
    async saveCroppedImage() {
      // Dapatkan data hasil crop dari cropper
      this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // Ubah blob menjadi File object dengan nama yang sesuai
        const croppedFile = new File([blob], this.formData.inputFile.name, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });

        // Simpan file hasil crop di data
        this.formData.inputFile = croppedFile;

        try {
          // Panggil fungsi createOrUpdateProfile untuk mengunggah foto yang telah di-crop ke server
          await this.createOrUpdateProfile(this.formData);

          this.loadDataProfile();

          // Jika berhasil, sembunyikan modal crop
          this.showCropModal = false;
        } catch (error) {
          console.error("Error uploading cropped image:", error);
          // Tangani kesalahan jika terjadi saat upload
        }
      });
    },
    updatePhone(value) {
      // Perbarui nilai formData.phone berdasarkan nilai yang dimasukkan pengguna
      this.formData.phone = value;
    },
  },
  computed: {
    // Mendapatkan URL gambar profil
    ...mapGetters("settings", ["getProfile"]),
    formattedPhone() {
      if (this.formData.phone) {
        const phoneNumber = parsePhoneNumberFromString(
          this.formData.phone,
          "ID"
        );
        if (phoneNumber) {
          // Format nomor telepon sesuai dengan format internasional
          return phoneNumber.formatInternational();
        } else {
          return this.formData.phone; // Kembalikan nilai asli properti phone jika nomor telepon tidak valid
        }
      } else {
        return this.formData.phone; // Kembalikan nilai asli properti phone jika phone kosong
      }
    },
    formattedNationalPhone() {
      if (this.formData.phone) {
        const phoneNumber = parsePhoneNumberFromString(
          this.formData.phone,
          "ID"
        );
        if (phoneNumber) {
          // Format nomor telepon sesuai dengan format nasional
          return phoneNumber.formatNational();
        } else {
          return this.formData.phone; // Kembalikan nilai asli properti phone jika nomor telepon tidak valid
        }
      } else {
        return this.formData.phone; // Kembalikan nilai asli properti phone jika phone kosong
      }
    },
    formattedInternationalPhone() {
      if (this.formData.phone) {
        const phoneNumber = parsePhoneNumberFromString(
          this.formData.phone,
          "ID"
        );
        if (phoneNumber) {
          // Format nomor telepon sesuai dengan format internasional
          return phoneNumber.formatInternational();
        } else {
          return this.formData.phone; // Kembalikan nilai asli properti phone jika nomor telepon tidak valid
        }
      } else {
        return this.formData.phone; // Kembalikan nilai asli properti phone jika phone kosong
      }
    },
    profileImage() {
      if (!this.previewFile && (!this.getProfile || !this.getProfile.url)) {
        const initials = `${this.formData.firstName.charAt(
          0
        )}${this.formData.lastName.charAt(0)}`;
        return `https://ui-avatars.com/api/?name=${initials}&background=random&size=150`;
      } else {
        return this.previewFile
          ? this.previewFile
          : this.getProfile
          ? this.getProfile.url
          : "https://via.placeholder.com/150";
      }
    },
    // Mendapatkan data pengguna saat ini
    ...mapGetters("auth", ["getMe"]),
    profile() {
      return this.getMe;
    },
  },
  // Mengambil dan menyimpan profil pengguna sebelum dan setelah rute diperbarui
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Title");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Title");
    next();
  },
  // Memuat data profil pengguna saat komponen dimuat
  mounted() {
    this.loadDataProfile();
  },
};
</script>
