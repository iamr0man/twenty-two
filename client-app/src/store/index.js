import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import profile from './modules/profile'
import passion from './modules/passion'

export default new Vuex.Store({
  modules: {
    profile,
    passion
  }
});
