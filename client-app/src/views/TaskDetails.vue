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
        <div
          v-for="(v, i) in currentTask.labels"
          class="labels-item"
          :style="{ 'background-color': v.color }"
          :key="i"
        >
          {{ v.name }}
        </div>
      </div>
      <v-row class="main__additional-features">
        <v-col class="features__wrapper" cols="6" sm="12">
          <v-select v-model="relationship" :items="relationships" label="Relat."></v-select>
          <v-text-field 
            v-if="relationship"
            label="amountOfRelationship"
            v-model="amountOfRelationship"
          />
        </v-col>
        <v-col class="features__wrapper" cols="6" sm="12">
          <v-select
            v-model="type"
            :items="types"
            label="Type"
          />
          <v-text-field 
            v-if="type"
            disabled
            :value="type === 'main' ? 4 : 1"
          />
        </v-col>
      </v-row>
      <div class="main__subtasks main__section">
        <div class="subtasks__title main__header">Subtasks</div>
        <task
          v-for="(v, i) in subtasks"
          :task="v"
          :parentTask="currentTask"
          :key="i"
        />
        <button class="subtasks__button" @click="addedSubTask">+ New Subtask</button>
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Notes</div>
        <v-textarea
          name="input-7-1"
          v-model="notes"
        ></v-textarea>
      </div>
    </v-card-text>
    <v-card-actions class="task-details__footer">
      <v-btn @click="deleteTask">Delete Task</v-btn>
      <v-btn @click="updateTask">Update Task</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Task from "../components/Task";
export default {
  data() {
    return {
      relationships: ['family', 'career', 'sleep', 'friends', 'fitness'],
      types: ['main', 'secondary'],
      subtasks: [],
      relationship: '',
      type: '',
      amountOfRelationship: '',
      notes: '',
    };
  },
  components: {
    Task
  },
  async mounted() {
    await this.$store.dispatch("task/getTaskCard", {
      profileId: this.$route.params.managerId,
      taskId: this.$route.params.taskId
    });
    this.relationship = this.currentTask.relationships[0].kind
    this.amountOfRelationship = this.currentTask.relationships[0].amount
    this.type = this.currentTask.type
    this.subtasks = this.currentTask.subtasks
    this.notes = this.currentTask.notes
  },
  computed: {
    ...mapGetters("profile", ["current"]),
    ...mapGetters("task", ["currentTask"]),
  },
  methods: {
    deleteTask: async function () {
      await this.$store.dispatch('task/deleteTaskCard', { profileId: this.current, taskId: `${this.currentTask._id}` })
      await this.$router.push({ name: "Manager" })
    },
    addedSubTask: function () {
      this.subtasks.push({ name: this.subTaskName })
      this.subTasksDialog = false
    },
    updateTask: async function () {
      const newTask = {}
      if (this.relationship) newTask.relationship = this.relationship
      if (this.amountOfRelationship) newTask.amountOfRelationship = this.amountOfRelationship
      if (this.type) newTask.type = this.type
      if (this.subtasks) newTask.subtasks = this.subtasks
      if (this.notes) newTask.notes = this.notes
      newTask.status = this.currentTask.status

      await this.$store.dispatch("task/updateTaskCard", {
        profileId: this.current,
        noteId: this.currentTask._id,
        newTask
      });
      await this.$router.push({ name: "Manager" })
    }
  }
};
</script>

<style lang="scss" scoped>
.task-details {
  height: 100vh;
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

    .main__additional-features {
      .features__wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: darkcyan;
        border-right: 2px solid #fff;

          .v-text-field {
            padding-top: 0px;
            margin-top: 4px;
          }

          .v-messages {
            display: none;
          }
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
