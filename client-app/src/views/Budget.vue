<template>
  <div class="budget">
    <div class="budget__transactions">
      <div class="budget__transactions-headers">
        <h2 @click="isExpenses = true">Expenses</h2>
        <h2 @click="isExpenses = false">Incomes</h2>
      </div>
      <div class="budget__transactions-item"  v-for="(v, i) in transactions" :key="i">
        <div class="item-detail">
          {{ i }}
        </div>
        <div class="item-detail">
          {{ v.category }}
        </div>
        <div class="item-detail">
          {{ v.amount }}
        </div>
      </div>
    </div>
    <div class="budget__add-button" @click="addTransaction">+</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      isExpenses: true,
      incomes: [{ category: 'Salary', amount: 270000 }],
      expenses: [{ category: 'Travel', amount: 80000 }]
    }
  },
  async mounted() {},
  computed: {
    ...mapGetters("profile", ["current"]),
    transactions: function() {
      return this.isExpenses ? this.expenses : this.incomes
    }
  },
  methods: {
    addTransaction: function() {
      // TODO
      this.$router.push({ name: 'NewTransaction', params: { budgetId: ''}})
    }
  }
};
</script>

<style lang="scss">
  .budget {
    &__transactions {
      &-headers {
        display: flex;
        justify-content: space-around
      }

      &-item {
        display: flex;
        justify-content: space-evenly
      }
    }

    &__add-button {
      position: absolute;
      color: white;
      font-size: 30px;
      right: 10px;
      bottom: 20px;
      padding: 5px 18px;
      border-radius: 50%;
      background-color: darkorange;
    }
  }
</style>
