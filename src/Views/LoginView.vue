<template>
  <div class="login-container">
    <div class="login-header">
      <h1>Chào mừng trở lại!</h1>
		<LoginForm />
		</div>
  </div>
</template>

<script setup>
// Import component LoginForm vào view
import LoginForm from '../components/LoginForm.vue';
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 /* min-height: 100vh; */ /* Căn giữa màn hình */
  background-color: #f4f7f6;
}

.login-header {
  text-align: center;
    color: #333;
  margin-bottom: 40px;
}

</style>