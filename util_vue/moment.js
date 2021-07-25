import Vue from 'vue'

const Moment = (function () {
  function _getDateTime(val) {
    return Vue.moment(val);
  }

  function _getToday() {
    return Vue.moment().toDate();
  }

  function _getTodayWithFormat(format) {
    if (!format) {
      format = 'YYYY-MM-DD HH:mm:ss'
    }
    return Vue.moment(_getToday()).format(format);
  }

  function _getConvertFormat(date, format) {
    if (!format) {
      format = 'YYYY-MM-DD HH:mm'
    }
    return Vue.moment(date, 'YYYY-MM-DD HH:mm').format(format);
  }

  function _getAdd(date, value, type) {
    if (!date) {
      return Vue.moment().add(value, type).toDate();
    }
    return Vue.moment(date).add(value, type).toDate();
  }

  function _getDefault(range, type, maxDate) {
    const today = Vue.moment.isDate(maxDate) ? Vue.moment(maxDate) : Vue.moment();
    let start;
    if (!type) {
      start = Vue.moment().add(range, 'days')
    } else if (type === 'YEAR') {
      start = Vue.moment().add(range, 'year')
    } else if (type === 'MONTH') {
      start = Vue.moment().add(range, 'months')
    } else if (type === 'WEEKS') {
      start = Vue.moment().add(range, 'weeks')
    }
    return {
      start: start.format('YYYY-MM-DD'),
      end: today.format('YYYY-MM-DD')
    }
  }

  function _getCombinationDateTime(date, time) {
    // return Vue.moment(`${date.toString()} ${time ? time.toString() : "23:59"}`).format('YYYY-MM-DDTHH:mm:ss');
    return `${date.toString()}T${time.toString()}`;
  }

  function _getIsDeadLineDate(date) {
    const today = Vue.moment();
    const endDate = Vue.moment(date);
    return parseInt(Vue.moment.duration(endDate.diff(today)).asHours().toString());
  }

  function _convertDeadlineDt(date) {
    const today = Vue.moment();
    const endDate = Vue.moment(date);

    if (parseInt(Vue.moment.duration(endDate.diff(today)).asDays().toString()) > 0) {
      return `마감 ${endDate.format('YYYY-MM-DD HH:mm')}`;
    } else {
      if (parseInt(Vue.moment.duration(endDate.diff(today)).asHours().toString()) > 0) {
        return `마감 ${parseInt(Vue.moment.duration(endDate.diff(today)).asHours().toString())}시간 전`;
      } else {
        if (parseInt(Vue.moment.duration(endDate.diff(today)).asMinutes().toString()) > 0) {
          return `마감 ${parseInt(Vue.moment.duration(endDate.diff(today)).asMinutes().toString())}분 전`;
        } else {
          return '마감되었습니다.'
        }

      }
    }
  }

  function _getEnableTime(selectDate) {
    const nowDate = this.getTodayWithFormat('YYYY-MM-DD');
    const nowHour = this.getDateTime().format('HH');
    const nowMinute = this.getDateTime().format('mm');
    // const nowMinute = Math.round(this.getDateTime().format('mm') / 10) * 10;
    let arrHour = [];
    let arrMinute = [];
    let setTime = {}

    if (nowDate === selectDate || nowDate === this.getConvertFormat(selectDate, 'YYYY-MM-DD')) {
      // 선택날짜가 오늘 날짜인 경우
      for (let i = nowHour; i < 24; i++) {
        arrHour.push(i);
      }
      for (let i = nowMinute; i < 60; i++) {
        arrMinute.push(i);
      }

      setTime = {HH: nowHour, mm: nowMinute};

      return {enHour: arrHour, enMinute: arrMinute, time: setTime};
    } else {
      for (let i = 0; i < 24; i++) {
        arrHour.push(i);
      }
      for (let i = 0; i < 60; i++) {
        arrMinute.push(i);
      }

      return {enHour: arrHour, enMinute: arrMinute};
    }
  }

  function _isOnePastCheck(date) {
    const nowDate = Vue.moment();
    const regDate = Vue.moment(date);
    return (nowDate - regDate) / (60 * 60 * 1000) <= 24;
  }

  return {
    getDateTime: _getDateTime,
    getToday: _getToday,
    getTodayWithFormat: _getTodayWithFormat,
    getConvertFormat: _getConvertFormat,
    getAdd: _getAdd,
    getDefault: _getDefault,
    getCombinationDateTime: _getCombinationDateTime,
    getIsDeadLineDate: _getIsDeadLineDate,
    convertDeadlineDt: _convertDeadlineDt,
    getEnableTime: _getEnableTime,
    isOnePastCheck: _isOnePastCheck
  };
})();
export default Moment;
