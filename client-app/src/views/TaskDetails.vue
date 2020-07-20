<template>
  <v-card class="task-details">
    <h2 class="task-details__header">
      TASK DETaILS
    </h2>
    <v-card-title class="task-details__title">
      {{ currentTask.name }}
    </v-card-title>
    <v-card-text class="task-details__main">
      <div class="main__labels">
        <div v-for="(v, i) in currentTask.labels" class="labels-item" :style="{ 'background-color': v.color }" :key="i">
          {{ v.name }}
        </div>
      </div>
      <div class="main__additional-features">
        <!-- <relationships />  -->
        <!-- <pomidoro />  -->
      </div>
      <div class="main__subtasks main__section">
        <div class="subtasks__title main__header">Subtasks</div>
        <task v-for="(v, i) in subtasks" :task="v" :key="i" />
        <button class="subtasks__button">+ New Subtask</button>
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Notes</div>
        <div class="notes__value">{{ currentTask.notes }}</div>
      </div>
    </v-card-text>
    <v-card-actions class="task-details__footer">
      <v-btn>Mark as Done</v-btn>
      <v-btn>Delete Task</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Task from '../components/Task'
export default {
  components: {
    Task
  },
  async mounted() {
    await this.$store.dispatch("task/getTaskCard", {
      profileId: this.$route.params.managerId,
      taskId: this.$route.params.taskId
    });
  },
  computed: {
    ...mapGetters("task", ["currentTask", "subtasks"])
  }
};
</script>

<style lang="scss" scoped>
  .task-details {
    &__title {
      font-size: 33px;
      font-weight: 700;
      text-transform: uppercase;
    }

    &__main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .main__labels {
        display: flex;
        margin-bottom: 25px;

        .labels-item {
          padding: 10px;
          border-radius: 24px;
          margin-right: 10px;
        }
      }

      .main__section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .main__header {
        font-size: 25px;
        font-weight: 900;
        color: #1b1b1b;
      }

      .main__subtasks {
        margin-bottom: 10px;

        .subtasks__button {
          font-size: 20px;
        }   
      }

      .main__notes {
        .notes__value {
          text-align: left;
        }
      }
    }
  }
</style>
