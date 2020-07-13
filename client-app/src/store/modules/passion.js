import { PassionApi } from '../../services/index'

export default {
  namespaced: true,
  state: {
    passion: {},
    passions: [],
  },
  mutations: {
    SET_PASSIONS(state, payload) {
      state.passions = payload
    },
    SET_PASSION(state, payload) {
      state.passion = payload
    },
  },
  actions:{
    async getPassionCards({ commit }, { profileId }) {
      const { data } = await PassionApi.getPassionCards(profileId);
      if(data){
        commit('SET_PASSIONS', data)
      }
    },
    // eslint-disable-next-line
    async getPhoto({ commit }, {formData}) {
      return await PassionApi.getPhotoURL(formData);
    },
    async createPost({ commit }, {title, shortDescription, description, preview}) {
      const { data } = await PassionApi.createPost(title, shortDescription, description, preview);
      if(data){
        commit('SET_PASSION', data)
      }
    },
  },
  getters: {
    passions: state => state.passions,
    passion: state => state.passion,
  }
}