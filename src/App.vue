<<template>
  <div id="app">
    <header class="navbar">
      <div class="logo">QUẢN LÝ NHÂN VIÊN</div>
      <nav>
        <router-link to="/">Trang Chủ</router-link> |
        <router-link to="/dashboard-admin">Dashboard</router-link> |
		<router-link to="/ql-nhanvien">Quản lý Nhân Viên</router-link> |
		<router-link to="/chamcongNhanvien">Chấm Công</router-link> |
		<router-link to="/about">Giới Thiệu</router-link> |
        <!-- Chỉ hiện khi CHƯA đăng nhập -->
        <router-link v-if="!isLoggedIn" to="/login">Đăng nhập</router-link>
        
        <!-- Chỉ hiện khi ĐÃ đăng nhập -->
        <button v-else @click="handleLogout" class="btn-logout-nav">Đăng xuất</button>
      </nav>
    </header>

    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2026 MyApp</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Kiểm tra xem đã đăng nhập hay chưa dựa trên token
const isLoggedIn = computed(() => !!localStorage.getItem('token'));

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style>

<style>
/* Reset cơ bản */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f9; }

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
}

.navbar a {
  color: white;
  margin-left: 15px;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover { text-decoration: underline; }

/* Main Content */
.content {
  padding: 2rem;
  min-height: 100vh;
  /* Thay vì giới hạn 800px, hãy để rộng hơn hoặc xóa nó đi */
  max-width: 1400px; 
  margin: 0 auto;
  width: 100%; /* Đảm bảo chiếm đủ 100% không gian cho phép */
  box-sizing: border-box;
}

/* Footer */
.footer {
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  margin-top: 2rem;
}
.btn-logout-nav {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 15px;
  font-size: 16px;
  font-family: inherit;
}

.btn-logout-nav:hover {
  text-decoration: underline;
}
</style>