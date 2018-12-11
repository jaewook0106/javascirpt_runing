<template>
  <div>
    <div class="wrap_top">
      <h2 class="tit_item">디렉티브</h2>
    </div>
    <div class="wrap_cont">
      <div class="cont_info">
        <h3 class="tit_info">v-text,v-html</h3>
        <div class="content_exam">
          <div>{{textMessage2}}</div>
          <p v-text="textMessage"></p>
          <div v-html="htmlMessage">
          </div>
        </div>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">v-bind</h3>
        <div class="content_exam">
          <input type="text" v-bind:placeholder="bindMessage" class="inp_comm">
          <img src="" :alt="bindMessage2">
        </div>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">v-model</h3>
        <div class="content_exam">
          <div>
            <input type="text" v-model="name" class="inp_comm">
            <div>{{name}}</div>
          </div>
          <div>
            <div>너가 좋아하는 과일은 뭐니?</div>
            <input type="checkbox" value="수박" v-model="fruit"> 수박, 
            <input type="checkbox" value="귤" v-model="fruit"> 귤, 
            <input type="checkbox" value="복숭아" v-model="fruit"> 복숭아, 
            <input type="checkbox" value="바나나" v-model="fruit"> 바나나, 
            <input type="checkbox" value="딸기" v-model="fruit"> 딸기
            <div>{{fruit}}</div>
          </div>
         
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">v-show(display 제어)</h3>
        <div class="content_exam">
          <a href="javascript:;" v-on:click="toggleShow" class="btn_comm">이거눌러 봐라</a>
          <div v-show="showBoolean" style="display:block">
            내용이 보입니까??  v-show 는 랜더링 된 후 display 속성으로 제어한다
          </div>
        </div>
      </div>


      <div class="cont_info">
        <h3 class="tit_info">v-if, v-else, v-else-if</h3>
        <div class="content_exam">
          <div>
            <div v-if="ifNum === 0">
              if문 완료 나와라
            </div>
            <div v-else-if="ifNum < 5">
              elseif문 나와라
            </div>
            <div v-else>
              else문 나와라
            </div>
          </div>
          <div style="margin-top:10px">
            <div>두번째 예시</div>
            <div>
              <input type="text" v-model="ifValue" class="inp_comm">
              <span v-if="ifValue >= 100">if</span>
              <span v-else-if="ifValue >= 50">elseif</span>
              <span v-else>else</span>
            </div>
            <div>
              <span>숫자 입력 값이 <strong>(100보다 크면 if)</strong> 가 될것이고 <strong>(50과 1000 사이면 elseif)</strong> <strong>(50보다 작으면 else)</strong> 가 될것이다</span><br>
            </div>
          </div>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">v-for</h3>
        <div class="content_exam">
          <span>배열로 할경우</span>
          <ul>
            <li v-for="(item,idx) in examData" :key="item.name">
              <span>{{idx+1}}. 이름은 {{item.name}}</span><br>
              <span>나이는 {{item.age}}</span><br>
            </li>
          </ul>
          <span style="display:block;margin-top:10px">객체로 할경우</span>
          <ul>
            <li v-for="(value,key,idx) in examObjData" :key="value">
              <span>{{idx+1}}. {{key}} : {{value}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">v-once, v-pre, v-cloak</h3>
        <div class="content_exam">
          <div>
            <span v-once>v-once : html 요소를 단 한번만 랜더링 하도록 설정</span>
          </div>
          <div>
             v-pre : 컴파일에 영향받지 안고 그대로 보여준다 <span v-pre>{{textMessage}}</span>
          </div>
          <div v-cloak>
            v-cloak : 화면 초기에 컴파일이 되지 않은 템플릿은 나타나지않도록 하는 것
          </div>
        </div>
      </div>



    </div>
    
  </div>
</template>

<script>

const doc = document;

const arrData = [
  {
    name:'edward',
    age:26
  },
  {
    name:'merlin',
    age:25
  },
  {
    name:'brad',
    age:21
  },
  {
    name:'shawn',
    age:25
  }
]

const obgData ={
  A:'apple',
  B:'banana',
  C:'caramel',
  D:'donut'
}



export default {
  
  beforeCreate() {
    
  },
  mounted(){
    
  },
  data () {
    return {
      //v-text,v-html
      textMessage:'안녕하세요 vueJs입니다',
      textMessage2:'v-text 는 {{}} 로 써도된다',
      htmlMessage:'<div>소주 마시자 v-html은 태그 자체를 넣을수 있습니다 (즉 innerHTML 가 비슷합)</div>',

      //v-bind
      bindMessage:'너네 이름 써봐라',
      bindMessage2:'v-bind는 : 이렇게 줄여도된다',

      //v-model
      name:'',
      fruit:[],

      //v-show
      showBoolean:true,

      //v-if, v-else, v-else-if
      ifNum:0,
      ifValue:0,

      //v-for
      examData:arrData,
      examObjData:obgData 

    }
  },
  computed :{
    test: function(){
      
    }
  },
  methods: {
    toggleShow(){
      this.showBoolean === true ? this.showBoolean = false : this.showBoolean = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
