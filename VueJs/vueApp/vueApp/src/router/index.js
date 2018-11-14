import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../component/Home'
import Login from '../component/Login'
import Board from '../component/Board'
import Card from '../component/Card'
import NotFound from '../component/NotFound'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes: [
    {path:'/', component: Home},
    {path:'/login', component: Login},
    {path:'/b/:bid', component: Board, children:[
        {path:'c/:cid',component: Card}
    ]},
    {path:'*', component: NotFound}
  ]
})

export default router