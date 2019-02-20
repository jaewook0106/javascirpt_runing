<template>
  <div>
    <div class="wrap_top">
      <h2 class="tit_item">Vuex</h2>
     
    </div>
    <div class="wrap_cont">
      <div class="cont_info">
        <h3 class="tit_info">vuex</h3>
        <a href="javascript:;" @click="toggleAuto">test</a>
        <!-- <div v-if="onAuto" class="content_exam">
          아....
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  onCreate(){
    console.log(store);
  },
  // computed: {
  //   ...mapState([
  //     'onAuto'
  //   ])
    
  // },
  methods: {
    toggleAuto() {
      store.state.commit('toggleAuto')
      console.log(store.state.onAuto);
    }
  },
}

</script>

<style>

</style>
