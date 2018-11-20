import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../component/Home'
import Login from '../component/Login'
import Board from '../component/Board'
import Card from '../component/Card'
import NotFound from '../component/NotFound'

Vue.use(VueRouter)

const requireAuth = (to, from, next) =>{
  
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  console.log('token',isAuth);
  console.log(next());
  isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  mode:'history',

  routes: [
    {path:'/', component: Home, beforeEnter:requireAuth},
    {path:'/login', component: Login},
    {path:'/b/:bid', component: Board, beforeEnter:requireAuth, children:[
        {path:'c/:cid',component: Card, beforeEnter:requireAuth}
    ]},
    {path:'*', component: NotFound}
  ]
})

export default router