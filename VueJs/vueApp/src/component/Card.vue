<template>
  <div>
    card
    {{cid}}
    <div v-if="loading">
      loading card
    </div>
    <div v-else>
      카드로딩완료
    </div>

  </div>
</template>

<script>

const data = [0,1];

const card = {
  data(){
    return{
      cid:0,
      loading:false
    }
  },
  watch:{
    '$route':{
      // this.cid = this.$route.params.cid;
      handler:'fetchData',
      immediate:true
    }
  },
  created(){
    this.cid = this.$route.params.cid;
  },
  methods : {
    fetchData(){
      this.loading = true;
      setTimeout(()=>{
        this.cid = this.$route.params.cid;
        this.loading = false;
      },500);
        
    },
    test(){
      console.log('test');
    }
  }
}

export default card
</script>

<style>

</style>
