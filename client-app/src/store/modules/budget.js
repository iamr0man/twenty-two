import { BudgetApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    categories: [],
    currentTransaction: {},
    transactions: []
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
    SET_TRANSACTION(state, payload) {
      state.currentTransaction = payload;
    }
  },
  actions: {
    async getTransactionCards({ commit }, { profileId }) {
      const { data } = await BudgetApi.getTransactionCards(profileId);
      if (data) {
        commit("SET_TRANSACTIONS", data);
      }
    },
    async getCategories({ commit }) {
      const { data } = await BudgetApi.getCategories();
      if (data) {
        commit("SET_CATEGORIES", data);
      }
    },
    // async getPassionCard({ commit }, { profileId, noteId }) {
    //   const { data } = await BudgetApi.getPassionCard(profileId, noteId);
    //   if (data) {
    //     commit("SET_PASSION", data);
    //   }
    // },
    // // eslint-disable-next-line
    // async getImageLink({ commit }, { formData }) {
    //   return await BudgetApi.getImageLink(formData);
    // },
    // async updatePassionCard({ commit }, { profileId, noteId, newNote }) {
    //   const { data } = await BudgetApi.updatePassionCard(
    //     profileId,
    //     noteId,
    //     newNote
    //   );
    //   if (data) {
    //     commit("SET_PASSION", data);
    //   }
    // },
    async createTransactionCard({ commit }, { profileId, newTransaction }) {
      const { data } = await BudgetApi.createTransactionCard(profileId, newTransaction);
      if (data) {
        commit("SET_TRANSACTION", data);
      }
    }
  },
  getters: {
    categories: state => state.categories,
    expensesCategories: state => state.categories.filter(v => v.type === 'expenses'),
    incomeCategories: state => state.categories.filter(v => v.type === 'income'),
    transactions: state => state.transactions,
    expenses: state => state.transactions.filter(v => v.category.type === 'expenses'),
    income: state => state.transactions.filter(v => v.category.type === 'income'),
    currentTransaction: state => state.currentTransaction
  }
};
