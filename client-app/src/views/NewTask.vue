<template>
  <v-card class="task-details">
    <h2 class="task-details__header">
      TASK DETaILS
    </h2>
    <v-card-title class="task-details__title">
      <v-text-field
        v-model="name"
        label="Task Name"
      />
    </v-card-title>
    <v-card-text class="task-details__main">
      <div class="main__labels">
        <v-btn
          v-for="(v, i) in labels"
          dark
          class="labels-item"
          :style="{ 'background-color': v.color }"
          :key="i"
        >
          {{ v.name }}
        </v-btn>
        <v-dialog
          v-model="labelDialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Addere Labele
            </v-btn>
          </template>

          <v-form
            v-model="valid">
            <v-card>
              <v-card-title class="headline lighten-2" :style="{ backgroundColor: labelColor}">
                Addered Labeled
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Labeled Name"
                  v-model="labelName"
                  :rules="[v => !!v || 'Это поле обязательнное']" 
                />
                <v-color-picker
                  v-model="labelColor"
                  elevation="15"
                ></v-color-picker>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  text
                  @click="addedLabel"
                >
                  Addere
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </div>
      <v-row class="main__additional-features">
        <v-col class="features__wrapper" cols="6" sm="12">
          <v-select v-model="kind" :items="relationships" label="Relat."></v-select>
          <v-text-field 
            v-if="kind"
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
          :key="i"
        />

        <v-dialog
          v-model="subTasksDialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <button 
              class="subtasks__button" 
              v-bind="attrs"
              v-on="on"
              >+ New Subtask</button>
          </template>

          <v-form
            v-model="valid">
            <v-card>
              <v-card-title class="headline lighten-2" :style="{ backgroundColor: labelColor}">
                Add Subtask
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Subtask Name"
                  v-model="subTaskName"
                  :rules="[v => !!v || 'Это поле обязательнное']" 
                />
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  text
                  @click="addedSubTask"
                >
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Notes</div>
        <v-text-field
          class="notes__value"
          v-model="notes"
        />
      </div>
    </v-card-text>
    <v-card-actions class="task-details__footer">
      <v-btn @click="sendRequest">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Task from "../components/Task";
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
      this.$router.push({ name: 'Manager'})
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
