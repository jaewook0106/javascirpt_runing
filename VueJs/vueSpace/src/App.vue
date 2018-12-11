<template>
  <div id="app" v-cloak>
    <div id="spaceWeb">
      <div class="wrap_logo">
        <h1 class="tit_logo">Space Travel By VueJs</h1>
      </div>
      <div class="wrap_head">  
        <NavListBar></NavListBar>
      </div>
      <div class="wrap_content">
        <router-view></router-view>
      </div>
    </div>
  
  </div>
</template>

<script>
import NavListBar from './components/NavListBar.vue';


export default {
  name: 'app',
  components:{
    NavListBar
  },
  data () {
    return {
    
    }
  }
}
</script>

<style lang="scss">
  
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,button{margin:0;padding:0}
  fieldset,img{border:0 none}
  dl,ul,ol,menu,li{list-style:none}
  blockquote,q{quotes:none}
  blockquote:before,blockquote:after{content:'';content:none}
  q:before,q:after{content:'';content:none}
  input,select,textarea,button{vertical-align:middle;font-size:100%}
  table{border-collapse:collapse;border-spacing:0}
  body{-webkit-text-size-adjust:none}
  input[type='button'],input[type='email'],input[type='password'],input[type='reset'],input[type='search'],input[type='submit'],input[type='tel'],input[type='text']{-webkit-appearance:none;border-radius:0}
  input[type='search']::-webkit-search-cancel-button,input[type='search']::-webkit-search-decoration{-webkit-appearance:none}
  input:checked[type='checkbox']{background-color:#666;-webkit-appearance:checkbox}
  button{border:0 none;border-radius:0;background:transparent;cursor:pointer;-webkit-appearance:button}
  button::-moz-focus-inner{border:0;padding:0}
  hr{display:none}
  html,body{background:#fff}
  a{color:#007aff;text-decoration:none}
  address,caption,cite,code,dfn,em,var{font-style:normal;font-weight:normal}
  body,th,td,input,select,textarea,button{font-size:14px;line-height:1.5;font-family:'Malgun Gothic','맑은 고딕',sans-serif;color:#000}
  main{display:block}.iphone{font-family:helvetica,AppleSDGothicNeo,sans-serif}
  .iphone b{font-family:AppleSDGothicNeo-Bold;font-weight:normal}
  .iphone th,.iphone td,.iphone input,.iphone select,.iphone textarea,.iphone button{font-family:helvetica,AppleSDGothicNeo,sans-serif}
  .android b{font-weight:bold}
  .firefox button,input{background-image:none}
  img[data-original-src]{background-color:#fff}
  .ir_pm{display:block;overflow:hidden;font-size:0;line-height:0;text-indent:-9999px}
  .ir_wa{display:block;overflow:hidden;position:relative;width:100%;height:100%;z-index:-1}
  .screen_out{display:block;overflow:hidden;position:absolute;left:-9999px;width:1px;height:1px;font-size:0;line-height:0;text-indent:-9999px}
  .screen_hide{height:0;font-size:0;line-height:0;visibility:hidden}

  [v-cloak]{
    display:none;
  }

  #spaceWeb{
    .wrap_logo{
      height:80px;
      background-color:#f4ec19;
      text-align:center;
      .tit_logo{
        padding-top:22px;
        font-size:24px;
        letter-spacing:-0.5px;
        color:#30281b;
      }
    }
    .wrap_head{
      background-color:#30281b;
    }
    .wrap_content{
      margin-bottom:50px
    }

    .wrap_top{
      padding-top:20px;
      // border-bottom:1px solid #888;
      // background-color:#f4ec19;
      text-align:center;
      
      .tit_item{
      font-size:18px;
      }
    }

    .wrap_cont{
      padding:0 20px;
    }

    .cont_info{
      margin-top:20px;
      padding:20px;
      border:1px solid #ddd;
      border-radius:10px;
      background-color:#eee;

      .tit_info{
        text-align:center;
        color:#333;
      }
      .content_exam{
        margin-top:10px;
      }
    }
    
    .btn_comm{
      display:inline-block;
      margin:10px;
      padding:10px 20px;
      border:1px solid #fff;
      border-radius:10px;
      background-color:#30281b;
      box-shadow:1px 2px 2px #aaa;
      color:#f4ec19;
      &:hover{
        background-color:#52452d;
      }
     
    }

    .tbl_info{
      width:100%;
      margin-top:10px;
      th,td{
        padding:10px;
        text-align: center;
      }
      th{
        background-color:#bbb;
      }
      td{
        border-bottom:1px solid #ddd;
      }
    }

    .inp_comm{
      padding:5px;
    }

    
  }

  
</style>
