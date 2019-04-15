## (Not) JavaScript의 모든 것이 객체입니다.

답을 원하는 사람들에게는, 마지막에 '요약'으로 자유롭게 뛰어 갈 수 있습니다.

이 게시물은 [러시아어](https://medium.com/devschacht/daniel-li-not-everything-in-javascript-is-an-object-82fe5026e1a2)로 번역되었습니다. ?? ㅡ_ㅡ;;

자바스크립트가 OOP(Object-Orientated Programming) 언어인지, functional 언어인지에 대해서는 많은 혼란이 있다. 실제로, 자바스크립트는 둘 중 하나로 작동할 수 있다.  

그러나 사람들은 "자바스크립트 객체의 모든 것이 있습니까?", "함수는 무엇입니까?" 라고 묻습니다.  

이 게시물은 모든 것을 정리 할 것입니다. 

### 시작합시다.

자바스크립트에는 다음과 같은 여섯 가지 기본 데이터 유형이 있습니다. 

- boolean - `true` or `false`
- `null`
- `undefined`
- `number` - double-precision 64-bit float(64비트) 자바스크립트에는 정수가 없습니다.
- `string`
- `symbol` (ES6) 

ECMAScript 표준은 이러한 여섯 가지 기본 자료형 외에도 단순히 키 - 값 저장소인 객체 유형을 정의합니다.  

```javascript
const object = {
  key: "value"
}
```
간단히 말해, 기본 자료형이 아닌 것은 객체이며, 여기에는 함수와 배열이 포함됩니다.

##### 모든 함수는 객체입니다.
```javascript
// Primitive types
true instanceof Object; // false
null instanceof Object; // false
undefined instanceof Object; // false
0 instanceof Object; // false
'bar' instanceof Object; // false

// Non-primitive types
const foo = function () {}
foo instanceof Object; // true
```

### Primitive types (원시형 or 기본 자료형)

기본 자료형에는 해당 메소드가 없습니다. 따라서 `undefined.toString()`를 절대로 볼 수 없습니다.  
또한 이것 때문에, 기본 자료형은 변경할 수있는 메소드가 첨부되어 있지 않으므로 변경 불가능합니다.  

기본 자료형은 변수에 재 할당 할 수 있습니다 다만, 새로운 값이됩니다. 이전의 형은 변경되지 않습니다.  

```javascript
const answer = 42
answer.foo = "bar";
answer.foo; // undefined
```

##### Primitive types(원시형 or 기본 자료형)은 불변이다.

또한 기본 자료형은 참조로 저장되는 객체와 달리 값 자체로 저장됩니다. 이것은 평등 검사를 수행 할 때 영향을 미칩니다.

```javascript
"dog" === "dog"; // true
14 === 14; // true

{} === {}; // false
[] === []; // false
(function () {}) === (function () {}); // false
```

##### Primitive types(원시형 or 기본 자료형)은 값으로 저장되고, 객체는 참조로 저장됩니다. 


### Functions

함수는 `constructor(생성자)`와 `call(호출)`과 같은 특별한 속성을 가진 유형의 객체입니다. 

```javascript
const foo = function (baz) {};
foo.name; // "foo"
foo.length; // 1
```

그리고 일반 객체와 마찬가지로 객체에 새로운 속성을 추가할 수 있습니다.

```javascript
foo.bar = "baz";
foo.bar; // "baz"
```
객체와 마찬가지로 다른 함수에 인수로서 전달 될 수 있기 때문에 함수는 1급 객체입니다. 

##### Methods
메서드는 함수이기도 한 객체 속성입니다.

```javascript
const foo = {};
foo.bar = function () { console.log("baz"); };
foo.bar(); // "baz"
```

### Constructor Functions (생성자 함수)

동일한 구현을 공유하는 여러 객체가 있는 경우 해당 논리를 생성자 함수 안에 배치한 다음 생성자 함수를 사용하여 해당 객체를 작성할 수 있습니다.  
생성자 함수는 다른 함수와 다르지 않습니다.  
함수는 `new` 키워드 뒤에 사용될 시 생성자 함수로 사용됩니다.  

##### 모든 함수는 생성자 함수가 될 수 있습니다.

```javascript
const Foo = function () {};
const bar = new Foo();
bar; // {}
bar instanceof Foo; // true
bar instanceof Object; // true
```

생성자 함수는 객체를 반환합니다. 함수 본문 내부에서 `this` 기능을 사용하여 객체에 새 특성을 할당할 수 있습니다.  
따라서 속성 `bar`에 `"baz"`값으로 초기화 된 많은 객체를 만들고 싶다면 해당 논리를 캡슐화하는 새로운 생성자 함수 `Foo`를 만들 수 있습니다.

```javascript
const Foo = function () {
  this.bar = "baz";
};
const qux = new Foo();
qux; // { bar: "baz" }
qux instanceof Foo; // true
qux instanceof Object; // true
```

##### 생성자 함수를 사용하여 새 객체를 만들 수 있습니다.

`new`가없는 `Foo()`와 같은 생성자 함수를 실행하면 `Foo`가 정상 함수처럼 실행됩니다. 함수 내부에 `this`는 실행 컨텍스트에 해당합니다.  
따라서 모든 함수 외부에서 `Foo()`를 호출하면 실제로 `window` 객체가 수정됩니다.  

```javascript
Foo(); // undefined
window.bar; // "baz"
```
반대로 생성자 함수로 정상 함수를 실행하면 이미 본 것처럼 새로운 빈 객체가 반환됩니다.

```javascript
const pet = new String("dog");
```

### Wrapper Objects

String, Number, Boolean, Function 등과 같은 기능으로 인해 혼란이 발생한다. 
new로 호출하면 이러한 기본 자료형에 대한 Wrapper Object가 만들어집니다.

`String`은 인수에 전달 될 때 기본 문자열을 만드는 전역 함수입니다. 이 인수를 문자열로 변환하려고합니다.  

```javascript
String(1337); // "1337"
String(true); // "true"
String(null); // "null"
String(undefined); // "undefined"
String(); // ""
String("dog") === "dog" // true
typeof String("dog"); // "string"
```

그러나 `String`함수를 생성자 함수로 사용할 수도 있습니다.  
```javascript
const pet = new String("dog")
typeof pet; // "object"
pet === "dog"; // false
```

그러면 다음 속성을 사용하여 문자열 "dog"를 나타내는 new object(wrapper object라고도 함)가 만들어집니다. 

```javascript
{
  0: "d",
  1: "o",
  2: "g",
  length: 3
}
```

Object wrappers는 종종 wrapper objects라고 불립니다. 이해가 안돼

### Auto-Boxing

흥미로운 점은 기본 문자열과 객체 모두의 생성자가 둘 다 `String` 함수라는 것입니다. 
훨씬 더 흥미로운 사실은 기본 문자열에서 `.constructor`를 호출 할 수 있다는 것입니다. 
우리가 이미 원시 타입이 메소드를 가질 수 없다는 것을 이미 살펴봤을 때입니다!

```javascript
const pet = new String("dog")
pet.constructor === String; // true
String("dog").constructor === String; // true
```

무슨일이 일어나는것은 autoboxing이라는 과정입니다. 
특정 기본 자료형에 대한 속성이나 메소드를 호출하려고할 때 자바스크립트는 먼저 임시 wrapper object로 변환하고 원본에 영향을 미치지 않고 속성 / 메소드에 액세스합니다. 

```javascript
const foo = "bar";
foo.length; // 3
foo === "bar"; // true
```

위의 예제에서 속성 길이에 액세스하려면 자바스크립트는 foo를 wrapper object로 autobox 처리하고 wrapper object의 length 속성에 액세스 한 다음 삭제합니다. 이것은 foo에 영향을주지 않고 수행됩니다 (foo는 여전히 기본 문자열입니다).  

이것은 또한 왜 자바스크립트가 당신이 기본자료형에 할당하려고 시도하여도 별 문제가 발생하지 않는지 설명해준다. 왜냐하면 할당은 그 기본자료형 자체가 아닌 임시 wrapper object에 할당이 완료되었기 때문이다.

```javascript
const foo = 42;
foo.bar = "baz"; // 임시 wrapper object에 할당이 완료되었습니다.
foo.bar; // undefined
```
`undefined` 또는 `null`과 같은 wrapper object가없는 기본 유형으로 작업을 시도하면 불평 할 것입니다.

```javascript
const foo = null;
foo.bar = "baz"; // Uncaught TypeError: Cannot set property 'bar' of null
```

### Summary (요약)

1. 자바스크립트의 모든 것은 객체가 아닙니다. 
2. 자바스크립트에는 6가지 기본 자료형이 있습니다.
3. 기본 자료형이 아닌 것은 모두 객체입니다.
4. 함수는 단지 특별한 유형의 객체 일뿐입니다.
5. new 객체를 만드는 데 함수를 사용할 수 있습니다.
6. Strings, Boolean, Number는 기본자료형으로 표현 될 수 있지만 객체로도 표현 될 수 있습니다.
7. 특정 기본 유형 (Strings, Boolean, Number)은 (autoboxing)이라는 자바스크립트 기능 때문에 객체처럼 작동하는 것으로 보입니다.