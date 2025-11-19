<template>
  <div class="container-fluid min-vh-100 p-4" id="login-bg">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
      <h2>My Workouts</h2>
      <button class="btn btn-primary mt-2 mt-md-0" @click="showAddModal = true">Add Workout</button>
    </div>

    <!-- Profile Card -->
    <div v-if="auth.isLoggedIn() && Object.keys(auth.user).length" class="mb-4 d-flex justify-content-center">
      <div class="card p-3 shadow-sm" style="max-width: 400px; width: 100%;">
        <h5 class="card-title">My Profile</h5>
        <p><strong>Email:</strong> {{ auth.user.email }}</p>
        <p><strong>Registered:</strong> {{ formatDate(auth.user.createdAt) }}</p>
      </div>
    </div>

    <!-- Workouts List -->
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 mb-3"
        v-for="workout in workoutStore.workouts"
        :key="workout._id"
      >
        <div class="card p-3 shadow-sm h-100 d-flex flex-column justify-content-between">
          <div>
            <h5>{{ workout.name }}</h5>
            <p><strong>Duration:</strong> {{ workout.duration }}</p>
            <p><strong>Status:</strong> {{ workout.status }}</p>
            <p><strong>Date Added:</strong> {{ formatDate(workout.dateAdded) }}</p> <!-- New line -->
          </div>
          <div class="mt-2 d-flex flex-wrap gap-1">
            <button
              class="btn btn-success btn-sm"
              @click="completeWorkout(workout._id)"
              :disabled="workout.status==='completed'"
            >Complete</button>
            <button class="btn btn-warning btn-sm" @click="openEditModal(workout)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteWorkout(workout._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Add Workout Modal -->
    <div class="modal" v-if="showAddModal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <h5>Add Workout</h5>
          <form @submit.prevent="addWorkoutConfirm">
            <input v-model="newName" class="form-control mb-2" placeholder="Workout Name" required />
            <input v-model="newDuration" class="form-control mb-2" placeholder="Duration" required />
            <div class="d-flex justify-content-end gap-2">
              <button class="btn btn-primary" type="submit">Add</button>
              <button class="btn btn-secondary" type="button" @click="showAddModal=false">Cancel</button>
            </div>
          </form>
        </div>

      </div>
    </div>

    <!-- Edit Workout Modal -->
    <div class="modal" v-if="showEditModal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <h5>Edit Workout</h5>
          <input v-model="editName" class="form-control mb-2" placeholder="Workout Name" />
          <input v-model="editDuration" class="form-control mb-2" placeholder="Duration" />
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-primary" @click="updateWorkoutConfirm">Save</button>
            <button class="btn btn-secondary" @click="showEditModal=false">Cancel</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useWorkoutStore } from "../stores/workouts.js";
import { useAuthStore } from "../stores/auth.js";

const workoutStore = useWorkoutStore();
const auth = useAuthStore();

// Modals & input
const showAddModal = ref(false);
const newName = ref("");
const newDuration = ref("");

const showEditModal = ref(false);
const editId = ref(null);
const editName = ref("");
const editDuration = ref("");

// Fetch workouts on mount
onMounted(() => {
  workoutStore.fetchWorkouts();
});

// Add workout
const addWorkoutConfirm = async () => {
  if (!newName.value || !newDuration.value) return;
  await workoutStore.createWorkout(newName.value, newDuration.value);
  newName.value = "";
  newDuration.value = "";
  showAddModal.value = false;
};

// Edit workout
const openEditModal = (workout) => {
  editId.value = workout._id;
  editName.value = workout.name;
  editDuration.value = workout.duration;
  showEditModal.value = true;
};

const updateWorkoutConfirm = async () => {
  await workoutStore.editWorkout(editId.value, { name: editName.value, duration: editDuration.value });
  showEditModal.value = false;
};

// Delete & Complete
const deleteWorkout = (id) => workoutStore.removeWorkout(id);
const completeWorkout = (id) => workoutStore.markComplete(id);

// Helpers
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
#login-bg {
  min-height: 100vh;
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: 2rem;
}

/* Make modals centered and responsive */
.modal-dialog {
  max-width: 400px;
  margin: 3rem auto;
}
</style>
