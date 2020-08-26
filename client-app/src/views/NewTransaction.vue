<template>
  <v-card class="task-details">
    <h2 class="task-details__header">
      NEW TRANSaCTION
    </h2>
    <v-card-text>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Name</div>
        <v-text-field
          class="notes__value"
          v-model="notes"
        />
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Category</div>
        <v-text-field
          class="notes__value"
          v-model="notes"
        />
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Notes</div>
        <v-textarea
          class="notes__value"
          v-model="notes"
        />
      </div>
    </v-card-text>
    <v-card-actions class="task-details__footer">
      <v-btn class="mx-auto" @click="sendRequest">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: '',
      valid: false,
      labelDialog: false,
      labelName: '',
      labelColor: '',
      labels: [],
      kind: '',
      type: '',
      amountOfRelationship: '',
      relationships: ['family', 'career', 'sleep', 'friends', 'fitness'],
      types: ['main', 'secondary'],
      subTasksDialog: false,
      subtasks: [],
      subTaskName: '',
      notes: ''
    };
  },
  async mounted() {
    await this.$store.dispatch("task/getTaskCard", {
      profileId: this.$route.params.managerId,
      taskId: this.$route.params.taskId
    });
  },
  computed: {
    ...mapGetters("profile", ["current"])
  },
  methods: {
    addedLabel: function () {
      this.labels.push({ name: this.labelName, color: this.labelColor })
      this.labelDialog = false
      this.labelName = ''
      this.labelColor = ''
    },
    addedSubTask: function () {
      this.subtasks.push({ name: this.subTaskName })
      this.subTasksDialog = false
    },
    sendRequest: async function () {
      const newNote = {
        name: this.name,
        labels: this.labels,
        relationships: {
          kind: this.kind,
          amount: this.amountOfRelationship
        },
        subtasks: this.subtasks,
        type: this.type,
        status: 'not finished',
        notes: this.notes
      }
      await this.$store.dispatch('task/createTaskCard', { profileId: this.current, newNote })
      this.$router.push({ path: 'Manager'})
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
      flex-wrap: wrap;
      margin-bottom: 25px;

      .labels-item {
        padding: 10px;
        border-radius: 24px;
        margin: 5px;
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
