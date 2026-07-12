<template>
  <DashboardLayout>
    <div class="card border-0 shadow-sm rounded-4 p-4">
      <h4 class="fw-bold mb-4">All My Tasks</h4>
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Task Name</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in store.state.tasks" :key="task.id">
              <td>{{ task.title }}</td>
              <td>
                <span class="badge" :class="task.priority === 'High' ? 'bg-danger' : 'bg-warning'">{{ task.priority }}</span>
              </td>
              <td>{{ task.status }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="handleDelete(task.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { useStore } from 'vuex';
import DashboardLayout from '../layouts/DashboardLayout.vue';
const store = useStore();
const handleDelete = (id) => {
  if(confirm('Delete task?')) store.dispatch('deleteTask', id);
};
</script>