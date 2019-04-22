## 자바스크립트에서 Triple-Equals Operator(=== 일치연산자)를 사용하는 이유는 무엇인가?

“두 변수가 동등한지 여부를 결정하는 것은 프로그래밍에서 가장 중요한 작업 중 하나이다.” 이는 Nicholas Zakas 저서 《[JavaScript for Web Developers](https://www.amazon.com/Professional-JavaScript-Developers-Wrox-Programmer/dp/047022780X/)》에 실린 것입니다.  

다시 말해, 스크립트 전반에 걸쳐 다음과 같은 행이있을 것입니다.  

```javascript
if(x == y){
  // 여기에 무엇인가 하십시오.
}
```
또는 우수 사례를 준수하는 경우 다음과 같습니다.
```javascript
if(x === y){
  // 여기에 무엇인가 하십시오.
}
```
두 예제의 차이점은 두 번째 예제가 "strict equals"또는 "identically equal"이라고 하는 일치연산자를 사용한다는 것입니다.
우수 사례를 따르려고하는 자바스크립트 초보자는 double-equals(== 동등연산자)가 아닌 triple-equals(=== 일치연산자)를 사용 할 수 있지만 그 차이가 무엇인지, 왜 triple-equals(=== 일치연산자)를 고수하는 것이 중요한지 완전히 이해하지 못할 수도 있습니다.     

### 차이점이 무엇입니까?

double-equals(== 동등연산자)를 사용하여 비교 할때, 두 항목이 같은 경우 결과는 `true`를 반환합니다.  
하지만 중요한 점이 하나 있습니다.  
비교되는 두 가지 다른 type의 값 사이에 비교가 이루어지면 type 강제 변환이 발생합니다.

각 자바스크릡트 값은 특정'type'에 속합니다. 이러한 type은 Numbers, strings, Booleans, functions, 그리고 objects입니다. 
따라서 문자열을 숫자와 비교하려고 시도하면 브라우저는 비교를 수행하기 전에 문자열을 숫자로 변환하려고 합니다. 
마찬가지로 true 또는 false를 숫자와 비교하면 true또는 false값이 각각 1 또는 0으로 변환됩니다. 

예측할 수 없는 결과를 가져올 수 있습니다. 다음은 몇 가지 예시입니다. 

```javascript 
console.log(99 == "99"); // true
console.log(0 == false); // true
```

처음에는 좋은 일처럼 느껴질 수 있지만(브라우저가 당신에게 호의를 베풀고 있는 것처럼 보이기 때문에) 문제를 일으킬 수 있다. 예를 들면 :
```javascript
console.log(' \n\n\n' == 0); // true
console.log(' ' == 0); // true
```
이 점에 비추어, 대부분의 자바스크립트 전문가는 항상 Triple-Equals(=== 일치) 연산자를 사용하고 double-equals(== 동등)을 사용하지 말 것을 권장합니다.  

Triple-Equals(=== 일치) 연산자는 아마도 지금까지 알아 낸 것처럼 타입 강제 변환을하지 않습니다. 따라서 일치연산자를 사용할 때마다 실제 값을 정확하게 비교할 수 있습니다. 값이 'strictly equal'하거나 'identically equal'을 보장합니다.

즉, triple-equals(=== 일치)을 사용하면 위의 모든 예제에서 올바른 결과가 산출됩니다.  

```javascript
console.log(99 === "99"); // false
console.log(0 === false); // false
console.log(' \n\n\n' === 0); // false
console.log(' ' === 0); // false
```

### 불일치는 어떨까요?
동일하지 않은 표현을 할 때, 동일한 규칙이 적용된다.  
이번에는 예외로  triple-equals 대 double-equals 대신 double-equals 대 single을 쓰고 있는 겁니다.  
위에서와 같은 예를 들자면, 이번에는 `!=` 연산자로 표현됩니다.  

```javascript
console.log(99 != "99"); // false
console.log(0 != false); // false
console.log(' \n\n\n' != 0); // false
console.log(' ' != 0); // false
```

각 경우의 원하는 결과가 "true"여야합니다. 대신에 type 강요로 인해 거짓입니다. 

double-equals(!==)로 변경하면 올바른 결과를 얻을 수 있습니다.  
```javascript
console.log(99 !== "99"); // true
console.log(0 !== false); // true
console.log(' \n\n\n' !== 0); // true
console.log(' ' !== 0); // true
```

### 결론

이미 언급한 바와 같이, 당신은 아마도 꽤 독점적으로 triple-equals를 사용했을 것입니다. 
이 글을 연구하면서, 나는 이 개념에 대해 몇 가지를 사실을 알게되었습니다.

가장 좋은 요약은 `Zakas`에서 다시 나온 것이라고 생각합니다. 
`Zakas`는 항상 strict equals(엄격 동등)을 사용할것을 권장 한 후 '코드 전체에 데이터 type 무결성을 유지하는데 도움이 됩니다'라고 말합니다.

