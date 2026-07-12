<template>
  <div>
    <TaskCard 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task" 
      @delete="$emit('delete', $event)"
      @toggleStatus="$emit('toggleStatus', $event)"
      @toggleFavorite="$emit('toggleFavorite', $event)"
    />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue';
defineProps(['tasks']);
defineEmits(['delete', 'toggleStatus', 'toggleFavorite']);
</script>