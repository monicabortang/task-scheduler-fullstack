<template>
  <div class="login-page">
    <div class="login-card shadow-lg border-0">
      <div class="text-center mb-4">
        <div class="logo-icon mb-3">
          <i class="bi bi-kanban-fill text-white"></i>
        </div>
        <h2 class="fw-bold">Task Scheduler</h2>
        <p class="text-muted small">Collaborative Task Management Platform</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label small fw-bold">Email Address</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0"><i class="bi bi-envelope"></i></span>
            <input 
              v-model="form.email" 
              type="email" 
              class="form-control bg-light border-start-0" 
              placeholder="name@company.com"
              required
            >
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label small fw-bold">Password</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0"><i class="bi bi-lock"></i></span>
            <input 
              v-model="form.password" 
              type="password" 
              class="form-control bg-light border-start-0" 
              placeholder="••••••••"
              required
            >
          </div>
        </div>

        <button :disabled="loading" class="btn btn-primary w-100 py-2 fw-bold shadow-sm">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
        <p class="text-center mt-4 mb-0 small text-muted">
          Belum punya akun? 
          <router-link to="/register" class="text-primary fw-bold text-decoration-none">Daftar Sekarang</router-link>
        </p>
      </form>

      <div v-if="errorMessage" class="alert alert-danger mt-3 small border-0 py-2">
        <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ errorMessage }}
      </div>

      <div class="mt-4 pt-3 border-top text-center">
        <p class="text-muted small mb-0">Don't have an account? <a href="#" class="text-primary fw-bold text-decoration-none">Contact Admin</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const loading = ref(false);
const errorMessage = ref('');

const form = reactive({
  email: '',
  password: ''
});

async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';
  
  try {
    // Memanggil API Laravel (Clean JSON parsing di handle oleh interceptor)
    const response = await api.post('/login', form);
    
    // Simpan Token & Data User
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    // Redirect ke Dashboard
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 24px;
  padding: 40px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: #0d6efd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin: 0 auto;
  font-size: 30px;
}

.form-control {
  padding: 12px;
  font-size: 14px;
}

.form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

.input-group-text {
  color: #6c757d;
}

.btn-primary {
  border-radius: 12px;
  background: #0d6efd;
  border: none;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #0b5ed7;
  transform: translateY(-2px);
}
</style>