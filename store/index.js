import Vue from "vue";
import Vuex from "vuex";
import SystemStore  from "./modules/systemStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  getters: {},
  mutations: {
  },
  actions: {
  },
  modules: {
    SystemStore
  },
})

export default store;
