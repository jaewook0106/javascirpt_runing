import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
s

import MasterHelp from '../views/master/MasterHelp'
import Login from '../views/auth/Login';
import LoginFail from '../views/auth/LoginFail';
import ServiceFail from '../views/auth/ServiceFail';
import NotFound from '../views/errors/NotFound';
import SuspensionUse from '../views/auth/SuspensionUse';
import RegisterReject from '../views/auth/RegisterReject';
import Outstanding from '../views/auth/Outstanding';
import {verifyModule} from '../utils/util';

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
    path: '/register-reject/',
    name: 'RegisterReject',
    component: RegisterReject,
  },
  {
    path: '/supension-use/',
    name: 'SuspensionUse',
    component: SuspensionUse,
  },
  {
    path: '/outstanding/',
    name: 'Outstanding',
    component: Outstanding
  },
  {
    path:'/service/:serviceId',
    name: 'main',
    component: Container,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('member/getMyInfo', null);
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
        component: Search
      },
      {
        path: 'part/:id',
        name: 'Part',
        component: Part,
        props: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('part/partStatusCheck', to.params.id);
          next();
        },
        redirect:{ name: 'StatusView' },
        children:[
          
          {
            path: 'member',
            name: 'Member',
            component: Member,
          },
          {
            path: 'setting',
            name: 'SettingView',
            component: SettingView,
            redirect:{ name: 'AlarmSetting' },
            children: [
              {
                path: 'alarm',
                name: 'AlarmSetting',
                component: AlarmSetting,
                meta: {
                  fixedHeight:true,
                },
              },
              {
                path: 'info',
                name: 'DeviceSetting',
                component: DeviceSetting,
                meta: {
                  fixedHeight:true,
                },
              },
              {
                path: 'doc',
                name: 'DocumentSetting',
                component: DocumentSetting,
                meta: {
                  fixedHeight:true,
                },
              },
              {
                path: 'delivery',
                name: 'DeliverySetting',
                component: DeliverySetting,
                meta: {
                  fixedHeight:true,
                },
              },
              
            ]
          },

        ]

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
  const isNavPartActive = to.path.indexOf('master') === -1 && to.path.indexOf('part') > -1;
  store.dispatch('layout/setIsPartSelect', isNavPartActive);
  store.dispatch('layout/heightFixed', to);

  // 쿼리스트링 처리 및 serviceId파라미터 처리
  // 로그인 처리
  const {code, accessToken, appUserId, serviceId, randomKey} = to.query;
  // console.log('to', to)
  // 사용자 ID저장
  if (appUserId) {
    sessionStorageService.setUserId(appUserId);
  }
  // 토큰 저장
  if (accessToken) {
    sessionStorageService.setToken({access_token: accessToken});
  }
  // 서비스 ID저장
  if (serviceId) {
    sessionStorageService.setServiceId(serviceId);
    // 루트 페이지에서 serviceId파라미터가 있을 시 home으로 리다이렉트
    // return;
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
    '3030', '3040', '3080', '3130',
    '3150', '3160',
  ];
 
  if (resultCode.indexOf(code) > -1 && from.name !== 'ServiceFail') {
    next({name: 'ServiceFail', params: {code}});
    return;
  }
  
  if (code === '3110' && from.name !== 'SuspensionUse'){
    next({name:'SuspensionUse'});
    return;
  }
  
  if (code === '3170' && from.name !== 'RegisterReject'){
    next({name:'RegisterReject'});
    return;
  }
 
  if (code === '5000' && from.name !== 'LoginFail'){
    next({name:'LoginFail', params: {code}});
    return;
  }

  if(code === '3070') {
    next( {name: 'Outstanding'});
    return;
  }

  // // 루트 페이지에서 storage에 serviceID가 이미 있는 경우 홈으로 이동
  // const storageServiceId = sessionStorageService.getServiceId();
  // if(storageServiceId !== undefined && to.path === '/notfound') {
  //   next(`/${storageServiceId}/home`);
  //   return;
  // }

  // 루트 페이지에서 service_id없을 시 로그인으로 리다이렉트
  // if(!paramServiceId && to.path !== '/login') {
  //   alert('serviceId 없음!');
  //   next('/login');
  //   return;
  // }

  // redirect가 있을 시 페이지 redirect
  const redirectPath = sessionStorageService.getRedirect();
  if(redirectPath) {
    sessionStorageService.clearRedirect();
    next(redirectPath);
    return;
  }

  // 서비스 ID가 필요한 페이지 처리
  const isServiceIdRequired = to.matched.some(item => {
    return item.meta.serviceIdRequired;
  });
  const {serviceId : paramServiceId} = to.params;

  // 서비스 ID가 없을 시 로그인으로 리다이렉트
  if(isServiceIdRequired) {
    if(paramServiceId) {
      sessionStorageService.setServiceId(paramServiceId);
      next();
      return;
    } else {
      alert('serviceId 없음!')
      next('/login');
      return;
    }
  }

  next();
})

export default router
