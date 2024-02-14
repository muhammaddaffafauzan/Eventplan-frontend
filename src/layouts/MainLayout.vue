<template>
  <div>
    <NavbarMain />
    <router-view v-if="!isLoading" />
    <LoadingPage v-if="isLoading" />
  </div>
</template>

<script>
import NavbarMain from '../components/main/NavbarMain.vue';
import LoadingPage from '../components/LoadingPage.vue';
export default {
  components: {
    NavbarMain,
    LoadingPage,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  watch: {
    $route(to, from) {
      // Set isLoading to true when the route is changing
      this.isLoading = true;
    },
  },
  mounted() {
    // Assuming you want to hide the loading page when the new route is fully loaded.
    this.$router.afterEach(() => {
      // Set isLoading to false when the new route is fully loaded.
      this.isLoading = false;
    });
  },
};
</script>