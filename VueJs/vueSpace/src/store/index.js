import Vue from  'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    onAuto:true
  },
  mutations:{
    toggleAuto(state) {
      state.onAuto = state.onAuto;
    }
  },
  actions:{
    
  }
})

export default store