<template>
  <div>
    Board
    {{bid}}
    <div v-if="loading">
      loading board...
    </div>
    <div v-else>
      로딩 완료
      <router-link :to="`/b/${bid}/c/1`">Card1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card2</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>

const board = {
  data(){
    return{
      bid:0,
      loading:false
    }
  },
  created(){
    this.fetchData();
  },
  updated(){

  },
  methods : {
    fetchData(){
      this.loading = true;
      setTimeout(()=>{
        this.bid = this.$route.params.bid;
        this.loading = false;
      },500);
    }
  }
}

export default board

</script>

<style>

</style>
