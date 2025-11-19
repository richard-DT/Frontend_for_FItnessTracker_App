import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserDetails } from "../api/index.js";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("accessToken") || "");
  const user = ref({});

  const isLoggedIn = () => !!token.value;

  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem("accessToken", newToken);
  };

  const clearToken = () => {
    token.value = "";
    user.value = {};
    localStorage.removeItem("accessToken");
  };

  const fetchUser = async () => {
    if (!token.value) return;
    try {
      const res = await getUserDetails();
      user.value = res.data.user;
    } catch (err) {
      console.error(err);
    }
  };

  return { token, user, isLoggedIn, setToken, clearToken, fetchUser };
});
