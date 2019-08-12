# 자바스크립트 클로져 이해

클로저는 복잡하지 않습니다. 단 10분만에 클로저의 기초를 배우고 이해 해봅시다.

## 클로저는 무엇입니까?

클로저는 모든 개발자가 알고 이해해야되는 자바스크립트의 주요 측면입니다. 오늘날의 글은 클로저 표면만 훓어 보았지만 자바스크립트에서 클로저가 무엇인지 어떻게 작동하는지에 대한 좋은 아이디어를 줄 것입니다. 뛰어 들어가 봅시다.  

우리는 클로저에 대한 두 가지 교과서 정의를 살펴 볼 것입니다.

### 정의 #1
클로저는 스코프가 닫힌 후에도 상위 스코프에 접근 할 수 있는 함수입니다. 

### 정의 #2
클로저는 함수와 해당 함수가 선언된 'lexical environment'의 조합입니다.

<hr>

좋습니다. 그러나 실제로 무엇을 의미할까요?

먼저 자바스크립트의 스코프를 이해해야됩니다. 스코프는 본질적으로 자바스크립트에서 변수의 수명입니다. 변수가 정의 된 위치는 해당 변수의 지속 시간과 프로그램의 함수에 접근하는데 큰 역할을 합니다.

예를 들어 봅시다.  

자바스크립트로 함수를 작성하면 함수 내부 및 외부에서 작성된 변수에 접근 할 수 있습니다.  

함수 내에서 생성 된 변수는 로컬로 정의된 변수입니다. 지역변수는 정의된 함수(스코프) 내에서만 접근 할 수 있습니다. 아래 예제에서 함수 외부의 `words` 값을 기록하려고 하면 참조 오류가 발생 함을 알 수 있습니다. `words`는 지역 스코프가 지정된 변수 이기 때문입니다. 

```javascript
// Example of accessing variables INSIDE the function
// words is a LOCAL variable
function speak(){
  var words = 'hi'; 
  console.log(words);
}
speak(); // 'hi'
console.log(words); // Uncaught ReferenceError: words is not defined
```
이 예제와는 대조적으로, 우리가 전역 스코프에서 `words`를 정의하는 경우 문서의 모든 함수에 접근 할 수 있습니다.

```javascript
// Example of accessing variables OUTSIDE the function
// words is a GLOBAL variable
var words = 'hi';
function speak(){ 
  console.log(words);
}
speak(); // 'hi' 
console.log(words); // 'hi'
```

## Nested Functions 
한 함수를 다른 함수 안에 중첩하면 어떻게 됩니까?  
이 예제가 재미있어지기 때문에 다음 예제를 따라가 보십시오.  

Chrome을 사용하는 경우 콘솔창 여는 방법
[WINDOWS] : Ctrl + Shift + J   
[MAC] : Cmd + Opt + J  

cool. 이제 아래 코드를 복사하여 콘솔창에 붙여 넣습니다. 우리는 `speak`라는 함수를 만드는 것입니다. `speak`는 `logIt`이라는 함수를 반환합니다. 마지막으로 `logIt`은 `words`의 값을 콘솔에 기록합니다. 이 경우 콘솔에 `'hi'`를 기록합니다.  

```javascript
function speak() {
  return function logIt() {
    var words = 'hi';
    console.log(words);
  }
}
```

콘솔에 복사 한 후 변수를 만들어 `speak`함수를 다음과 같이 할당합니다:
```javascript
var sayHello = speak();
```

이제 우리는 변수를 부르지만 내부 함수을 불러들이지 않아도 `sayHello`의 값이 무엇인지 알 수 있습니다:
```javascript
sayHello;
//  function logIt() {
//    var words = 'hi';
//    console.log(words);
//  }
```
예상대로 `sayHello`는 반환된 내부 함수를 참조합니다. 이것은 콘솔에서 `sayHello()`를 실행하면 `logIt()`함수를 호출하고 실행한다는 것을 의미합니다:

```javascript
sayHello();
// 'hi'
```

효과가 있어! 그러나 이것은 특별한 것은 아닙니다. 한 줄의 코드를 움직여서 어떤 변화가 있는지 봅시다. 아래 예제를 살펴보십시오.  
변수 `words` 선언을 내부함수에서 외부`speak()`함수로 옮겼습니다:
```javascript
function speak() {
  var words = 'hi';
  return function logIt() {
    console.log(words);
  }
}
```
이전과 마찬가지로 변수를 선언하고 `speak`함수에 할당합니다 : 
```javascript
var sayHello = speak();
```

이제 `sayHello`변수가 무엇을 참조하는지 살펴 보겠습니다 :  
```javascript
sayHello
//  function logIt() {
//    console.log(words);
//  }
```
Uh oh. `words` 변수 정의가 없습니다. 함수를 호출하면 어떻게 될까요?  
```javascript
sayHello();
// 'hi'
```

여전히 작동합니다! 클로저의 효과를 방금 경험했기 때문입니다.  

혼란스러운가요? 괜찮습니다. 클로저 정의를 다시 생각해보십시오.  
```
클로저는 범위가 닫힌 후에도 상위 스코프에 접근 할 수있는 함수입니다.  
```

이 경우 `speak()`함수의 스코프가 닫혔습니다. 이것은 `var words = 'hi'`도 사라져야 함을 의미합니다. 그러나 자바스크립트에는 클로저라는 멋진 작은 개념이 있습니다. 내부 함수는 생성된 범위에 대한 참조를 유지합니다. 이렇게하면 `speak()`가 닫힌 후에도 `logIt ()`함수가 `words`변수에 계속 접근 할 수 있습니다.  

```javascript
function speak() {
  var words = 'hi';
  return function logIt() {
    console.log(words);
  }
}
```
자바스크립트의 모든 함수에는 클로저가 있습니다. 이 기능을 작동시키기 위해 함수에 대해 명시적으로 할 필요는 없습니다. 자바스크립트의 일부일 뿐입니다. 

## Example #2  

다른 예를 살펴 보겠습니다. 조금 더 복잡합니다. 코드는 다음과 같습니다 : 

```javascript
function name(n) {
  return function(a) {
    return `${n} likes ${a}`;
  };
}
```
하나의 매개 변수를 사용하고 다른 매개 변수를 사용하는 익명 함수를 반환하는 `name`함수가 있습니다. 내부 함수의 결과는 문자열을 반환합니다.  

`name`함수를 두 번 호출 해봅시다. 하나는 John이라는 이름을, 다른 하나는 Cindy를 전달합니다.  

```javascript
var j = name('John');
var c = name('Cindy')
```
이제 `j`가 무엇을 참조하는지 정확히 알 수 있습니다 : 
```javascript
j;
//  function (a) {
//    return `${n} likes ${a}`;
//  }
```
대단합니다! 이전 예제에서 클로저로 인해 함수가 여전히 상위 스코프에서 `n`변수에 접근 할 수 있어야 한다는 것을 알고 있습니다. 함수를 호출 할 때 값을 전달하면됩니다. 
시도해 봅시다 :  

```javascript
j('dogs');  // 'John likes dogs'
c('cats');  // 'Cindy likes cats'
``` 
작동합니다! 클로저로 인해 이전에 닫힌 스코프의 변수를 참조하는 함수를 성공적으로 실행할 수 있습니다.  


### 더 발전된 자바스크립트를 원합니까?

Check out: JavaScript: [Understanding the Weird Parts](https://codeburst.io/javascript-understanding-the-weird-parts-d1d0e7061ebf)  


### Closing Notes

클로저의 기본 사항이 자바스크립트로 어떻게 작동하는지 이해할 수 있기를 바랍니다. 이것은 단지 빙산의 일각 일뿐입니다. 이제 클로저의 더 복잡하고 실용적인 예에 대해 배울 지식이 있습니다.  



