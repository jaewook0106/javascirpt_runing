<template>
  <div>
    <div class="wrap_top">
      <h2 class="tit_item">computed(계산형 속성), methods, watch(관찰형 속성)</h2>
      <p>computed는 캐싱이 되지만, methods는 캐싱이 되질 않는다</p>
    </div>
    <div class="wrap_cont">
      <div class="cont_info">
        <h3 class="tit_info">computed(선언형 프로그램방식)</h3>
        <div class="content_exam">
          <div>
            <input type="text" v-model="countryName" placeholder="국가명" class="inp_comm">
          </div>
          <table class="tbl_info">
            <caption class="screen_out">국가표</caption>
            <colgroup>
              <col width="40%">
              <col width="30%">
              <col width="30%">
            </colgroup>
            <thead>
              <tr>
                <th>국가명</th>
                <th>도시</th>
                <th>랭킹</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filterCountry" :key="item.name">
                <td>{{item.name}}</td>
                <td>{{item.city}}</td>
                <td>{{item.ranking}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="cont_info">
        <h3 class="tit_info">computed (sort)</h3>
        <div class="content_exam">
          <table class="tbl_info">
            <caption class="screen_out">국가표</caption>
            <colgroup>
              <col width="40%">
              <col width="30%">
              <col width="30%">
            </colgroup>
            <thead>
              <tr>
                <th>국가명</th>
                <th>도시</th>
                <th>랭킹</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in sortCountry" :key="item.name">
                <td>{{item.name}}</td>
                <td>{{item.city}}</td>
                <td>{{item.ranking}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">computed(get set)</h3>
        <div class="content_exam">
          <a href="javascript:;" @click="setGet" class="btn_comm">set get button 눌러보세요</a>
          <p>버튼을 눌렀을때 데이터값을 '2,000,000' 으로 변경하여 set을 나타내는 로직이다.</p>
          <div>payData.money 데이터값 : {{payData.money}}</div>
          <div>payData.setMoney 기존 데이터값 : {{payData.setMoney}}</div>
          <div>get : {{payReult}}</div>
          <div>set : {{payData.setMoney}}</div>
        </div>
      </div>


      <div class="cont_info">
        <h3 class="tit_info">methods<br>(arrow function 금지 this가 전역으로 바뀌기 때문이다)</h3>
        <div class="content_exam">
          <input type="text" class="inp_comm" placeholder="숫자만 입력하세요" v-model="addNum">
          <div>모든 수 더한 값은 : {{sumNum()}}</div>
        </div>
      </div>

      <div class="cont_info">
        <h3 class="tit_info">watch</h3>
        <div class="content_exam">
          <p>_.debounce 써야될뜻...</p>
          <a href="javascript:;" @click="axiosDataConfirm" class="btn_comm">axios 데이터 통신 확인 링크 console 창에서 확인 가능</a>
          <input type="text" class="inp_comm inp_contact" v-model="contactName" placeholder="두글자만 영어로 입력 해주세요">
          <div v-if="isProcessing">조회중 입니다.</div>
          <div v-if="isNone">데이터가 없습니다. 다시 검색해주세요</div>
          <ul class="list_comm">
            <li v-for="item in contactInfo" :key="item.name">
              <div class="wrap_thumb">
                <img :src="item.photo" alt="사진" class="img_thumb">
              </div>
              <div class="wrap_info">
                <span class="txt_address">{{item.address}}</span>
                <span class="txt_name">{{item.name}}</span>
                <span class="txt_tel">{{item.tel}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {contactData} from '../api';

const countryData = [
  {
    name:'미국',
    city:'뉴욕',
    ranking:1
  },
  {
    name:'한국',
    city:'서울',
    ranking:7
  },
  {
    name:'일본',
    city:'오사카',
    ranking:10
  },
  {
    name:'이탈리아',
    city:'로마',
    ranking:8
  },
  {
    name:'스웨덴',
    city:'스톡홀름',
    ranking:2
  },
  {
    name:'미얀마',
    city:'음',
    ranking:11
  },
  {
    name:'스위스',
    city:'인터라켄',
    ranking:5
  }
];

const payData = {
  money : 1000000,
  setMoney: 0
}


export default {

  data(){
    return{
      countryName:'',
      countryData:countryData,

      //get , set data
      payData:payData,

      //methods data
      addNum : 0,

      //watch
      isProcessing:false,
      isNone:false,
      contactName: '',
      contactInfo: []
    }
  },
  computed:{
    filterCountry : function(){
      const countryName = this.countryName.trim();
      return this.countryData.filter(function(item,idx){
        if(item.name.indexOf(countryName) > -1){
          return true;
        }
      });
    },
    sortCountry : function(){
      return this.countryData.sort(function(a,b){
        return a.ranking - b.ranking;
      });
    },

    payReult:{
      get: function(){
        const payString = '' + this.payData.money;
        const payLength = payString.length - 1;
        let result = '';
        let num = 0;
        for(let i = payLength; i >= 0; i-=1){
          result = payString[i] + result;
          if(num % 3 === 2 && i !== 0){
            result = ','+result;
          }
          num+=1
        }
        return result
      },
      set: function(pay){
        if(typeof(pay) === 'string'){
          let result = parseInt(pay.replace(/,/g,''))       
          isNaN(result) ? this.payData.setMoney = 0 : this.payData.setMoney = result;
        }else if(typeof(pay) === 'number'){
          this.payData.setMoney = pay
        }
      }
    }
  },
  watch:{
    contactName: function(val){
      // console.log(val)
      if(val.length >= 2){
        this.fetchContact()
      }else{
         this.contactInfo = []
      }
    }
  },
  methods:{
    setGet(){
      this.payReult = '2,000,000'
    },

    sumNum(){
      const inpNum = Number(this.addNum);
      if(isNaN(inpNum) || inpNum < 1){
        return 0
      }
      return ((1+inpNum)*inpNum / 2);
      // (isNaN(inpNum) || inpNum < 1) ? 0 : ((1+inpNum)*inpNum / 2)
    },
    axiosDataConfirm(){
      console.log(this.contactInfo)
    },
    fetchContact(){
      this.isProcessing = true
      this.isNone = false
      contactData.contact(this.contactName)
      .then(response =>{
        this.contactInfo = response.data
        // console.log(this.contactInfo)
        this.isProcessing = false

        if(this.contactInfo.length === 0){
          this.isNone = true
        }
        
        return this.contactInfo
      }).catch(ex =>{
        console.log('err')
        this.isProcessing = false
        this.contactInfo = []
      })
    }


  }
}
</script>

<style lang="scss" scoped>

</style>
