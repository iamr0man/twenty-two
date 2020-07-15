import { PassionApi } from "../../services/index";

export default {
  namespaced: true,
  state: {
    currentPassion: {},
    passions: []
  },
  mutations: {
    SET_PASSIONS(state, payload) {
      state.passions = payload;
    },
    SET_PASSION(state, payload) {
      state.currentPassion = payload;
    }
  },
  actions: {
    async getPassionCards({ commit }, { profileId }) {
      const { data } = await PassionApi.getPassionCards(profileId);
      if (data) {
        commit("SET_PASSIONS", data);
      }
    },
    async getPassionCard({ commit }, { profileId, noteId }) {
      const { data } = await PassionApi.getPassionCard(profileId, noteId);
      if (data) {
        commit("SET_PASSION", data);
      }
    },
    // eslint-disable-next-line
    async getImageLink({ commit }, { formData }) {
      return await PassionApi.getImageLink(formData);
    },
    async updatePassionCard({ commit }, { profileId, noteId, newNote }) {
      const { data } = await PassionApi.updatePassionCard(
        profileId,
        noteId,
        newNote
      );
      if (data) {
        commit("SET_PASSION", data);
      }
    },
    async createPassionCard({ commit }, { profileId, newNote }) {
      const { data } = await PassionApi.createPassionCard(profileId, newNote);
      if (data) {
        commit("SET_PASSION", data);
      }
    }
  },
  getters: {
    passions: state => state.passions,
    currentPassion: state => state.currentPassion
  }
};
