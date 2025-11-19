import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Workouts from "../pages/Workouts.vue";


const authGuard = (to, from, next) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/workouts",
    name: "Workouts",
    component: Workouts,
    beforeEnter: authGuard,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
