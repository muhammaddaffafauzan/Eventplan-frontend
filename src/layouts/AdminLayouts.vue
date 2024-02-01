<template>
    <div class="min-h-screen flex">
      <Sidebar />
      <div class="flex-grow p-4">
        <router-view />
      </div>
    </div>
</template>
  
  <script>
  import Sidebar from "../components/Sidebar.vue";
  
  export default {
    components: {
      Sidebar,
    },
  };
  </script>
  