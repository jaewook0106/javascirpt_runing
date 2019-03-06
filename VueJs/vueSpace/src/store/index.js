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
    ],
    count:0
  },
  getters:{

  },
  // 동기
  mutations:{
    // toggleAuto(state) {
    //   state.onAuto = !state.onAuto;
    // }
    toggleAuto: state => state.onAuto = !state.onAuto,
    increment: (state, n) => state.count += Number(n),
    decrement: (state, n) => state.count -= Number(n),
    reset: state => {
      state.count = 0
    }
  },
  // 비동기
  actions:{
    
  }
})

export default store