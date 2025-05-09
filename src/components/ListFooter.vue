<template>
  <footer class="app-footer custom-footer">
    <p>&copy; {{ currentYear }} Task Manager. All rights reserved.</p>
  </footer>
</template>
<script>
export default {
  name: 'ListFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }

}</script>