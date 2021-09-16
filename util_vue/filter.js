import Vue from "vue";
import store from '@/store';
import Moment from '../plugins/moment';

const moment = Moment;

const categoryData = {
    'receive': ['card_accept', '접수'],
    'inprocess': ['card_progress', '진행'],
    'complete': ['card_complete', '완료'],
    'test': ['card_accept', '테스트']
}


const weeks = [
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토'
]


const cycleData = {
    'D': '일',
    'W': '주',
    'M': '개월',
    'Y': '년'
}

Vue.filter("currency", (val) => {
    if (!val) {
        return "0";
    }
    return new Number(val).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
})

Vue.filter("convertDateFormat", (val, format) => {
    if (!val) {
        return  '';
    }
    if (!format) {
        return moment.getConvertFormat(val);
    }
    return moment.getConvertFormat(val, format);
})

Vue.filter("convertDeadlineDt", (val) => {
    if (!val) {
        return  '';
    }
    return moment.convertDeadlineDt(val);
})


Vue.filter("convertDateTime", (val) => {
    return moment.getDateTime(val);
})

Vue.filter("categoryClass", (val) => {
    return categoryData[val][0];
})

Vue.filter("categoryName", (val) => {
    return categoryData[val][1];
})

Vue.filter("cardType", (val) => {
    return cardTypeData[val];
})

Vue.filter("searchName", (val) => {
    return searchData[val];
})

Vue.filter("round2", (val) => {
    return Math.round(val / 1024 / 1024 * 100) / 100;
})

Vue.filter("workerCount", (val) => {
    return val ? val.length - 3 : 0;
})

Vue.filter("isTotalCount", (val) => {
    return !val ? 0 : val.totalCount;
})

Vue.filter("weekCheckbox", (val, key) => {
    return val.some(data => {
        return key === data;
    });
})

Vue.filter("arrayToCommaString", (val) => {
    return val ? val.join(",") : ''
})

Vue.filter("joinMember", (val) => {
    if (val.length > 0) {
        return val.filter(data => {
            if (data.isJoin) {
                data
            }
        }).length;
    } else {
        return 0;
    }

})

Vue.filter("weeksComma", (val) => {
    if (!val) return  '없음';
    return  val.split(',').map(weekKey => {
        return weeks[weekKey];
    }).join(',');
})

Vue.filter("timePickerFormat", (val) => {
    if (!val) return  '';
})

Vue.filter( 'removeTag', (val) => {
    if(!val) return '';
    return val.replace(/(<([^>]+)>)/ig, "");
})

Vue.filter( 'convertPhoneNumber', (val) => {
    if(!val) return '';
    return val.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
})

Vue.filter('YYYY-MM-DD', (val) => {
    if(!val)return;
    return moment.getConvertFormat(val, 'YYYY-MM-DD');
})
Vue.filter('YYYY.MM.DD', (val) => {
    if(!val)return;
    return moment.getConvertFormat(val, 'YYYY.MM.DD');
})
Vue.filter( 'dateTimeFormatDash', (val) => {
  if (!val) return  '';
  return Vue.moment(val).format('YY-MM-DD HH:mm');
})
Vue.filter( 'dateTimeFormatDot', (val) => {
    if (!val) return  '';
    return Vue.moment(val).format('YY.MM.DD HH:mm');
})

Vue.filter('commaString', (val) => {
    if(!val)return;
    return val.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
})

Vue.filter( 'pcNoticeTitle', (val) => {
    if(!val)return;
    val = val.toLowerCase();
    if(val === 'today'){
        return '오늘'
    }else{
        const arr = val.split('-');
        return `${parseInt(arr[0])}월 ${parseInt(arr[1])}일`;
    }
})

Vue.filter('formatBytes', (bytes) => {
    if (!bytes || isNaN(bytes) || bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = 2;//decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
})

Vue.filter( 'contentParser', (val, contentsLineLimit) => {
    if (!val) {
        return '';
    } else {
        const {decodingTag} = Vue.options.filters;

        return decodingTag(val).replace(/<script>|<\/script>/gi, '')

    }
})

Vue.filter( 'tagToArray', (val, contentsLineLimit) => {
    if (!val) {
        return '';
    } else {
        // HTML태그제거, 코드 디코딩 함수 (다른 filter함수)
        const {removeTag, decodingTag} = Vue.options.filters;
        // 텍스트 제구성
        // 마지막 </p>태그 제거
        return val.replace(/<\/p>$/g, '')
          // <p>태그 기준으로 문자열 분리
          .split('</p>')
          // 컨텐츠 태그제거,
          .map(item=>removeTag(item))
          // 특수문자 디코딩
          .map(item=>decodingTag(item))
    }
})

Vue.filter( 'removeTagContents', (val) => {
    if (!val) {
        return '';
    } else {
        const tempContents = val.split('<p>')[0] || val.split('<p>')[1];
        return tempContents.replace(/(<p>|<\/p>|<span class="mention" data-mention-id="\d">|<\/span>)/gi, "");
    }
})

Vue.filter( 'tagArrayLength5', (val) => {
    if (val) {
        const tagArray = [];
        val.replace(/#[^#\s,;]+/gm, function(tag) {
            tagArray.push(tag);
        })
        return tagArray.length > 5 ? false : true;
    }
    return false;
})

Vue.filter('decodingTag', (val) => {
     if(!val)return '';
     return val
       .replace(/&nbsp;/g, " ")
       .replace(/&gt;/g, ">")
       .replace(/&lt;/g, "<")
       .replace(/&#40;/g, "(")
       .replace(/&#41;/g, ")")
 })

Vue.filter("checkEmptyData", (val) => {
    return val ? val : '-';
})

Vue.filter("cycleData", (val) => {
    return cycleData[val];
})


Vue.filter("cardPriorityData", (val) => {
    return cardPriorityData[val];
})

Vue.filter('fillNbsp', (val) => {
    if (!val) return '';

    return val.replace(/<p><\/p>/g, '<p>&nbsp;</p>')
})
