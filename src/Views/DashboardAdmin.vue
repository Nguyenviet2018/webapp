<template>
  <div class="dashboard-admin">
    <header class="header">
      <h1>Bảng điều khiển Admin</h1>
      <p>Tổng quan hệ thống nhân sự</p>
    </header>

    <!-- Thống kê tổng quát -->
    <section class="stats-grid">
      <div class="card primary">
        <h3>Tổng nhân viên</h3>
        <p class="number">{{ stats.employeeCount }}</p>
      </div>
      <div class="card secondary">
        <h3>Tổng phòng ban</h3>
        <p class="number">{{ stats.deptCount }}</p>
      </div>
    </section>

    <!-- Thống kê chi tiết trạng thái -->
    <section class="details-grid">
      <div class="card">
        <h4>Đang làm việc</h4>
        <p class="count">{{ stats.stats.dangLam }}</p>
      </div>
      <div class="card">
        <h4>Đang nghỉ việc</h4>
        <p class="count">{{ stats.stats.nghiViec }}</p>
      </div>
      <div class="card">
        <h4>Đang tạm nghỉ</h4>
        <p class="count">{{ stats.stats.tamNghi }}</p>
      </div>
    </section>

    <!-- Danh sách phòng ban -->
    <section class="departments">
      <h3>Danh sách Phòng ban</h3>
      <ul>
        <li v-for="(pb, index) in stats.listPhongBan" :key="index">
          {{ pb.tenphongban }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stats = ref({
  employeeCount: 0,
  deptCount: 0,
  listPhongBan: [],
  stats: { dangLam: 0, nghiViec: 0, tamNghi: 0 }
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://server-supabase-api.vercel.app/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    stats.value = res.data;
  } catch (error) {
    console.error("Lỗi lấy dữ liệu dashboard:", error);
    alert("Bạn không có quyền truy cập hoặc lỗi kết nối!");
  }
};

onMounted(fetchData);
</script>

<style scoped>
.dashboard-admin { padding: 20px; }
.stats-grid, .details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
.card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
.number { font-size: 2.5rem; font-weight: bold; color: #27ae60; }
.count { font-size: 1.5rem; font-weight: bold; color: #34495e; }
.departments { background: white; padding: 20px; border-radius: 12px; }
ul { list-style: none; display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
li { background: #ecf0f1; padding: 8px 15px; border-radius: 20px; font-weight: 500; }
</style>