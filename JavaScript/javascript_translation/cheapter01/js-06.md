## ES6 : var, let 그리고 const - 함수 범위와 블록 범위 사이의 배틀

ES6 이전 시대에는 자바스크립트에서 변수를 선언하는 방법이 단 하나뿐이었습니다. - `var`를 사용하는 것입니다.

`var`은 항상 오해의 특별한 분위기를 가지고 있습니다. `var`로 선언된 변수의 동작이 다른 대부분의 프로그래밍 언어와 어떻게 구별되는지 때문일 것입니다. 
그 말과 함께, 모든 것은 아주 자연스러운 설명이 있습니다. - scope(범위)

문제는, `var`는 함수 범위라는 것입니다. 이러한 유형의 스코프는 더 많이 사용되는 블록 스코프와 약간 다르게 작용합니다.

이것이 무엇을 의미하는지 봅시다.

### `var` — function scope

언급 한 바와 같이, `var`를 사용하여 선언 된 변수는 함수 범위가됩니다. 
즉, 변수가 내부에 선언 된 함수의 범위 내에 존재한다는 의미입니다.

```javascript
function myFunc() {  
  var name = 'Luke'
  console.log(name); // 'Luke'
}

myFunc();

console.log(name); // name is not defined  
```

보시다시피 함수 내부에 `var`로 선언된 변수는 함수 외부에서 도달할 수 없습니다.
이와 같이 다른 유형(if문, loop 등)의 블록은 범위로 간주되지 않습니다.
```javascript
if(true) {  
  var name = 'Luke'
}

console.log(name); // 'Luke'  
```

`var`를 사용하면 변수 이름은 변수가 선언 된 if 문 외부에서 사용할 수 있습니다. 그것들은 같은 범위에 있기 때문입니다.
그러나 ES6의 도입으로 변수를 선언하는 두 가지 새로운 방법이 도입되었습니다.

### `let` and `const` — the introduction of block scope

ES6에서 `let`과 `const`는 변수를 선언하는 대체 방법으로 도입되었습니다. 둘 다 차단 범위가 있습니다.
자바스크립트 이외의 다른 언어에 익숙하다면 아마 더 잘 공감할 것이다.
블록 범위에서 모든 블록이 범위가됩니다. 이렇게하면보다 일관된 동작을 얻을 수 있습니다.
즉 함수가 `var`와 마찬가지로 유효한 범위임을 의미합니다.
```javascript
function myFunc() {  
  let name = 'Luke'
  console.log(name); // 'Luke'
}

myFunc();

console.log(name); // name is not defined  
```

그러나 이 경우 다른 유형의 블록도 if문과 같은 범위로 한정됩니다.
```javascript
if(true) {  
  let name = 'Luke'
}

console.log(name); // name is not defined  
```

### When function scope gets confusing(함수 범위가 혼란 스러울때)
이제 함수 범위와 블록 범위의 차이점을 살펴 보았습니다. 
왜 이렇게 빨리 혼동을 일으킬 수 있는지 알아 보겠습니다.

외부 범위의 변수와 같은 이름을 가진 범위 안에 로컬 변수를 갖는 것은 완벽합니다.

```javascript
var name = 'Luke';

const func = () => {  
  var name = 'Phil';
  console.log(name); // 'Phil'
}

func();

console.log(name); // 'Luke'  
```

예상대로 외부 범위의 이름은 func(동일한 이름의 로컬 변수 포함)이 실행 된 후에도 초기 선언 값 'Luke'를 유지합니다.
그러나 문제는 함수 범위가 함수만 다루고 다른 유형의 블록은 다루지 않기 때문에 다른 블록과 완전히 다른 동작을 얻게된다는 것입니다.

```javascript
var name = 'Luke';

if (true) {  
  var name = 'Phil';
  console.log(name); // 'Phil'
}

console.log(name); // 'Phil'  
```

이 시나리오에서는 'Phil'이 두 위치에 모두 인쇄됩니다. 
두 변수가 같은 범위에 있기 때문에 'Phil'이 첫 번째 변수 선언을 무시하기 때문입니다.

상상할 수 있듯이, 복잡성이 증가함에 따라, 곧 진정한 골치 거리가 될 수 있습니다.

### Bringing consistency with blocked scope (블록범위와 일관성 유지)

블록 범위인 let을 살펴보면 모든 블록에서 일관성을 유지할 수 있을 것입니다.

```javascript
let name = 'Luke';

const func = () => {  
  let name = 'Phil';
  console.log(name); // 'Phil'
}

func();

console.log(name); // 'Luke'  
```
```javascript
let name = 'Luke';

if (true) {  
  let name = 'Phil';
  console.log(name); // 'Phil'
}

console.log(name); // 'Luke'  
```

### What about loops? (루프는 어떨까요?)

다른 행동을 실제로 이해하기 위해 다른 예를 들어보겠습니다.

lazy function을 배열에 push하는 루프를 만들고 싶다고합시다. 각 함수는 현재 색인을 인쇄합니다.  
우리가 `var`를 사용한다면 어떤 일이 일어날 지 먼저 살펴 보겠습니다.

```javascript
var printsToBeExecuted = [];

for (var i = 0; i < 3; i++) {  
  printsToBeExecuted.push(() => console.log(i));
}

printsToBeExecuted.forEach(f => f());  
// Output: 3, 3, 3
```
다시 말하지만, 만약 여러분이 범위를 차단하는데 익숙하다면,약간 이상하게 느껴질 것입니다. 
여러분은 0, 1, 2를 기대 하시겠습니까?

설명은 `var`를 사용할 때 루프가 범위가 아니라는 것입니다. 
따라서 각 증분에 대해 로컬 변수 i를 작성하는 대신 모든 함수에 대한 변수의 최종 값을 인쇄합니다.

한 가지 해결책은 다른 함수 내에 함수를 랩핑 한 다음 직접 실행하는 것입니다. 
이렇게하면 각 요소에 대해 적절한 범위를 얻을 수 있습니다.

```javascript
var printsToBeExecuted = [];

for (var i = 0; i < 3; i++) {  
  printsToBeExecuted.push(
    ((ii) => () => console.log(ii))(i));
}

printsToBeExecuted.forEach(f => f());  
// Output: 0, 1, 2
``` 
잘됐습니다, 예상했던 결과를 얻었는데 좀 장황한 거 맞겠죠?
이제 iteration(반복) 변수에 블록 범위 `let`을 사용하는 솔루션을 살펴보면 예상 결과뿐 아니라 첫 번째 예제의 단순함을 얻게됩니다. 

```javascript
var printsToBeExecuted = [];

for (let i = 0; i < 3; i++) {  
  printsToBeExecuted.push(() => console.log(i));
}

printsToBeExecuted.forEach(f => f());  
// Output: 0, 1, 2
```
