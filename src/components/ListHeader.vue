<template>
  <header class="app-header">
    <div class="list-logo">
      <router-link to="/" ><p><span>To</span><span>-Do</span></p></router-link>
    </div>

    <div class="list-dashboard">
      <p>Pending Tasks {{ pending }}</p>
      <p> Completed Tasks {{ completed }}</p>
    </div>

    <div class="list-date">
      <p>{{ currentDay }}</p>
      <p>{{ fullDate }}</p>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListHeader',

  data() {
    const today = new Date();

    return {
      // Using browser locale automatically
      currentDay: today.toLocaleDateString(undefined, { weekday: 'long' }),
      fullDate: today.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  },

  computed: {
    ...mapState(['pending', 'completed']),
  }
};
</script>
