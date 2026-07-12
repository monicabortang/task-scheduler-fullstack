import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },

  { 
    path: '/profile', 
    component: () => import('../views/Profile.vue'), 
    meta: { requiresAuth: true } 
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  {
    path: '/tasks',
    component: () => import('../views/Tasks.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue")
  },

 
  {
    path: '/favorites',
    component: () => import('../views/Favorites.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/about',
    component: () => import('../views/About.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: () => import('../views/TaskDetail.vue'),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Proteksi Halaman
router.beforeEach((to) => {

    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth && !token) {

        return "/login";

    }

    return true;

});

export default router;