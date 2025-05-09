<template>
    <form @submit.prevent="createTask">
      <div class="see-task-container">
        <div class="container-title">
          <input
            type="text"
            v-model="title"
            name="title"
            id="title"
            placeholder="Create Title"
          />
        </div>
        <div class="container-description">
          <p><u>Task Description</u></p>
          <textarea
            v-model="description"
            name="description"
            id="description"
            placeholder="Create Description"
          ></textarea>
        </div>
        <div class="container-actions">
          <router-link to="/" class="button button-primary">Go back to Home</router-link>
          <button type="submit" class="button button-secondary">Create</button>
        </div>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    name: "NewTask",
    data() {
      return {
        title: "",
        description: "",
      };
    },
    methods: {
      createTask() {
        if (this.title.trim() === "" || this.description.trim() === "") {
          alert("Please fill in both fields");
          return;
        }
  
        const newTask = {
          taskTitle: this.title,
          taskDescription: this.description,
        };
  
        this.$store.dispatch("createTask", newTask).then(() => {
          this.$router.push("/"); // redirect to home
        });
      },
    },
  };
  </script>
  