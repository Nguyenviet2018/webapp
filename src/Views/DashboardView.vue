<template>
  <div class="dashboard">
    <main class="content">
      <header class="header">
        <h1>Chào mừng, {{ userEmail }}</h1>
      </header>

      <section class="stats">
        <div class="card">Tổng học viên: 150</div>
        <div class="card">Khóa học mới: 5</div>
		
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router'; // Đã thêm

const router = useRouter(); // Cần khai báo cái này
const userEmail = ref('');

onMounted(() => {
  const token = localStorage.getItem('token');
  //const userEmail = localStorage.getItem('userEmail');
  if (!token) {
    router.push('/login');
  } else {
    try {
      const decoded = jwtDecode(token);
      userEmail.value = decoded.email || 'Người dùng'; // Thêm fallback nếu không có email
    //console.log(userEmail);
	} catch (error) {
      console.error("Token không hợp lệ:", error);
      router.push('/login');
    }
  }
});
</script>

<style scoped>
.dashboard { display: flex; min-height: 100vh; }
.content { flex: 1; padding: 20px; background: #f4f7f6; }
.stats { display: flex; gap: 20px; margin-top: 20px; }
.card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 200px; }
.btn-logout { margin-top: 50px; background: #e74c3c; color: white; border: none; padding: 10px; width: 100%; cursor: pointer; border-radius: 5px; }
.btn-logout:hover { background: #c0392b; }
</style>