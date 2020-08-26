<template>
  <div class="budget">
    <div class="budget__transactions">
      <div class="budget__transactions-headers">
        <h2 @click="isExpenses = true">Expenses</h2>
        <h2 @click="isExpenses = false">Incomes</h2>
      </div>
      <div class="budget__transactions-item" :style="{ backgroundColor: v.category.color }"  v-for="(v, i) in transactions" :key="i">
        <div class="item-detail">
          {{ i }}
        </div>
        <div class="item-detail">
          {{ v.category.name }}
        </div>
        <div class="item-detail">
          {{ v.money }}
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
      isExpenses: true
    }
  },
  async mounted() {
    await this.$store.dispatch('budget/getTransactionCards', { profileId: this.current })
  },
  computed: {
    ...mapGetters("profile", ["current"]),
    ...mapGetters("budget", ["expenses", "income"]),
    transactions: function() {
      return this.isExpenses ? this.expenses : this.income
    }
  },
  methods: {
    addTransaction: function() {
      this.$router.push({ name: 'NewTransaction', params: { profileId: this.current }})
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
