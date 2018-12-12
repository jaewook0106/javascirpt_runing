<template>
  <div>
    <div class="wrap_top">
      <h2 class="tit_item">event</h2>
      <p>v-on: 약어 @로 가능</p>
    </div>
    <div class="wrap_cont">
      <div class="cont_info">
        <h3 class="tit_info">v-on:click / @click</h3>
        <div class="content_exam">
          <input type="text" placeholder="숫자 입력" class="inp_comm" v-model="moneyNum">
          <a href="javascript:;" class="btn_comm" @click="depositNum">예금</a>
          <a href="javascript:;" class="btn_comm" @click="withdrawNum">인출</a>
          <dl>
            <dt>계좌 잔고</dt>
            <dd>{{cashNum}}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// document.addEventListener('keyup',function(e){
//   console.log(e.keyCode)
// })

export default {
  data(){
    return {
      moneyNum : 0,
      cashNum : 0
    }
  },
  methods:{
    depositNum: function(e){
      const n = Number(this.moneyNum);
      this.cashNum += n
      console.log(e.target.tagName)
    },
    withdrawNum: function(e){
      const n = Number(this.moneyNum);
      this.cashNum -= n
    }
  }
}
</script>

<style>

</style>
