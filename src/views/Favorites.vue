<template>
  <DashboardLayout>
    <div class="mb-4 animate__animated animate__fadeIn">
      <h3 class="fw-bold text-dark">Tugas Favorit ⭐</h3>
      <p class="text-muted">Daftar tugas penting yang Anda tandai dengan bintang.</p>
    </div>

    <!-- Cek baris di bawah: pastikan atribut ditulis dengan benar -->
    <div v-if="favoriteTasks.length > 0" class="animate__animated animate__fadeInUp">
      <TaskList 
        :tasks="favoriteTasks" 
        @delete="handleDelete" 
        @toggleFavorite="handleFavorite"
        @toggleStatus="handleToggle"
      />
    </div>

    <!-- Tampilan Jika Kosong -->
    <div v-else class="text-center py-5 mt-5">
      <div class="bg-white d-inline-block p-4 rounded-circle mb-3 shadow-sm text-muted">
        <i class="bi bi-star display-1"></i>
      </div>
      <h5 class="fw-bold text-dark">Belum ada favorit</h5>
      <p class="text-muted">Klik ikon bintang pada tugas di Dashboard untuk menambahkannya ke sini.</p>
      <router-link to="/dashboard" class="btn btn-primary rounded-pill px-4 mt-2 shadow-sm">
        Kembali ke Dashboard
      </router-link>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import TaskList from '../components/TaskList.vue';

const store = useStore();

// Filter otomatis hanya task yang memiliki is_favorite = true
const favoriteTasks = computed(() => {
  return store.state.tasks.filter(t => t.is_favorite=== true);
});

const handleFavorite = (task) => store.dispatch('toggleFavorite', task);
const handleToggle = (task) => store.dispatch('toggleTaskStatus', task);
const handleDelete = (id) => {
  if (confirm('Hapus tugas ini?')) store.dispatch('deleteTask', id);
};

onMounted(() => {
  if (store.state.tasks.length === 0) store.dispatch('fetchTasks');
});
</script>