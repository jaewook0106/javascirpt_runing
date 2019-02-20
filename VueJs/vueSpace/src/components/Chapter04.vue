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
  computed: {
    ...mapState([
      'onAuto','musicList'
    ])
    
  },
  
  methods: {
    ...mapMutations([
      'toggleAuto'
    ])
  },

  //두번째 방법 (... helper 함수 안쓸 경우)
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
