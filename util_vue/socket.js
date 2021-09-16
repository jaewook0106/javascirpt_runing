import SocketJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import router from '@/router';
import store from '@/store';
import SessionStorageService from './SessionStorageService';


const createWebSocketPlugin = () => {

  const socket = new SocketJS('https://jaewook/socket/connect');
  const stompClient = Stomp.over(socket);
  const token = SessionStorageService.getAccessToken();
  const getServiceId = SessionStorageService.getServiceId();
  const route = router.history.current;
  const partSeq = route.params.id;
  let pageName = '';
  let moduleName = '';

  // 페이지 분기
  if(route.path.indexOf('status') > -1) {
    pageName = 'dashboard'
  }

  //모듈 네임 분기
  if(route.name === 'DeviceStatus') {
    moduleName = 'info'
  }
  // console.log('partSeq', partSeq)
  // console.log('moduleName', moduleName)
  // console.log('pageName' , pageName)
  // console.log('service id', getServiceId)
  // console.log('token', token)
  // console.log('router',route)


  stompClient.connect(
    {
      'X-token': `Bearer ${token}`
    },
    frame => {
      // /{모듈타입}/{페이지별_유니크네임}/{서비스_시퀀스}/{파트_시퀀스}/{액션(수정, 삭제, 추가)}
      if(route.name === 'DeviceStatus') {
        stompClient.subscribe(`/${moduleName}/${pageName}/${getServiceId}/${partSeq}/update`, result => {
          // 인포 모듈체크
          const resultData = JSON.parse(result.body);
          if(resultData) {
            store.dispatch('info/updateSocketBoardDeviceList', resultData);
          }
        
        });
        stompClient.subscribe(`/${moduleName}/${pageName}/${getServiceId}/${partSeq}/add`, result => {
          // 인포 모듈체크
          const resultData = JSON.parse(result.body);
          if(resultData) {
            store.dispatch('info/getDeviceCount', {partSeq});
            store.dispatch('info/addSocketBoardDeviceList', resultData);
          }

        });
        stompClient.subscribe(`/${moduleName}/${pageName}/${getServiceId}/${partSeq}/delete`, result => {
          // 인포 모듈체크
          const resultData = JSON.parse(result.body);
          if(resultData) {
            store.dispatch('info/getDeviceCount', {partSeq});
            store.dispatch('info/deleteSocketBoardDeviceList', resultData);
          }

        });
      }
      
    },
    error => {
      // error callback
      console.log(error);
      // store.commit('soketTest/socketOnDisconnect')
    }
  );



}


export default createWebSocketPlugin;