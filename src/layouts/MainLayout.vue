<template>
  <div>
    <NavbarMain />
    <router-view/>
  </div>
</template>
<script>
import NavbarMain from '../components/main/NavbarMain.vue';
export default {
  components: {
    NavbarMain,
  },
};
</script>