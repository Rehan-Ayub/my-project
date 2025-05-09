<template>
  <Teleport to="#ListHeader">
    <ListHeader />
  </Teleport>

  <div class="main">
    <router-view />
  </div>

  <Teleport to="#ListFooter">
    <ListFooter />
  </Teleport>
</template>

<script>
import ListHeader from './components/ListHeader.vue'
import ListFooter from './components/ListFooter.vue'
// import ToDoListBox from './components/sub components/toDoListBox.vue'
export default {
  name: 'App',
  components: {
    ListHeader,
    ListFooter
    // ToDoListBox
  }
}
</script>
