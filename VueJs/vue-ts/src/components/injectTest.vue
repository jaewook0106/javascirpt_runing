<template>
    <div>
      <ul>
        <li v-for="user in users" v-bind:key="user.id">{{user.login}}</li>
      </ul>
    </div>
</template>

<script>
import { Component, Vue  } from "vue-property-decorator";
import {AxiosStatic} from 'axios'
import UserService, {User} from '@/service/UserService';
// import axios from 'axios'

// interface User {
//   id: number;
//   login: string;
// }

@Component

export default class injectTest extends Vue{
  users: User[] = [];
  // users = [];

  @Inject() userService!:userService;


  async created(){
    // const res = await axios.get('https://api.github.com/users');
    // console.log(res.data)
    // const res = await this.myHttp.get('https://api.github.com/users')
    // this.users = res.data;
    this.users = await this.userService.getUsers(); 
  }

}
</script>

<style>

</style>
