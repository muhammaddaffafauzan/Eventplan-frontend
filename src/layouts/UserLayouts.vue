<template>
  <div class="min-h-screen flex">
    <SidebarUser />
    <div class="flex-grow p-4">
      <NavbarUser />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script>
import SidebarUser from "../components/user/SidebarUser.vue";
import NavbarUser from "../components/user/NavbarUser.vue";

export default {
  components: {
    SidebarUser,
    NavbarUser,
  },
};
</script>
<style>
/* Add this style block to your component's style block */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out; /* Adjust the transition duration and easing function as needed */
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition-delay: 0.3s; /* Adjust the delay duration as needed */
}

/* Additional styling for smoother transition */
.router-view-container {
  position: relative;
  overflow: hidden;
}
</style>
