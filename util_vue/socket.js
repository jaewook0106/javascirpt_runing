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

  stompClient.connect(
    {
      'X-token': `Bearer ${token}`
    },
    frame => {

      stompClient.subscribe(`subscribe/url`, result => {
        const resultData = JSON.parse(result.body);
        if(resultData) {
          "코드 넣기"
        }
      
      });
      
    },
    error => {
      // error callback
      console.log(error);
      // store.commit('soketTest')
    }
  );



}


export default createWebSocketPlugin;