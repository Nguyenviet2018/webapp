<!-- src/components/TodoItem.vue -->
<template>
  <li>
    {{ task.name }}
    <!-- Gửi sự kiện 'remove' lên cho cha -->
    <button @click="$emit('remove', task.id)">Xóa</button>
  </li>
</template>

<script setup>
// Nhận dữ liệu từ cha thông qua 'props'
defineProps(['task']);
</script>
