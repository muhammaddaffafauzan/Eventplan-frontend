<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class="flex-grow p-4">
      <Navbar />
      <router-view>
        <!-- Tambahkan loading indicator di dalam router-view -->
        <template #loading>
          <div class="flex items-center justify-center h-full">
            <!-- Gunakan spinner atau animasi loading yang sesuai -->
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </template>
      </router-view>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/admin/Sidebar.vue";
import Navbar from "../components/admin/Navbar.vue";

export default {
  components: {
    Sidebar,
    Navbar,
  },
};
</script>
