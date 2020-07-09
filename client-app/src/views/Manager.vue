<template>
  <div class="manager">
    <v-card-title class="manager__header header"
      ><h3>Main Tasks</h3></v-card-title
    >
    <task v-for="(v, i) in 3" :task="tasks[i]" :key="i" />
    <v-card-title class="manager__subheader header"
      ><h3>Secondary Tasks</h3></v-card-title
    >
    <task v-for="(v, i) in 8" :task="tasks[i + 3]" :key="i + 3" />
    <v-card-actions v-if="tasks.length < 12" class="mt-2">
      <v-btn color="#2196f382" class="manager__add-button">Add</v-btn>
    </v-card-actions>
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
        {
          name: "Work Hard",
          status: "completed",
          labels: [{ name: "priority", color: "#fdad1d" }]
        },
        {
          name: "Do exercises",
          status: "completed",
          labels: [{ name: "low priority", color: "#fdad1d" }]
        },
        {
          name: "Write Project",
          status: "not finished",
          labels: [{ name: "high priority", color: "#fdad1d" }]
        },
        {
          name: "Sleep",
          status: "completed",
          labels: [{ name: "priority", color: "#fdad1d" }]
        },
        {
          name: "Clean Room",
          status: "completed",
          labels: [{ name: "low priority", color: "#fdad1d" }]
        },
        {
          name: "Read book",
          status: "not finished",
          labels: [{ name: "high priority", color: "#fdad1d" }]
        },
        {
          name: "Listen audio",
          status: "completed",
          labels: [{ name: "low priority", color: "#fdad1d" }]
        },
        {
          name: "Help Sasha",
          status: "completed",
          labels: [{ name: "priority", color: "#fdad1d" }]
        },
        {
          name: "Call lead",
          status: "completed",
          labels: [{ name: "low priority", color: "#fdad1d" }]
        },
        {
          name: "Write Notes",
          status: "not finished",
          labels: [{ name: "priority", color: "#fdad1d" }]
        },
        {
          name: "Analyze day",
          status: "completed",
          labels: [{ name: "in progress", color: "#fdad1d" }]
        }
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
  background-color: #fff;

  .header {
    background-color: violet;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 3px #2196f382;
    margin-top: 7px;
  }

  &__add-button {
    width: 40%;
    height: 8%;
    margin: 10px auto;
    background-color: #04f615;
    border-radius: 3px;
    text-align: center;
  }
}
</style>
