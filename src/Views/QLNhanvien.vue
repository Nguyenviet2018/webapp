<template>
  <div class="ql-nhanvien-container">
<!--    <header class="page-header">
      <h1>📋 Quản lý Nhân viên</h1>
      <button @click="resetForm" class="btn-add-new">+ Thêm nhân viên</button>
    </header> -->
<!-- Trong QLNhanvien.vue, sửa phần Header -->
<header class="page-header">
  <h1>📋 Quản lý Nhân viên</h1>
  <button @click="$router.push('/add-nhanvien')" class="btn-add-new">+ Thêm nhân viên</button>
</header>
<div class="search-container">
	  <input 
	    v-model="searchQuery" 
	    placeholder="🔍 Tìm kiếm theo mã NV hoặc họ tên..." 
	    class="search-input"
	  />
	</div>
    <!-- Form dạng Card đẹp mắt -->
    <div v-if="isEditing" class="form-card">
	
      <h3>{{ form.nhanvien_id ? 'Chỉnh sửa thông tin' : 'Thêm mới nhân viên' }}</h3>
     <div class="form-grid">
       <div class="form-group">
         <label>Mã nhân viên</label>
         <input v-model="form.manv" placeholder="VD: NV01" />
       </div>
     
       <div class="form-group">
         <label>Họ và tên</label>
         <input v-model="form.hoten" placeholder="Nguyễn Văn A" />
       </div>
     <div class="form-group">
       <label>Giới tính</label>
       <select v-model="form.gioitinh">
         <option value="Nam">Nam</option>
         <option value="Nữ">Nữ</option>
       </select>
     </div>
       <div class="form-group">
         <label>Ngày sinh</label>
         <input v-model="form.ngaysinh" type="date" />
       </div>
     
       <div class="form-group">
         <label>Số điện thoại</label>
         <input v-model="form.sodt" placeholder="0909xxxxxx" />
       </div>
     
       <div class="form-group">
         <label>Email</label>
         <input v-model="form.email" type="email" placeholder="email@example.com" />
       </div>
     
       <div class="form-group">
         <label>Địa chỉ</label>
         <input v-model="form.diachi" placeholder="Số nhà, đường, phường..." />
       </div>
     
       <div class="form-group">
         <label>Ngày vào làm</label>
         <input v-model="form.ngayvaolam" type="date" />
       </div>
     <div class="form-group">
       <label>Chức vụ</label>
       <select v-model="form.chucvu_id">
         <option v-for="cv in chucvus" :key="cv.chucvu_id" :value="cv.chucvu_id">
           {{ cv.tenchucvu }}
         </option>
       </select>
     </div>
	 <div class="form-group">
	   <label>Phòng ban</label>
	   <select v-model="form.phongban_id">
	     <option value="" disabled>-- Chọn phòng ban --</option>
	     <option v-for="pb in phongbans" :key="pb.phongban_id" :value="pb.phongban_id">
	       {{ pb.tenphongban }}
	     </option>
	   </select>
	 </div>
       <div class="form-group">
         <label>Trạng thái</label>
         <select v-model="form.trangthai">
           <option value="đang làm">Đang làm</option>
           <option value="nghỉ việc">Nghỉ việc</option>
           <option value="tạm nghỉ">Tạm nghỉ</option>
         </select>
       </div>
     </div>
      <div class="form-actions">
        <button @click="saveNhanVien" class="btn-save">Lưu thông tin</button>
        <button @click="resetForm" class="btn-cancel">Hủy</button>
      </div>
    </div>

    <!-- Bảng dữ liệu hiện đại -->
    <div class="table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
			<th>Số ĐT</th>
			<th>Email</th>
			<th>Địa chỉ</th>
			<th>Ngày Vào làm</th>
			<th>Chức vụ</th> <!-- Thêm cột này -->
            <th>Phòng ban</th>
            <th>Trạng thái</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
		  <tr v-for="nv in filteredNhanVien" :key="nv.nhanvien_id">
          <!-- <tr v-for="nv in nhanviens" :key="nv.nhanvien_id"> -->
            <td>{{ nv.manv }}</td>
            <td>{{ nv.hoten }}</td>
            <td>{{ nv.gioitinh }}</td>
			<td>{{ nv.sodt }}</td>
			<td>{{ nv.email }}</td>
			<td>{{ nv.diachi }}</td>
			<td>{{ nv.ngayvaolam }}</td>
			<td>{{ nv.chucvu?.tenchucvu || 'Chưa có' }}</td>
            <td>{{ nv.phongban?.tenphongban || 'Chưa có' }}</td>
            <td>
              <span :class="['status', nv.trangthai]">{{ nv.trangthai }}</span>
            </td>
            <td class="text-center">
              <button @click="editNhanVien(nv)" class="btn-icon edit">Update ✏️</button>
              <button @click="deleteNhanVien(nv.nhanvien_id)" class="btn-icon delete">Delete 🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed} from 'vue';
import axios from 'axios';

const nhanviens = ref([]);
const isEditing = ref(false);
const searchQuery = ref(''); // <--- Phải có dòng này ở đây
const form = ref({ nhanvien_id: null, manv: '', hoten: '',ngaysinh:'',gioitinh:'', sodt: '',email: '',diachi:'',ngayvaolam:'', chucvu_id: '', phongban_id: '',trangthai:'' });
const phongbans = ref([]); // Thêm biến này
const chucvus = ref([]);

const filteredNhanVien = computed(() => {
  if (!nhanviens.value) return [];
  const query = searchQuery.value.toLowerCase();
  return nhanviens.value.filter(nv => 
    (nv.manv?.toLowerCase().includes(query)) || 
    (nv.hoten?.toLowerCase().includes(query))
  );
});

const fetchNhanVien = async () => {
  //const res = await axios.get('http://localhost:3001/nhanvien');
  const res = await axios.get('https://server-supabase-api.vercel.app/nhanvien');
  nhanviens.value = res.data;
};

const saveNhanVien = async () => {
  try {
    // Chỉ chọn lọc các trường cần thiết để cập nhật
    const payload = {
      manv: form.value.manv,
      hoten: form.value.hoten,
      ngaysinh: form.value.ngaysinh || null, // Chuyển chuỗi rỗng thành null nếu cần
      gioitinh: form.value.gioitinh,
      sodt: form.value.sodt,
      email: form.value.email,
      diachi: form.value.diachi,
      ngayvaolam: form.value.ngayvaolam || null,
	  chucvu_id: form.value.chucvu_id || null,
	  trangthai: form.value.trangthai,
	  phongban_id: form.value.phongban_id || null // Thêm null nếu không chọn
    };

    if (isEditing.value) {
      // Gọi API cập nhật
      await axios.put(`http://https://server-supabase-api.vercel.app/nhanvien/${form.value.nhanvien_id}`, payload);
		//await axios.put(`http://localhost:3001/nhanvien/${form.value.nhanvien_id}`, payload);
	} else {
      // Gọi API thêm mới
      await axios.post('http://https://server-supabase-api.vercel.app/nhanvien', payload);
		//await axios.post('http://localhost:3001/nhanvien', payload);
	}
    
    alert("Thành công!");
    resetForm();
    fetchNhanVien();
  } catch (err) { 
    console.error(err);
    alert("Lỗi lưu dữ liệu: Kiểm tra lại các trường thông tin!"); 
  }
};

const editNhanVien = (nv) => {
  isEditing.value = true;
  // Sao chép chỉ các giá trị cơ bản của nhân viên
  form.value = {
    nhanvien_id: nv.nhanvien_id,
    manv: nv.manv,
    hoten: nv.hoten,
    ngaysinh: nv.ngaysinh,
    gioitinh: nv.gioitinh,
    sodt: nv.sodt,
    email: nv.email,
    diachi: nv.diachi,
    ngayvaolam: nv.ngayvaolam,
	chucvu_id: nv.chucvu?.chucvu_id || nv.chucvu_id || '',
	phongban_id: nv.phongban_id || nv.phongban?.phongban_id,
	trangthai: nv.trangthai,
  };
};

const deleteNhanVien = async (id) => {
  if (!confirm("Xóa nhân viên này?")) return;
  await axios.delete(`http://https://server-supabase-api.vercel.app/nhanvien/${id}`);
  //await axios.delete(`http://localhost:3001/nhanvien/${id}`);
  
  fetchNhanVien();
};

const resetForm = () => {
  isEditing.value = false;
  form.value = { nhanvien_id: null, manv: '', hoten: '',ngaysinh:'',gioitinh:'', sodt: '',email: '',diachi:'',ngayvaolam:'', trangthai:''  };
};
// Hàm lấy danh sách phòng ban
const fetchPhongBan = async () => {
  const res = await axios.get('https://server-supabase-api.vercel.app/phongban');
  //const res = await axios.get('http://localhost:3001/phongban');
  
  phongbans.value = res.data;
};
const fetchChucVu = async () => {
  const res = await axios.get('https://server-supabase-api.vercel.app/chucvu');
  //const res = await axios.get('http://localhost:3001/chucvu');
  chucvus.value = res.data;
};
//onMounted(fetchNhanVien);
// Cập nhật onMounted
onMounted(() => {
  fetchNhanVien();
  fetchPhongBan(); // Tải thêm phòng ban
  fetchChucVu();
});
</script>

<style scoped>
	
.form-card {
  background: white;
  padding: 40px;          /* Tăng padding để nội dung bên trong có nhiều không gian thở */
  border-radius: 16px;    /* Bo góc mềm mại hơn */
  box-shadow: 0 8px 30px rgba(0,0,0,0.12); /* Đổ bóng đậm hơn để thẻ trông "nổi" hơn */
  max-width: 1000px;      /* Tăng độ rộng tối đa (ví dụ từ 800px lên 1000px) */
  margin: 0 auto 30px auto; /* Căn giữa và tạo khoảng cách với các thành phần khác */
  width: 95%;             /* Đảm bảo nó luôn chiếm 95% không gian màn hình trên mobile */
  font-size: 16px;        /* Phóng to cỡ chữ */
  font-weight: 700;       /* Chữ siêu đậm */
}
.form-group{
	font-size: 16px;
}
.search-container { margin-bottom: 20px; }
.search-input { 
	width: 100%; 
	max-width: 400px; 
	padding: 12px 20px; 
	border: 2px solid #ddd; 
	border-radius: 25px; 
}
.form-card h3 {
  text-align: center;      /* Đưa tiêu đề vào giữa */
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;     /* Tăng khoảng cách với các input bên dưới */
}
/* Container chính của trang */
.ql-nhanvien-container { 
  padding: 30px; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  background: #f4f7f6; 
  min-height: 100vh;
  box-sizing: border-box;
}

/* Header trang */
.page-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 25px; 
}

/* Wrapper bảng - Cho phép cuộn ngang */
.table-container { 
  width: 100%; 
  background: white; 
  border-radius: 12px; 
  overflow-x: auto; /* Tạo thanh cuộn khi bảng quá rộng */
  box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
  padding: 10px;
  font-size: 16px;        /* Phóng to cỡ chữ */
  font-weight: 700;       /* Chữ siêu đậm */
}

/* Bảng dữ liệu - Cố định độ rộng tối thiểu */
.modern-table { 
  width: 100%; 
  min-width: 1200px; /* Ép bảng rộng ra để không bị co chữ */
  border-collapse: collapse; 
  table-layout: auto; 
  font-size: 16px;        /* Phóng to cỡ chữ */
  font-weight: 700;       /* Chữ siêu đậm */
}

/* Định dạng tiêu đề và ô dữ liệu */
.modern-table th { 
  background: #f8f9fa; 
  padding: 18px 15px; 
  text-align: left; 
  color: #888; 
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap; /* Giữ tiêu đề trên 1 dòng */
  border: 1px solid #ddd;    /* Viền bao quanh bảng */
  text-align: center;
}

.modern-table td { 
  padding: 15px; 
  border-top: 1px solid #eee; 
  vertical-align: middle;
  font-size: 14px;        /* Phóng to cỡ chữ */
  font-weight: 400;       /* Chữ siêu đậm */
  border: 1px solid #ddd;    /* Viền bao quanh bảng */
  text-align: center;
}

/* Tùy chỉnh độ rộng các cột cụ thể */
.modern-table td:nth-child(6) { /* Cột Địa chỉ */
  min-width: 250px;
  white-space: normal; /* Cho phép địa chỉ xuống dòng nếu quá dài */
  font-size: 14px;        /* Phóng to cỡ chữ */
  font-weight: 400;       /* Chữ siêu đậm */
  text-align: center;
}

.modern-table th:last-child, .modern-table td:last-child {
  text-align: center;
  min-width: 150px;
  text-align: center;
}

/* Nút thao tác */
.btn-icon { 
  padding: 6px 12px; 
  border-radius: 4px; 
  border: none; 
  cursor: pointer; 
  margin: 0 5px; 
  font-size: 13px; 
}
.edit { background: #e1f5fe; color: #0288d1; }
.delete { background: #ffebee; color: #d32f2f; }

/* Nút thêm mới */
.btn-add-new { 
  background: #27ae60; 
  color: white; 
  padding: 10px 20px; 
  border-radius: 6px; 
  border: none; 
  cursor: pointer;
  font-weight: bold;
  margin: 20px;
}
.form-actions{
	margin: 10px;
}
.btn-save{
	background: #27ae60;
	color: white; 
	padding: 10px 20px; 
	border-radius: 15px; 
	border: none; 
	cursor: pointer;
	font-weight: bold;
	font-size: 14px;        /* Chữ nút to hơn */
    font-weight: 700;       /* Chữ nút đậm hơn */
}
.btn-cancel{
	background: #27ae60;
	color: white; 
	padding: 10px 20px; 
	border-radius: 15px; 
	border: none; 
	cursor: pointer;
	font-weight: bold;
	margin: 10px;
	font-size: 14px;        /* Chữ nút to hơn */
	font-weight: 700;       /* Chữ nút đậm hơn */
}
/* Responsive cho Form (AddNhanvien.vue) */
.form-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 20px; 
}

input, select, textarea { 
  padding: 12px; 
  border: 1px solid #ccc; 
  border-radius: 6px; 
  width: 100%;
  box-sizing: border-box;
}
</style>