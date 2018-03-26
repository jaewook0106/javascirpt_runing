/**
 * Created by edward on 2018. 3. 26..
 */

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


console.log(sort(getRandomArray(20)));
