## 현실에서 JavaScript 비트와이즈 연산자(Bitwise Operators) 사용하기

JavaScript의 비트와이즈 연산자는 (12 & 3) = 0 및 (12 & 4) = 4 인 이상한 야생세상을 소개합니다. 지금 당장 console을 사용해보세요. 나는 거짓말을 하지 않는다!  어떻게 정확하게 작동 하는지를 모르는 경우, 다음 내용을 읽어 보세요.  
어떻게 해결해야 할지 확실히 모르는 프로그래밍 문제에 대한 해결책일 수도 있습니다.  

최근 한 동료가 우리 팀에게 개체에 네 개의 독립적 참/거짓 변수가 있는지 최선의 저장 및 확인하는 방법을 물었습니다. 이 속성을 foo1 에서 foo4라고 불러봅시다. 그래서 JavaScript(ES6)에서의 표현은 다음과 같이 보일 수 있습니다.
```javascript
const myObject = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
};
```

아주 간단합니다. 그러나 우리의 앱은 이러한 네 가지 속성의 많은 조합을 확인해야 했습니다. 


#### 1) 가능한 모든 모델 객체를 만든 다음 필요할 때 코드에서 비교합니다. 이렇게 : 

```javascript
const hasFoo2andFoo4 = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
}
 
const hasFoo3andFoo4 = {
  foo1: false,
  foo2: false,
  foo3: true,
  foo4: true
}
 
// ...You get the idea...
 
// Then later in the code:
if (isEqual(myObject, hasFoo2andFoo4)) {
  // This is how we know the object only has Foo2 and Foo4
}
```

분명히 볼 수 있듯이, 이건 정말 짜증난다.   
우리는 비교하기 위해 최대 16개의 모델 객체를 만들어야 할 수도 있는데, 너무 적은 정보 때문에 오버헤드가 너무 많은 것 같습니다.  
게다가 앞으로 또 다른 속성을 추가하면 우리의 모델 객체의 수가 두 배가 될 것 입니다. 분명히, 피해야 합니다. 하지만 우리의 다른 선택은 더 나빴을지도 몰라...  

#### 2) 조건부 블록 내의 각 개별 속성을 확인하십시오. 

```javascript
if (myObject[2] && myObject[4] && !(myObject[1] || myObject[3])) {
  // 우리는 객체가 Foo2와 Foo4 만 가지고 있다는 것을 알고 있습니다.
}
```


또 다른 악몽... 처음에는 오류가 발생하기 쉬운 클라이언트측 코드에 약 백만 개의 조항을 붙여야합니다. 그런 다음 속성이 변경되거나 새로운 속성이 추가되는 경우 엄청난 정리 작업이 필요합니다. 그럼 이제 어떻게 해야 할까요?
그날 아침 지나치게 카페인이 많고 정보가 부족한 상태에서, 우리가 기본적으로 UNIX 파일 시스템이 사용하는 허용 bit-masking 기능을 모방하고 있다는 것을 깨달았다. “755”, read-write-execute, “rwxr-xr-x”? 파일 시스템 사용 권한은 더 복잡하지만, 아마도 그것들은 우리의 문제를 해결하는 데 사용될 수 있을 것입니다. 머릿속으로 각 속성에 숫자를 할당하는 방법에 대해 아이디어를 모으기 시작했습니다. 그리고 각 주에 대해 고유한 숫자를 생각해 내기 위해 숫자를 추가했습니다.

그때 다른 동료가 나를 구해주었습니다. "파일 시스템 사용 권한을 재구현하는 대신 비트전송률만 사용하는게 어때?" 
아 그래, 나는 그게 뭔지 희미하게는 알았습니다. 몇 년 동안 그것을 여러 번 사용했지만 완전히 이해하지는 못했습니다.
다행히도 이 동료는 이 전에 했던 프로젝트에서 그것들을 사용한 적이 있어서 우리를 이해시킬 수 있었습니다.

비트와이즈 연산자들은 파일시스템의 허가와 같은 일반적인 개념으로 작동하지만, 내가 상상했던 것보다 훨씬 우아하게 작동합니다. 정수를 수동으로 추가하고 빼는 대신 비트와이즈 연산자는 각 정수를 나타내는 비트를 작업하여 직접 비교하고 조작할 수 있습니다. 따라서 0과 1에 따라 4비트 수(또는 3비트 또는 12비트)를 조작할 수 있으며, 각 비트는 ture/false 속성 중 하나를 나타냅니다. 내가 설명 하곘습니다.

JavaScript의 모든 정수(64 비트 환경에서 최대 9,007,199,254,740,991까지)는 이진으로 나타낼 수 있습니다. toString(2) 호출하면 무엇을 나타내는지 알 수 있습니다.

```javascript
(1).toString(2);
// 1
(2).toString(2);
// 10
(3).toString(2);
// 11
(4).toString(2);
// 100
// ...
(3877494).toString(2);
// 1110110010101001110110
```

이제 중요한 부분이 나왔습니다.  이 모든 것의 진정한 트릭은 다음과 같습니다.  
비트와이즈 연산자는 이진 문자열을 직접 비교하고 조작할 수 있게 합니다. 따라서 이진 문자열의 오른쪽에 0을 넣는 비트와이즈 연산자 <<는 이진 규칙에 따라 정수 소수 값을 증가시킵니다. 내 말은 다음과 같습니다.  

```javascript
// `fooBar`를 2로 설정합시다.
let fooBar = 2;
fooBar.toString(2);
// 10 (<- 이진 표현입니다)
// We're inserting (1) zero at the end of fooBar's binary
// representation
foobar = fooBar << 1;
fooBar.toString(2);
// 100
// ...so this means fooBar, in decimal form, now equals 4. Rad!
console.log(fooBar);
// 4
```

이게 어디로 가는지 알 수 있을 겁니다. 비트와이즈 연산자의 전체 범위를 감안할 때 이제는 바이너리로 더하기, 빼기 및 비교할 수 있습니다.  
위의 구체적인 예에서 우리는 가능한 모든 4가지 속성을 하나의 4비트 숫자 인 0000-1111 사이에 저장할 수 있습니다. 각 비트는 true(1) 또는 false(0)을 나타냅니다.    
따라서 스키마를 사용하면 이진수 1111은 모든 속성이 ture이고 나머지는 false라는 것을 알 수 있습니다.    
1000은 네 번째 속성 만 true라는 것을 의미합니다 (이진수는 오른쪽에서 왼쪽으로 가고, 첫 번째 속성은 1 또는 0001이고 "네 번째"는 1000이됩니다).  

가장 중요한 두 비트와이즈 비교 연산자는 "&"와 "|"입니다. "&&"와 "||"와의 닮은 것은 의도적이지만, 오해의 소지가 있습니다. "&"는 비교할 두 숫자의 교차 부분에 대한 이진 표현을 반환하며, "|"는 합집합을 반환합니다. 따라서 1010과 1001은 1000을 반환합니다. 왜냐하면 가장 왼쪽의 1이 둘 사이의 유일한 비트이기 때문입니다. 1010 | 1001은 모두 공통된 비트이기 때문에 1011을 반환합니다.  

내가 좀 길게 말하고 있지~ 그냥 빌어먹을 예를 들어 봅시다.

```javascript
// Let's define an object that needs to be checked. In the
// real world, this might come from an API response, or user
// interactions, or a form, etc. You might not know it beforehand.
const myObject = {
  foo1: false,
  foo2: true,
  foo3: false,
  foo4: true
}
// Let's also set up some constants to make code easier to 
// read later on. These could obviously take many forms, or be set
// up in different ways, but I find this the most intuitive to read:
const HAS_FOO1 = 1;         // 0001
const HAS_FOO2 = 1 << 1;  // 0010
const HAS_FOO3 = 1 << 2;  // 0100
const HAS_FOO4 = 1 << 3;  // 1000
// Construct your bitwise number. How you do this will depend
// on your use-case, but here's one way to do it: Checking object
// keys manually and using if statements to add attributes one at
// a time.
let myBitNumber = 0;
if (myObject['foo1'] === true)
  myBitNumber = myBitNumber | HAS_FOO1;
  // This uses the bitwise | to form a union
if (myObject['foo2'] === true)
  myBitNumber = myBitNumber | HAS_FOO2;
if (myObject['foo3'] === true)
  myBitNumber = myBitNumber | HAS_FOO3;
if (myObject['foo4'] === true)
  myBitNumber = myBitNumber | HAS_FOO4;
console.log(myBitNumber.toString(2));
// 1010
/*
 * Our bitwise number is now "1010". That's because our second and
 * fourth attributes are true.
 * Think of it this way:
 *
 * | fourth | third | second | first | <= Attribute
 * |    1   |   0   |   1    |   0   | <= True/false
 *
 */
```

이제, 테스트를 해봅시다. 비트와이즈 수를 체크해보면, 당신이 확인할 수 있는 네 가지 상태가 있습니다.  
숫자에 특정 속성이 있는지, 주어진 속성의 배열이 모두 있는지, 지정된 속성 만 있는지, 또는 모든 속성 배열을 가지고 있는지. 도움이되는 bitwise cheat-sheet, 몇 가지 코드 예제가 있습니다.

<img src="https://cdn-images-1.medium.com/max/1600/1*6jimeIdYjNXn8oGKW0TMew.png" alt="" width="900">

```javascript
// Test whether your bit number has a single attribute. '&' ensures
// an intersection between them.
if (myBitNumber & HAS_FOO1) {
  // False, in this example
}
if (myBitNumber & HAS_FOO2) {
  // True!
}
// Test whether your bit number has ANY of the specified attributes
if (myBitNumber & (HAS_FOO1 | HAS_FOO2)) {
  // True!
}
if (myBitNumber & (HAS_FOO1 | HAS_FOO3)) {
  // False
}
// Test whether your bit number contains ONLY the specified attributes
if (myBitNumber == (HAS_FOO2 | HAS_FOO4)) {
  // True
}
if (myBitNumber == (HAS_FOO2 | HAS_FOO3 | HAS_FOO4)) {
  // False
}
// Test whether your bit number contains ALL of the given
// attributes. This is slightly tricky: the union of ATTRIBUTES 
// can't supersede `myBitNumber` alone, otherwise it contains a bit
// that `myBitNumber` doesn't.
if (myBitNumber == (myBitNumber | (HAS_FOO2 | HAS_FOO4))) {
  // True
}
if (myBitNumber == (myBitNumber | (HAS_FOO2 | HAS_FOO3 | HAS_FOO4))) {
  // False
}
```

이것이 바로 요약입니다. 비트 연산자를 사용하여 여러 true / false 속성을 효율적으로 저장 및 비교하는 기능적인 예입니다. 읽기 쉽고 이해하기 쉬우며 업데이트 및 유지 관리가 쉽습니다. 한 절을 편집하거나 다른 특성을 추가해야하는 경우 기하 급수적으로 어려움이 없습니다.

그리고 가장 중요한 부분은 0과 1을 다루는 것입니다. 따라서 충분한 커피를 마시고 눈을 감는 경우, 잠시 동안은 1950 년대 machine-language coder라고 할 수 있습니다.