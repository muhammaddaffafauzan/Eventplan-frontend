<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class="flex-grow p-4">
      <Navbar />
       <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div>
              <component :is="Component" />
            </div>
          </transition>
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
