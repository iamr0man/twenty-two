import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTask: {
      labels: [
        {
          color: "#fdad1d",
          name: "high priority"
        }
      ],
      name: "Write Project",
      status: "not finished"
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
