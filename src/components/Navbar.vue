<script setup>
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.clearToken();
  router.push("/login");
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString();
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Fitness Tracker</router-link>

      <!-- Hamburger toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible menu -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li v-if="!auth.isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="!auth.isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>

          <li v-else class="nav-item d-flex align-items-center">
            <span class="me-3">Hello, {{ auth.user.email }}</span>
            <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-nav .nav-link {
  font-weight: 500;
}
</style>
