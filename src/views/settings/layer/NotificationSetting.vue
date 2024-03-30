<template>
  <div>ini setting notification</div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Title");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    document.title = "EventPlan - " + (to.meta.title || "Default Title");
    next();
  },
};
</script>
