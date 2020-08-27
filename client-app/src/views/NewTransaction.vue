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
          v-model="name"
        />
      </div>
      <v-radio-group
        v-model="type">
        <v-radio
          class="mx-auto"
          v-for="(v, i) in ['Expenses', 'Incomes']"
          :key="i"
          :label="v"
        ></v-radio>
      </v-radio-group>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Category</div>
        <v-select
          class="notes__value"
          :items="this.categories"
          item-text="name"
          v-model="category"
          return-object
        />
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Momey</div>
        <v-text-field
          class="notes__value"
          prepend-icon="mdi-currency-usd "
          v-model="money"
        />
      </div>
      <div class="main__notes main__section">
        <div class="notes__title main__header">Notes</div>
        <v-textarea
          class="notes__value"
          rows="2"
          solo
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
      type: 0,
      category: '',
      kind: '',
      money: '',
      notes: ''
    };
  },
  async mounted() {
    await this.$store.dispatch('budget/getCategories')
  },
  computed: {
    ...mapGetters("profile", ["current"]),
    ...mapGetters("budget", ["expensesCategories", "incomeCategories", ]),
    categories: function() {
      return this.type ? this.incomeCategories : this.expensesCategories
    }
  },
  methods: {
    sendRequest: async function () {
      const newTransaction = {
        name: this.name,
        category: this.category._id,
        money: this.money,
        notes: this.notes,
        createdAt: new Date()
      }
      await this.$store.dispatch('budget/createTransactionCard', { profileId: this.current, newTransaction })
      this.$router.push({ name: 'Budget'})
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
