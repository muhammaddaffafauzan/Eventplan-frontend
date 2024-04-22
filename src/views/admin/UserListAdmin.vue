<template>
  <section class="container px-4 py-10 mx-auto">
    <div class="flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <!-- Filter Section -->
          <div class="flex items-center gap-x-2 mb-6">
             <el-select
            v-model="selectedFilter"
            placeholder="Select Filter"
            class="w-56"
          >
            <el-option label="All" value="all" />
            <el-option label="Verified" value="verified" />
            <el-option label="Non-Verified" value="non-verified" />
            <el-option label="Role admin" value="admin" />
            <el-option label="Role user" value="user" />
          </el-select>

            <el-input v-model="searchKeyword" placeholder="Search" class="w-56">
              <el-dropdown @command="handleSearchResultClick">
                <el-button slot="suffix" icon="el-icon-search"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="result in searchResults"
                    :key="result.id"
                    :command="result"
                  >
                    {{ result.Profiles[0].firstName }} {{ result.Profiles[0].lastName }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-loading
                :text="searching ? 'Searching...' : ''"
                :visible="searching"
                class="search-loading"
              ></el-loading>
            </el-input>
           <el-button  @click="goToAddUser" type="primary" plain class="ml-auto">
          Add User
        </el-button>
             <el-dialog
                width="50%"
                title="Add User"
                :before-close="handleCloseModal"
                v-model="addUserModalVisible"
              >
                <el-form ref="addUserForm" :rules="rules" :model="addUserData" label-width="150px">
                  <el-form-item label="Role" prop="role">
                  <el-select :disabled="successAddRoleUser === true" v-model="addUserData.role" @change="handleRoleChange">
                    <el-option label="Admin" value="admin"></el-option>
                    <el-option label="User" value="user"></el-option>
                  </el-select>
                </el-form-item>
                  <el-form-item label="Username" prop="username">
                    <el-input :disabled="successAddRoleUser === true" v-model="addUserData.username"></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input :disabled="successAddRoleUser === true" v-model="addUserData.email"></el-input>
                  </el-form-item>
                  <el-form-item label="First Name" prop="firstName">
                    <el-input :disabled="successAddRoleUser === true" v-model="addUserData.firstName"></el-input>
                  </el-form-item>
                  <el-form-item label="Last Name" prop="lastName">
                    <el-input :disabled="successAddRoleUser === true" v-model="addUserData.lastName"></el-input>
                  </el-form-item>
                   <template v-if="addUserData.role === 'admin'">
                   <el-form-item label="Password" prop="password">
                    <el-input :disabled="successAddRoleUser === true" v-model="addUserData.password" show-password type="password"></el-input>
                  </el-form-item>
                <el-form-item label="Confirm Password" prop="confPassword">
                    <el-input :disabled="successAddRoleUser === true" v-model="addUserData.confPassword" show-password type="password"></el-input>
                  </el-form-item>
                  </template>
                  <el-form-item v-if="addUserData.role === 'admin'" label="Status" prop="status">
                    <el-radio-group v-model="addUserData.isVerified">
                      <el-radio label="true">Verified</el-radio>
                      <el-radio label="false">Non-Verified</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <template v-if="addUserData.role === 'user' && successAddRoleUser === true">
                    <!-- Bagian verifikasi kode -->
                    <el-form-item label="Verification Code" prop="verificationCode">
                      <el-input v-model="addUserData.verificationCode"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                      <el-button type="text" @click="resendCode">resendCode</el-button>
                    </el-form-item>
                  </template>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal">Cancel</el-button>
                <el-button v-if="successAddRoleUser === true" type="primary" plain @click="handleVerification">verification</el-button>
                 <el-button v-else type="primary" plain @click="handleSubmit">{{ submitLabel }}</el-button>
              </span>
              </el-dialog>
          </div>
          <div
            class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
          >
            <el-skeleton :loading="isLoading" :rows="5" animated />
            <template v-if="!isLoading && !loadingEvent">
              <el-empty
                v-if="filteredUsers.length === 0"
                description="Users Not Found"
                class="text-center"
              >
                <!-- Additional content for empty message -->
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-8 h-8 text-gray-400 mx-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <p class="text-gray-500 mt-2">
                    No users found. Try changing your filters.
                  </p>
                </div>
              </el-empty>
              <table
                v-else
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
              >
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Organization
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>
                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                >
                  <tr v-for="item in paginatedUsers" :key="item.id">
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
                    >
                      <div class="inline-flex items-center gap-x-3">
                        <span>#{{ item.id }}</span>
                      </div>
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.Profiles[0].firstName }} {{ item.Profiles[0].lastName }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.Profiles[0].organize }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.email }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                    >
                      {{ item.role }}
                    </td>
                    <td
                      class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                    >
                      <div
                        class="inline-flex items-center px-3 py-1 rounded-full gap-x-2"
                        :class="getStatusClass(item.isVerified)"
                      >
                        <h2 class="text-sm font-normal">
                          {{ item.isVerified ? 'Verified' : 'Non-Verified' }}
                        </h2>
                      </div>
                    </td>
                                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="relative inline-block text-left">
                        <el-dropdown trigger="click">
                          <span class="cursor-pointer">
                            <svg
                              class="w-6 h-6 text-gray-800 dark:text-white"
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
                                stroke-width="2"
                                d="M12 6h.01M12 12h.01M12 18h.01"
                              />
                            </svg>
                          </span>
                          <template #dropdown>
                            <el-dropdown-menu class="text-sm">
                              <el-dropdown-item @click="viewItem(item)"
                                >View</el-dropdown-item
                              >
                             <el-dropdown-item @click="handleToggleVerification(item)">
                              {{ item.isVerified ? 'Deactivate Verification' : 'Activate Verification' }}
                            </el-dropdown-item>
                              <el-dropdown-item @click="deleteItem(item)"
                                >Delete</el-dropdown-item
                              >
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Previous</span>
      </button>

      <div class="items-center hidden md:flex gap-x-3">
        <span
          v-for="pageNumber in pageCount"
          :key="pageNumber"
          @click="changePage(pageNumber)"
          class="px-2 py-1 text-sm text-gray-500 rounded-md"
          :class="{
            'bg-blue-100/60': currentPage === pageNumber,
            'hover:bg-gray-100': currentPage !== pageNumber,
          }"
          >{{ pageNumber }}</span
        >
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === pageCount || pageCount === 0"
        class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ElLoading, ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElRadio, ElRadioGroup, ElButton, ElMessage
} from "element-plus";
import axios from "axios";

export default {
  data() {
    return {
      selectedFilter: "all",
      searchKeyword: "",
      loadingEvent: false,
      searchResults: [],
      currentPage: 1,
      pageSize: 5,
      searching: false,
       addUserModalVisible: false,
      addUserData: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confPassword: "",
        role: "admin",
        isVerified: "true",
        verificationCode: "",
      },
      rules: {
  username: [
    { required: true, message: "Please enter username", trigger: "blur" },
    { min: 3, max: 20, message: "Username length should be between 3 and 20 characters", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9_]+$/, message: "Username can only contain letters, numbers, and underscores", trigger: "blur" }
  ],
  email: [
    { required: true, message: "Please enter email address", trigger: "blur" },
    { type: "email", message: "Please enter a valid email address", trigger: ["blur", "change"] },
  ],
  firstName: [
    { required: true, message: "Please enter first name", trigger: "blur" },
    { min: 2, max: 50, message: "First name length should be between 2 and 50 characters", trigger: "blur" }
  ],
  lastName: [
    { required: true, message: "Please enter last name", trigger: "blur" },
    { min: 2, max: 50, message: "Last name length should be between 2 and 50 characters", trigger: "blur" }
  ],
  password: [
    { required: true, message: "Please enter password", trigger: "blur" },
    { min: 6, max: 20, message: "Password length should be between 6 and 20 characters", trigger: "blur" }
  ],
  confPassword: [
        { required: true, message: "Please enter confirm password", trigger: "blur" },
        { validator: this.validateConfPassword, trigger: "blur" }
      ],
  role: [
    { required: true, message: "Please select role", trigger: "change" }
  ],
  isVerified: [
    { required: true, message: "Please select verification status", trigger: "change" }
  ],
      },
      submitLabel: "Submit",
      successAddRoleUser: false
    };
  },
  components: {
    ElLoading,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElButton,
    ElMessage
  },
  computed: {
    ...mapGetters("usersAdmin", ["getUsersAdmin", "isLoading"]),
    users() {
      return this.getUsersAdmin;
    },
filteredUsers() {
  let filtered = this.users;

  if (this.selectedFilter !== "all") {
    const selectedFilterLower = this.selectedFilter.toLowerCase();
    filtered = filtered.filter((item) => {
      if (selectedFilterLower === 'verified' || selectedFilterLower === 'non-verified') {
        return item.isVerified === (selectedFilterLower === 'verified');
      } else if (selectedFilterLower === 'admin' || selectedFilterLower === 'user') {
        return item.role.toLowerCase() === selectedFilterLower;
      }
    });
  }

  if (this.searchKeyword) {
    const keyword = this.searchKeyword.toLowerCase();
    filtered = filtered.filter((item) => {
      return (
        item.id.toString().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.username.toLowerCase().includes(keyword) ||
        (item.Profiles[0]?.firstName.toLowerCase().includes(keyword)) ||
        (item.Profiles[0]?.lastName.toLowerCase().includes(keyword)) ||
        (item.Profiles[0]?.organize.toLowerCase().includes(keyword)) ||
        item.role.toLowerCase().includes(keyword) ||
        (item.isVerified ? 'verified' : 'non-verified').includes(keyword)
      );
    });
  }

  return filtered;
},
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(
        startIndex + this.pageSize,
        this.filteredUsers.length
      );
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
  },
  methods: {
  ...mapActions("usersAdmin", ["fetchUsersAdmin", "createUser", "resendVerificationCodeAdmin", "deleteUser", "verifyEmailAdmin"]),
    viewItem(item) {
      const uuid = item.uuid; // Ambil UUID dari item
      const userName = item.username.replace(/\s+/g, "-").toLowerCase(); // Buat nama acara dan konversikan ke format slug
      this.$router.push({
        path: `/admin/${userName}/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
handleToggleVerification(item) {
  this.$confirm(`Are you sure you want to ${item.isVerified ? 'Deactivate Verification' : 'Activate Verification'} this user?`, "Confirmation", {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
    buttonProps: {
      confirm: {
        plain: true
      }
    }
  })
  .then(async () => {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");

    try {
      // Sertakan token dalam permintaan
      const response = await axios.put(`/users/verified/${item.uuid}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Tanggapan dari backend
      ElMessage.success(response.data.msg);

      // Jika berhasil, lakukan sesuatu, misalnya memperbarui daftar pengguna
      this.fetchUsersAdmin();
    } catch (error) {
      console.error("Error toggling verification:", error);
      // Tangani kesalahan jika ada
      ElMessage.error(error.response.data.msg || "Failed to toggle verification");
    }
  })
  .catch(() => {
    // Tangani jika pengguna membatalkan aksi
  });
},
  // Fungsi untuk menghapus item
deleteItem(item) {
  this.$confirm("Are you sure you want to delete this user?", "Confirmation", {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
    buttonProps: {
      confirm: {
        plain: true
      }
    }
  })
  .then(async () => {
    // Panggil deleteUser action dengan parameter userId
    const success = await this.deleteUser(item.uuid);
    if (success) {
      // Jika penghapusan berhasil, lakukan sesuatu di sini, seperti menyegarkan daftar pengguna
      this.fetchUsersAdmin();
    }
  })
  .catch(() => {
    // Jika pengguna membatalkan penghapusan, tidak perlu melakukan apa pun
  });
},

    handleSearchResultClick(command) {
      this.searchKeyword = command.Profiles[0].firstName + ' ' + command.Profiles[0].lastName;
      this.searchResults = [];
      this.searching = true;

      try {
        // Perform your search logic
      } finally {
        this.searching = false;
        this.$nextTick(() => {
          this.$refs.searchInput.$refs.input.focus();
        });
      }
    },
    getStatusClass(status) {
      return status ? "text-emerald-500 bg-emerald-100/60" : "text-red-500 bg-red-100/60";
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
goToAddUser() {
  // Periksa peran pengguna dari localStorage
  const role = localStorage.getItem('role');
  if (role !== 'super admin') {
    // Jika peran bukan super admin, tampilkan pesan peringatan
    ElMessage({
      type: "warning",
      message: "This feature can only be accessed by super admin",
    });
    return; // Langsung keluar dari fungsi
  }

  // Jika peran adalah super admin, lanjutkan dengan menampilkan modal penambahan pengguna
  this.handleRoleChange();
  this.addUserModalVisible = true;
},

handleCloseModal() {
  if (this.isUserDataFilled()) {
    // Jika data pengguna terisi, tampilkan konfirmasi
    this.$confirm("Discard user data?", "Confirmation", {
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      type: "warning",
       buttonProps: {
    confirm: {
      plain: true // Mengatur tombol "Yes" menjadi plain
    }
  }
    })
      .then(() => {
        // Jika pengguna menekan tombol Yes, reset form data dan properti label
        this.successAddRoleUser = false
        this.addUserModalVisible = false;
        this.$refs.addUserForm.resetFields();
        this.sendCodeLabel = "Send Code";
        this.submitLabel = "Submit";
      })
      .catch(() => {
        // Jika pengguna menekan tombol No, tutup saja dialog
        return;
      });
  } else {
    // Jika data pengguna tidak terisi, langsung tutup dialog
    this.addUserModalVisible = false;
    this.$refs.addUserForm.resetFields();
    this.sendCodeLabel = "Send Code";
    this.submitLabel = "Submit";
  }
},
isUserDataFilled() {
  // Periksa apakah ada data pengguna yang terisi
  const userData = this.addUserData;
  return (
    userData.username ||
    userData.email ||
    userData.firstName ||
    userData.lastName ||
    userData.password ||
    userData.confPassword ||
    userData.verificationCode
  );
},
     handleRoleChange(role) {
      if (role === "user") {
        this.submitLabel = "Create User";
        this.addUserData.password = ""; // Set default password for user
        this.addUserData.confPassword = ""; // Set default confirm password for user
      } else {
        this.submitLabel = "Create Admin";
         this.addUserData.password = "12345678"; // Set default password for admin
        this.addUserData.confPassword = "12345678"; // Set default confirm password for admin
      }
    },
 validateConfPassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("Please enter confirm password"));
      } else if (value !== this.addUserData.password) {
        callback(new Error("The two passwords do not match"));
      } else {
        callback();
      }
    },
    async resendCode() {
      if (!this.addUserData.email) {
        ElMessage({
          type: "error",
          message: "Please provide an email address",
        });
        return;
      }
      try {
        await this.resendVerificationCodeAdmin(this.addUserData.email);
      } catch (error) {
        console.error("Error resending verification code:", error);
        ElMessage({
          type: "error",
          message: error.response.data.msg || "Failed to resend verification code",
        });
      }
    },
async handleVerification() {
  try {
    // Periksa apakah pengguna telah memasukkan kode verifikasi
    if (!this.addUserData.verificationCode) {
      this.$message({
        type: "error",
        message: "Please enter verification code",
      });
      return;
    }

    // Verifikasi email pengguna
    await this.verifyEmailAdmin({
      email: this.addUserData.email,
      verificationToken: this.addUserData.verificationCode,
    });

    // Setelah verifikasi berhasil, reset data dan tutup modal
    this.successAddRoleUser = false;
    this.addUserModalVisible = false;
    this.$refs.addUserForm.resetFields();
    this.sendCodeLabel = "Send Code";
    this.submitLabel = "Submit";

    // Ambil data pengguna terbaru setelah verifikasi
    this.fetchUsersAdmin();
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error("Error verifying email:", error);
    this.$message({
      type: "error",
      message: "Failed to verify email. Please try again later.",
    });
  }
},

 async handleSubmit() {
    try {
        // Lakukan validasi formulir
        await this.$refs.addUserForm.validate();

        // Formulir valid, lanjutkan dengan mengirimkan data
        const data = {
            username: this.addUserData.username,
            email: this.addUserData.email,
            firstName: this.addUserData.firstName,
            lastName: this.addUserData.lastName,
            role: this.addUserData.role
        };

        if (data.role === "user") {
            // Lakukan pengiriman data untuk membuat pengguna baru
             await this.createUser(data);
             this.successAddRoleUser = true;
        } else {
            // Jika peran adalah admin, lanjutkan dengan membuat admin
            this.createAdmin();
        }
    } catch (error) {
        console.error("Error submitting form:", error);

        // Tangani kesalahan jika ada
        let errorMessage = "Failed to create user";
        if (error.response && error.response.data && error.response.data.msg) {
            errorMessage = error.response.data.msg;
        } else if (error.success && error.success.data && error.success.data.msg) {
            errorMessage = error.success.data.msg;
        }

        this.$message({
            type: "error",
            message: errorMessage
        });
    }
},

async createAdmin() {
  try {
    // Lakukan pengiriman data ke backend untuk membuat admin baru
    const success = await this.createUser(this.addUserData);
    // Reset form data
    this.$refs.addUserForm.resetFields();
    if (success) {
      // Jika pembuatan admin berhasil, tutup modal
      this.addUserModalVisible = false;
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    this.$message({
      type: "error",
      message: error.success.data.msg || "Failed to create admin",
    });
  }
},
  },
  mounted() {
    this.loadingEvent = true;
    this.fetchUsersAdmin().then(() => {
      this.loadingEvent = false;
    });
  },
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Text");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Text");
    next();
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.search-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
