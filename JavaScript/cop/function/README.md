## 함수
함수는 함수 외부 (또는 재귀(recursion)의 경우엔 내부) 코드에 의해 호출될 수 있는 "하위프로그램" 이다. 

프로그램 그 자체처럼, 함수는 함수 몸통(function body)이라고 하는 일련의 문(statement)으로 구성됩니다. 값은 함수에 전달될 수 있고 함수는 값을 반환한다.

- javascript에서 모든 함수는 Function 객체이다.
- 함구는 기본 반환값은 undefinded 이다.

***

```
반환값을 지정할 경우 return문이 있어야된다
new 생성자의 경우 기본값은 자신의 this 매개변수 값이다.
```



### 함수 리터럴
```
function name(param){
	statements
}
```
name : 함수 이름 (익명일 경우 생략)

param : 함수에 전달되는 인수의 이름 (255개까지 인수를 가질수 있다.)

statements : 함수 몸통을 구성하는 문

***

### 함수 실행법
즉시 실행
```
(function(){	
	statements
})();
```
```
!function(){
	statements
}();
```
함수 실행
```
function name(){
	statements
}
name();
```
***

#### return 이란??

return은 함수의 예약어 이다.

- 값을 반환하는데 사용
- 지역변수를 알 수 있는데 사용
- 현재 진행중인 함수를 중지

ex) 값을 얻을때 
```
var value = function(){
	var x = 1;
	var y = 2;
	
	return x + y;
}

console.log('값',value());     //값 3

```

***

### 함수 생성 방법 3가지
- 함수 선언문
- 함수 표현식
- function() 생성자 함수



#### 함수 선언문
```
function name(a,b){
	if(typeof a === 'number' && typeof b === 'number'){
		return a+b;
	}
	return '숫자가아님';
}
console.log(name(1,3));

```
함수 리터럴 형태와 같지만 주의할 점은 반드시 **함수명은 존재** 하여야된다.


#### 함수 표현식

자바스크립트에서는 함수도 하나의 값처럼 취급된다. 따라서 함수도 숫자나 문자열 처럼 변수에 할당이 가능하다.

#### 익명 함수 표현식

함수 이름이 없는 경우 익명함수라고 한다.

```
var name = function(a,b){
	if(typeof a === 'number' && typeof b === 'number'){
		return a + b;
	}
	return '숫자가아님';
};

var edward = name;

console.log(name(1,3));   //4
console.log(edward(7,7));  // 14

```

#### 기명 함수 표현식

```
var name = function testName(a,b){
	if(typeof a === 'number' && typeof b === 'number'){
		return a + b;
	}
	return '숫자가아님';
};

var edward = name;

console.log(name(1,3));   //4
console.log(edward(7,7));  // 14
console.log(testName(1,1));   // 에러

```

함수 표현식에서 사용된 함수 이름이 외부 코드에서 접근이 불가능 하기때문에 에러가 발생한다.


#### 기명 함수 표현식 (재귀호출)

**함수 이름을 이용할 경우 함수 코드 내부에서 함수 이름으로 함수의 재귀적인 호출 처리 가능**


```
var test = function innerTest(n){
	if(n <= 1){
		return 1;
	}
	return n * innerTest(n-1);
}

console.log(test(4));  // 24
console.log(test(1));  // 1

console.log(innerTest(5));  // 에러

```


#### 생성자 힘수를 통한 함수 생성

```
var add = new Function('x','y','return x + y');

console.log(add(3,4));
```

Function() 생성자 함수를 사용한 함수 생성 방법은 자주 사용되지 않는다.

***

#### 함수는 인자로도 쓸수가있다.

```
function abc(){
  var alpha = function(x,y){
    return x + y;
  };

  var beta = function(a,b){
    return a * b;
  };
  var testAlpha = alpha(3,4);   // 7

  return beta(2,testAlpha);  // 14
}

console.log(abc());
```
이처럼 실행을 한 함수를 가져올 수도 있고 함수 실행전을 가져 올 수도있다.

```
function abc(){
  var alpha = function(x,y){
    return x + y;
  };

  var beta = function(a,b){
    var b = b(3,4);
    return a * b;
  };

  return beta(2,alpha);  // 14
}

console.log(abc());
```
***

### 함수 예제들

1. 서울에서 부산까지 기차를 타고 가는데 역마다 사람들이 탄다. 총 타는 사람을 구하여라! (각 역마다 함수를 짜서 구하십시오, return을 활용하여 각각 덧셈을 하십시오)
서울 : 20명, 대전 : 15명, 대구 : 5명

```
function train(){
	var seoul = function()}{

	}

	var daejeon = function(){

	}

	var daegu = function(){

	}

}

train(); // 총 기차 탄 인원수
```

