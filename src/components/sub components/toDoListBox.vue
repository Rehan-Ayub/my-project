<template>
  <div>
    <!-- Header Buttons -->
    <div class="btn-container">
      <div class="filter-buttons">
        <button class="button button-primary" @click="filterStatus = 'pending'">Pending Tasks</button>
        <button class="button button-secondary" @click="filterStatus = 'completed'">Completed Tasks</button>
        <button class="button button-white" @click="filterStatus = 'all'">See All Tasks</button>
      </div>
      <div class="new-task-container">
        <router-link to="/NewTask" class="button button-primary Add-class">
          Add new task <i class="fa-solid fa-plus"></i>
        </router-link>
      </div>
    </div>

    <!-- Alert Messages -->
    <div v-if="tasks.length === 0" class="no-task-alert">
      <p>No tasks available. Please add new tasks.</p>
    </div>
    <div v-else-if="filteredTasks.length === 0" class="no-task-alert">
      <p v-if="filterStatus === 'pending'">No pending tasks available.</p>
      <p v-else-if="filterStatus === 'completed'">No completed tasks available.</p>
      <p v-else>No tasks match the selected filter.</p>
    </div>

    <!-- Task List -->
    <div class="task-container">
      <div class="todo-list-box" :class="{
        'bg-primary': task.taskStatus === 'pending',
        'bg-secondary': task.taskStatus === 'completed'
      }" v-for="task in filteredTasks" :key="task.id">
        <!-- Title -->
        <div class="task-title">
          <h2>{{ task.taskTitle }}</h2>
          <router-link :to="{ name: 'SeeTask', params: { id: task.id } }">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </router-link>
        </div>

        <!-- Body -->
        <div class="task-body">
          <div class="task-description">
            <p>{{ task.taskDescription }}</p>
          </div>

          <div class="task-action-btns">
            <button class="button" :class="{ 'button-primary': task.taskStatus === 'pending' }"
              @click="ChangeStatus(task.id, 'pending')">
              Pending
            </button>
            <button class="button" :class="{ 'button-secondary': task.taskStatus === 'completed' }"
              @click="ChangeStatus(task.id, 'completed')">
              Completed
            </button>
          </div>

          <div class="task-delete-btn" @click="askDelete(task.id)">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ModalConfirm :show="showConfirm" message="Are you sure you want to delete this task?" @confirm="confirmDelete"
      @cancel="cancelDelete" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ModalConfirm from './ModalConfir.vue'; // Adjust path as needed

export default {
  name: 'ToDoListBox',
  components: { ModalConfirm },

  data() {
    return {
      showConfirm: false,
      deleteId: null,
      filterStatus: 'all'
    };
  },

  computed: {
    ...mapState(['tasks', 'pending', 'completed']),
    filteredTasks() {
      if (this.filterStatus === 'all') return this.tasks;
      return this.tasks.filter(task => task.taskStatus === this.filterStatus);
    }
  },

  mounted() {
    this.$store.dispatch('fetchTasks');
  },

  methods: {
    ChangeStatus(id, status) {
      this.$store.dispatch('updateTaskStatus', { id, status });
    },
    askDelete(id) {
      this.deleteId = id;
      this.showConfirm = true;
    },
    confirmDelete() {
      this.$store.dispatch('deleteTask', this.deleteId);
      this.deleteId = null;
      this.showConfirm = false;
    },
    cancelDelete() {
      this.deleteId = null;
      this.showConfirm = false;
    }
  }

};
</script>
