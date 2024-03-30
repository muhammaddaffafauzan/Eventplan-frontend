<template>
  <!-- Informasi Personal -->
  <div class="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
    <p class="absolute right-5 mt-1 text-right text-sm text-gray-500">
      Account Eventplan since {{ formattedCreatedAt }}
    </p>
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
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          @change="handleAvatarChange"
          class="hidden"
          ref="avatarInput"
        />
        <!-- Icon Edit di Dalam Border Avatar -->
        <div
          class="absolute z-15 bottom-1.5 left-40 w-7 h-7 bg-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer"
        >
          <svg
            @click="openModal"
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
        </div>
      </div>
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
      <div class="mt-2 flex">
        <!-- Dropdown untuk Memilih Format Nomor Telepon -->
        <input
          type="text"
          name="phone"
          id="phone"
          autocomplete="tel"
          v-model="formData.phone"
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
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button
      type="button"
      class="text-sm font-semibold leading-6 text-gray-900"
      @click="cancel"
    >
      Cancel
    </button>
    <button
      type="button"
      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-opacity-50"
      @click="saveProfile"
    >
      Save
    </button>
  </div>
  <div
    v-if="showCropModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-show"
    :class="{ 'fade-out': !showCropModal }"
  >
    <div class="bg-white p-4 rounded-lg">
      <!-- Tampilan Crop Foto di sini -->
      <vue-cropper
        v-model="cropImage"
        :guides="false"
        :aspect-ratio="1"
        :auto-crop-area="1"
        :view-mode="1"
        :movable="false"
        :zoomable="false"
        :rotatable="false"
        :responsive="true"
        v-if="showCropModal"
        @ready="onCropperReady"
        :src="cropImage"
        ref="cropper"
        class="w-96 h-96"
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
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-show"
    :class="{ 'fade-out': !showModal }"
  >
    <div class="bg-white p-4 rounded-lg">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Choose an action</h2>
      <div class="flex justify-center gap-4 mt-5">
        <button
          @click="deletePhoto"
          class="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete Photo
        </button>
        <button
          @click="openFileManager"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Upload Photo
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { ElDialog } from "element-plus";

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
      showModal: false,
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
    ElDialog,
  },
  methods: {
    ...mapActions("settings", ["createOrUpdateProfile", "deleteImageProfile"]),
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
      this.showModal = false;
    },

    cancelCrop() {
      // Reset data dan sembunyikan modal crop
      this.cropImage = null;
      this.showCropModal = false;
      this.formData.inputFile = null;
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
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deletePhoto() {
    try {
      // Panggil action untuk menghapus foto profil
      await this.deleteImageProfile(this.profile.id); // Sesuaikan dengan ID foto profil yang akan dihapus

      // Perbarui preview foto profil
      this.previewFile = null;

      // Tutup modal setelah berhasil menghapus foto
      this.closeModal();
    } catch (error) {
      console.error("Error deleting photo:", error);
      // Tangani kesalahan jika terjadi saat menghapus foto
    }
  },
  },
  computed: {
    // Mendapatkan URL gambar profil
    ...mapGetters("settings", ["getProfile"]),
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
    formattedCreatedAt() {
      if (this.getMe && this.getMe.user && this.getMe.user.createdAt) {
        // Parse tanggal createdAt menjadi objek Date
        const createdAt = new Date(this.getMe.user.createdAt);
        // Buat daftar nama bulan untuk konversi
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        // Ambil tanggal, nama bulan, dan tahun dari createdAt
        const day = createdAt.getDate();
        const monthIndex = createdAt.getMonth();
        const year = createdAt.getFullYear();
        // Format tanggal sesuai dengan "DD MMMM YYYY" (misal: 01 January 2024)
        return `${day} ${monthNames[monthIndex]} ${year}`;
      } else {
        return "N/A"; // Tampilkan "N/A" jika data createdAt tidak tersedia
      }
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
<style scoped>
/* Animasi untuk fade-out */
.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
/* Animasi untuk tampilan modal */
.modal-show {
  display: flex;
  animation: modal-show-animation 0.3s ease-in-out;
}

@keyframes modal-show-animation {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
