import { BudgetApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    currentTransaction: {},
    transactions: []
  },
  mutations: {
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
    async createPassionCard({ commit }, { profileId, newNote }) {
      const { data } = await BudgetApi.createTransactionCard(profileId, newNote);
      if (data) {
        commit("SET_TRANSACTION", data);
      }
    }
  },
  getters: {
    transactions: state => state.transactions,
    expenses: state => state.transactions.filter(v => v.category.type === 'expenses'),
    income: state => state.transactions.filter(v => v.category.type === 'income'),
    currentTransaction: state => state.currentTransaction
  }
};
