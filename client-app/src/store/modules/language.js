import { LanguageApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    currentLanguage: {},
    languageCards: []
  },
  mutations: {
    SET_LANGUAGE_CARDS(state, payload) {
      state.languageCards = payload;
    },
    SET_LANGUAGE_CARD(state, payload) {
      state.currentLanguage = payload;
    }
  },
  actions: {
    async getLanguageCards({ commit }, { profileId }) {
      const { data } = await LanguageApi.getLanguageCards(profileId);
      if (data) {
        commit("SET_LANGUAGE_CARDS", data);
      }
    },
    async getLanguageCard({ commit }, { profileId, noteId }) {
      const { data } = await LanguageApi.getLanguageCard(profileId, noteId);
      if (data) {
        commit("SET_LANGUAGE_CARD", data);
      }
    },
    // eslint-disable-next-line
    async getImageLink({ commit }, { formData }) {
      return await LanguageApi.getImageLink(formData);
    },
    async updateLanguageCard({ commit }, { profileId, noteId, newNote }) {
      const { data } = await LanguageApi.updateLanguageCard(
        profileId,
        noteId,
        newNote
      );
      if (data) {
        commit("SET_LANGUAGE_CARD", data);
      }
    },
    async createLanguageCard({ commit }, { profileId, newNote }) {
      const { data } = await LanguageApi.createLanguageCard(profileId, newNote);
      if (data) {
        commit("SET_LANGUAGE_CARD", data);
      }
    }
  },
  getters: {
    languageCards: state => state.languageCards,
    currentLanguage: state => state.currentLanguage
  }
};
