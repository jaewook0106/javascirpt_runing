# Javascript 데이터 구조, map, reduce, filter 그리고 ES6

자바스크립트는 명령형 프로그래밍부터 선언적 스타일까지 어떠한 스타일의 작성도 가능하도록 해준 언어입니다. 대부분의 프로그래머는 명령형을 사용합니다. 왜냐하면 그들은 객체지향언어를 배경으로 시작했거나, 그들은 그것을 사랑하거나 다른 스타일에 익숙하지 않기 때문입니다.
우리가 FP인 선언적 스타일을 두 개로 나누기 전에, 예시를 통해서 두 개의 다른 점을 이해합시다. (만약에 당신이 이미 알고 있다면 몇 문단은 패스해도됩니다.)  

## Imperative
```javascript
// to calculate the sum of array elements
const sum = (arr) => {
  let result = 0; 
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }  
  return result;
};
```

명령형 스타일은 멋지지만 만약 복잡한 수학 논리가 있다고 상상했을때 코드 크기와 가독성은 형편없을 것입니다. 그것은 읽을 때 인지부하를 증가시키고, 시간이 지남에 따라 추론과 논리에 있어서 더 쉽게 헤매도록 해줍니다.  

또한, 이 코드 스니펫의 주요 복잡성은 우리가 원하는 것을 컴퓨터에 말하는 대신, 우리가 그것을 어떻게 하는지 지시하고 있다는 사실에서 비롯됩니다.

## Declarative
```javascript
// calculate the sum of array elements
const sum = (arr) => arr.reduce((total, item) => total += item, 0);
```
이제,이 코드는 꽤 깔끔하고 짧아보이고 전달력있고 간결한 코드처럼 보입니다. 에러를 송출할거 같지 않고, 유지보수하기 쉽고 디버깅 하기도 쉬워보입니다. 우리는 컴퓨터에게 어떻게 하는 것 대신에 우리가 원하는 것을 전달합니다.

선언문은 컴파일러 종료시에 쉽게 최적화할 수 있도록 접근하고 적은 부작용을 가지고 있습니다.  

Note: 만약에 위 두 개의 성능과 다른 자바스크립트 함수(map, reduce, filter, find)에 대해 걱정하고 있다면, 반드시 작은 data set을 위해 [이걸](https://codeburst.io/javascript-performance-test-for-vs-for-each-vs-map-reduce-filter-find-32c1113f19d7) 읽고 large data set(100–1000000)을 위해 [여기](https://github.com/dg92/Performance-Analysis-JS?source=post_page---------------------------)를 확인하세요.

더이상 지체하지말고, FP를 위해 제일 많이 사용되는 자바스크립트 함수와 함께 시작해봅시다.

## Map
```javascript
// definition 
collection.map((currentValue, index) => {
    // Return element for newArray
});
// example
const arr = [1,2,3,4,5];
const newArray = arr.map(i => i*10);
// return a new array with all value as multiple of 10;
```
Map 배열에서 작동하고 배열을 반환합니다. 위 코드 스니펫은 집합(예: 배열)에서 작동하며, 현재 반복 값을 가진 콜백을 인수로서 인덱스하고 새 배열을 반환합니다.  

Note: Map은 일부 조건에서는 흐름을 끊는 대신 전체 배열을 변경/변환하는 데 적합하며, map의 성능을 현명하게 파악할려면 여기에서 확인하십시오. 그러나 작은 data sets에 사용하기 쉽습니다.

## Reduce
```javascript
// definition 
collection.reduce((accumulator, item, index) => {
    // logic to perform to get accumulator as a return value
}, initialValue for accumulator);
// example
const arr = [1,2,3,4,5];
const total = arr.reduce((acc, item) => acc+= item, 0);
// return a total as 15
```
Reduce는 배열에서 작동하지만 반환 할 수있는 모든 것을 반환 할 수 있습니다. 이름 자체가 말하듯이 무엇이든 줄일 수 있으며 `map`, `find`, `filter` 또는 다른 자바스크립트 함수처럼 행동 할 수 있습니다. 위의 코드 스니펫은 배열에서 작동하고 배열 항목의 총 값을 계산하기 위해 줄입니다. 

위 예제의 설명 : 첫 번째 줄을 줄이면 acc에 0 값이 할당되고 `acc += item` 즉 `acc + acc + item`이 `0 + 1` 1로 계산됩니다. 이 1은 다음 반복 및 모든 배열 항목을 다 끝낼 때까지 계속됩니다.

## Find
```javascript
// definition 
collection.find((item) => {
    // return first element that satisfy the condition
});
// example
const arr = [1,2,8,4,5];
const value = arr.find(i => i%4 == 0);
// return the first value i.e 8 
```

<b>Find는 배열에서 작동하고 함수에서 조건을 만족하는 첫 번째 요소를 반환합니다.</b>

Note: 쉽고 단순하지만 대용량 data set에서는 효율적이지 않은 이유는 무엇입니까? [여길](https://github.com/dg92/Performance-Analysis-JS?source=post_page---------------------------) 보세요


#### 일부 실제 시나리오 + 일부 ES6에서 사용할 수 있습니다. (아래의 객체 키에서 ARMD를 시도해보십시오)

#### ARMD가 Add, Read, Modify, Delete, 자신의 특수 용어를 사용하여 쿨링하는 것이 무엇인지 궁금합니다 😄

```javascript
const users = [
  {
    id: 1,
    name: "Jonathon Haley",
    username: "Monte.Weber2",
    email: "Daphne43@yahoo.com",
    phone: "1-563-675-1857 x11708",
    website: "carmela.net",
    password: "hashed_password"
  },
  {
    id: 2,
    name: "Dean John",
    username: "dd.1",
    email: "deno@google.com",
    phone: "1-123-543-1857 123212",
    website: "dd.net",
    password: "Dean_hashed_password"
  }
];
```
추가 예제를 위해 배열로 users를 사용합니다.

#### 1. `A`RMD - users에게 새로운 요소 추가 

```javascript
const newUser = {
    id: 4,
    name: "Denomer Crazy",
    username: "crazy.1",
    email: "deno@crazy.com",
    phone: "",
    website: "crazy.app",
    password: "crazed_checker"
};
const newData = [...users, newUser]; // add element at last
or 
const newData = [newUser, ...users]; // add element at first
or 
const newData = users.concat(newUser) // the old way
```

ES6 스프레드 연산자의 사용은 배열에 요소를 추가하기가 매우 쉽습니다. 스프레드 연산자를 사용하여 두 개의 다른 배열을 압축하거나 객체의 모양을 수정하거나 동적 키 값 쌍 등을 추가할 수 있습니다.

```javascript
const hobbies = ['chess', 'pool'];
const newUsers = users.map(u => ({...u, hobbies}))
// this will add hobbies to users array and return newUsers array
```

#### 2. A`R`MD - users의 email, phone 및 website를 새로운 배열로 가져옵니다.
```javascript
const contactInfo = users.map(({email, website, phone}) => ({email, website, phone}));
```

객체 키와 map의 구조를 해제하는 es6을 사용하여 users의 연락처 정보 배열을 가져옵니다.

#### 3. AR`M`D - 객체 키 값 찾기 및 바꾸기
```javascript
const newUsers = users.map(u => u.id == 2? ({...u, name: 'te'}): u);
// this will return newUsers with all user having name 'te'
```

#### 3. ARM`D` - 객체에서 일부 키 삭제

Note : 실제로 키를 삭제하지 않고 새 객체를 반환합니다. 키 삭제 연산자를 삭제하려면 여기에서 객체 불변성을 고려해야합니다.  

키를 삭제하려면 여러 가지 방법이 있지만 가장 쉽고 단일 라인으로 볼 수 있습니다. users로부터 website를 삭제해봅시다.

```javascript
const newUsers = users.map({id, email, name, username, phone, password} => ({id, email, username, email, phone, password}));
// will return an array with all keys other than website
```

위의 코드는 큰 객체를 위해 코드화 하기가 사실상 어려운 것 같습니다.

```javascript
const newUsers = users.map(u => Object.keys(u).reduce((newObj, key) => key != 'website' ? { ...newObj, [key]: u[key]} : newObj, {}));
```

우리는`users`를 통해 `map`을하고, 각각의`user`에`reduce`를하고 `new object`(newObj)를 만든 다음 website 키를 확인합니다.  
만약 website가 이전에 형성된 것은 newObj를 반환하고 그렇지 않다면 스프레드 연산자를 수행하고 obj에 require 키를 추가하고 마침내 newObj를 반환합니다.


이전에 형성된 newObj를 반환한다면, 스프레드 연산자를 수행하고 obj에 require 키를 추가하고 마침내 newObj를 반환합니다.

<hr>

팁 감사드립니다! 💰   

내 Bitcoin 주소 : 132Ndcy1ZHs6DU4pV3q2X1GzSCdBEXX6pz  
My Ethereum 주소 : 0xc46204dfc8449Ffb0f02a9e1aD81F30D3f027010


내 이메일 목록에 추가하고 자바스크립트 및 [github](https://github.com/dg92?source=post_page---------------------------)에서 더 많은 [기사](https://medium.com/@ideepak.jsd)를 읽으려면 너의 이메일을 [여기](https://docs.google.com/forms/d/e/1FAIpQLSd51BJWwtMbZlJQwJQ2n59Q6T7aOKqvubzqqPh9eNtuEgXBjg/viewform) 에 입력하십시오. 내 미친 코드를 볼 수 있습니다


나의 다른 기사를 좋아할 수도 있습니다. 
1. [Nodejs app structure](https://codeburst.io/fractal-a-nodejs-app-structure-for-infinite-scale-d74dda57ee11)
2. [Javascript ES6- Iterables and Iterators](https://codeburst.io/javascript-es6-iterables-and-iterators-de18b54f4d4)
3. [Javascript generator-yield/next & async-await](https://codeburst.io/javascript-generator-yield-next-async-await-e428b0cb52e4)

이 게시물이 도움이 되었다면 아래의 👏 박수 치기 버튼을 클릭하여 지원을 표시하십시오! 또한 다른 사람들이 쉽게 찾을 수 있도록 추천하고 공유하십시오!

감사합니다!