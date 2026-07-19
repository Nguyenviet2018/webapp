<!-- <template>
  <div class="page">
    <h1>Trang Chủ</h1>
    <p>Chào mừng bạn đến với ứng dụng Vue của tôi!</p>
  </div>
</template>

<style scoped>
.page { padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
</style> -->
<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Quản Lý Nhân Sự</h1>
        <p>Hệ thống quản lý chuyên nghiệp, trực quan và hiệu quả.</p>
        <button class="btn-action" @click="$router.push('/login')">
          Truy cập Quản lý
        </button>
      </div>
    </section>

    <!-- Cards Section -->
    <section class="features">
      <div class="feature-card">
        <div class="icon">👥</div>
        <h3>Nhân viên</h3>
        <p>Theo dõi và cập nhật thông tin nhân sự dễ dàng.</p>
      </div>
      <div class="feature-card">
        <div class="icon">🏢</div>
        <h3>Phòng ban</h3>
        <p>Tối ưu hóa sơ đồ tổ chức của doanh nghiệp.</p>
      </div>
      <div class="feature-card">
        <div class="icon">⚙️</div>
        <h3>Chức vụ</h3>
        <p>Phân cấp quyền hạn và vị trí công việc chi tiết.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  padding: 40px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 90vh;
  font-family: 'Segoe UI', sans-serif;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  margin-bottom: 40px;
}

.hero h1 { font-size: 3rem; color: #2c3e50; margin-bottom: 10px; }
.hero p { font-size: 1.2rem; color: #7f8c8d; margin-bottom: 30px; }

.btn-action {
  padding: 15px 40px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
}

.btn-action:hover {
  background: #219150;
  transform: scale(1.05);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  transition: 0.3s;
  border: 1px solid rgba(0,0,0,0.05);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.icon { font-size: 3rem; margin-bottom: 15px; }
</style>