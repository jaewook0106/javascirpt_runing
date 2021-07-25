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
        /*const contentsLength = 24;
        // const contentsLineLimit = 3;
        const tempContentsArray = val.split('<p>');
        const newContentsArray = [];
        let newContentsArrayCount = 0;

        tempContentsArray.forEach(list => {
            let removeTagP = list.replace(/(<(p|\/p)>)/gi, "");

            const entityMap = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x2F;': '/', '&#x60;': '`', '&#x3D;': '=', '&#41;': ')', '&#40;': '(' };
            Object.keys(entityMap).forEach(function (key) {
                removeTagP = removeTagP.replace(new RegExp(key, "g"), entityMap[key]);
            })

            const mentionList = [];
            removeTagP.replace(/(<span class="mention" data-mention-id="(\d+)">@[^@]+<\/span>\s)/gm, function(tag) {
                mentionList.push([tag.replace(/(<span class="mention" data-mention-id="(\d+)">|<\/span>)/gi, ''), tag]);
            })

            const removeTagSpan = removeTagP.replace(/(<span class="mention" data-mention-id="(\d+)">|<\/span>)/gi, '');

            if (list && newContentsArray.length < contentsLineLimit) {
                if (removeTagSpan.length > contentsLength) {
                    const loopCount = Math.ceil(removeTagSpan.length / contentsLength);
                    let remainStr = '';
                    for (let i = 0; i < loopCount; i++ ) {
                        if (newContentsArrayCount < contentsLineLimit) {
                            if (newContentsArrayCount == (contentsLineLimit - 1)) {
                                let contents = remainStr + removeTagSpan.slice((contentsLength * i), (contentsLength * (i + 1) - 3));
                                contents.replace(/(@[a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+|@)$/gm, function (tag) {
                                    remainStr = tag;
                                    const pattern = new RegExp(`${tag}$`);
                                    contents = contents.replace(pattern, '');
                                })
                                mentionList.forEach(list => {
                                    contents = contents.replace(list[0], list[1]);
                                })
                                newContentsArray.push(`<p>${contents}...</p>`);
                            } else {
                                let contents = remainStr + removeTagSpan.slice((contentsLength * i), (contentsLength * (i + 1)));
                                contents.replace(/(@[a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+|@)$/gm, function (tag) {
                                    remainStr = tag;
                                    const pattern = new RegExp(`${tag}$`);
                                    contents = contents.replace(pattern, '');
                                })
                                mentionList.forEach(list => {
                                    contents = contents.replace(list[0], list[1]);
                                })
                                newContentsArray.push(`<p>${contents}</p>`);
                            }
                        }
                        newContentsArrayCount++;
                    }
                    // newContentsArray.push('...');
                } else {
                    // tempContentsArray 맨 앞에 "" 이 들어가서 검증할 배열 갯수에 +1을 하여 4개로 체크 해줌.
                    let contents = removeTagSpan;
                    if (newContentsArrayCount == (contentsLineLimit - 1) && tempContentsArray.length > 4) {
                        mentionList.forEach(list => {
                            contents = contents.replace(list[0], list[1]);
                        })
                        newContentsArray.push(`<p>${contents}...</p>`);
                    } else {
                        mentionList.forEach(list => {
                            contents = contents.replace(list[0], list[1]);
                        })
                        newContentsArray.push(`<p>${contents}</p>`);
                    }
                    newContentsArrayCount++;
                }
            }
        })
        return newContentsArray.join('');*/
        


        // 기존 방식 bak
        // tag를 배열로 변환 (다른 filter함수)
        // const {tagToArray} = Vue.options.filters;
        // // 텍스트 길이
        // const contentsLength = 25;
        // // <p>태그 기준으로 문자열을 배열로 치환
        // const arr = tagToArray(val)
        //   // 텍스트를 contentsLength만큼 배열안에서 분리
        //   .reduce((acc, item)=>{
        //     if(item.length <= contentsLength){
        //       acc.push(item);
        //     } else {
        //       for(let i=0; i<Math.ceil(item.length/contentsLength); i++) {
        //         acc.push(item.slice((i*contentsLength), (i+1)*contentsLength));
        //       }
        //     }
        //     return acc;
        //   }, [])
        //   // contentsLineLimit줄 보다 글이 더 있는경우 contentsLineLimit 줄에 '...'추가
        //   .map((item, index, array)=>{
        //     if(index === contentsLineLimit - 1 && array.length > contentsLineLimit) {
        //       // truncate(자르다)
        //       return item.length <= contentsLength-3 ? `${item}...` : `${item.slice(0,contentsLength-3)}...`;
        //     }
        //     return item;
        //   })
        //   // contentsLineLimit줄 만큼 제거
        //   .slice(0,contentsLineLimit);

        // return arr;
        
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
