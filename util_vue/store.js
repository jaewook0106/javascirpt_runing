import Vue from 'vue';
import Vuex from 'vuex';
import SessionStorageService from "../plugins/SessionStorageService";


Vue.use(Vuex);

const modules = {};
const requireModule = require.context('./modules', false, /\.js$/);

// 모듈 자동 생성
requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return;
  const moduleName = fileName.replace(/(\.\/|\.js)/gi, '');
  modules[moduleName] = {
    ...requireModule(fileName).default
  }
})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules
})
