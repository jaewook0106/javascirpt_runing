GET_USER_AGENT(state) {
  const userCheck = navigator.userAgent.toLowerCase();
  const appNameCheck = navigator.appName;
  // const regIE = new RegExp('msie ([0-9]{1,}[\.0-9]{0,})')
  state.userAgent.pc = userCheck.indexOf('macintosh') > -1 ? 'mac' : 'win'
  if( userCheck.indexOf('chrome') > -1 && userCheck.indexOf('safari') > -1) {
    state.userAgent.browser = 'chrome';
    if(userCheck.indexOf('edg') > -1) {
      state.userAgent.browser = 'edge';
    }
  } else if( userCheck.indexOf('safari') > -1 ) {
    state.userAgent.browser = 'safari';
  } else if( userCheck.indexOf('firefox') > -1 ) {
    state.userAgent.browser = 'firefox';
  } else if( userCheck.indexOf('opera') > -1 && userCheck.indexOf('safari') > -1) {
    state.userAgent.browser = 'opera';
  } else if( userCheck.indexOf('trident/7.0') > -1) {
    state.userAgent.ieVersion = 'ie11';
    state.userAgent.browser = 'ie';
  } else if( userCheck.indexOf('trident/4.0') > -1 ) {
    state.userAgent.ieVersion = 'ie8';
    state.userAgent.browser = 'ie';
  } else if( userCheck.indexOf('trident/5.0') > -1 ) {
    state.userAgent.ieVersion = 'ie9';
    state.userAgent.browser = 'ie';
  } else if( userCheck.indexOf('trident/6.0') > -1 ) {
    state.userAgent.ieVersion = 'ie10';
    state.userAgent.browser = 'ie';
  }


},


GET_USER_AGENT(state) {
  const userCheck = navigator.userAgent.toLowerCase();
  // TODO. preparation to userAgent Freezing
  // const userCheck = navigator.userAgentData.toLowerCase();
  const moDevice = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
  // 접속한 디바이스 환
  if (moDevice) { 
    if(userCheck.indexOf('android') > -1) {
      state.userAgent.mobile = 'android'
    } else if(userCheck.indexOf("iphone") > -1||userCheck.indexOf("ipad") > -1||userCheck.indexOf("ipod") > -1 ){
      state.userAgent.mobile = 'ios'
    } else {
      state.userAgent.mobile = 'other'
    }

  } else {
    state.userAgent.mobile = 'pc'
  }
   
},