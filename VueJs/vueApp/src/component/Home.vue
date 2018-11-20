<template>
    <div class="">
        Home
        <div class="">
            Board List:
            <div v-if="loading">
                loading...
            </div>
            <div v-else>
                <!-- API result: {{ boards }} -->
                <div v-for="b in boardData" :key="b.id">
                  {{b}}
                </div>
            </div>
            

            <ul>
                <li>
                    <router-link to="/b/1">Board1</router-link>
                    <router-link to="/b/2">Board2</router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
import {board} from '../api'
export default {
  data() {
      return {
          loading: false,
          boardData: ''
      }
  },
  created() {
    this.fetchData()   
  },
  methods:{
    fetchData(){
      this.loading = true
      board.fetch()
      .then(data =>{
        this.boardData = data
      })
      .finally(_=>{
          this.loading =false
      }) 
      
                                                                                                                                                                                                                                                                                                                                                                                                                   
      // const req = new XMLHttpRequest()
      // req.open('GET','http://localhost:3000/health')
      // req.send()
      // req.addEventListener('load',()=>{
      //   this.loading = false
      //   this.apiRes = {
      //     status:req.status,
      //     statusText: req.statusText,
      //     response:JSON.parse(req.response)
      //   }
      // })
    }
  }
}
</script>

<style>
</style>