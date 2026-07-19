<template>
  <div class="add-container">
    <h2>➕ Thêm nhân viên mới</h2>
    <div class="form-card">
      <div class="form-grid">
		  <div class="form-group">
			<label>Mã nhân viên</label>
			<input v-model="form.manv" placeholder="Mã NV" required />
			</div>
			
			<div class="form-group">
			<label>Họ và tên</label>
			<input v-model="form.hoten" placeholder="Họ và tên" required />
			</div>
		
			<div class="form-group">
			<label>Ngày sinh</label>
			<input v-model="form.ngaysinh" type="date" title="Ngày sinh" />
			</div> 
			<div class="form-group">
			<label>Giới tính</label>
				<select v-model="form.gioitinh">
				<option value="" disabled selected>Chọn giới tính</option>
				<option value="Nam">Nam</option>
				<option value="Nữ">Nữ</option>
				</select>
			</div>
		
			<div class="form-group">
				<label>Số ĐT</label>
				<input v-model="form.sodt" placeholder="Số điện thoại" />
			</div>
			<div class="form-group">
				<label>Email</label>
				<input v-model="form.email" type="email" placeholder="Email" />
			</div>
			<div class="form-group">
				<label>Ngày vào làm</label>
				<input v-model="form.ngayvaolam" type="date" title="Ngày vào làm" />
			</div>
			<div class="form-group">
			      <label>Chức vụ</label>
			      <select v-model="form.chucvu_id" required>
			        <option value="" disabled>-- Chọn chức vụ --</option>
			        <option v-for="cv in chucvus" :key="cv.chucvu_id" :value="cv.chucvu_id">
			          {{ cv.tenchucvu }}
			        </option>
			      </select>
			    </div>
			<div class="form-group">
				<label>Phòng Ban</label>
				<select v-model="form.phongban_id">
				<option value="" disabled selected>Chọn phòng ban</option>
				<option v-for="pb in listPhongBan" :value="pb.phongban_id" :key="pb.phongban_id">
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
			<div class="form-group">
				<label>Địa chỉ</label>
				<textarea v-model="form.diachi" placeholder="Địa chỉ chi tiết" style="width: 100%; margin-top: 10px;"></textarea>
			</div>
		</div>
      <div class="actions" style="margin-top: 20px;">
        <button @click="submit" class="btn-save">Xác nhận thêm</button>
        <button @click="$router.push('/ql-nhanvien')" class="btn-cancel">Quay lại</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dữ liệu dùng cho dropdown
const listPhongBan = ref([]); 
const chucvus = ref([]); 

// Khởi tạo form
const form = ref({
  manv: '',
  hoten: '',
  ngaysinh: '',
  gioitinh: '',
  sodt: '',
  email: '',
  ngayvaolam: '',
  diachi: '',
  phongban_id: '',
  chucvu_id: '',
  trangthai: 'đang làm' // Mặc định trạng thái
});

// Hàm lấy dữ liệu dùng chung
const fetchData = async () => {
  try {
    // Gọi cả 2 API cùng lúc để tối ưu
    const [resPb, resCv] = await Promise.all([
      axios.get('https://server-supabase-api.vercel.app/phongban'),
	 // axios.get('http://localhost:3001/phongban'),
      axios.get('https://server-supabase-api.vercel.app/chucvu')
	  //axios.get('http://localhost:3001/chucvu')
    ]);
    listPhongBan.value = resPb.data;
    chucvus.value = resCv.data;
  } catch (error) {
    console.error("Lỗi tải danh mục:", error);
    alert("Không thể tải danh sách Phòng ban/Chức vụ");
  }
};

const submit = async () => {
  try {
    // Kiểm tra cơ bản trước khi gửi
    if (!form.value.manv || !form.value.hoten) {
      alert("Vui lòng nhập Mã NV và Họ tên!");
      return;
    }
    await axios.post('https://server-supabase-api.vercel.app/nhanvien', form.value);
	//await axios.post('http://localhost:3001/nhanvien', form.value);
	
    alert("Thêm nhân viên thành công!");
    router.push('/ql-nhanvien');
  } catch (err) {
    alert("Lỗi khi thêm: " + (err.response?.data?.error || "Kiểm tra lại dữ liệu"));
  }
};

onMounted(fetchData); // Gọi 1 lần duy nhất khi load trang
</script>

<style scoped>
.add-container { padding: 40px; max-width: 800px; margin: 0 auto; }
.form-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group{
	
}
input, select, textarea { padding: 12px; border: 1px solid #ccc; border-radius: 6px; width: 100%; }
.btn-save { background: #27ae60; color: white; padding: 12px 20px; border: none; border-radius: 6px; cursor: pointer; }
.btn-cancel { background: #95a5a6; color: white; padding: 12px 20px; border: none; border-radius: 6px; cursor: pointer; margin-left: 10px; }
</style>