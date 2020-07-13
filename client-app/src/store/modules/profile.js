// import { ProfileApi } from '../../services/index'

export default {
  namespaced: true,
  state: {
    current: '5f00d2be9c13b32c5071ed39',
  },
  mutations: {
    SET_PROFILE(state, payload) {
      state.current = payload
    },
  },
  actions:{
    // async getPassions({ commit }) {
    //   const { data } = await PassionApi.getPassions();
    //   if(data){
    //     commit('SET_POSTS', data)
    //   }
    // },
    // async createPost({ commit }, {title, shortDescription, description, preview}) {
    //   const { data } = await PassionApi.createPost(title, shortDescription, description, preview);
    //   if(data){
    //     commit('SET_POST', data)
    //   }
    // },
  },
  getters: {
    current: state => state.current,
  }
}