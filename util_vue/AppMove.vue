<template>
  <div class="wrap_app">
    <h1 class="screen_out">앱 다운로드</h1>
    <h2 class="screen_out">앱 다운로드 바로가기</h2>

    <div class="info_app">
      <p class="txt_item">
        IOS 버전은 준비중입니다. 조금만 기다려주세요.
      </p>
      
      <div class="btn_box_g">
        <div class="btn_item">
          <button ref="appBtn" class="btn_g" @click="clickAppLoad">앱 다운로드</button>
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
        appLink: 'intent://tdl#Intent;scheme=jaewook;end',
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
