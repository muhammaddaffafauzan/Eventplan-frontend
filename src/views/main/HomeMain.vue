<template>
  <div>
    <HeaderMainVue />
    <SectionMainVue />
    <FooterMain />
  </div>
</template>
<script>
import FooterMain from "../../components/main/FooterMain.vue";
import HeaderMainVue from "../../components/main/HeaderMain.vue";
import SectionMainVue from "../../components/main/SectionMain.vue";

export default {
  components: {
    HeaderMainVue,
    SectionMainVue,
    FooterMain,
  },
};
</script>
