<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center vh-100" id="login-bg">
      <div class="card p-4 shadow-sm" style="width: 350px;">
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" id="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" id="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "Login" }}
          </button>
        </form>
        <p class="mt-3 text-center">
          Don't have an account?
          <router-link to="/register">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../api/index.js";
import { useAuthStore } from "../stores/auth.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const router = useRouter();
const auth = useAuthStore();
const notyf = new Notyf();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    notyf.error("Email and password are required!");
    return;
  }

  isLoading.value = true;
  try {
    const response = await loginUser(email.value, password.value);
    auth.setToken(response.data.access);
    await auth.fetchUser(); // fetch user details immediately
    notyf.success("Login successful!");
    router.push("/workouts");
  } catch (err) {
    const message = err.response?.data?.message || "Login failed.";
    notyf.error(message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
#login-bg {
  min-height: 100vh;
  background-image: url("/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
