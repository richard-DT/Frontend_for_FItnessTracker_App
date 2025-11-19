<template>
  <div class="d-flex justify-content-center align-items-center vh-100" id="login-bg">
    <div class="card p-4 shadow-sm" style="width: 350px;">
      <h2 class="text-center mb-4">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" id="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success w-100" :disabled="isLoading">
          {{ isLoading ? "Registering..." : "Register" }}
        </button>
      </form>
      <p class="mt-3 text-center">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../api/index.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const router = useRouter();
const notyf = new Notyf();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  if (!email.value || !password.value) {
    notyf.error("Email and password are required!");
    return;
  }

  isLoading.value = true;

  try {
    const response = await registerUser(email.value, password.value);
    notyf.success(response.data.message || "Registration successful!");
    email.value = "";
    password.value = "";
    setTimeout(() => router.push("/login"), 1500); // redirect after success
  } catch (err) {
    const message = err.response?.data?.message || "Registration failed.";
    notyf.error(message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
#login-bg {
  min-height: 100vh;
  background-image: url("/images/background1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
