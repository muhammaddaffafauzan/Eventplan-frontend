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
  beforeRouteEnter(to, from, next) {
    document.title = 'EventPlan - ' + (to.meta.title || 'Teks Default');
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = 'EventPlan - ' + (to.meta.title || 'Teks Default');
    next();
  },
};
</script>
