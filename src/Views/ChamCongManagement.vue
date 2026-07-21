<template>
  <div class="container-page">
    <div class="page-header-flex">
      <div>
        <h1>Quản Lý Chấm Công</h1>
        <p>Điểm danh và theo dõi trạng thái làm việc hàng ngày của nhân viên</p>
      </div>
      
      <div class="date-filter-box">
        <label>Chọn ngày:</label>
        <input 
          type="date" 
          v-model="selectedDate" 
          @change="fetchChamCong" 
          class="date-input" 
        />
      </div>
    </div>

    <div class="card">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th class="text-center" style="width: 100px;">Mã NV</th>
              <th>Họ và tên</th>
              <th class="text-center">Trạng thái chấm công</th>
              <th class="text-center" style="width: 120px;">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in danhSachNhanVien" :key="item.nhanvien_id">
              <td class="text-center font-bold text-muted">{{ item.manv }}</td>
              <td class="font-bold">{{ item.hoten }}</td>
              <td class="text-center">
                <select v-model="item.trangthaiChamCong" class="form-select">
                  <option value="Đi làm">🟢 Đi làm</option>
                  <option value="nghỉ phép">🟡 Nghỉ phép</option>
                  <option value="nghỉ không phép">🔴 Nghỉ không phép</option>
                  <option value="đi trễ">🟠 Đi trễ</option>
                </select>
              </td>
              <td class="text-center">
                <button @click="saveChamCong(item)" class="btn btn-primary btn-sm">Lưu</button>
              </td>
            </tr>
            <tr v-if="danhSachNhanVien.length === 0">
              <td colspan="4" class="text-center empty-text">Không tìm thấy dữ liệu nhân viên nào.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedDate = ref(new Date().toISOString().split('T')[0]);
const danhSachNhanVien = ref([]);

//const API_BASE = 'http://192.168.0.134:3002';
const API_BASE = 'https://server-supabase-api.vercel.app';
const fetchChamCong = async () => {
  try {
    const resNv = await axios.get(`${API_BASE}/nhanvien`);
    const resCc = await axios.get(`${API_BASE}/chamcong?ngay=${selectedDate.value}`);

    danhSachNhanVien.value = resNv.data.map(nv => {
      const ccRecord = resCc.data.find(c => c.nhanvien_id === nv.nhanvien_id);
      return {
        ...nv,
        chamcong_id: ccRecord ? ccRecord.chamcong_id : null,
        trangthaiChamCong: ccRecord ? ccRecord.trangthai : 'Đi làm'
      };
    });
  } catch (error) {
    console.error("Lỗi tải dữ liệu chấm công:", error);
  }
};

const saveChamCong = async (item) => {
  try {
    await axios.post(`${API_BASE}/chamcong`, {
      nhanvien_id: item.nhanvien_id,
      ngay: selectedDate.value,
      trangthai: item.trangthaiChamCong
    });
    alert(`Đã lưu chấm công thành công cho nhân viên ${item.hoten}!`);
    fetchChamCong();
  } catch (error) {
    alert("Lỗi lưu chấm công: " + error.message);
  }
};

onMounted(fetchChamCong);
</script>

<style scoped>
.container-page { max-width: 1000px; margin: 0 auto; padding: 24px; font-family: sans-serif; background: #f8fafc; min-height: 100vh; }
.page-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
.page-header-flex h1 { font-size: 24px; color: #1e293b; margin: 0 0 4px 0; }
.page-header-flex p { font-size: 14px; color: #64748b; margin: 0; }

.date-filter-box { background: white; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; gap: 8px; }
.date-filter-box label { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; }
.date-input { border: none; background: transparent; font-size: 14px; color: #334155; cursor: pointer; outline: none; }

.card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; color: #334155; }
.data-table th { background: #f1f5f9; padding: 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; }
.data-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }

.form-select { padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; background: white; color: #334155; outline: none; cursor: pointer; }
.form-select:focus { border-color: #2563eb; }

.btn { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; color: white; }
.btn-primary { background: #2563eb; }
.btn-primary:hover { background: #1d4ed8; }
.btn-sm { padding: 5px 12px; font-size: 12px; }

.text-center { text-align: center; }
.font-bold { font-weight: 700; }
.text-muted { color: #64748b; }
.empty-text { color: #94a3b8; padding: 30px; }
</style>