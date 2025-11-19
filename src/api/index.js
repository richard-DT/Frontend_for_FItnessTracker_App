import axios from "axios";

const API_BASE_URL = "https://backend-api-for-fitnesstracker.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const registerUser = async (email, password) => {
  return api.post("/users/register", { email, password });
};

export const loginUser = async (email, password) => {
  return api.post("/users/login", { email, password });
};

export const getUserDetails = async () => {
  return api.get("/users/details");
};


export const getMyWorkouts = async () => {
  return api.get("/workouts/getMyWorkouts");
};

export const addWorkout = async (name, duration) => {
  return api.post("/workouts/addWorkout", { name, duration });
};

export const updateWorkout = async (id, data) => {
  return api.patch(`/workouts/updateWorkout/${id}`, data);
};

export const deleteWorkout = async (id) => {
  return api.delete(`/workouts/deleteWorkout/${id}`);
};

export const completeWorkout = async (id) => {
  return api.patch(`/workouts/completeWorkoutStatus/${id}`);
};

export default api;
