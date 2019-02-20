import Vue from  'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    onAuto:true,
    musicList:[
      {
        id:0,
        song:'ncs'
      },
      {
        id:1,
        song:'luna'
      }
    ]
  },
  mutations:{
    // toggleAuto(state) {
    //   state.onAuto = !state.onAuto;
    // }
    toggleAuto: state => state.onAuto = !state.onAuto,
  },
  actions:{
      
  }
})

export default store