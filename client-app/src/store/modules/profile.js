export default {
  namespaced: true,
  state: {
    current: "5f00d2be9c13b32c5071ed39"
  },
  mutations: {
    SET_PROFILE(state, payload) {
      state.current = payload;
    }
  },
  actions: {
  },
  getters: {
    current: state => state.current
  }
};
