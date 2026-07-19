<!-- <template>
  <div class="page">
    <h1>Giới Thiệu</h1>
    <p>Đây là ứng dụng được xây dựng với Vue 3 và Vue Router.</p>
  </div>
</template>

<style scoped>
.page { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
</style> -->
<template>
  <div class="about-container">
    <div class="about-card">
      <div class="about-header">
        <h2>ℹ️ Về ứng dụng</h2>
        <div class="divider"></div>
      </div>
      
      <div class="about-content">
        <p>Ứng dụng này là giải pháp quản lý nhân sự chuyên nghiệp, được phát triển nhằm tối ưu hóa quy trình theo dõi và quản lý dữ liệu nhân viên trong doanh nghiệp.</p>
        
        <h3>Công nghệ sử dụng</h3>
        <ul class="tech-list">
          <li><strong>Frontend:</strong> Vue 3 (Composition API), Vite, Vue Router</li>
          <li><strong>Styling:</strong> CSS Grid/Flexbox, Modern UI Design</li>
          <li><strong>Backend/Database:</strong> Axios API Integration, Supabase</li>
        </ul>

        <div class="author-section">
          <p>Phát triển bởi: <strong>VietJack616</strong></p>
          <p>Phiên bản: 1.0.0</p>
        </div>
      </div>

      <button class="btn-back" @click="$router.push('/')">Về Trang chủ</button>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f4f7f6;
}

.about-card {
  background: white;
  padding: 50px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 600px;
  width: 100%;
}

.about-header h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.divider {
  width: 50px;
  height: 4px;
  background: #27ae60;
  margin-bottom: 20px;
  border-radius: 2px;
}

.about-content p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tech-list {
  list-style: none;
  padding: 0;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
}

.tech-list li {
  margin-bottom: 10px;
  color: #34495e;
}

.author-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
  color: #7f8c8d;
}

.btn-back {
  background: transparent;
  border: 2px solid #27ae60;
  color: #27ae60;
  padding: 10px 25px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin-top: 20px;
}

.btn-back:hover {
  background: #27ae60;
  color: white;
}
</style>