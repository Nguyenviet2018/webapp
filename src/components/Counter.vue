<template>
  <div class="box">
    <h2>Số đếm: {{ count }}</h2>
    <button @click="count++">Tăng</button>
    <button @click="count--">Giảm</button>
  </div>
  <div>
      <h2 v-if="count > 10">Bạn đã đạt đỉnh!</h2>
      <h2 v-else>Cố gắng lên, sắp tới rồi!</h2>
      <button @click="count++">Tăng</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// Khai báo biến phản ứng (Reactive variable)
const count = ref(0)
</script>

<style scoped>
.box { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
button { margin: 5px; cursor: pointer; }
</style>