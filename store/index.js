import Vue from "vue";
import Vuex from "vuex";
import SystemStore  from "./modules/systemStore";
import createPersistedState from 'vuex-persistedstate';

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
  plugins: [createPersistedState({
    // 你可以自定义配置，比如存储的key
    key: 'my-app-vuex',
    storage: window.localStorage, // 默认就是localStorage
  })],
})

export default store;
