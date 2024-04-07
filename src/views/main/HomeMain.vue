<template>
  <div>
    <HeaderMainVue />
    <SectionMainVue />
  </div>
</template>
<script>
import HeaderMainVue from "../../components/main/HeaderMain.vue";
import SectionMainVue from "../../components/main/SectionMain.vue";

export default {
  components: {
    HeaderMainVue,
    SectionMainVue,
  },
  beforeRouteEnter(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Teks Default");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Teks Default");
    next();
  },
};
</script>
