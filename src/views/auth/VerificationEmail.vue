<template>
  <!-- component -->
  <div class="flex min-h-screen items-center justify-center bg-gray-50 py-12">
    <div class="bg-white px-6 pt-10 pb-9 shadow-xl w-full max-w-lg rounded-2xl">
      <div class="flex flex-col items-center justify-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>
            We have sent a code to your email
            {{ userEmail || "loading..." }}
          </p>
        </div>
      </div>

      <div class="mt-8">
        <form action="" method="post" @submit.prevent="verifyAccount">
          <div class="flex justify-center space-x-2">
            <!-- Input fields for verification code -->
            <input
              v-for="(code, index) in verificationCode"
              :key="index"
              ref="inputFields"
              v-model="verificationCode[index]"
              class="w-16 h-16 flex-shrink-0 flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              name=""
              id=""
              maxlength="1"
              @keydown="handleKeyDown(index, $event)"
              @input="handleInput(index)"
            />
          </div>

          <!-- Button for verification -->
          <div class="flex justify-center mt-6">
            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Verify Account
            </button>
          </div>

          <!-- Resend code option -->
          <div class="flex justify-center mt-3">
            <div class="text-sm font-medium text-gray-500">
              <p>Didn't receive the code?</p>
              <a
                href="#"
                class="text-blue-600 hover:underline"
                @click.prevent="resendCode"
                >Resend</a
              >
              <p>or Your email is unreadable?</p>
              <a  href="#"
                class="text-blue-600 hover:underline" @click="openManualEmailInput">Input email</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Dialog for manual email input -->
    <el-dialog v-model="showManualEmailInput" title="Input Email" width="500">
      <div>
        <input
          type="email"
          v-model="manualEmail"
          placeholder="Enter your email"
          class="rounded-lg"
        />
      </div>
      <div slot="footer" class="mt-2">
        <el-button @click="closeManualEmailInput">Cancel</el-button>
        <el-button type="primary" plain @click="confirmManualEmail"
          >Confirm</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ElDialog, ElButton } from "element-plus"; // Import ElDialog and ElButton from Element Plus

export default {
  components: {
    ElDialog,
    ElButton,
  },
  data() {
    return {
      verificationCode: Array(6).fill(""), // Initialize an array to store the 6-digit verification code
      resendTimeout: null, // Initialize resendTimeout variable
      showManualEmailInput: false, // Control the visibility of manual email input dialog
      manualEmail: "", // Store manually input email
    };
  },
  computed: {
    ...mapState("auth", ["verifyEmail"]),
    userEmail() {
      return this.verifyEmail;
    },
  },
  methods: {
  verifyAccount() {
  // Validate verification code
  const code = this.verificationCode.join(""); // Concatenate the individual digits into a single string
  if (code.trim() === "") {
    ElMessage.warning("Verification code cannot be empty.");
    return;
  }

  // Implement your verification logic using the 'code' variable
  console.log("Verifying account with code:", code);

  // Call verifyAccount action from Vuex
  this.$store.dispatch("auth/verifyEmail", {
    email: this.userEmail,
    verificationToken: code,
  }).then(success => {
    if (success) {
      // Redirect to another page if verification is successful
      window.location.href = '/'
    } else {  
      // Display error message if verification failed
      ElMessage.error("Verification failed. Please try again.");
    }
  });
},
 async resendCode() {
      try {
        // Dispatch the resend action
        const success = await this.$store.dispatch("auth/resendVerificationCode", this.manualEmail);

        if (success) {
          ElMessage.success("Verification code resent successfully");
        } else {
          ElMessage.error("Failed to resend verification code. Please try again.");
        }
      } catch (error) {
        ElMessage.error("An error occurred while resending verification code. Please try again.");
        console.error(error);
      }
    },
    handleInput(index) {
      if (this.verificationCode[index].length > 1) {
        this.verificationCode[index] = this.verificationCode[index][0];
      }
    },
    focusInputField(index) {
      this.$refs.inputFields[index].focus();
    },
    openManualEmailInput() {
      this.showManualEmailInput = true;
    },
    closeManualEmailInput() {
      this.showManualEmailInput = false;
    },
    confirmManualEmail() {
      // Validate manual email input
      if (this.manualEmail.trim() === "") {
        this.$message.warning("Please enter your email.");
        return;
      }

      // Update state with the manually input email
      this.$store.commit("auth/SET_VERIFY_EMAIL", this.manualEmail.trim());

      // Close the dialog
      this.closeManualEmailInput();
    },
  },
  watch: {
    verificationCode: {
      handler(newValue, oldValue) {
        const filledFields = newValue.filter((code) => code !== "").length;
        const nextIndex = filledFields < 6 ? filledFields : 5;
        this.focusInputField(nextIndex);
      },
      deep: true,
    },
  },
  mounted() {
    this.focusInputField(0);
  },
};
</script>
