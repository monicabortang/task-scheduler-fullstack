<template>
  <DashboardLayout>
    <div v-if="task" class="container-fluid p-0">
      <!-- Header dengan Tombol Back & Tombol Edit -->
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="d-flex align-items-center">
          <button @click="$router.back()" class="btn btn-white shadow-sm rounded-circle me-3 border-0">
            <i class="bi bi-chevron-left"></i>
          </button>
          <h4 class="mb-0 fw-bold text-dark">Detail Tugas</h4>
        </div>

        <!-- Tombol Edit Tugas -->
        <button 
          class="btn btn-outline-primary rounded-pill px-4 fw-bold shadow-sm bg-white" 
          data-bs-toggle="modal" 
          data-bs-target="#editTaskModal"
        >
          <i class="bi bi-pencil-square me-2"></i>Edit Tugas
        </button>
      </div>

      <div class="row g-4">
        <!-- Kotak Deskripsi -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h2 class="fw-bold mb-3 text-dark">{{ task.title }}</h2>
            <hr class="opacity-25 mb-4">
            <h6 class="text-muted small fw-bold text-uppercase mb-3">Deskripsi Tugas</h6>
            <p class="text-secondary lh-lg mb-0" style="white-space: pre-line;">
              {{ task.description || 'Tidak ada deskripsi untuk tugas ini.' }}
            </p>
          </div>
        </div>

        <!-- Kotak Sidebar Status -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h6 class="fw-bold text-muted small mb-4 text-uppercase">Manajemen Status</h6>
            
            <button 
              @click="handleToggleStatus" 
              class="btn w-100 py-3 rounded-4 fw-bold mb-3 shadow-sm border-0 text-white"
              :class="task.status === 'Completed' ? 'bg-secondary' : 'bg-success'"
            >
              <i class="bi me-2" :class="task.status === 'Completed' ? 'bi-arrow-counterclockwise' : 'bi-check-circle-fill'"></i>
              {{ task.status === 'Completed' ? 'Buka Kembali' : 'Tandai Selesai' }}
            </button>

            <div class="mt-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="small text-muted">Status Saat Ini</span>
                <span :class="task.status === 'Completed' ? 'badge bg-success-subtle text-success' : 'badge bg-warning-subtle text-warning'" class="rounded-pill px-3">
                  {{ task.status }}
                </span>
              </div>

              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="small text-muted">Prioritas</span>
                <span class="fw-bold">
                  <i class="bi bi-flag-fill me-2" :class="priorityColor(task.priority)"></i>{{ task.priority }}
                </span>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <span class="small text-muted">Tenggat Waktu</span>
                <span class="fw-bold text-dark text-end">
                  <i class="bi bi-calendar-event me-1 text-primary"></i>
                  {{ task.due_date ? task.due_date : 'Kapan Saja' }}
                </span>
              </div>
            </div>
          </div>
          
          <button @click="confirmDelete" class="btn btn-light text-danger w-100 py-2 rounded-4 small fw-bold border-0">
            <i class="bi bi-trash3 me-2"></i>Hapus Tugas Ini
          </button>
        </div>
      </div>

      <!-- Komponen Modal Edit -->
      <EditTaskModal :taskData="task" @update="handleUpdateTask" />
    </div>

    <!-- Tampilan jika task tidak ditemukan -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3 text-muted">Memuat data tugas...</p>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import EditTaskModal from '../components/EditTaskModal.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

// Mengambil data task dari Store berdasarkan ID di URL
const task = computed(() => {
  return store.state.tasks.find(t => t.id == route.params.id);
});

// Warna icon bendera berdasarkan prioritas
const priorityColor = (p) => {
  if (p === 'High') return 'text-danger';
  if (p === 'Medium') return 'text-warning';
  return 'text-info';
};

// Fungsi ubah status (Pending <-> Completed)
const handleToggleStatus = async () => {
  try {
    await store.dispatch('toggleTaskStatus', task.value);
  } catch (error) {
    alert("Gagal mengubah status.");
  }
};

// Fungsi simpan perubahan dari modal edit
const handleUpdateTask = async (formData) => {
  try {
    await store.dispatch('updateTask', { 
      id: task.value.id, 
      form: formData 
    });
  } catch (error) {
    alert("Gagal memperbarui tugas.");
  }
};

// Fungsi hapus tugas
const confirmDelete = async () => {
  if (confirm("Apakah Anda yakin ingin menghapus tugas ini secara permanen?")) {
    await store.dispatch('deleteTask', task.value.id);
    router.push('/dashboard');
  }
};

// Pastikan data di-fetch jika halaman di-refresh langsung
onMounted(() => {
  if (store.state.tasks.length === 0) {
    store.dispatch('fetchTasks');
  }
});
</script>

<style scoped>
.btn-white { background-color: white; }
.shadow-sm { box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; }
</style>