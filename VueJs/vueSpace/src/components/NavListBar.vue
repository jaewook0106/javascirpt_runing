<template>
  <div class="wrap_nav">
    <ul class="list_nav">
      <li>
        <router-link to="/Home">Home</router-link>
      </li>
      <li v-for="(item) in NavData" :key="item.navName">
        <router-link :to="`${item.linkName}`">{{item.navName}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {NavData} from '../util/data.js'

// const NavData = ['vue','aaa'];
export default {
  data () {
    return {
      NavData:NavData
    }
  }
}



</script>

<style lang="scss" scoped>

  .wrap_nav{
    overflow:hidden;
    padding:30px;
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
        color:#f4ec19;
      }
    }
  } 
</style>
