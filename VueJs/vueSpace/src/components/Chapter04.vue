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
        <div class="inp_cont">
          <input type="text" class="inp_comm" placeholder="숫자입력" v-model="countNum">
        </div>
        <div>{{count}}</div>
        <div>
          <button type="button" class="btn_comm" @click="increment(countNum)">+</button>
          <button type="button" class="btn_comm" @click="decrement(countNum)">-</button>
          <button type="button" class="btn_comm" @click="reset">reset</button>
        </div>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">slot</h3>
        <div>
          <slotName>
            <div slot="slider">
              <ul class="list_name">
                <li>사과</li>
                <li>바나나</li>
                <li>복숭아</li>
                <li>멜론</li>
              </ul>
            </div>
          </slotName>

          <slotName>
            <div slot="slider">
              <ul class="list_space">
                <li>오노</li>
                <li>아놔</li>
                <li>술</li>
                <li>쉬자</li>
              </ul>
            </div>dlftk
          </slotName>

          <slotName>
            <div slot="header">
              <h2>asdasdasd</h2>
            </div>
          </slotName>

          <slotName>
            <div slot="header">
              <h3>asdasdasd</h3>
            </div>
           
          </slotName>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">d3</h3>
        
        <div class="wrap_svg">
          
        </div>  
      </div>
      
    </div>
  </div>
</template>

<script>
import slotName from './slotset/slotName.vue'
import {mapState} from 'vuex'
import { mapGetters } from 'vuex'
import {mapMutations} from 'vuex'

import * as d3 from 'd3'


export default {
  data() {
    return {
      countNum:'',
      dataTest : {
        "name": "Clifford Shanks",
        "born": 1862,
        "died": 1906,
        "location": "Petersburg, VA",
        "parents": [
          {
            "name": "James Shanks",
            "born": 1831,
            "died": 1884,
            "location": "Petersburg, VA",
            "parents": [
              {
                "name": "Robert Shanks",
                "born": 1781,
                "died": 1871,
                "location": "Ireland/Petersburg, VA"
              },
              {
                "name": "Elizabeth Shanks",
                "born": 1795,
                "died": 1871,
                "location": "Ireland/Petersburg, VA"
              }
            ]
          },
          {
            "name": "Ann Emily Brown",
            "born": 1826,
            "died": 1866,
            "location": "Brunswick/Petersburg, VA",
            "parents": [
              {
                "name": "Henry Brown",
                "born": 1792,
                "died": 1845,
                "location": "Montgomery, NC"
              },
              {
                "name": "Sarah Houchins",
                "born": 1793,
                "died": 1882,
                "location": "Montgomery, NC"
              }
            ]
          }
        ]
      }
      


      
    }
  },
  components:{
    slotName
  },
  created() {
    console.log('ss',this.$store.state)

    console.log('test',d3)

    
    
  },
  computed: {
    ...mapState([
      'onAuto','musicList','count'
    ]),
    ...mapGetters([
      
    ])
   

  },
  methods: {
    ...mapMutations([
      'toggleAuto','increment','decrement','reset'
    ]),
   
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

  beforeCreate(){
    console.log('beforeCreate')
  },
  // created(){
  //   console.log('created')
  // },
  beforeMount(){
    console.log('beforeMount')
  },
  mounted(){
    console.log('mounted')
    console.log('route', this.$route.path)
  },
  beforeUpdate(){
    console.log('beforeUpdate')
  },
  updated(){
    console.log('updated')
  },
  beforeDestroy(){
    console.log('beforeDestroy')
  },
  destroyed(){
    console.log('destroyed')
  }
}

</script>

<style lang="scss" scoped>
 
</style>
