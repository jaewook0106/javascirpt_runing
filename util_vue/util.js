import store from '@/store';
import xss from 'xss'

// export const setTableDataNumber = (payload) => {
//   let setDataIdx = [];
//   if(payload.result) {
//     setDataIdx = payload.result.map((item, index) => ({
//       ...item,
//       number: ((payload.pagination.totalCount - ((payload.pagination.page) * payload.pagination.size)) - index)
//     }));
//     return setDataIdx;
//   } else{
//     return setDataIdx;
//   }

// }
export const setTableDataNumber = (data, pagination, idx) => {
  let number;
  if(pagination) {
    number = ((pagination.totalCount - ((pagination.page) * pagination.size)) - idx)
  } else {
    number = idx;
  }
  return number;
}
export const setPhoneNumberHyphen = (phoneNum) => {
  const phoneHyphen = phoneNum.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3")
  return phoneHyphen;
}

export const setMemberType = (masterYn, partManagerYn) => {
  const memberType = masterYn ? 'MASTER' : partManagerYn ? 'MANAGER' : 'USER'
  return memberType;
}


export const verifyModule = (val) => {
  if (!val) {
    return false;
  }
  let joinModule = store.getters['member/getMyInfoData'].modules;
  // *** test Code - start ***

  // let joinModule;
  // joinModule = 'work,alarm,info,document,delivery';
  // joinModule = 'work,alarm,info';
  // joinModule = 'work,alarm,document';
  // joinModule = 'work,info';
  // joinModule = 'alarm,info';
  // joinModule = 'work,alarm';
  // joinModule = 'work';
  // joinModule = 'alarm';
  // joinModule = 'info';
  // joinModule = 'document';
  // joinModule = 'work,document';
  // joinModule = 'alarm,document';
  // joinModule = 'info,document';
  // *** test Code - end ***
  // console.log('joinModule : ', joinModule)
  if (joinModule) {
    return joinModule.split(',').some(item => {
      return item === val;
    })
  }
  return false;

  // const joinModule = store.getters['member/getMyInfoData'].modules;
  // if(val && joinModule) {
  //   return joinModule.split(',').some(item => tiem === val);
  // } else {
  //   return false
  // }
}

export const validateErrorMsg = (val) => {
  if (!val.errors) {
    return "";
  }
  if (val.type) {
    if (val.errors[`code_${val.type}_${val.index}`] && val.errors[`code_${val.type}_${val.index}`][0]) {
      return val.errors[`code_${val.type}_${val.index}`][0];
    } else if (val.errors[`name_${val.type}_${val.index}`] && val.errors[`name_${val.type}_${val.index}`][0]) {
      return val.errors[`name_${val.type}_${val.index}`][0];
    } else if (val.errors[`alterText_${val.type}_${val.index}`] && val.errors[`alterText_${val.type}_${val.index}`][0]) {
      return val.errors[`alterText_${val.type}_${val.index}`][0];
    }
  } else {
    if (val.errors[`name`] && val.errors[`name`][0]) {
      return val.errors[`name`][0];
    } else if (val.errors[`installDt`] && val.errors[`installDt`][0]) {
      return val.errors[`installDt`][0];
    } else if (val.errors[`replaceCycle`] && val.errors[`replaceCycle`][0]) {
      return val.errors[`replaceCycle`][0];
    }
  }
  return "";
}

export const isNumStr = (val) => {
  if (val === '') {
    return false;
  }
  return typeof val === 'string' || typeof val === 'number';
};

// 점검항목 사용하는 템플릿인지 체크
export const checkDocCycle = (val) => {
  if (val === '') {
    return false;
  }
  if (val === '0001' || val === '0002') {
    return true;
  }
  return false;
};

// 문서 상태에 따른 등록 일자 추출
export const statusRegDate = (val) => {
  if (val === '') {
    return false;
  }
  if (val === '0001' || val === '0002') {
    return true;
  }
  return false;
};

/**
 * 빈 오브젝트 검사
 * @param {Object}
 * @returns {Boolean}
 */
export const isEmptyObject = (param) => {
  return Object.keys(param).length === 0 && param.constructor === Object;
};

/**
 * 오브젝트에 빈값이 있는지 깊은 검사
 * @param {Object}
 * @returns {Boolean}
 */
export const isObjectEmptyDeep = (obj) => {
  // object 모든 항목의 값이 있는지 확인
  if(typeof obj === 'object' && obj) {
    const arr = Object.values(obj);
    return arr.every(item => {
      return typeof item === 'object' ? isObjectEmptyDeep(item) : !isEmptyData(item);
    });
  }
  // 그 외
  return !isEmptyData(obj);
}

/**
 * null, undefined 검사
 * @param {*}
 * @returns {Boolean}
 */
export const isEmptyData = data => {
  return data === null || data === undefined || data === '';
};

/**
 * string이 json string인지 확인
 * @param {String}
 * @returns {Boolean}
 */
export const isJsonString = (str) => {
  try {
    const json = JSON.parse(str);
    return (typeof json === 'object' && !Array.isArray(json));
  } catch (e) {
    return false;
  }
}

/**
 * xss필터링
 * @param {String}
 * @returns {String}
 */
export const filterXSS = (str) => {
  if(!str) return '';
  return xss.filterXSS(str);
}

/**
 * arraybuffer타입 response에서 file/filename 추출
 * @param {response}
 * @returns {fileName: string, file: Blob}
 */
export function getFileInfo(response) {
  const file = new Blob([response.data], {type: "application/octet-stream;charset=UTF-8"});
  const fileName = decodeURI(response.headers['content-disposition'])
    .split(';')
    .find(item=>item.indexOf('filename') > -1)
    .split('=')[1];

  return {file, fileName};
}
