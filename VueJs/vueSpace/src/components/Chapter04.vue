<template>
  <div>
    <div class="wrap_top">
      <h2 class="tit_item">Vuex</h2>
     
    </div>
    <div class="wrap_cont">
      <div class="cont_info">
        <h3 class="tit_info">vuex</h3>
        <a href="javascript:;" @click="toggleAuto" class="btn_comm">test</a>
        <div v-if="onAuto" class="content_exam">
          아....
        </div>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">vuex</h3>
        <ul>
          <li v-for="item in musicList" :key="item.id">
            {{item.id}}<br>
            {{item.song}}
          </li>
        </ul>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">vuex</h3>
        <div>{{count}}</div>
        <div>
          <button type="button" class="btn_comm" @click="increment(countNum)">+</button>
          <button type="button" class="btn_comm" @click="decrement(countNum)">-</button>
          <button type="button" class="btn_comm" @click="reset">reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'


export default {
  data() {
    return {
      
    }
  },
  created() {
    console.log(this.$store.state)
  },
  computed: {
    ...mapState([
      'onAuto','musicList','count','countNum'
    ])   

  },
  methods: {
    ...mapMutations([
      'toggleAuto','increment','decrement','reset',
    ])
  },
  

  //두번째 방법 (... 객체 전개 연산자 안쓸 경우)
  // computed: {
  //   onAuto() {
  //     return this.$store.state.onAuto;
  //   }
  // },
  // methods:{
  //   toggleAuto() {
  //     this.$store.commit('toggleAuto')
  //     console.log(this.$store.state.onAuto);
  //   }
  // }
}

</script>

<style>

</style>
