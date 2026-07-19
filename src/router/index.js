import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import LoginView from '../Views/LoginView.vue';
import DashboardView from '../Views/DashboardView.vue';
import About from '../components/About.vue';
import Home from '../components/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginView },
  { 
    path: '/dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/admin', 
    component: () => import('../Views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { 
    path: '/ql-nhanvien', 
    component: () => import('../Views/QLNhanvien.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } // Đã thêm meta bảo vệ
  },
  { 
    path: '/add-nhanvien', 
    component: () => import('../Views/AddNhanvien.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { path: '/about', component: About },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // 1. Xử lý Logout
  if (to.path === '/logout') {
    localStorage.removeItem('token');
    return next('/login');
  }

  // 2. Kiểm tra quyền Admin (Ưu tiên kiểm tra trước)
  if (to.meta.requiresAdmin) {
    if (!token) return next('/login');

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        return next();
      } else {
        alert("Bạn không có quyền truy cập trang Admin!");
        return next('/dashboard');
      }
    } catch (e) {
      return next('/login');
    }
  }

  // 3. Bảo vệ các Route cần đăng nhập thông thường
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // 4. Mặc định cho phép đi tiếp
  next();
});

export default router;