<template>
  <div class="card shadow-sm border-0 mb-3 task-card" @click="$router.push(`/tasks/${task.id}`)">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <!-- TOMBOL BINTANG (Favorit) -->
        <button 
          class="btn btn-link p-0 me-3 shadow-none border-0" 
          @click.stop="$emit('toggleFavorite', task)"
        >
          <i 
            class="bi fs-5" 
            :class="task.is_favorite ? 'bi-star-fill text-warning' : 'bi-star text-muted'"
          ></i>
        </button>

        <div :class="priorityClass(task.priority)" class="priority-dot me-3"></div>
        <div>
          <h6 class="mb-0 fw-bold" :class="{'text-decoration-line-through text-muted': task.status === 'Completed'}">
            {{ task.title }}
          </h6>
          <small class="text-muted" style="font-size: 11px;">
            <i class="bi bi-tag me-1"></i>{{ task.status }}
          </small>
        </div>
      </div>
      <button class="btn btn-link text-danger p-0" @click.stop="$emit('delete', task.id)">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['task']);
defineEmits(['delete', 'toggleFavorite']); // Pastikan ini ada

const priorityClass = (p) => ({
  'bg-danger': p === 'High', 'bg-warning': p === 'Medium', 'bg-info': p === 'Low'
});
</script>