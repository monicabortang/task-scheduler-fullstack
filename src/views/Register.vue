<template>
  <div class="auth-page">
    <div class="auth-card shadow-lg border-0 rounded-4 p-4">
      <div class="text-center mb-4">
        <i class="bi bi-person-plus-fill text-primary display-3"></i>
        <h2 class="fw-bold mt-2">Create Account</h2>
        <p class="text-muted small">Mulai kelola tugas Anda dengan mudah</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label small fw-bold">Full Name</label>
          <input v-model="form.name" type="text" class="form-control bg-light" placeholder="John Doe" required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Email Address</label>
          <input v-model="form.email" type="email" class="form-control bg-light" placeholder="name@mail.com" required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Password</label>
          <input v-model="form.password" type="password" class="form-control bg-light" placeholder="min. 6 characters" required>
        </div>
        <div class="mb-4">
          <label class="form-label small fw-bold">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" class="form-control bg-light" placeholder="Repeat password" required>
        </div>

        <button :disabled="loading" class="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Register Now
        </button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3 small border-0">{{ error }}</div>

      <p class="text-center mt-4 mb-0 small">
        Sudah punya akun? <router-link to="/login" class="text-primary fw-bold text-decoration-none">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const loading = ref(false);
const error = ref('');

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

async function handleRegister() {
  loading.value = true;
  error.value = '';
  try {
    const res = await api.post('/register', form);
    
    // Simpan data & login otomatis
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal mendaftar. Cek kembali data Anda.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
  padding: 20px;
}
.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
}
.form-control { border: none; padding: 12px; }
</style>