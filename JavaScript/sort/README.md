## sort

#### sort 참고 주소 
http://cyberx.tistory.com/16

https://khan4019.github.io/front-end-Interview-Questions/sort.html#otherSort

#### sort란
Array 기반으로 된 메서드 입니다.
(Array.prototype.sort())

작은값에서 큰값 혹은 큰값에서 작은값으로 정렬 해주는것 입니다.

데이터 정렬 할때 많이쓰는 것으로 중요한 정렬 방식입니다

```
[1,7,9,2,4] -> [1,2,4,7,9]
['a','f','b'] -> ['a','b','f']

```
sort 메서드는 인자로 비교함수를 받을 수 있습니다. 이 함수는 두개의 인자를 받는데... 두 인자는 배열안의 두 값을 가정합니다. 

두 인자를 순서대로 a, b라고 했을때 비교함수는 규칙이있습니다.

##### 비교함수 규칙
- 함수가 0보다 작은 값을 반환하면 a를 b보다 앞에 배치
- 함수가 0보다 큰 값을 반환하면 b를 a보다 앞에 배치
- 함수가 0일 반환하면 a와 b 순서는 바뀌지 않음


숫자 정렬
```javascript
var arrNum = [1,2,8,4,3];

arrNum.sort(function(a,b){
  return a - b;
});
```
문자정렬
```javascript
var arrString = ['a','n','c','b'];

arrString.sort(function(a,b){
  var x = a.toLowerCase();
  var y = b.toLowerCase();
  return  x < y ? -1 : x > y ? 1 : 0;
});
```

앞에 숫자가 같을때 뒷문자 정렬
```javascript
var arrA = [
  [5,'a'],
  [3,'F'],
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
```

객체 일경우 정렬 방식
```javascript
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
	}
];

function objFun(data,type){
  data.sort(function(a,b){
   return a[type] - b[type];
  });
 
  return data;
}

console.log('sortObj',objFun(objAge,'age'));
```

#### sort 종류

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merger Sort
- Quick Sort
- Heap Sort
- Bucket Sort
- Shell Sort
- PigenHole Sort
- BinaryTree Sort
- Radix Sort
- Cocktail Sort
- Other Sort

#### Bubble Sort

마지막이나 첫번째를 기점으로 서로 비교하면서 정렬하는 방식


첫번째부터 정렬한 경우
```javascript
var data = [7,4,3,9,2,3,10,3];
var realData = data.slice();  // data 복사

function sortData(data){
  var len = data.length;
  for(var i = 1; i < len; i+=1){
    for(var j = len-1; j >= i; j-=1){
      if(data[j-1] > data[j]){
        var arrTemp = data[j-1]; 
        data[j-1] = data[j];
        data[j] = arrTemp;
        
      }
    }
  }
  return data;
}
console.log(sortData(realData));

sortData(realData);

```

마지막부터 정렬한 경우
```javascript
var data = [7,4,3,9,2,3,10,3];
var realData = data.slice();  // data 복사

function sortData(data){
  var len = data.length;
  for(var i = len-1; i > 0; i-=1){
    for(var j = 1; j <= i; j+=1){
      if(data[j-1] > data[j]){
        var arrTemp = data[j-1]; 
        data[j-1] = data[j];
        data[j] = arrTemp;
        
      }
    }
  }
  return data;
}
console.log(sortData(realData));

sortData(realData);

```