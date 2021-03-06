import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import profile from "./modules/profile";
import task from "./modules/task";
import passion from "./modules/passion";
import language from "./modules/language";
import budget from "./modules/budget";

export default new Vuex.Store({
  modules: {
    profile,
    task,
    passion,
    language,
    budget
  }
});
