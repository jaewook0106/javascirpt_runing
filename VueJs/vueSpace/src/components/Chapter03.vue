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
      <div class="cont_info">
        <h3 class="tit_info">v-on:click.prevent / event.preventDefault()</h3>
        <div class="content_exam">
          <p>이벤트 핸들러 내부에서 호출하는것을 vue에서는 v-on 이벤트에 이벤트 수식어를 제공합니다.</p>
          <ul>
            <li>.stop</li>
            <li>.prevent</li>
            <li>.capture</li>
            <li>.self</li>
            <li>.once</li>
            <li>.passive</li>
          </ul>
          <div class="box_pre">
            <pre class="pre_comm">@click.prevent="showEvent"</pre>
          </div>
        </div>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">keycode</h3>
        <div class="content_exam">
          <ul>
            <li>.enter</li>
            <li>.tab</li>
            <li>.delete(“Delete” 와 “Backspace” 키 모두를 캡처합니다)</li>
            <li>.esc</li>
            <li>.space</li>
            <li>.up</li>
            <li>.down</li>
            <li>.left</li>
            <li>.right</li>
          </ul>
          <input @keyup.enter="keySubmit" class="inp_comm"> <span>키보드 엔터키 누르면 반응합니다.</span>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">mouse code</h3>
        <div class="content_exam">
         
          <ul>
            <li>.left</li>
            <li>.right</li>
            <li>.middle</li>
          </ul>
          <a href="javascript:;" class="btn_comm" @click.right="mouseSubmit">마우스 오른쪽 버튼</a> <span>마우스 오른쪽 버튼 누르면 반응합니다.</span>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">애니메이션 / transition</h3>
        <div class="content_exam">
          
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
      //cㅣick
      moneyNum : 0,
      cashNum : 0,
        
    }
  },
  computed:{
    
  },
  methods:{
    depositNum: function(e){
      const n = Number(this.moneyNum);
      this.cashNum += n
    },
    withdrawNum: function(e){
      const n = Number(this.moneyNum);
      this.cashNum -= n
    },
    keySubmit: function(){
      alert('안녕하세요')
    },
    mouseSubmit:function(){
      alert('술마셔요')
    }
  }
}
</script>

<style>

</style>
