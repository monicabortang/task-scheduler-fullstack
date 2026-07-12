<template>
  <aside class="sidebar shadow-sm">

    <!-- Menu -->
    <div class="p-4 flex-grow-1">

      <div class="d-flex align-items-center mb-5">
        <div class="bg-primary p-2 rounded-3 me-3 text-white">
          <i class="bi bi-kanban-fill fs-4"></i>
        </div>
        <h5 class="mb-0 fw-bold text-dark">Scheduler</h5>
      </div>

      <div class="nav flex-column gap-2">

        <router-link
          to="/dashboard"
          class="nav-link py-3 px-4 rounded-4"
        >
          <i class="bi bi-grid-1x2-fill me-3"></i>
          Dashboard
        </router-link>

        <router-link
          to="/tasks"
          class="nav-link py-3 px-4 rounded-4"
        >
          <i class="bi bi-list-check me-3"></i>
          My Tasks
        </router-link>

        <router-link
          to="/favorites"
          class="nav-link py-3 px-4 rounded-4"
        >
          <i class="bi bi-star-fill me-3"></i>
          Favorites
        </router-link>

        <router-link
          to="/settings"
          class="nav-link py-3 px-4 rounded-4"
        >
          <i class="bi bi-gear-fill me-3"></i>
          Settings
        </router-link>

      </div>

    </div>

    <!-- Footer -->
    <div class="mt-auto p-4 border-top bg-light">

      <div class="d-flex align-items-center mb-3">

        <div
          class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm"
          style="width:45px;height:45px;"
        >
          {{ userInitials }}
        </div>

        <div class="overflow-hidden">
          <h6 class="mb-0 fw-bold text-dark">
            {{ user?.name || "Loading..." }}
          </h6>

          <small class="text-muted">
            {{ user?.email }}
          </small>
        </div>

      </div>

      <button
        @click="handleLogout"
        class="btn btn-outline-danger w-100 rounded-pill"
      >
        <i class="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>

    </div>

  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user);

const userInitials = computed(() => {
  if (!user.value?.name) return "?";

  return user.value.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0,2)
    .toUpperCase();
});

const handleLogout = () => {
  if (confirm("Logout dari aplikasi?")) {
    store.dispatch("logout");
    router.push("/login");
  }
};
</script>

<style scoped>
.sidebar{
    width:260px;
    height:100vh;
    background:#fff;
    display:flex;
    flex-direction:column;
    position:sticky;
    top:0;
}

.nav-link{
    color:#6c757d;
    font-weight:500;
    transition:.2s;
}

.nav-link i{
    width:22px;
    text-align:center;
}

.nav-link:hover{
    background:#eef4ff;
    color:#0d6efd;
}

.router-link-active{
    background:#0d6efd;
    color:#fff !important;
}
</style>