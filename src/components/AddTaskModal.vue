<template>
  <div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4">
        <div class="modal-header border-0 pb-0">
          <h5 class="fw-bold mt-2 ms-2">Create New Task</h5>
          <button type="button" class="btn-close me-2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="mb-3">
            <label class="form-label small fw-bold">Task Title</label>
            <input v-model="form.title" type="text" class="form-control bg-light border-0 py-2" placeholder="What needs to be done?">
          </div>
          <div class="mb-3">
            <label class="form-label small fw-bold">Description</label>
            <textarea v-model="form.description" class="form-control bg-light border-0" rows="3" placeholder="Add more details..."></textarea>
          </div>
          <div class="mb-3">
        <label class="form-label small fw-bold">Due Date (Tenggat Waktu)</label>
        <input 
            v-model="form.due_date" 
            type="date" 
            class="form-control bg-light border-0 py-2"
        >
        </div>
          <div class="mb-3">
            <label class="form-label small fw-bold">Priority</label>
            <select v-model="form.priority" class="form-select bg-light border-0 py-2">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-light px-4 rounded-pill" data-bs-dismiss="modal">Cancel</button>
          <button @click="submitTask" type="button" class="btn btn-primary px-4 rounded-pill shadow-sm" data-bs-dismiss="modal">Create Task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['save']);
const form = reactive({
  title: '',
  description: '',
  priority: '',
  due_date: ''
});

const submitTask = () => {
  if (!form.title) return alert('Title is required');
  emit('save', { ...form });
  // Reset form
  form.title = '';
  form.description = '';
  form.due_date = '';
  form.priority = '';
};
</script>