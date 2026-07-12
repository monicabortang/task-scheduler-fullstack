<template>
  <DashboardLayout>
    <!-- Header Dashboard -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold text-dark">Workspace</h3>
        <p class="text-muted">Manage and collaborate on your team tasks.</p>
      </div>
      <button class="btn btn-primary rounded-pill px-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal">
        <i class="bi bi-plus-lg me-2"></i>New Task
      </button>
    </div>

    <!-- Statistik Ringkas -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <StatisticCard title="Total Tasks" :value="Array.isArray(store.state.tasks) ? store.state.tasks.length : 0" class="bg-white" />
      </div>
      <div class="col-md-4">
        <StatisticCard title="Completed" :value="completedCount" class="bg-white" />
      </div>
    </div>

    <!-- Daftar Task -->
    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-4">Current Tasks</h5>
        <TaskList 
          :tasks="store.state.tasks" 
          @delete="handleDelete" 
          @toggleStatus="handleToggle" 
          @toggleFavorite="handleFavorite" 
        />
      </div>
    </div>

    <!-- Modal Tambah Task -->
    <AddTaskModal @save="handleSave" />
  </DashboardLayout>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import TaskList from '../components/TaskList.vue';
import AddTaskModal from '../components/AddTaskModal.vue';
import StatisticCard from '../components/StatisticCard.vue';

const store = useStore();

import { watchEffect } from "vue";

watchEffect(() => {

    console.log("STORE TASKS =", store.state.tasks);

});

// Hitung task yang selesai secara reaktif
const completedCount = computed(() => {
  if (!Array.isArray(store.state.tasks)) {

          return 0;

      }

      return store.state.tasks.filter(
          t => t.status === "Completed"
      ).length;
});

onMounted(() => {
  store.dispatch('fetchTasks'); // Ambil data dari API Laravel saat halaman dibuka
});

const handleSave = async (task) => {
  await store.dispatch('createTask', task);
};

const handleDelete = async (id) => {
  if(confirm('Delete this task?')) {
    await store.dispatch('deleteTask', id);
  }
};

const handleToggle = async (task) => {
  await store.dispatch('toggleTaskStatus', task);
};

const handleFavorite = async (task) => {
  await store.dispatch('toggleFavorite', task);
};

</script>