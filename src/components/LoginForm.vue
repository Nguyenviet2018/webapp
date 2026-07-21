<script setup>
import { ref } from 'vue'; // Chỉ import 1 lần
import axios from 'axios';
// 1. Phải import useRouter từ vue-router
import { useRouter } from 'vue-router';

// 2. Phải khởi tạo router như thế này
const router = useRouter();
const username = ref('');
const password = ref('');
const email = ref(''); 
const isLogin = ref(true);


const register = async () => {
  // Validate cơ bản
  if (!email.value || !password.value || !username.value) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      alert("Email không hợp lệ");
      return;
    }
  try {
    //const res = await axios.post('http://localhost:3002/register', {
	const res = await axios.post('https://server-supabase-api.vercel.app/register', {
      username: username.value,
      email: email.value,
      password: password.value
    });
    
    //alert(res.data); // "Đăng ký thành công!"
    isLogin.value = true; // Chuyển về màn hình đăng nhập sau khi đăng ký xong
  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert("Email đã tồn tại!");
    } else {
      alert("Đăng ký thất bại, thử lại sau.");
    }
  }
};
const login = async () => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.value)) {
	  alert("Email không hợp lệ");
	  return;
	}
try {
    //const res = await axios.post('http://192.168.0.134:3002/login', { 
	const res = await axios.post('https://server-supabase-api.vercel.app/login', {
      email: email.value, 
      password: password.value 
    });
	//console.log("Dữ liệu server trả về:", res.data);
	//console.log(email);
// 1. Lưu token
    localStorage.setItem('userEmail', email);
	localStorage.setItem('token', res.data.token);
   
    // 2. Điều hướng dựa trên role
    const userRole = res.data.role;
   
    if (userRole === 'admin') {
      router.push('/admin'); // Chuyển đến trang quản trị
    } else {
      router.push('/dashboard'); // Chuyển đến trang người dùng thường
    }
  } catch (err) {
    // In lỗi ra bảng điều khiển của trình duyệt (F12 -> Console)
    console.error("Lỗi chi tiết từ server:", err.response ? err.response.data : err.message);
    alert("Đăng nhập thất bại: " + (err.response?.data || "Lỗi kết nối"));
  }
};
</script>

<template>

    <div class="auth-box">
        <h2>{{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}</h2>
        <input v-model="email" type="email" placeholder="Email" />
        <input v-if="!isLogin" v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="isLogin ? login() : register()">
          {{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}
        </button>
    
    <p @click="isLogin = !isLogin" class="toggle-text">
      {{ isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập' }}
    </p>
  </div>
</template>

<style scoped>
/* Giữ nguyên các phần CSS của bạn, nó đã rất đẹp rồi! */
.auth-box { 
	border: 1px solid #ddd; padding: 20px; border-radius: 8px; 
	max-width: 300px; margin: auto; }
.toggle-text { cursor: pointer; color: blue; margin-top: 10px; text-align: center; }
input { width: 90%; padding: 12px 16px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 8px; font-size: 16px; outline: none; transition: all 0.3s ease; }
input:focus { border-color: #42b983; box-shadow: 0 0 8px rgba(66, 185, 131, 0.2); }
button { width: 100%; padding: 12px 24px; background-color: #42b983; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.3s; }
button:hover { background-color: #3aa876; }
</style>