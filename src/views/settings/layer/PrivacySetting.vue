<template>
  <div class="flex justify-center items-center h-screen">
    <el-card class="coming-soon-card">
      <span class="text-4xl font-bold">Coming Soon</span>
    </el-card>
  </div>
</template>

<script>
import { ElCard } from 'element-plus';

export default {
  components: {
    ElCard,
  }
}
</script>

<style scoped>
.coming-soon-card {
  width: 300px; /* Sesuaikan lebar card sesuai kebutuhan */
  padding: 20px;
  text-align: center;
}
</style>
