<template>
  <DashboardLayout>
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="bg-primary p-5 text-white text-center">
        <i class="bi bi-kanban-fill display-1"></i>
        <h2 class="fw-bold mt-3">Task Scheduler v1.0</h2>
        <p>Solusi manajemen tugas modern untuk semua kalangan.</p>
      </div>
      <div class="card-body p-5">
        <div class="row">
          <div class="col-md-6">
            <h5 class="fw-bold"><i class="bi bi-mortarboard-fill me-2"></i>Untuk Pelajar</h5>
            <p class="text-muted small">Kelola jadwal kuliah, deadline tugas, dan kelompok belajar dengan lebih terorganisir.</p>
          </div>
          <div class="col-md-6">
            <h5 class="fw-bold"><i class="bi bi-briefcase-fill me-2"></i>Untuk Pekerja</h5>
            <p class="text-muted small">Pantau progress project kantor, meeting, dan deadline harian tanpa rasa takut terlewat.</p>
          </div>
        </div>
        <hr class="my-4">
        <p class="text-center text-muted mb-0">
          Dibuat dengan ❤️ untuk meningkatkan produktivitas masyarakat Indonesia.
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
</script>