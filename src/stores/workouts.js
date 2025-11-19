import { defineStore } from "pinia";
import { ref } from "vue";
import { getMyWorkouts, addWorkout, updateWorkout, deleteWorkout, completeWorkout } from "../api/index.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();
const isLoading = ref(false);

export const useWorkoutStore = defineStore("workouts", () => {
  const workouts = ref([]);

  const fetchWorkouts = async () => {
    try {
      const res = await getMyWorkouts();
      workouts.value = res.data.workouts;
    } catch (err) {
      console.error(err);
    }
  };

  const createWorkout = async (name, duration) => {
    isLoading.value = true;
    try {
      const res = await addWorkout(name, duration);
      notyf.success("Workout added successfully!");
      workouts.value.push(res.data);
    } catch (err) {
      notyf.error(err.response?.data?.message || "Failed to add workout");
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const editWorkout = async (id, data) => {
    isLoading.value = true;
    try {
      const res = await updateWorkout(id, data);
      const index = workouts.value.findIndex((w) => w._id === id);
      if (index !== -1) workouts.value[index] = res.data.updatedWorkout;
      notyf.success("Workout updqted successfully!");
    } catch (err) {
      notyf.error(err.response?.data?.message || "Failed to edit workout");
      console.error(err);
    }
  };

  const removeWorkout = async (id) => {
    isLoading.value = true;
    try {
      await deleteWorkout(id);
      notyf.success("Workout deleted successfully!");
      workouts.value = workouts.value.filter((w) => w._id !== id);
    } catch (err) {
      notyf.error(err.response?.data?.message || "Failed to delete workout");
      console.error(err);
    }
  };

  const markComplete = async (id) => {
    isLoading.value = true;
    try {
      const res = await completeWorkout(id);
      notyf.success("Workout Completed!");
      const index = workouts.value.findIndex((w) => w._id === id);
      if (index !== -1) workouts.value[index] = res.data.updatedWorkout;
    } catch (err) {
      notyf.error(err.response?.data?.message || "Failed to complete workout");
      console.error(err);
    }
  };

  return { workouts, fetchWorkouts, createWorkout, editWorkout, removeWorkout, markComplete };
});
