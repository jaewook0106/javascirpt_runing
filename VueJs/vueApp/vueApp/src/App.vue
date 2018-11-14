<template>
  <div id="app">
    <Navbar class="test"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './component/Navbar.vue';

const app = {
name: 'app',
  components:{
    Navbar
  },
  data () {
    return {
     
    }
  }
}

export default app
</script>

<style scoped>
  .test{background-color:#eee}
</style>
