<template>
  <v-card class="task-details">
    <h5 class="task-details__header">
      TASK DETaILS
    </h5>
    <v-card-title class="task-details__title">
      {{ currentTask.name }}
    </v-card-title>
    <v-card-text class="task-details__main">
      <div class="main__labels">
        <div v-for="(v, i) in currentTask.labels" class="labels-item" :key="i">
          {{ v.name }}
        </div>
      </div>
      <div class="main__additional-features">
        <!-- <remainder />  -->
        <!-- <task-additional-type />  -->
      </div>
      <div class="main__subtasks">
        <!-- <task v-for="(v, i) in tasl.subtasks" :key="i">-->
        <!-- <v-btn>+ New Subtask</v-btn> -->
      </div>
      <div class="main__notes">{{ currentTask.notes }}</div>
    </v-card-text>
    <v-card-actions class="task-details__footer">
      <v-btn>Mark as Done</v-btn>
      <v-btn>Delete Task</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentTask"])
  }
};
</script>

<style></style>
