<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const store = useStore();
const user = computed(() => store.state.user);
const tasksCount = computed(() => store.state.tasks.length);
const completedCount = computed(() => store.state.tasks.filter(t => t.status === 'Completed').length);

// State lokal untuk form edit agar tidak langsung merubah data asli sebelum klik simpan
const editName = ref(user.value?.name);

const handleUpdateProfile = () => {
  store.dispatch('updateProfile', editName.value);
};
</script>

<template>
  <DashboardLayout>
    <div class="row g-4 animate__animated animate__fadeIn">
      <div class="col-md-4 text-center">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <img :src="`https://ui-avatars.com/api/?name=${user?.name}&background=random`" class="rounded-circle mb-3 shadow-sm mx-auto" width="100">
          <h5 class="fw-bold">{{ user?.name }}</h5>
          <p class="text-muted small mb-3">{{ user?.email }}</p>
          <div class="d-flex justify-content-around border-top pt-3">
            <div class="text-center">
               <h6 class="mb-0 fw-bold">{{ tasksCount }}</h6>
               <small class="text-muted">Tasks</small>
            </div>
            <div class="text-center">
               <h6 class="mb-0 fw-bold text-success">{{ completedCount }}</h6>
               <small class="text-muted">Done</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <h5 class="fw-bold mb-4"><i class="bi bi-person-gear me-2"></i>Edit Profile</h5>
          <form @submit.prevent="handleUpdateProfile">
            <div class="mb-3">
              <label class="form-label small fw-bold">Full Name</label>
              <input v-model="editName" type="text" class="form-control bg-light border-0 py-2 shadow-none">
            </div>
            <button class="btn btn-primary rounded-pill px-5 fw-bold shadow-sm mt-2">
              Update My Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>