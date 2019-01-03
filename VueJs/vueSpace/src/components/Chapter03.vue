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
        <h3 class="tit_info">fade / transition</h3>
        <div class="content_exam">
          <a href="javascript:;" @click="fadeTrue = !fadeTrue" class="btn_comm">fade기능</a>
          <transition name="fade">
            <div v-if="fadeTrue">
              <div class="box_fade">transition 기능을 살펴보자</div>
            </div>
          </transition>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">애니메이션 / transition</h3>
        <div class="content_exam">
          <a href="javascript:;" @click="aniTrue = !aniTrue" class="btn_comm">animation기능</a>

          <transition name="ani">
            <div v-if="aniTrue">
              <div class="box_fade">animation 기능을 살펴보자</div>
            </div>
          </transition>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">class 제어</h3>
        <div class="content_exam">
          <a href="javascript:;" @click="classControl = !classControl" class="btn_comm" v-bind:class="{on:classControl}">클래스 on 추가해보자</a>
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
      fadeTrue :true,
      aniTrue:true,
      classControl:false
        
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

<style lang="scss">
    /* transition */

    .box_fade{
      display:inline-block;
      padding:10px;
      border:1px solid #333;
      background-color:#f4ec19;
    }

    .fade-enter-active, .fade-leave-active{
      transition:all 1s;
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
      margin-left:50px;
    }

    .ani-enter-active{
      animation:aniTest 1s;
    }
    .ani-leave-active{
      animation:aniTest 1s reverse;
    }

    @keyframes aniTest {
      0% {transform:scale(0)rotate(0)}
      50% {transform:scale(1.5)rotate(180deg)}
      100% {transform:scale(1)rotate(0)}
    }

</style>
