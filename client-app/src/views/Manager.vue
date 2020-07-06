<template>
  <div class="manager">
    <div class="manager__header header">Main Tasks</div>
    <task v-for="(v, i) in 3" :task="tasks[i]" :key="i" />
    <div class="manager__subheader header">Secondary Tasks</div>
    <task v-for="(v, i) in 10" :task="tasks[i + 3]" :key="i + 3" />
    <v-btn v-if="tasks.length < 12" class="manager__add-button">Add</v-btn>
  </div>
</template>

<script>
import Task from "../components/Task";
export default {
  components: {
    Task
  },
  data() {
    return {
      tasks: [
        { name: "Work Hard" },
        { name: "Do exercises" },
        { name: "Write Project" },
        { name: "Sleep" },
        { name: "Work Hard" },
        { name: "Do exercises" },
        { name: "Write Project" },
        { name: "Sleep" },
        { name: "Work Hard" },
        { name: "Do exercises" },
        { name: "Write Project" }
      ]
    };
  }
};
</script>

<style lang="scss">
.manager {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .header {
    width: 100%;
    height: 8%;
    background-color: violet;
    border-radius: 10px;
    text-align: center;
  }

  &__add-button {
    width: 40%;
    height: 8%;
    background-color: #04f615;
    border-radius: 3px;
    text-align: center;
  }
}
</style>
