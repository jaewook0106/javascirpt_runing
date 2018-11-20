import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Planet from '../components/Planet'
import Earth from '../components/Earth'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes: [
    {path:'/', component: Home},
    {path:'/planet', component: Planet, children:[
      {path:'/planet/earth',component:Earth}
    ]},
    {path:'*', component: NotFound}
  ],
  linkExactActiveClass:'active'
})

export default router