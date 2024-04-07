<template>
  <div>
    <NavbarMain />
    <router-view/>
    <FooterMain />
  </div>
</template>
<script>
import NavbarMain from '../components/main/NavbarMain.vue';
import FooterMain from '../components/main/FooterMain.vue';
export default {
  components: {
    NavbarMain,
    FooterMain
  },
};
</script>