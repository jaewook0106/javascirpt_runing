'use strict';

// No 1. sort random array

function getRandomArray(length) {
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(Math.round(Math.random() * (length - 1)) + 1);
  }
  return list;
}

// console.log(getRandomArray(10));

function compare(current,next) {
  const isBigger = current > next;
  return isBigger;
}

function arrMatch(list,i,j){
  let num = list[i];
  // 6 , 2
  list[i] = list[j];  // list[i] = 2 , list[j] = 2
  list[j] = num; // 2 , 6
  return list;
}

function sort(list) {
  const sortedList =[];
  let listArr = list;

  for(let i = 0; i < listArr.length; i++){

    // if(list[i+1] === undefined){
    //
    // }
    for(let j = i+1; j < listArr.length; j++){
      // console.log(compare(listArr[i],listArr[i+1]));
      if(compare(listArr[i],listArr[j])){
        // console.log(listArr[i] +'vvvvv'+ listArr[j]);
        listArr = arrMatch(listArr,i,j);
        // console.log(arrMatch(listArr,i,j));
        // console.log(listArr);
      }
    }
  }

  sortedList.push(listArr);
  return sortedList;
}


console.log(sort(getRandomArray(50)));



console.log('--------------------------- 절제선');

// No 2. sort data

const data = [
  {
    "name":"Edward",
    "age":28,
    "team":"FC Diablo",
    "ranking":1,
    "goal": 33,
    "passSuccessRate": '70.5%'
  },
  {
    "name":"Shawn",
    "age":30,
    "team":"FC Company",
    "ranking":6,
    "goal": 18,
    "passSuccessRate": '40.1%'
  },
  {
    "name":"Brad",
    "age":26,
    "team":"FC Bbang",
    "ranking":7,
    "goal": 14,
    "passSuccessRate": '69.2%'
  },
  {
    "name":"Merin",
    "age":31,
    "team":"FC MerDa",
    "ranking":5,
    "goal": 23,
    "passSuccessRate": '53.8%'
  },
  {
    "name":"Messi",
    "age":29,
    "team":"FC Barcelona",
    "ranking":4,
    "goal": 27,
    "passSuccessRate": '52.4%'
  },
  {
    "name":"Ronaldo",
    "age":29,
    "team":"FC Madrid",
    "ranking":3,
    "goal": 29,
    "passSuccessRate": '53.2%'
  },
  {
    "name":"Larsson",
    "age":32,
    "team":"FC Diablo",
    "ranking":2,
    "goal": 31,
    "passSuccessRate": '68.6%'
  }
];
console.table(data);

// 데이터 복사
// const realData = dataObj(copyObj,data);

function copyObj(obj) {
  let copy = {};
  if (typeof obj === 'object' && obj !== null) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        copy[prop] = copyObj(obj[prop]);
      }
    }
  } else {
    copy = obj;
  }
  return copy;
}
function dataObj(copyObj,data){
  let dataArr = [];
  data.map(function(data){
    let dataList = copyObj(data);
    if(typeof dataList.passSuccessRate === 'string'){
      dataList.passSuccessRateNumber = Number(dataList.passSuccessRate.replace('%',''));
    }
    dataArr.push(dataList);
  });
  return dataArr;
}

// console.log(realData);

function sortList(type,data){
  const realData = dataObj(copyObj,data);
  // const dataArr = [];  // data.map(function(item){
  //   console.log(item[type]);
  //
  // });
  realData.sort(function(a, b){
    return a[type] - b[type];
  });
  if(type === 'goal' || type === 'passSuccessRateNumber'){
    return realData.reverse();
  }else{
    return realData;
  }
}

function dataSort(type,data){
  if(type === 'age'){
    return sortList(type,data);
  }else if(type === 'goal'){
    return sortList(type,data);
  }else if(type === 'ranking'){
    return sortList(type,data);
  }
  else if(type === 'passSuccessRateNumber'){
    return sortList(type,data);
  }

}

console.log('age 순위',dataSort('age',data));
console.log('ranking 순위',dataSort('ranking',data));
console.log('goal 순위',dataSort('goal',data));
console.log('패스 성공률 순위',dataSort('passSuccessRateNumber',data));


console.log('원본 데이터', data);


/* 색상 바꾸기  */


const fade = function(){
  let level = 1;
  const step = function(){
    const hex = level.toString(16);
    // console.log(hex);
    document.body.style.backgroundColor = '#FFFF' + hex + hex;
    if(level < 15){
      // console.log(level);
      level +=1;
      // console.log(level);
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);

};

fade();



/* 자바스크립트 prototype */
var Person = function(a,b){
  this.a = a;
  this.b = b;

  // console.log('this',this);


};

var add = new Person(1,3);
// var add2 = new Person(1,7);

Person.prototype.test2 = function(){
  if(typeof this.a === 'number' && typeof this.b === 'number'){
    return this.a + this.b;
  }
  return '숫자가아님';
};

console.log(add.test2());
// console.log(add2.test());


/* sort */

// function bubbleSort(arr){
//   const len = arr.length;
//
//   for(let i = len-1; i >= 0; i--){
//     for(let j = 1; j <= i; j++){
//       if(arr[j-1] > arr[j]){
//         let temp = arr[j-1];
//         arr[j-1]= arr[j];
//         arr[j] = temp;
//       }
//     }
//   }
//   return arr;
//
// }



function bubbleSort(arr){
  const len = arr.length;
  for(let i = 0; i < len; i++){

    for(let j = i+1;j < len; j++){

      if(arr[i] > arr[j]){
        // console.log('x',arr[i]);
        // console.log('y',arr[j]);
        let item = arr[i];
        arr[i] = arr[j];
        arr[j] = item;
      }
    }
  }
  return arr;
}

// console.log(bubbleSort([5,2,7,1,3,5,9]));
console.log('nnn',bubbleSort(['b','a','z','y','d']));




// function Person(a,b){
//   this.a = a;
//   this.b = b;
//
//   console.log('this',this);
//
//   this.test = function(){
//     console.log(this);
//     if(typeof this.a === 'number' && typeof this.b === 'number'){
//       return this.a + this.b;
//     }
//     return '숫자가아님';
//   }
//
// }

var arrTest = [1,2,3,4,5,6,7,8,9,10];

function resultArr(arr, num){
  var arrLen = arr.length;
  var realArr = [];
  for(var i=0; i < arrLen; i+=1){
    if(arr[i] <= num){
      realArr.push(arr[i]);
    }
  }
  return realArr;
}
console.log('o',arrTest);
console.log('aa',resultArr(arrTest, 5));



var people = {'seoulPeople':20,'daejeonPeople':15,'daeghuPeople':5}

  function train(people){
    var seoul = function(){
      return people.seoulPeople;
    };

    var daejeon = function(){
      return people.daejeonPeople;
    };

    var daegu = function(){
      return people.daeghuPeople;
    };

    return seoul() + daejeon() + daegu();

}
console.log(train(people)); // 총 기차 탄 인원수


var arrString = ['ㅎ','ㄱ','ㄷ'];
var arrEng = ['a','z','b','f'];
var arrNum = [1,2,8,4,3];

console.log('sort',arrString.sort(function(a,b){
  var x = a.toLowerCase();
  var y = b.toLowerCase();
  return x < y? -1 : x > y? 1: 0;
}));



var arrA = [
  [5,'a'],
  [3,'z'],
  [3,'h'],
  [9,'b']
];

console.log('sort2',arrA.sort(function(a,b){
  if(a[0] === b[0]){
    var x = a[1].toLowerCase();
    var y = b[1].toLowerCase();

    return x < y? -1 : x > y? 1: 0;
  }
  return a[0] - b[0];
}));



var objAge = [
  {
    'age':17,
    'name':'edward'
  },
  {
    'age':12,
    'name':'zero'
  },
  {
    'age':10,
    'name':'apple'
  },

];

function objFun(data,type){
  data.sort(function(a,b){
    return a[type] - b[type];
  });

  return data;
}

console.log('sortObj',objFun(objAge,'age'));


// function bubbleSort(arr){
//   const len = arr.length;
//
//   for(let i = len-1; i >= 0; i--){
//     for(let j = 1; j <= i; j++){
//       if(arr[j-1] > arr[j]){
//         let temp = arr[j-1];
//         arr[j-1]= arr[j];
//         arr[j] = temp;
//       }
//     }
//   }
//   return arr;
//
// }

var arrData = [1,9,6,3,5,10,7];
var resultArr = arrData.slice();

function bubbleArr(data){
  var arrLen = data.length;
  for(var i = 1; i < arrLen; i++){
    for(var j = arrLen - 1; j >= i; j--){
      if(data[j-1] > data[j]){
        var value = data[j-1];
        data[j-1] = data[j];
        data[j] = value;
      }
    }
  }

  return data;
}

console.log('sort',bubbleArr(resultArr));

