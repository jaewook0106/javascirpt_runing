import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
  routes: [
    {path:'/', component: Home},
    {path:'*', component: NotFound}
  ],
  linkExactActiveClass:'active'
})

export default router