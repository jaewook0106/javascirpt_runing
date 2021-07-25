<template>
  <div class="wrap_tfac wrap_app">
    <h1 class="screen_out">T-Fac</h1>
    <h2 class="screen_out">앱 다운로드 바로가기</h2>

    <!-- <a href="intent://tfac?name=kailyn#Intent;
    scheme=tdl;action=android.intent.action.VIEW;
    category=android.intent.category.BROWSABLE;
    package=com.dktechin.tfac.delivery
    ;end"></a> -->

    <div class="info_tfac">
      <div class="img_cont img_app">
        <img src="https://t1.kakaocdn.net/smartfactory/images/mo/app_logo.png" alt="" class="img_item">
      </div>
      <em class="txt_tfac">DKT APP 다운로드 받고,<br>콜드 체인 서비스를 이용해주세요!</em>
      <p class="txt_item">
        IOS 버전은 준비중입니다. 조금만 기다려주세요.
      </p>
      
      <div class="btn_box_g">
        <div class="btn_item">
          <button ref="appBtn" class="btn_g type_main btn_g1" @click="clickAppLoad">앱 다운로드</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    
    name: "AppDownload",
    data() {
      return {
        appLink: 'intent://tdl#Intent;scheme=tfac;end',
        marketLink: 'market://details?id='
      }
    },
    created() {
      this.getUserAgent();
    },
    mounted() {

      if(this.userAgent.mobile === 'android') {
        this.clickAppLoad();
      }
      
    },
    computed: {
      ...mapGetters('layout', ['userAgent'])
    },
    methods: {
      ...mapActions('layout', ['getUserAgent']),
      clickAppLoad() {
        if(this.userAgent.mobile === 'android') {
          this.appIntervalCheck();
        }
        if(this.userAgent.mobile === 'ios') {
          location.href = process.env.VUE_APP_INTRO_URL;
        }
      },
      appIntervalCheck() {
        window.location.href = this.appLink;
        
        const appCheckInterval = setInterval(()=> {
          // 앱이 있을경우
           if( document.webkitHidden || document.hidden ) {
            clearTimeout(appCheckInterval);
            clearInterval(noAppCheckTimeOut);
          }
        }, 200);

        const noAppCheckTimeOut = setTimeout(() => {
          // 앱이 없을 경우
          clearTimeout(appCheckInterval);
          clearInterval(noAppCheckTimeOut);
          window.location.href = this.marketLink;
        }, 1000);
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
