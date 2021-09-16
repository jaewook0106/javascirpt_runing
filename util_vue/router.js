import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '../views/auth/Login';
import LoginFail from '../views/auth/LoginFail';
import ServiceFail from '../views/auth/ServiceFail';
import NotFound from '../views/errors/NotFound';

import SessionStorageService from '../plugins/SessionStorageService';


const sessionStorageService = SessionStorageService.getService();

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login-fail/:code',
    name: 'LoginFail',
    component: LoginFail,
    props: true
  },
  {
    path: '/service-fail/:code',
    name: 'ServiceFail',
    component: ServiceFail,
    props: true
  },
  {
    path:'/service',
    name: 'main',
    component: Container,
    beforeEnter: (to, from, next) => {
      next();
    },
    redirect: { name: 'Home' },
    meta: {
      serviceIdRequired: true
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: {
          height:true,
        },
      }
    ]
  },
]


const router = new VueRouter({
  routes,
  mode: 'history',
  linkExactActiveClass:'_on',
  linkActiveClass:'_on'
})

router.beforeEach((to, from, next)=>{

  // 로그인 처리
  const {code, accessToken, randomKey} = to.query;

  // 토큰 저장
  if (accessToken) {
    sessionStorageService.setToken({access_token: accessToken});
  }

  // randomKey저장
  if (randomKey) {
    sessionStorageService.setRandomKey(randomKey);
  }


  if (code === '200') {
    // index.onopen = function()  {console.log('[*] open', index.protocol);};
    next( {name: 'Home', params: {serviceId}});
    return;
  }

  
  const resultCode = [
    '3030', '3040',
  ];
 
  if (resultCode.indexOf(code) > -1 && from.name !== 'ServiceFail') {
    next({name: 'ServiceFail', params: {code}});
    return;
  }

  // redirect가 있을 시 페이지 redirect
  const redirectPath = sessionStorageService.getRedirect();
  if(redirectPath) {
    sessionStorageService.clearRedirect();
    next(redirectPath);
    return;
  }

  next();
})

export default router
