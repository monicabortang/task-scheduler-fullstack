<template>
  <DashboardLayout>
    <div class="mb-4">
      <h3 class="fw-bold text-dark">Tugas Favorit ⭐</h3>
      <p class="text-muted">Daftar tugas penting yang Anda tandai dengan bintang.</p>
    </div>

    <!-- Pastikan penulisan atribut di bawah ini bersih dari tanda kutip tambahan -->
    <div v-if="favoriteTasks.length > 0">
      <TaskList 
        :tasks="favoriteTasks" 
        @delete="handleDelete" 
        @toggleFavorite="handleFavorite"
        @toggleStatus="handleToggle"
      />
    </div>

    <!-- Tampilan Jika Kosong -->
    <div v-else class="text-center py-5 mt-5">
      <div class="bg-white d-inline-block p-4 rounded-circle mb-3 shadow-sm">
        <i class="bi bi-star text-light display-1"></i>
      </div>
      <h5 class="fw-bold text-dark">Belum ada favorit</h5>
      <p class="text-muted">Klik ikon bintang pada tugas untuk memasukkannya ke sini.</p>
      <router-link to="/dashboard" class="btn btn-primary rounded-pill px-4 mt-2">
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

// Mengambil data task yang difilter hanya favorit
const favoriteTasks = computed(() => {
  return store.state.tasks.filter(t => t.is_favorite);
});

// Handler fungsi
const handleFavorite = (task) => store.dispatch('toggleFavorite', task);
const handleToggle = (task) => store.dispatch('toggleTaskStatus', task);
const handleDelete = (id) => {
  if (confirm('Hapus tugas ini?')) store.dispatch('deleteTask', id);
};

onMounted(() => {
  // Ambil data jika store masih kosong
  if (store.state.tasks.length === 0) store.dispatch('fetchTasks');
});
</script>