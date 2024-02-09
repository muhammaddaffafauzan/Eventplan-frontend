<template>
  <div>
    <NavbarMain/>
    <HeaderMainVue/>
    <SectionMainVue/>
  </div>
</template>

<script>
import HeaderMainVue from '../components/main/HeaderMain.vue';
import NavbarMain from '../components/main/NavbarMain.vue';
import SectionMainVue from '../components/main/SectionMain.vue';

export default {
  components: {
    NavbarMain,
    HeaderMainVue,
    SectionMainVue
  }
}
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}

/* You can also specify Montserrat for specific elements */
h1, h2, h3, p {
  font-family: 'Montserrat', sans-serif;
}
</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap">
