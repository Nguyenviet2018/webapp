<template>
  <div class="container-page">
    <!-- Header -->
    <div class="page-header">
      <button @click="$router.push('/ql-nhanvien')" class="btn btn-secondary">⬅ Quay lại danh sách</button>
      <h1>Hồ Sơ Nhân Sự Chi Tiết</h1>
    </div>

    <!-- Thông tin nhân viên -->
    <div class="card profile-card">
      <div class="profile-info">
        <div class="avatar">
          {{ nhanVien.hoten ? nhanVien.hoten.charAt(0).toUpperCase() : 'NV' }}
        </div>
        <div>
          <h2>{{ nhanVien.hoten || 'Đang tải...' }}</h2>
          <div class="sub-info">
            <span>Mã NV: {{ nhanVien.manv }}</span>
            <span>•</span>
            <span>{{ nhanVien.phongban?.tenphongban || 'Chưa phân phòng ban' }}</span>
            <span>•</span>
            <span>{{ nhanVien.email || 'Chưa có email' }}</span>
          </div>
        </div>
      </div>
      <div class="status-badge">
        {{ nhanVien.trangthai || 'Đang làm' }}
      </div>
    </div>

    <!-- Tabs chuyển đổi -->
    <div class="tabs-header">
      <button @click="currentTab = 'luong'" :class="['tab-btn', currentTab === 'luong' ? 'active' : '']">💰 Lương</button>
      <button @click="currentTab = 'chamcong'" :class="['tab-btn', currentTab === 'chamcong' ? 'active' : '']">⏱️ Chấm công</button>
      <button @click="currentTab = 'khenthuong'" :class="['tab-btn', currentTab === 'khenthuong' ? 'active' : '']">🏆 Khen thưởng</button>
      <button @click="currentTab = 'kyluat'" :class="['tab-btn', currentTab === 'kyluat' ? 'active' : '']">⚠️ Kỷ luật</button>
    </div>

    <!-- ================= TAB LƯƠNG ================= -->
    <div v-if="currentTab === 'luong'" class="card">
      <div class="card-action-header">
        <h3>Bảng Lương Các Tháng</h3>
        <button @click="openModal('luong')" class="btn btn-primary">+ Thêm bảng lương</button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Tháng/Năm</th>
              <th class="text-center">Ngày công</th>
              <th class="text-right">Lương cơ bản</th>
              <th class="text-right">Thưởng</th>
              <th class="text-right">Phạt</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in luongList" :key="item.luong_id">
              <td>Tháng {{ item.thang }}/{{ item.nam }}</td>
              <td class="text-center">{{ item.songaycong }} ngày</td>
              <td class="text-right">{{ Number(item.luongcoban || 0).toLocaleString() }} đ</td>
              <td class="text-right text-success">+{{ Number(item.thuong || 0).toLocaleString() }} đ</td>
              <td class="text-right text-danger">-{{ Number(item.phat || 0).toLocaleString() }} đ</td>
              <td class="text-center">
                <button @click="deleteItem('luong', item.luong_id)" class="btn-sm btn-danger">Xóa</button>
              </td>
            </tr>
            <tr v-if="luongList.length === 0"><td colspan="6" class="text-center empty-text">Chưa có dữ liệu bảng lương.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= TAB CHẤM CÔNG ================= -->
    <div v-if="currentTab === 'chamcong'" class="card">
      <div class="card-action-header">
        <h3>Quản Lý Chấm Công</h3>
        <button @click="openModal('chamcong')" class="btn btn-primary">+ Thêm chấm công</button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ngày chấm công</th>
              <th>Ca làm việc</th>
              <th class="text-center">Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in chamCongList" :key="item.chamcong_id">
              <td>{{ item.ngay }}</td>
              <td>{{ item.ca || 'Ca hành chính' }}</td>
              <td class="text-center">
                <span :class="['badge-status', item.trangthai === 'Có mặt' ? 'success' : 'danger']">
                  {{ item.trangthai || 'Có mặt' }}
                </span>
              </td>
              <td class="text-center">
                <button @click="editItem('chamcong', item)" class="btn-sm btn-warning" style="margin-right: 5px;">Sửa</button>
                <button @click="deleteItem('chamcong', item.chamcong_id)" class="btn-sm btn-danger">Xóa</button>
              </td>
            </tr>
            <tr v-if="chamCongList.length === 0"><td colspan="4" class="text-center empty-text">Chưa có dữ liệu chấm công.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= TAB KHEN THƯỞNG ================= -->
    <div v-if="currentTab === 'khenthuong'" class="card">
      <div class="card-action-header">
        <h3>Danh Sách Khen Thưởng</h3>
        <button @click="openModal('khenthuong')" class="btn btn-success">+ Thêm khen thưởng</button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ngày quyết định</th>
              <th>Lý do</th>
              <th class="text-right">Số tiền thưởng</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in khenThuongList" :key="item.khenthuong_id">
              <td>{{ item.ngay }}</td>
              <td>{{ item.lydo }}</td>
              <td class="text-right text-success font-bold">+{{ Number(item.sotien || 0).toLocaleString() }} đ</td>
              <td class="text-center"><button @click="deleteItem('khenthuong', item.khenthuong_id)" class="btn-sm btn-danger">Xóa</button></td>
            </tr>
            <tr v-if="khenThuongList.length === 0"><td colspan="4" class="text-center empty-text">Không có bản ghi khen thưởng nào.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= TAB KỶ LUẬT ================= -->
    <div v-if="currentTab === 'kyluat'" class="card">
      <div class="card-action-header">
        <h3>Danh Sách Kỷ Luật</h3>
        <button @click="openModal('kyluat')" class="btn btn-danger">+ Thêm kỷ luật</button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ngày vi phạm</th>
              <th>Lý do</th>
              <th class="text-right">Mức phạt</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in kyLuatList" :key="item.kyluat_id">
              <td>{{ item.ngay }}</td>
              <td>{{ item.lydo }}</td>
              <td class="text-right text-danger font-bold">-{{ Number(item.mucphat || 0).toLocaleString() }} đ</td>
              <td class="text-center"><button @click="deleteItem('kyluat', item.kyluat_id)" class="btn-sm btn-danger">Xóa</button></td>
            </tr>
            <tr v-if="kyLuatList.length === 0"><td colspan="4" class="text-center empty-text">Không có bản ghi kỷ luật nào.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= MODAL NHẬP LIỆU CHUNG ================= -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditing ? 'Cập nhật' : 'Thêm mới' }} {{ modalType === 'luong' ? 'Bảng Lương' : modalType === 'chamcong' ? 'Chấm Công' : modalType === 'khenthuong' ? 'Khen Thưởng' : 'Kỷ Luật' }}</h3>
        
        <!-- Form Chấm Công -->
        <div v-if="modalType === 'chamcong'">
          <div class="form-group"><label>Ngày chấm công</label><input type="date" v-model="formData.ngay" /></div>
          <div class="form-group"><label>Ca làm việc</label><input type="text" v-model="formData.ca" placeholder="Ví dụ: Ca sáng / Hành chính" /></div>
          <div class="form-group">
            <label>Trạng thái</label>
            <select v-model="formData.trangthai" class="form-select">
              <option value="Có mặt">Có mặt</option>
              <option value="Vắng có phép">Vắng có phép</option>
              <option value="Vắng không phép">Vắng không phép</option>
              <option value="Đi trễ">Đi trễ</option>
            </select>
          </div>
        </div>

        <!-- Form Lương -->
        <div v-if="modalType === 'luong'">
          <div class="form-group"><label>Tháng</label><input type="number" v-model="formData.thang" placeholder="Ví dụ: 3" /></div>
          <div class="form-group"><label>Năm</label><input type="number" v-model="formData.nam" placeholder="Ví dụ: 2026" /></div>
          <div class="form-group"><label>Số ngày công</label><input type="number" v-model="formData.songaycong" /></div>
          <div class="form-group"><label>Lương cơ bản (đ)</label><input type="number" v-model="formData.luongcoban" /></div>
          <div class="form-group"><label>Thưởng (đ)</label><input type="number" v-model="formData.thuong" /></div>
          <div class="form-group"><label>Phạt (đ)</label><input type="number" v-model="formData.phat" /></div>
        </div>

        <!-- Form Khen thưởng -->
        <div v-if="modalType === 'khenthuong'">
          <div class="form-group"><label>Ngày quyết định</label><input type="date" v-model="formData.ngay" /></div>
          <div class="form-group"><label>Lý do</label><input type="text" v-model="formData.lydo" placeholder="Lý do khen thưởng..." /></div>
          <div class="form-group"><label>Số tiền thưởng (đ)</label><input type="number" v-model="formData.sotien" /></div>
        </div>

        <!-- Form Kỷ luật -->
        <div v-if="modalType === 'kyluat'">
          <div class="form-group"><label>Ngày vi phạm</label><input type="date" v-model="formData.ngay" /></div>
          <div class="form-group"><label>Lý do</label><input type="text" v-model="formData.lydo" placeholder="Lý do vi phạm..." /></div>
          <div class="form-group"><label>Mức phạt (đ)</label><input type="number" v-model="formData.mucphat" /></div>
        </div>

        <div class="modal-actions">
          <button @click="saveData" class="btn btn-primary">Lưu lại</button>
          <button @click="showModal = false" class="btn btn-secondary">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const nhanvienId = route.params.id;

const nhanVien = ref({});
const currentTab = ref('luong');
const luongList = ref([]);
const chamCongList = ref([]);
const khenThuongList = ref([]);
const kyLuatList = ref([]);

// Quản lý Modal thêm/sửa
const showModal = ref(false);
const isEditing = ref(false);
const modalType = ref(''); // 'luong', 'chamcong', 'khenthuong', 'kyluat'
const formData = ref({});

//const API_BASE = 'http://192.168.0.134:3002';
const API_BASE ='https://server-supabase-api.vercel.app';

const fetchData = async () => {
  if (!nhanvienId) return;
  try {
    const resNv = await axios.get(`${API_BASE}/nhanvien`);
    nhanVien.value = resNv.data.find(nv => nv.nhanvien_id == nhanvienId) || {};

    const resLuong = await axios.get(`${API_BASE}/luong?nhanvien_id=${nhanvienId}`);
    luongList.value = resLuong.data;

    const resCc = await axios.get(`${API_BASE}/chamcong?nhanvien_id=${nhanvienId}`);
    chamCongList.value = resCc.data;

    const resKt = await axios.get(`${API_BASE}/khenthuong?nhanvien_id=${nhanvienId}`);
    khenThuongList.value = resKt.data;

    const resKl = await axios.get(`${API_BASE}/kyluat?nhanvien_id=${nhanvienId}`);
    kyLuatList.value = resKl.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu chi tiết:", error);
  }
};

const openModal = (type) => {
  modalType.value = type;
  isEditing.value = false;
  formData.value = { nhanvien_id: nhanvienId, trangthai: 'Có mặt' };
  showModal.value = true;
};

const editItem = (type, item) => {
  modalType.value = type;
  isEditing.value = true;
  formData.value = { ...item }; // Sao chép dữ liệu cũ vào form để sửa
  showModal.value = true;
};

const saveData = async () => {
  try {
    let endpoint = `/${modalType.value}`;
    
    if (isEditing.value) {
      const idKey = `${modalType.value}_id`;
      const itemId = formData.value[idKey];
      await axios.put(`${API_BASE}${endpoint}/${itemId}`, formData.value);
      alert("Cập nhật thành công!");
    } else {
      await axios.post(`${API_BASE}${endpoint}`, formData.value);
      alert("Thêm mới thành công!");
    }

    showModal.value = false;
    fetchData();
  } catch (error) {
    alert("Lỗi khi lưu dữ liệu: " + (error.response?.data?.message || error.message));
  }
};

const deleteItem = async (type, id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) return;
  try {
    await axios.delete(`${API_BASE}/${type}/${id}`);
    alert("Đã xóa thành công!");
    fetchData();
  } catch (error) {
    alert("Lỗi khi xóa bản ghi.");
  }
};

onMounted(fetchData);
</script>

<style scoped>
.container-page { max-width: 1100px; margin: 0 auto; padding: 24px; font-family: sans-serif; background: #f8fafc; min-height: 100vh; }
.page-header { margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
.page-header h1 { font-size: 24px; color: #1e293b; margin: 0; }

.card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.profile-card { display: flex; justify-content: space-between; align-items: center; }
.profile-info { display: flex; align-items: center; gap: 16px; }
.avatar { width: 50px; height: 50px; background: #dbeafe; color: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; }
.profile-info h2 { font-size: 18px; color: #1e293b; margin: 0 0 6px 0; }
.sub-info { font-size: 13px; color: #64748b; display: flex; gap: 8px; align-items: center; }

.status-badge { background: #ecfdf5; color: #047857; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid #a7f3d0; text-transform: uppercase; }

.tabs-header { display: flex; gap: 8px; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; }
.tab-btn { background: none; border: none; padding: 10px 16px; font-size: 14px; font-weight: 500; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; }
.tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; background: #fff; border-top-left-radius: 6px; border-top-right-radius: 6px; }

.card-action-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-action-header h3 { font-size: 16px; color: #1e293b; margin: 0; }

.btn { padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; color: white; }
.btn-primary { background: #2563eb; }
.btn-success { background: #059669; }
.btn-danger { background: #dc2626; }
.btn-warning { background: #d97706; color: white; }
.btn-secondary { background: #64748b; color: white; }
.btn-sm { padding: 4px 10px; font-size: 12px; }

.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; color: #334155; }
.data-table th { background: #f1f5f9; padding: 10px 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; }
.data-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-success { color: #059669; font-weight: 600; }
.text-danger { color: #dc2626; font-weight: 600; }
.font-bold { font-weight: 700; }
.empty-text { color: #94a3b8; padding: 24px; text-align: center; }

.badge-status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
.badge-status.success { background: #ecfdf5; color: #059669; }
.badge-status.danger { background: #fef2f2; color: #dc2626; }

/* Modal CSS */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; padding: 24px; border-radius: 12px; width: 400px; max-width: 90%; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.modal-content h3 { margin-top: 0; margin-bottom: 16px; color: #1e293b; font-size: 18px; }
.form-group { margin-bottom: 12px; }
.form-group label { display: block; font-size: 12px; font-weight: bold; color: #475569; margin-bottom: 4px; text-transform: uppercase; }
.form-group input, .form-select { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
.modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px; }
</style>