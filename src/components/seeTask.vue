<template>
  <div>
    <!-- Task Display Section -->
    <div v-if="task" class="see-task-container">
      <div class="container-title">
        <h1>{{ task.taskTitle }}</h1>
      </div>
      <div class="container-description">
        <p><u>Task Description</u></p>
        <p>{{ task.taskDescription }}</p>
      </div>
      <div class="container-actions">
        <router-link to="/" class="button button-primary">Go back to Home</router-link>
        <button @click="askDelete(task.id)" class="button button-danger">Delete this task </button>
      </div>
    </div>

    <!-- Task Not Found Fallback -->
    <div v-else class="see-task-container">
      <h1>Task not found</h1>
      <router-link to="/" class="button button-primary button-sea-task">Go back to Home</router-link>
    </div>

    <!-- Custom Confirm Modal -->
    <ModalConfirm
      :show="showConfirm"
      message="Are you sure you want to delete this task?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalConfirm from './sub components/ModalConfir.vue'; // Adjust path as needed

export default {
  name: 'SeeTask',
  
  components: {
    ModalConfirm
  },
  data() {
    return {
      showConfirm: false,
      deleteId: null,
     
    };
  },
  mounted() {
  if (!this.task) { // ✅ Check if task is missing
    this.$store.dispatch("fetchTasks"); // ✅ Fetch tasks dynamically
  }
},
  computed: {
    ...mapGetters(['getTaskById']),
    task() {
      const id = this.$route.params.id;
      return this.getTaskById(id);
    },
  },
  methods: {
    askDelete(id) {
      this.deleteId = id;
      this.showConfirm = true;
    },
    confirmDelete() {
      this.$store.dispatch('deleteTask', this.deleteId).then(() => {
        this.$router.push('/');
      });
      this.showConfirm = false;
      this.deleteId = null;
    },
    cancelDelete() {
      this.showConfirm = false;
      this.deleteId = null;
    }
  }
};
</script>


