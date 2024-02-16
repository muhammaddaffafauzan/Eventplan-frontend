<template>
<div>

</div>
</template>
<script>
export default {
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