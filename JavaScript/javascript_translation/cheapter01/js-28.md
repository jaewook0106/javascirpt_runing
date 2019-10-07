# JavaScript의 Big O 검색 알고리즘 

이 게시물은 JavaScript를 사용하는 일부 기본 알고리즘의 코드 예제를 제공합니다. JavaScript에 익숙하다고 가정하겠습니다. 샘플 코드를 모든 브라우저에서 가져 와서 실행할 수 있도록 의도적으로 JavaScript를 선택했습니다.  

각 코드 예제에 대해 JSLitmus를 사용하여 벤치 마크를 제공합니다. 작은 입력, 중간 입력 및 큰 입력으로 각 방법을 세 번 벤치 마크합니다. JSLitmus에는 각 알고리즘의 성능 특성을 시각적으로 나타내는 유용한 그래프 기능이 있습니다. 반복 실행시 초당 가능한 작업 수를 보고합니다.  

이것이 알고리즘 벤치마킹에 관한 것이 아니라 성장 특성을 시각적으로 표시하기 위해 벤치 마크를 사용하고 있다는 점에 유의하는 것이 중요합니다.  

예제를보다 간결하게 만들기 위해 다음 세 가지 배열을 모두 사용합니다.   

```javascript
// Set up a simple array of colours
var colours = new Array ("Black", "Blue", "Brown", "Green", "Pink", "Red", "White", "Yellow");

// Set up numbers from 1 to 2500
var numbersHalf = new Array();
 
for (var i = 1; i < 2500; i++) {
  numbersHalf.push(i);
};

// Set up numbers from 1 to 5000
var numbersFull = new Array();
 
for (var i = 1; i < 5000; i++) {
  numbersFull.push(i);
};
```
배열 colours은 작은 배열이며 numbersHalf에는 2500개의 항목이 있고 numbersFull에는 5000개의 항목이 있습니다.  

개념을 익히기 위해 이전 블로그 게시물을 다시 참조하십시오.  

## Constant Complexity (일정한 복잡성)  

이것은 다음과 같이 표현됩니다 : O(1) 

복잡성(항목 수)에 관계없이 결과는 일정합니다. 아래 코드는 단순히 배열에서 첫 번째 항목을 가져 와서 반환합니다.  

```javascript
// Find the first item
function FindFirstItem(items) {
     return items[0];
}

JSLitmus.test('Find first colour test', function() {
     FindFirstItem(colours);
});
 
JSLitmus.test('Find first number test (2500 items)', function() {
     FindFirstItem(numbersHalf);
});
 
JSLitmus.test('Find first number test (5000 items)', function() {
     FindFirstItem(numbersFull);
});
```
아래 표는 초당 작업 수를 보여줍니다. 보시다시피 결과는 입력 수에 관계없이 거의 같습니다. 결과는 일정합니다.  


| Test | Ops/sec |
|:---:|:---:|
| Find first colour test	| 102675741 |
| Find first number test (2500 items) | 99864381 |
| Find first number test (5000 items) | 99273467 |


그래프 이미지 주소 : http://2.bp.blogspot.com/-PHqGo4yup_w/T5CkDrfB8CI/AAAAAAAAAOY/AkMGNKS2qCc/s400/constant-complexity.png

## Linear Complexity(선형 복잡성)  

이것은 다음과 같이 표현됩니다 : O(n) 

선형 복잡성으로 함수의 성장률은 항목 수와 직접 연결됩니다. 다음 코드 예제에서는 모든 항목을 반복하고 배열의 마지막 항목과 일치시킵니다. 성장을 측정 할 때는 상한 또는 최악의 시나리오를 고려하므로 벤치 마크에서 배열의 마지막 항목을 찾고 있습니다.  

```javascript
function FindItem(items, match) {
     for (var i=0; i < items.length; i++) {
          if (items[i] == match) {
               return true;
          }
     }
     return false;
}

JSLitmus.test('Find colour by colour name', function() {
     FindItem(colours, "Yellow");
});

JSLitmus.test('Find number index by number (2500 items)', function() {
     FindItem(numbersHalf, 2500);
});
 
JSLitmus.test('Find number index by number (5000 items)', function() {
     FindItem(numbersFull, 5000);
});
```

아래 그래프는 훨씬 더 작은 colours의 배열을 사용하여 초당 더 많은 실행이 가능하다는 것을 분명히 보여 주지만, 그래프의 결과가 상대적이므로 2500 및 5000 항목의 배열을 비교하는 데별로 유용하지 않습니다. 그러나 테이블 데이터에서 비교를 볼 수 있습니다.

|Test|Ops/sec|
|:---:|:---:|
|Find colour by colour name	|53659755|
|Find number index by number (2500 items)|	54566|
|Find number index by number (5000 items)	|27168|  

그래프 이미지 주소 : http://1.bp.blogspot.com/-r4-QbMkytKc/T5ClvsGIWRI/AAAAAAAAAOk/NKwiFOJptE4/s400/linear-complexity.png


아래는 FindItem 메서드의 2500 대 5000 항목의 그래프입니다. 이것은 두 배나 많은 아이템의 성장률을 분명히 보여 주며 5000개 아이템은 2500개보다 두 배 느립니다.  

그래프 이미지 주소 : http://2.bp.blogspot.com/-NELJVXcDIJE/T5CmfbiKN3I/AAAAAAAAAOw/7xGTBbFpKDw/s1600/linear-complexity-2.png   


## Logarithmic Complexity (로그 복잡성) 

이것은 다음과 같이 표현됩니다 : O(log n)  

다음 코드는 전화 번호부에서 이름을 찾는 것과 같습니다. 전화 번호부에서 이름을 찾고 있는데 정확히 중간에 책을 연다 고 상상해보십시오. 찾고있는 이름이 해당 페이지에없는 경우 알파벳을 기준으로 전화 번호부를 아래로 또는 위로 이동하면서 해당 섹션의 중간을 찾은 다음 일치하는 부분을 찾은 후 나머지 섹션의 중간으로 계속 이동합니다. 찾고있는 이름을 찾을 때까지 이것은 전화 번호부가 알파벳순으로 정렬되어 색인을 제공하기 때문에 가능하다는 점에 유의해야합니다.

이 개념을 이진 검색이라고합니다. 아래 코드는 이진 검색의 구현입니다.  

```javascript
function FindItemBinarySearch(items, match) {
     
      var low = 0,
          high = items.length -1;
           
      while (low <= high) {
          mid = parseInt((low + high) / 2);

           current = items[mid];
         
          if (current > match) {
             high = mid - 1;
           } else if (current < match) {
              low = mid + 1;
            } else {
              return mid;
           }   
      }       
      
      return -1;
    }
 
JSLitmus.test('Find colour by colour name', function() {
     FindItemBinarySearch(colours, "Yellow");
});
 
JSLitmus.test('Find number index by number (2500)', function() {
     FindItemBinarySearch(numbersHalf, 2500);
});
  
JSLitmus.test('Find number index by number (5000)', function() {
     FindItemBinarySearch(numbersFull, 5000);
});
```

아래 결과 세트에서 우리는 colour 배열 목록이 제한된 크기의 배열로 인해 더 많은 실행을 할 수 있음을 알 수 있습니다. 흥미롭게도 2500 및 5000 배열 항목 사이의 초당 작업 수에는 큰 차이가 없습니다. 이제 이진 검색 사용의 이점을 볼 수 있습니다. 두 배나 많은 아이템이지만 대략 같은 퍼포먼스가 그 자체를 대변할 것입니다!  

|Test|Ops/sec|
|:---:|:---:|
|Find colour by colour name	|8081984|
|Find number index by number (2500 items)|3261082|
|Find number index by number (5000 items)|3055804|  

그래프 이미지 주소 : http://3.bp.blogspot.com/-SrIDz0CDt-Y/T5HImW9WHmI/AAAAAAAAAO8/2tGSryvYH1Y/s400/binary-search.png

보다 심오한 차이를 확인하기 위해 5000 항목 배열에서 마지막 요소를 찾을 때 FindItem메서드 Linear Complexity(선형 복잡도)와 FindItemBinarySearch메서드 Logarithmic Complexity(로그 복잡도)를 비교합니다. 


|Test|Ops/sec|
|:---:|:---:|
|Find number index by number - FindItem|26349|
|Find number index by number - Binary Search|844153|   

그래프 이미지 주소 : http://2.bp.blogspot.com/-09gVF5IrEr8/T5HJLRiRdrI/AAAAAAAAAPI/ojBpAHoeKxU/s400/binary-search-vs-linear.png 

보시다시피 성장의 차이는 놀랍습니다.  

## Linear Complexity vs. Logarithmic Complexity  

앞으로 비슷한 로직에 대한 이진 검색을 시작하고 구현하기 전에 몇 가지 단계를 거쳐 컨텍스트를 고려해야합니다.

선형 복잡도를 이용한 colour 메소드와 이진검색을 이용한 colour 메소드를 비교해 봅시다. 이전에 본 내용을 기반으로 바이너리 검색이 더 빨라질 것으로 기대합니까? 

결과는 다음과 같습니다. 

|Test|Ops/sec|
|:---:|:---:|
|Find colour by colour name|51804043|
|Find colour by colour name - Binary Search|7902378|   


그래프 이미지 주소 : http://3.bp.blogspot.com/-z3bxn1mjU5Y/T5HczUk2iyI/AAAAAAAAAPU/lAaduS7LXlg/s400/battle.png  

이 경우 선형 복잡성 예제가 더 성능이 좋습니다. 작은 배열에서 이진 검색의 추가 복잡성으로 인해 불필요한 오버 헤드가 발생합니다. 여기서의 교훈은 항상 상황을 고려하는 것입니다!

두 방법이 서로 동일한 지점을 식별하기 위해 두 번째 벤치 마크 세트를 작성했습니다. 아래 코드는 85 개의 항목이있는 배열을 사용합니다.  

```javascript
// Set up numbers from 1 to 85 
 JSLitmus.test('Find numbers - linear', function() {
  FindItem(numbers, 85);
 });
 
 JSLitmus.test('Find numbers - Binary Search', function() {
  FindItemBinarySearch(numbers, 85);
 });
```  

|Test|Ops/sec|
|:---:|:---:|
|Find numbers - linear|6045812|
|Find numbers - Binary Search	|6116343|   

그래프 이미지 주소 : http://1.bp.blogspot.com/-APP7aI1q68c/T5HmE-PGDsI/AAAAAAAAAPg/_QdjelVPOvQ/s400/linear-vs-binary.png  

이것은 알고리즘을 선택할 때 항상 컨텍스트를 고려해야한다는 점을 강조합니다.  

## 결론

이러한 예를 기반으로 Big O 표기법이 알고리즘의 성능 테스트가 아님이 명백해야합니다. 컨텍스트 개념이 없으며 모든 요소를 고려하지 않습니다. 또한 CPU 속도, 메모리 사용량 등이 다양합니다. 또한 입력 크기가 알고리즘 선택을 추론 할 수 있음을 보여주었습니다. 그것이 우리에게 주는 것은 특히 큰 데이터 세트를 다룰 때 우리가 기대할 수 있는 것에 대한 생각입니다.  