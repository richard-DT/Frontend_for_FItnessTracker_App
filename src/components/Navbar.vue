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

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
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
