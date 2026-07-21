<template>
  <div class="dashboard">
    <main class="content">
      <header class="header">
        <h1>Chào mừng, {{ userEmail }}</h1>
        <p>Hệ thống Quản lý Nhân sự nội bộ</p>
      </header>

      <!-- Các thẻ thống kê động -->
      <section class="stats">
        <div class="card">
          <h3>Tổng nhân viên</h3>
          <p class="number">{{ totalNhanVien }}</p>
        </div>
        <div class="card">
          <h3>Đang làm việc</h3>
          <p class="number">{{ dangLamViec }}</p>
        </div>
        <div class="card">
          <h3>Phòng ban</h3>
          <p class="number">{{ totalPhongBan }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const userEmail = ref('');
const totalNhanVien = ref(0);
const dangLamViec = ref(0);
const totalPhongBan = ref(0);

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }

  try {
    // 1. Giải mã token
    const decoded = jwtDecode(token);
    userEmail.value = decoded.email || 'Admin';

    // 2. Lấy dữ liệu từ API (Đảm bảo URL đúng với backend của bạn)
    const [resNv, resPb] = await Promise.all([
     // axios.get('http://192.168.0.134:3002/nhanvien'),
     // axios.get('http://192.168.0.134:3002/phongban')
	  axios.get('https://server-supabase-api.vercel.app/nhanvien'),
	  axios.get('https://server-supabase-api.vercel.app/phongban')
    ]);

    // 3. Tính toán thống kê
    totalNhanVien.value = resNv.data.length;
    dangLamViec.value = resNv.data.filter(nv => nv.trangthai === 'đang làm').length;
    totalPhongBan.value = resPb.data.length;

  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    if (error.response?.status === 401) router.push('/login');
  }
});
</script>

<style scoped>
.header { margin-bottom: 30px; }
.stats { display: flex; gap: 20px; margin-top: 20px; }
.card { 
  background: white; 
  padding: 30px; 
  border-radius: 15px; 
  box-shadow: 0 8px 20px rgba(0,0,0,0.08); 
  width: 250px;
  text-align: center;
  transition: transform 0.3s;
}
.card:hover { transform: translateY(-5px); }
.number { 
  font-size: 2.5rem; 
  font-weight: bold; 
  color: #27ae60; 
  margin-top: 10px; 
}
</style>