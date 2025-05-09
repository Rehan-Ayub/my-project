import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    tasks: [],
    pending: 0,
    completed: 0
  },

  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find(task => task.id === id);
    }
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
      state.pending = tasks.filter(t => t.taskStatus === 'pending').length;
      state.completed = tasks.filter(t => t.taskStatus === 'completed').length;
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      state.pending = state.tasks.filter(t => t.taskStatus === 'pending').length;
      state.completed = state.tasks.filter(t => t.taskStatus === 'completed').length;
    }
  },

  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/Tasks');
        commit('SET_TASKS', response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("for Developers :  Please start the Json-server, to fetch records.\n otherwise you can't read and add new data. \n command : cd db\njson-server --watch db.json --port 3000");
      }
    },

    async createTask({ state, dispatch }, newTask) {
      try {
        // Extract only numeric IDs and find the highest
        const numericIds = state.tasks
          .map(task => parseInt(task.id))
          .filter(id => !isNaN(id));
        const newId = numericIds.length ? Math.max(...numericIds) + 1 : 1;
  
        // Add numeric ID and default status
        const taskWithId = {
          id: String(newId),
          taskTitle: newTask.taskTitle,
          taskDescription: newTask.taskDescription,
          taskStatus: "pending"
        };
  
        await axios.post("http://localhost:3000/Tasks", taskWithId);
        dispatch("fetchTasks");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  ,

    async updateTaskStatus({ dispatch }, { id, status }) {
      try {
        await axios.patch(`http://localhost:3000/Tasks/${id}`, {
          taskStatus: status
        });
        dispatch('fetchTasks');
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },

    async deleteTask({ dispatch, commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/Tasks/${id}`);
        commit('REMOVE_TASK', id);
        dispatch('fetchTasks');
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  }
});

export default store;
