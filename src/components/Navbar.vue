<template>
  <nav class="navbar navbar-light bg-white border-bottom px-4 py-3">
    <div class="container-fluid p-0">
      <!-- Sapaan User (Hanya muncul di Desktop) -->
      <h5 class="mb-0 fw-bold d-none d-md-block text-dark">
        Halo, {{ user?.name.split(' ')[0] }} 👋
      </h5>

      <div class="ms-auto d-flex align-items-center">
        <!-- Icon Notifikasi (Pintar) -->
        <div class="dropdown me-3">
          <button class="btn btn-light rounded-circle p-2 position-relative shadow-none border-0" data-bs-toggle="dropdown">
            <i class="bi bi-bell"></i>
            <span v-if="pendingCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 10px;">
              {{ pendingCount }}
            </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 mt-2 p-3" style="width: 280px;">
            <li class="fw-bold mb-2 ps-2">Pemberitahuan</li>
            <hr class="dropdown-divider">
            <li v-if="pendingCount === 0" class="text-center py-3 text-muted small">Semua tugas beres!</li>
            <li v-for="task in tasksDueToday" :key="task.id" class="mb-2 list-unstyled">
              <div class="p-2 bg-warning-subtle rounded-3 border-start border-warning border-3">
                <p class="mb-0 small fw-bold text-dark">Deadline Hari Ini!</p>
                <p class="mb-0 text-muted text-truncate" style="font-size: 11px;">{{ task.title }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- LINK MENU MENU PROFIL (Disesuaikan sesuai permintaan Anda) -->
        <router-link to="/profile" class="d-flex align-items-center text-decoration-none profile-link px-2 py-1 rounded-pill transition-all">
          <div class="me-2 d-none d-md-block text-end">
            <p class="mb-0 small fw-bold text-dark lh-1">{{ user?.name }}</p>
            <p class="mb-0 text-muted" style="font-size: 10px;">Lihat Profil</p>
          </div>
          <!-- Avatar menggunakan UI Avatars agar dinamis -->
          <img 
            :src="`https://ui-avatars.com/api/?name=${user?.name}&background=0d6efd&color=fff&bold=true`" 
            class="rounded-circle border border-2 border-white shadow-sm" 
            width="40" 
            height="40" 
            alt="Profile Avatar"
          >
        </router-link>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => store.state.user);

const today = new Date().toISOString().split("T")[0];

// Selalu pastikan tasks adalah array
const tasks = computed(() => {
    return Array.isArray(store.state.tasks)
        ? store.state.tasks
        : [];
});

const tasksDueToday = computed(() => {
    return tasks.value.filter(task =>
        task.due_date === today &&
        task.status !== "Completed"
    );
});

const pendingCount = computed(() => tasksDueToday.value.length);

</script>