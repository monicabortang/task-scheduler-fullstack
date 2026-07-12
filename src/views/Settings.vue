<template>
  <DashboardLayout>
    <div class="mb-4">
      <h3 class="fw-bold">Pengaturan Aplikasi</h3>
      <p class="text-muted">Sesuaikan pengalaman menggunakan Task Scheduler.</p>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <!-- Kartu Keamanan -->
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <h6 class="fw-bold mb-4"><i class="bi bi-shield-lock me-2"></i>Keamanan Akun</h6>
          <form @submit.prevent="handleUpdatePassword">
            <div class="mb-3">
              <label class="small fw-bold text-muted">Password Baru</label>
              <input type="password" class="form-control bg-light border-0 py-2" placeholder="••••••••">
            </div>
            <button class="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold">Update Password</button>
          </form>
        </div>
      </div>

      <div class="col-md-6">
        <!-- Kartu Preferensi -->
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <h6 class="fw-bold mb-4"><i class="bi bi-palette me-2"></i>Tampilan & Notifikasi</h6>
          
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <p class="mb-0 fw-bold">Mode Gelap (Dark Mode)</p>
              <small class="text-muted">Nyaman untuk mata di malam hari.</small>
            </div>
            <div class="form-check form-switch">
              <input @change="toggleTheme" class="form-check-input" type="checkbox" id="darkModeSwitch" style="width: 45px; height: 22px; cursor: pointer;">
            </div>
          </div>
          
          <hr class="opacity-25">

          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="mb-0 fw-bold">Notifikasi Email</p>
              <small class="text-muted">Kirim pengingat deadline ke email.</small>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked style="width: 45px; height: 22px; cursor: pointer;">
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const store = useStore();

const darkMode = ref(false);
const emailNotification = ref(false);

onMounted(() => {

    // Dark Mode
    darkMode.value = localStorage.getItem("darkMode") === "true";

    if (darkMode.value) {
        document.body.classList.add("dark-mode");
    }

    // Notification
    if (store.state.user) {
        emailNotification.value =
            store.state.user.email_notification ?? false;
    }

});

const toggleTheme = () => {

    darkMode.value = !darkMode.value;

    document.body.classList.toggle("dark-mode", darkMode.value);

    localStorage.setItem("darkMode", darkMode.value);

};

const toggleNotification = async () => {

    await store.dispatch("updateNotification", emailNotification.value);

};

const handleUpdatePassword = () => {

    alert("Fitur akan dibuat setelah backend password selesai.");

};
</script>