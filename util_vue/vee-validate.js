import { extend, configure } from "vee-validate";
import { required, email, min, max, numeric, alpha_num, length } from "vee-validate/dist/rules";
import i18n from '../plugins/i18n'
import * as _ from "lodash";
import { isNumStr, isEmptyData, isEmptyObject } from "@/utils/util"


// setInteractionMode('passive');

// i18n 파일의 validation에 해당 rule의 이름에 해당하는 값을 가져와서 message로 출력한다.
configure({
  defaultMessage: (field, values) => {
    return i18n.t(`validation.${values._rule_}`, values);
  },
});

// Install required rule and message.
extend("searchRequired", required);

// Install email rule and message.
extend("email", email);

// Install min rule and message.
// extend("min", min);

// Install min rule and message.
extend("numeric", numeric);

extend("inputRequired", required);

extend("alpha_num", alpha_num);

extend("length", length);

extend("tiptapRequired", {
  validate: function (value) {
    if (!value || value === '' || value.replace(/<p>(&nbsp;|\s)*<\/p>/g, '') === '') {
      return false;
    }
    return true;
  },
  computesRequired: true
});

extend("timepickerRequired", {
  validate: function (value) {
    if (value === '') {
      return false;
    }
    return true;
  },
  computesRequired: true
});

// 시작 시간이 종료 시간보다 늦을 경우 에러
extend("isLaterEndTime", {
  params: ['item1'],
  validate: function (value, target) {
    if (!isEmptyData(target.item1)) {
      return value <= target.item1;
    }
    return true;
  },
  computesRequired: true
});

// 시작 시간이 종료 시간보다 늦을 경우 에러2
extend("isEarlierStartTime", {
  params: ['item1'],
  validate: function (value, target) {
    if (!isEmptyData(target.item1)) {
      return value >= target.item1;
    }
    return true;
  },
  computesRequired: true
});

// 시작 시간이 종료 시간과 동일할 경우 에러
extend("isEqualTime", {
  params: ['item1'],
  validate: function (value, target) {
    return value !== target.item1;
  },
  computesRequired: true
});

extend("arrayRequired", {
  validate: function (value) {
    if (!Array.isArray(value)) {
      return false;
    }
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    return true;
  },
  computesRequired: true
});

extend("objectRequired", {
  validate: function (value) {
    return !(typeof value === 'object' && !isEmptyObject(value));
  },
  computesRequired: true
});

extend("noSpecialCharacter", {
  validate: function (value) {
    return /^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9]*$/gi.test(value);
  }
});

extend("isNumAndEng", {
  validate: function (value) {
    return /^[a-z|A-Z|0-9|\-|_]*$/gi.test(value);
  }
});

extend("isNumOrKor", {
  validate: function (value) {
    return /^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|0-9|\-|_]*$/gi.test(value);
  }
});

// extend("isCapOrNum", {
//   validate: function (value) {
//     return /^[A-Z|0-9|\-|_]*$/gi.test(value);
//   }
// });


extend("isSpecialAndEng", {
  validate: function (value) {
    return /^[a-z|A-Z|0-9]*$/gi.test(value);
  }
});

extend("min", {
  params: ['min'],
  validate: function (value, {min}) {
    if (value.length < min) {
      return false;
    }
    return true;
  },
});

extend("requiredMin", {
  params: ['min'],
  validate: function (value, {min}) {
    if (value.length < min) {
      return false;
    }
    return true;
  },
  computesRequired: true
});

extend("max", {
  params: ['max'],
  validate: function (value, {max}) {
    if (value.length > max) {
      return false;
    }
    return true;
  }
});

extend("noSpecialCharacterIsEmpty", {
  validate: function (value) {
    if (value.trim().length < 1) {
      return false;
    }
    return /^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9|\s]*$/gi.test(value);
  }
});

extend("tagMax", {
  params: ['max'],
  validate: function (value, {max}) {
    if (value) {
      const tagArray = [];
      value.replace(/#[^#\s,;]*/gm, function(tag) {
        tagArray.push(tag);
      })
      return tagArray.length > max ? false : true;
    }
  }
});

extend("alarmCode", {
  validate: function (value) {
    return /^[a-z|A-Z|0-9|\-|_]*$/gi.test(value);
  }
});

extend("dynamicCodeItemValidate", {
  params: ['item1'],
  validate: function (value, target) {
    if (
        (!value && !target.item1)
        || value
        || (value && target.item1)
    ) {
      return true;
    }
    return false;
  }
});

extend("dynamicExpendItemValidate", {
  params: ['item1', 'item2'],
  validate: function (value, target) {
    const targetValue1 = isNumStr(value) ? value.toString() : null
    const targetValue2 = isNumStr(target.item1) ? target.item1.toString() : null
    const targetValue3 = isNumStr(target.item2) ? target.item2.toString() : null
    if (
        (_.isEmpty(targetValue1) && _.isEmpty(targetValue2) && _.isEmpty(targetValue3))
        || !_.isEmpty(targetValue1)
        || (!_.isEmpty(targetValue1) && !_.isEmpty(targetValue2) && !_.isEmpty(targetValue3))
    ) {
      return true;
    }
    return  false;
  }
});

extend("dualInputCrossValidate", {
  params: ['item1'],
  validate: function (value, target) {
    if (
      (_.isEmpty(value) && _.isEmpty(target.item1))
      || !_.isEmpty(value)
      || (!_.isEmpty(value) && !_.isEmpty(target.item1))
    ) {
      return true;
    }
    return false;
  }
});

extend("calendarFormat", {
  validate: function (value) {
    return /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(value);
  }
});

extend("checkJsonFormat", {
  validate: function (value) {
    let tempJson = [];

    if (value) {
      let valueSplit = value.split(',');
      if (valueSplit) {
        tempJson = valueSplit.filter(item => {
          return /(^[0-9]{1,3}:[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9|\s]{1,15})/g.test(item)
        })
      }

      if (valueSplit.length === tempJson.length) {
        return true;
      }
    }

    return false;
  }
});

extend("keySize", {
  params: ['size'],
  validate: function (value, target) {
    if (value) {
      let convertArray = stringToArray(value);
      if (convertArray) {
        return Object.keys(convertArray).every(item => {
          if (item) {
            return item.toString().length <= Number(target.size);
          }
          return false;
        })
      }
    }
    return false;
  }
});

extend("keyOnlyNum", {
  validate: function (value) {
    if (value) {
      let convertArray = stringToArray(value);
      if (convertArray) {
        return Object.keys(convertArray).every(item => {
          return /(^[0-9]{1,3}$)/g.test(item);
        })
      }
    }
    return false;
  }
});

extend("keyDuplicate", {
  params: ['size'],
  validate: function (value) {
    if (value) {
      let convertArray = stringToArray(value);
      if (convertArray) {
        if (value.split(',').length === new Set(Object.keys(convertArray)).size) {
          return true;
        }
      }
    }
    return false;
  }
});

extend("valueSize", {
  params: ['size'],
  validate: function (value, target) {
    if (value) {
      let convertArray = stringToArray(value);
      if (convertArray) {
        return Object.values(convertArray).every(item => {
          if (item) {
            return item.toString().length <= Number(target.size);
          }
          return false;
        })
      }
    }
    return false;
  }
});

extend("valueCharacter", {
  validate: function (value) {
    if (value) {
      let convertArray = stringToArray(value);
      if (convertArray) {
        return Object.values(convertArray).every(item => {
          return /(^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9|\s]+$)/g.test(item);
        })
      }
    }
    return false;
  }
});

extend("classifyCycleType", {
  params: ['repeatCycleType'],
  validate: (value, {repeatCycleType}) => {
    if (repeatCycleType !== 'D') {
      return !isEmptyData(value);
    }
  },
  // computesRequired: true

});


extend("numLengthLimits", {
    params: ['limit'],
    validate: function (value, {limit}) {
      return value.length === parseInt(limit);
    },
});

extend("deliverySNFormat", {
  // 숫자, 영어, 특수문자 : 만 지원
  validate: function (value) {
    return /^[a-z|A-Z|0-9|:]*$/gi.test(value);
  }
});

extend("timeFormat", {
  // HH:MM 포맷에서 MM만 입력할 경우 에러
  validate: function (value) {
    if (typeof value === 'string') {
      return !value.includes('H');
    }
  }
});
function stringToArray(data) {
  let result = {};
  data.split(',').map(item => {
    let tempKeyValue = {}
    tempKeyValue[item.split(':')[0]] = item.split(':')[1];
    return _.merge(result, tempKeyValue);
  });
  return result;
}
