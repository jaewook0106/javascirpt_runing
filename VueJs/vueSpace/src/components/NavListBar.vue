<template>
  <div class="wrap_nav">
    <ul class="list_nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
const NavData = ['vue'];
export default {
  data () {
    return {
   
    }
  }
}

</script>

<style lang="scss" scoped>

  .wrap_nav{
    overflow:hidden;
    padding:40px 0 0 30px;
  }
  .list_nav{
    li{
      float:left;
      margin-left:10px;
      :first-child{
        margin-left:0;
      }
      a{
        display:block;
        font-size:15px;
        color:#eee;
      }
      .active{
        color:yellow;
      }
    }
  } 
</style>
