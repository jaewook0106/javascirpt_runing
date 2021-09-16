import axios from 'axios';
import Vue from 'vue';
import SessionStorageService from "../plugins/SessionStorageService";
import router from '@/router'
import _ from 'lodash'

// 에러 alert 처리용 debounce
const debounceGenerator = (function () {
  const debouncePool = {};

  function init(name) {
    debouncePool[name] = _.debounce((fn) => {
      fn();
    }, 100);
    return debouncePool[name];
  }

  return {
    getInstance(name) {
      if(!debouncePool[name]) {
        return init(name);
      } else {
        return debouncePool[name];
      }
    }
  }
})();

// const debounce = _.debounce((fn) => {
//   fn()
// }, 100)

/* loader  */
let loader = null;
const apiCallList = [];

function addApiCall(url) {

  apiCallList.push(url);

  if (loader === null) {
    loader = Vue.$loading.show({
      // Optional parameters
      container: null,
      canCancel: false,
      loader: 'spinner', // spinner or dots or bars
      backgroundColor: 'transparent',
      width: 60,
      height: 60,
      color:'#fff'
    });
  } else {
    // loader.show();
  }
}

function removeApiCall(url, force = false) {
  if(!force) {
    const idx = apiCallList.indexOf(url)
    apiCallList.splice(idx, 1);
  } else {
    apiCallList.pop();
  }
  if(apiCallList.length === 0) {
    loader.hide();
    loader = null;
  }
}

const sessionStorageService = SessionStorageService.getService();

let config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  // withCredentials: true,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
}

const {VUE_APP_ENV_TYPE} = process.env;

const instance = axios.create(config);

instance.interceptors.request.use((config) => {
  // 토큰을 헤더에 추가
  let token = sessionStorageService.getAccessToken();

  config.baseURL = process.env.VUE_APP_BASE_URL;

  if (config.url.indexOf('/delivery') !== -1 && VUE_APP_ENV_TYPE === 'backend') {
    config.baseURL = process.env.VUE_APP_BASE_URL_DELIVERY;
  }

  axios.create(config);

  if (token && config.url.indexOf('kakao-login-url') === -1) {
    config.headers['Authorization'] = `Bearer ${token}`;
    // config.headers['Authorization'] = `${token}`;
  }
  
  const serviceId = sessionStorageService.getServiceId();
  if (serviceId) {
    config.headers[''] = serviceId;
  }
  // 로더에 request url추가
  if(config.method === 'get') {
    if (config.params) {
      config.params.timestamp = new Date().getTime();
    } else {
      config.url = `${config.url}?timestamp=${new Date().getTime()}`;
    }
  }
  /* 로딩바 구현 제거 api */
  // const masterSearchUrl = '/v1/members/check-name';
  // if(config.url.indexOf(masterSearchUrl) > -1) {
  //   return config;
  // }

  // if(config.params) {
  //   const setUrl = `/v1/parts/${config.params.partSeq}/members`;

  //   if(config.url.indexOf(setUrl) > -1) {
  //     return config;
  //   }
  // }
  /* 로딩바 구현 제거 api 끝 */

  addApiCall(config.url);
  return config;

}, (error) => {
  return false;
});



instance.interceptors.response.use((response) => {

  /* 로딩바 구현 제거 api */
  // const masterSearchUrl = '/v1/members/check-name';
  // if(response.config.url.indexOf(masterSearchUrl) > -1) {
  //   return response;
  // }

  // if(response.config.params) {
  //   const setUrl = `/v1/parts/${response.config.params.partSeq}/members`;
  //   if(response.config.url.indexOf(setUrl) > -1) {
  //     return response;
  //   }
  // }
  /* 로딩바 구현 제거 api 끝 */

  removeApiCall(response.config.url);
  return response;
}, (error) => {

  if (!error.status && !error.response) {
    // network error
    const debounce = debounceGenerator.getInstance('network_error');
    debounce(()=>{
      alert('network error');
    });
    removeApiCall(null, true);
  } else if(error.code === 'ECONNABORTED') {
    alert('응답시간을 초과 하였습니다.');
    removeApiCall(error.config.url);
  } else {
    removeApiCall(error.response.config.url);

    // responseType이 array buffer일 때 arraybuffer데이터를 json으로 파싱
    if (
      error.request.responseType === 'arraybuffer' &&
      error.response.data.toString() === '[object ArrayBuffer]'
    ) {
      // arraybuffer to json
      error.response.data = JSON.parse(Buffer.from(error.response.data).toString('utf8'));
    }

    if (error.response.status === 204) {
      const debounce = debounceGenerator.getInstance('204');
      debounce(()=>{
        alert(error.response.data.message);
      });
    }
    // 인증 만료 (권한 없음)
    if (error.response.status === 401) {
      // 인증 만료 시 로그인 페이지로
      sessionStorageService.clearToken();
      sessionStorageService.clearServiceId();
      const {pathname, search} = window.location;
      router.push({path:'login', query: { redirect: pathname + search }}, ()  =>  {})
      return false;
    }

    if (error.response.status === 403) {
      // Forbidden
      const debounce = debounceGenerator.getInstance('403');
      debounce(()=>{
        alert(error.response.data.message);
        router.push({name: 'Home'}, ()  =>  {})
      });

    }

    if (error.response.status === 404) {
      // Not Found
      const debounce = debounceGenerator.getInstance('404');
      debounce(()=>{
        const {pathname, search} = window.location;
        router.push({path:'login', query: { redirect: pathname + search }}, ()  =>  {})
      })
    }

    if (error.response.status === 500) {

      const debounce = debounceGenerator.getInstance('500');
      const {code, message} = error.response.data;

      // 5100 - 파트생성개수 초과
      const exceptionCode = ['5000', '5020', '5100','5200','5210', '5270'];
      if(exceptionCode.every(item => String(code) !== item)){
        debounce(()=>{
          alert('error message : ' + error.response.data.message);
        });
      }

      // 일반 alert처리
      const alertCode = ['5270'];
      if(alertCode.some(item=>String(code) === item)){
        debounce(()=> {
          alert(error.response.data.message);
        });
      }

      // 5000, 5100 > 에러 메시지 토스트로 띄우기
      const toastCode = ['5000','5100', '5020'];
      if(toastCode.some(item=>String(code) === item)){
        debounce(()=> {
          Vue.toasted.show(message);
        });
      }

    }
  }
  return Promise.reject(error);
});


export default instance;
