<template>
  <div class="admin-container">
    <h1>Bảng điều khiển Admin</h1>
    
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="deleteUser(user.id)" class="btn-delete">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="admin-panel">  
      <div class="user-card">
        <h3>Thêm thành viên mới</h3>
        <div class="form-group">
          <input v-model="newUser.username" placeholder="Tên người dùng" />
          <input v-model="newUser.email" placeholder="Email" />
          <input v-model="newUser.password" type="password" placeholder="Mật khẩu" />
          
		
		  <select class="custom-select" v-model="newUser.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
		   <button @click="addUser" class="btn-add">Thêm vào hệ thống</button>
		 
         </div>
        </div>
    </div>
      
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const newUser = ref({ username: '', email: '', password: '', role: 'user' });

const users = ref([]);

// Lấy danh sách user từ Backend
const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3001/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    users.value = res.data;
  } catch (err) {
    console.error("Không thể lấy danh sách user");
  }
};
const addUser = async () => {
  try {
    await axios.post('http://localhost:3001/admin/add-user', newUser.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert("Thêm thành công!");
	// --- ĐOẠN CODE CẦN THÊM ĐỂ XÓA TEXT INPUT ---
	    newUser.value = { 
	      username: '', 
	      email: '', 
	      password: '', 
	      role: 'user' 
	    };
    fetchUsers(); // Cập nhật lại danh sách
	
  } catch (err) {
    alert("Lỗi khi thêm user");
  }
};
// Hàm xóa
const deleteUser = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa user này?")) return;

  try {
    await axios.delete(`http://localhost:3001/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Bắt buộc phải có token
      }
    });
    alert("Xóa thành công!");
    fetchUsers(); // Gọi lại hàm lấy danh sách để cập nhật giao diện
  } catch (err) {
    alert("Lỗi: " + (err.response?.data || "Không thể xóa"));
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.admin-container { padding: 20px; }
.user-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
.user-table th, .user-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
.btn-delete { background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; }
.user-card {
  background: #f9f9f9;
  padding: 20px;
  
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}
.form-group input {
	
  padding: 10px;
  margin-right: 10px;
  border: 10px solid #ccc;
  border-radius: 4px;
}
.form-select{
	padding: 10px;
	margin-right: 10px;
	border: 10px solid #ccc;
	border-radius: 4px;
	width: 20%;
}
.custom-select {
  width: 15%;
  margin:10px;
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  appearance: none; /* Loại bỏ mũi tên mặc định của trình duyệt */
  background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  transition: border-color 0.3s;
}
.btn-add {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}
</style>