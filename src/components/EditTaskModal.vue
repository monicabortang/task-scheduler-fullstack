<template>
  <!-- Modal Bootstrap untuk Edit Task -->
  <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4">
        
        <!-- Header Modal -->
        <div class="modal-header border-0 pt-4 px-4 pb-2">
          <h5 class="modal-title fw-bold" id="editTaskModalLabel">
            <i class="bi bi-pencil-square me-2 text-primary"></i>Edit Rincian Tugas
          </h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Body Modal (Formulir) -->
        <div class="modal-body p-4">
          <form @submit.prevent="submitEdit">
            
            <!-- Input Judul -->
            <div class="mb-3">
              <label class="form-label small fw-bold text-muted text-uppercase">Judul Tugas</label>
              <input 
                v-model="form.title" 
                type="text" 
                class="form-control bg-light border-0 py-2 px-3 rounded-3" 
                placeholder="Contoh: Belajar Vue.js"
                required
              >
            </div>

            <!-- Input Deskripsi -->
            <div class="mb-3">
              <label class="form-label small fw-bold text-muted text-uppercase">Deskripsi</label>
              <textarea 
                v-model="form.description" 
                class="form-control bg-light border-0 py-2 px-3 rounded-3" 
                rows="4" 
                placeholder="Tambahkan detail tugas di sini..."
              ></textarea>
            </div>

            <div class="row">
              <!-- Pilihan Prioritas -->
              <div class="col-md-6 mb-3">
                <label class="form-label small fw-bold text-muted text-uppercase">Prioritas</label>
                <select v-model="form.priority" class="form-select bg-light border-0 py-2 rounded-3 shadow-none">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <!-- Input Tenggat Waktu -->
              <div class="col-md-6 mb-3">
                <label class="form-label small fw-bold text-muted text-uppercase">Tenggat Waktu</label>
                <input 
                  v-model="form.due_date" 
                  type="date" 
                  class="form-control bg-light border-0 py-2 rounded-3 shadow-none"
                >
              </div>
            </div>
          </form>
        </div>

        <!-- Footer Modal (Tombol Aksi) -->
        <div class="modal-footer border-0 p-4 pt-0">
          <button 
            type="button" 
            class="btn btn-light rounded-pill px-4 fw-bold text-muted border-0" 
            data-bs-dismiss="modal"
          >
            Batal
          </button>
          
          <button 
            @click="submitEdit" 
            type="button" 
            class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
            data-bs-dismiss="modal"
          >
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

// Menerima data tugas saat ini dari halaman Detail (TaskDetail.vue)
const props = defineProps({
  taskData: {
    type: Object,
    default: () => ({})
  }
});

// Mendefinisikan event 'update' untuk dikirimkan ke parent
const emit = defineEmits(['update']);

// State formulir lokal yang reaktif
const form = reactive({
  title: '',
  description: '',
  priority: 'Medium',
  due_date: ''
});

/**
 * 'watch' digunakan untuk mendengarkan perubahan pada props taskData.
 * Saat modal dibuka, data asli dari database akan di-copy ke dalam variabel 'form'.
 */
watch(() => props.taskData, (newVal) => {
  if (newVal) {
    form.title = newVal.title || '';
    form.description = newVal.description || '';
    form.priority = newVal.priority || 'Medium';
    form.due_date = newVal.due_date || '';
  }
}, { immediate: true, deep: true });

/**
 * Fungsi untuk mengirimkan perubahan.
 * Data yang sudah diedit dikirim ke TaskDetail.vue melalui emit.
 */
const submitEdit = () => {
  if (!form.title.trim()) {
    alert("Judul tugas tidak boleh kosong!");
    return;
  }
  
  // Mengirim data form ke parent component
  emit('update', { ...form });
};
</script>

<style scoped>
/* Memperhalus tampilan input agar terasa lebih modern */
.form-control:focus, .form-select:focus {
  background-color: #ffffff !important;
  box-shadow: 0 0 0 0.25 milrem rgba(13, 110, 253, 0.1);
  border: 1px solid #0d6efd !important;
}

.modal-content {
  overflow: hidden;
}

.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3) !important;
}

/* Mempercantik tampilan Date Picker di beberapa browser */
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}
</style>