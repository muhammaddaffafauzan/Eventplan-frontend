<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class="flex-grow p-4">
      <Navbar />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
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
<style>
/* Add this style block to your component's style block */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-out; /* Adjust the transition duration and easing function as needed */
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transition-delay: 0.3s; /* Adjust the delay duration as needed */
}

/* Additional styling for smoother transition */
.router-view-container {
  position: relative;
  overflow: hidden;
}
/* Add Montserrat font to the body or specific elements */
body {
  font-family: 'Montserrat', sans-serif;
}

/* You can also specify Montserrat for specific elements */
h1, h2, h3, p {
  font-family: 'Montserrat', sans-serif;
}
</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap">


