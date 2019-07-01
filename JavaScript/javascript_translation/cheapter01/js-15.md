# 이건 우리 고급 자바스크립트 코스의 일부입니다. 이 게시물이 마음에 들면 확인보세요.

자바스크립트의 가장 오해 된 부분 중 하나는 this 키워드입니다. 
이 글에서는 this 키워드가 참조하고있는 것을 알아내는 다섯 가지 규칙을 배웁니다. 
Implicit Binding, Explicit Binding, new binding, window binding, Lexical Binding.
이 기술을 다루는 데있어 .call, .apply, .bind 및 new 키워드와 같은 자바스크립트의 다른 부분도 배우게됩니다.

<iframe width="864" height="486" src="https://www.youtube.com/embed/zE9iro4r918" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

자바스크립트에서 `this`키워드의 세부사항을 살펴보기 전에 한 걸음 물러서서 `this`키워드가 왜 존재하는지 먼저 살펴보는 것이 중요합니다. 
`this`키워드는 서로 다른 컨텍스트로 함수를 재사용 할 수 있습니다. 다르게 말하면, `this`키워드는 함수 나 메소드를 호출할 때 어떤 객체가 초점이 되어야하는지 결정할 수 있습니다. 이 후 우리가 이야기하는 모든 것은 그 아이디어를 바탕으로 만들어질 것입니다.
우리는 다른 컨텍스트 또는 다른 객체에서 함수 나 메소드를 재사용 할 수 있기를 원합니다.

가장 먼저 살펴볼 것은 `this`키워드가 무엇을 참조하는지 알려주는 것입니다. 
이 질문에 답하려고 할 때 자신에게 가장 먼저 묻고 싶은 중요한 질문은 ‘이 함수는 어디에 호출됩니까?’ 입니다. 
`this`키워드가 참조하는 것을 알 수 있는 유일한 방법은 `this`키워드를 사용하는 함수가 호출 된 곳을 찾는 것입니다.

이미 익숙한 예로 이것을 증명하기 위해, 우리가 환영하는 메시지를 알리는 이름을 가진 `greet`함수를 가지고 있다고 합시다.

```javascript
function greet (name) {
  alert(`Hello, my name is ${name}`)
}
```

`greet`가 무엇을 경고 할 것인지 정확하게 묻는다면, 당신의 대답은 무엇입니까? 
함수 정의만 주어진다면 알 수 없습니다. `name`이 무엇인지 알아 보려면 `greet`의 함수 호출을 살펴 봐야합니다.

```javascript
greet('Tyler')
```

`this`키워드가 무엇을 참조하고 있는지 알아내는 것도 정확히 같은 생각입니다.
`this`키워드는 함수에 대한 일반적인 인수처럼 생각할 수도 있습니다. 함수가 호출되는 방식에 따라 변경 될 것입니다.

이제 `this`키워드가 참조하는 것이 무엇인지 알아내는 첫 번째 단계는 함수가 호출되는 위치를 확인하는 것입니다. 
다음 단계는 무엇입니까? 다음 단계에서 우리를 돕기 위해 5가지 규칙이나 지침을 정할 것입니다.

- Implicit Binding
- Explicit Binding
- new Binding
- Lexical Binding
- window Binding

## Implicit Binding

여기서 목표는 `this`키워드를 사용하여 함수 정의를 보고 `this`를 참조하는 것을 말할 수 있는 것입니다. 
이를 위한 첫 번째이자 가장 일반적인 규칙은 `Implicit Binding`이라고 불립니다. 
`this`키워드가 약 80%를 참조하는 것이 무엇인지 말해 줄 것이라고 나는 말하고 싶습니다.

이렇게 생긴 객체가 있다고 해봅시다.

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    alert(`Hello, my name is ${this.name}`)
  }
}
```

이제 `user`객체에 `greet`메소드를 호출하려면 도트 표기법을 사용해야합니다.

```javascript
user.greet()
```

이것은 우리를 '암시 적 바인딩'규칙의 주 요점으로 인도합니다. 
`this`키워드가 참조하고있는 것을 파악하려면 먼저 함수가 호출 될 때 점의 왼쪽을 보십시오. "점"이있는 경우 해당 점의 왼쪽을보고 `this`키워드가 참조하는 객체를 찾습니다.

위의 예에서 `user`는 '점'의 왼쪽으로, `this`키워드가 `user`객체를 참조하고 있음을 의미합니다. 따라서 `greet`메소드에서 자바스크립트 인터프리터가 `this`를 `user`로 변경하는 것처럼 보입니다.

```javascript
greet() {
  // alert(`Hello, my name is ${this.name}`)
  alert(`Hello, my name is ${user.name}`) // Tyler
}
```

비슷하지만 좀 더 고급 예를 살펴 보겠습니다. 
이제`name`,`age`,`greet property` 대신에 `user`객체에`name`과`greet property`를 가진`mother property`을 부여하겠습니다. 

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    alert(`Hello, my name is ${this.name}`)
  },
  mother: {
    name: 'Stacey',
    greet() {
      alert(`Hello, my name is ${this.name}`)
    }
  }
}
```
이제 질문은 다음과 같습니다. 아래에 있는 각각의 호출은 무엇을 경고할 것인가?

```javascript
user.greet()
user.mother.greet()
```

`this` 키워드가 참조하는 것을 알아 내려고 할 때마다 호출을보고 "점의 왼쪽"에 무엇이 있는지 알아야합니다. 첫 번째 호출에서 `user`는 점의 왼쪽에 있으며 `this`는 `user`를 참조 할 것임을 의미합니다. 
두 번째 호출에서 `mother`는 점의 왼쪽에있는 것이고 `this`는 `mother`를 나타낼 것임을 의미합니다.

```javascript
user.greet() // Tyler
user.mother.greet() // Stacey
```

앞에서 언급했듯이, 약 80%는 "점의 왼쪽"에 대상이있을 것입니다. 그래서 `this`키워드가 참조하고있는 것을 알아낼 때 첫 번째 단계는 "점의 왼쪽을 보는 것"입니다. 그러나, 점이 없다면 어떨까요? 이것은 우리를 다음 규칙으로 인도합니다.

## Explicit Binding

자,`greet`함수 대신에 `user`객체에 대한 메소드가 있다면 그것은 단지 독자적인 독립 함수 였을 것입니다.

```javascript
function greet () {
  alert(`Hello, my name is ${this.name}`)
}

const user = {
  name: 'Tyler',
  age: 27,
}
```

우리는`this`키워드가 무엇을 가리키고 있는지 알기 위해 먼저 함수가 어디에서 호출되는지 살펴 봐야합니다. 이제, `greet`를 어떻게 호출 할 수 있습니까? `user`객체를 참조하는 `this`키워드로 어떻게 호출 할 수 있습니까? `user`는 `greet`메소드를 가지고 있지 않기 때문에 이전처럼 `user.greet()`를 할 수 없습니다. 자바스크립트에서 모든 함수는 여러분이 정확하게 이것을 할 수있게 해주는 메소드를 포함하고 있으며 그 메소드의 이름은 `call`입니다.
```
"call"은 호출 될 컨텍스트를 지정하는 함수를 호출 할 수있게 하는 모든 함수의 메소드입니다. 
```

이를 염두해 두고 다음 코드를 사용하여 `user` 컨텍스트에서 `greet`을 호출 할 수 있습니다.

```javascript
greet.call(user)
```

다시 말하지만,`call`은 모든 함수의 속성이고, 당신이 전달하는 첫 번째 인자는 함수가 호출되는 컨텍스트 (또는 초점 객체)가 될 것입니다. 즉, 호출하기 위해 전달하는 첫 번째 인수는 해당 함수 내부의 `this`키워드가 참조하는 것입니다.

우리가 명시 적으로 (`.call`을 사용하고 있기 때문에) `this`키워드가 참조하고있는 것을 지정하기 때문에 이것이 규칙 #2 (Explicit Binding)의 기초입니다. 

이제, ‘greet’ function을 조금 수정해봅시다. 만약 우리가 몇 개의 객체를 전달한다고 가정해본다면 어떻게 될까요? 그들의 이름을 가지고, 우리는 또한 그들이 아는 언어로 알려주기를 원했습니다
아래와 같이 말입니다.


```javascript
function greet (l1, l2, l3) {
  alert(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  )
}
```
이제 `.call`을 사용하여 호출되는 함수에 인수를 전달하기 위해 첫 번째 인수를 문맥으로 지정한 후에 하나씩 전달합니다.

```javascript
function greet (l1, l2, l3) {
  alert(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  )
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

greet.call(user, languages[0], languages[1], languages[2])
```

이것은 효과가 있으며 `.call`을 사용하여 호출되는 함수에 인수를 전달하는 방법을 보여줍니다. 그러나 여러분이 눈치챘을지 모르겠지만, 우리의 `languages`배열에서 하나씩 인자를 전달해야하는 것은 짜증나는 일입니다. 전체 배열을 두 번째 인수로 전달할 수 있으면 자바스크립트가 이를 확산시킬 수 있다면 좋을 것입니다. 우리에게 좋은 소식입니다. 이것은 정확히 `.apply`가 하는 것입니다. `.apply`는 `.call`과 완전히 똑같지만 인수 하나 하나를 전달하는 대신에 하나의 배열을 전달할 수 있으며 배열의 각 요소를 함수의 인자로 전달합니다.

그래서 이제는 `.apply`를 사용하면, 우리의 코드는 다른 것들이 그대로 유지되면서 (아래)코드로 바뀔 수 있습니다.

```javascript
const languages = ['JavaScript', 'Ruby', 'Python']

// greet.call(user, languages[0], languages[1], languages[2])
greet.apply(user, languages)
```

지금까지 "Explicit Binding"규칙에 따라 `.call`과 `.apply`에 대해 배웠습니다. 둘 다 함수 호출을 허용하고, `this`키워드가 그 내부에서 참조 할 것임을 지정합니다. 이 규칙의 마지막 부분은`.bind`입니다. `.bind`는 `.call`과 똑같지 만 즉시 함수를 호출하는 대신 나중에 호출 할 수있는 새로운 함수를 반환합니다. 그래서 이전코드에 `.bind`를 사용하여 코드를 살펴보면 다음과 같이 보일 것입니다.

```javascript
function greet (l1, l2, l3) {
  alert(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  )
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

const newFn = greet.bind(user, languages[0], languages[1], languages[2])
newFn() // alerts "Hello, my name is Tyler and I know JavaScript, Ruby, and Python"
```

## new Binding

`this`키워드가 참조하고있는 것을 알아내는 세 번째 규칙은 `new Binding`입니다. 만약 `new`키워드와 함께 함수 호출을 할 때마다 당신이 자바스크립트의 `new`키워드에 익숙하지 않다면, 자바스크립트 인터프리터는 당신을 위한 `this`라 불리는 새로운 객체를 생성할 것입니다. 
그러므로 자연스럽게, `new`와 함께 함수가 호출된다면, 이 `this`키워드는 인터프리터가 만든 새로운 객체를 참조합니다.

```javascript
function User (name, age) {
  /*
    Under the hood, JavaScript creates a new object called `this`
    which delegates to the User's prototype on failed lookups. If a
    function is called with the new keyword, then it's this new object
    that interpretor created that the this keyword is referencing.
  */

  this.name = name
  this.age = age
}

const me = new User('Tyler', 27)
```

## Lexical Binding

이 시점에서 우리는 4번째 규칙을 따르고 있으며 약간 압도 당할 수도 있습니다. 그건 공평합니다. 자바스크립트의 `this`키워드는 틀림없이 더 복잡 할 것입니다. 좋은 소식은 다음 규칙이 가장 직관적인 것입니다.

당신이 전에 들어본 적이 있고 arrow function을 사용했을 가능성이 있다. ES6의 새로운 것입니다. 이 함수는 당신이 더 간결한 형식으로 함수를 작성할 수 있습니다. 

```javascript
friends.map((friend) => friend.name)
```

간결함보다 arrow function는 `this`키워드에 관해서 훨씬 더 직관적인 접근법을 가지고있다. arrow function은 일반 함수와 달리 `this`가 없습니다. 대신 `this`는 `lexically`로 결정됩니다.   
이는 정상적인 변수 조회 규칙을 따라 어떻게 예상할지 결정되는 멋진 방식입니다. 앞서 사용했던 예시를 계속해봅시다. 이제, `language`와`greet`을 객체와 분리하여 사용하지 않고 결합해 봅시다.

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {}
}
```
앞에서 우리는 `languages`배열의 길이가 항상 3이라고 가정했습니다. 그렇게함으로써, 우리는`l1`,`l2`,`l3`과 같은 하드코드된 변수를 사용할 수 있었습니다. `greet`를 조금 더 현명하게 만들고 `languages`가 어떤 길이라도 될 수 있다고 가정합시다. 이렇게하기 위해 우리는 문자열을 만들기 위해 `.reduce`를 사용할 것입니다.

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet(){
    const hello = `Hello, my name is ${this.name} and I know`
    const langs = this.languages.reduce(function(str, lang, i){
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }
      return `${str} ${lang},`
    }, '')
    alert(hello + langs)
  }
}
```

훨씬 더 많은 코드지만 최종 결과는 같아야 합니다. 
우리가`user.greet()`를 호출 할 때 `Hello, my name is Tyler and I know JavaScript, Ruby, and Python..`라고 기대할 것입니다. 슬프게도 오류가 있습니다. 그것을 발견 할 수 있습니까?  
위의 코드를 잡고 콘솔에서 실행하십시오. `Uncaught TypeError: Cannot read property 'length' of undefined` 오류가 발생하는 것을 알 수 있습니다. `.length`를 사용하는 유일한 곳은 9번줄에 있으므로 우리는 우리의 오류가 있다는 것을 압니다.  

```javascript
if (i === this.languages.length - 1) {}
```

우리의 잘못에 따르면,`this.langauges`는 정의되지 않았습니다. `this`키워드가 참조하는게 무엇인지 분명히 밝혀 내기 위해 `user`를 참조하지 않는 단계를 찾아 보겠습니다. 먼저 함수가 호출되는 위치를 살펴볼 필요가 있습니다. 함수가 호출되는 위치는 어디입니까? 이 함수는`.reduce`에 전달되어서 우리는 전혀 모릅니다. 자바스크립트는 `.reduce`구현에서 그 자체로 동작하기 때문에 우리는 익명의 함수 호출을 실제로 보지 못합니다. 그게 문제입니다. 우리는`.reduce`에 전달 된 익명의 함수가 `user`컨텍스트에서 호출되도록 지정해야합니다. 그렇게하면 `this.languages`는 `user.languages`를 참조 할 것입니다. 위에서 배운 것처럼 `.bind`를 사용할 수 있습니다.

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce(function (str, lang, i) {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }.bind(this), "")

    alert(hello + langs)
  }
}
```

그래서 우리는 `.bind`가 어떻게 이 문제를 해결하는지를 보았으며, 이것이 arrow function와 어떤 관련이 있는지를 보았습니다. 앞서 arrow function로 "`this`가 `lexically`로 결정되었습니다. 이것은 정상적인 변수 조회 규칙에 따라 `this`가 어떻게 기대되는지 결정하는 멋진 방법입니다. "

위의 코드에서 자연스러운 직감에 따라 익명 함수 내부에서 `this`키워드 참조는 무엇을 의미합니까? 나에게는 `user`를 참조해야 합니다. `.reduce`에 새로운 함수를 전달해야만했기 때문에 새로운 컨텍스트를 만들 이유가 없습니다. 그리고 그 직감으로 arrow function의 가치를 종종 간과합니다. 위의 코드를 다시 작성하고 익명의 함수 선언 대신 익명의 arrow function를 사용하면 모든 것이 "잘 작동합니다".  

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce((str, lang, i) => {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }, "")

    alert(hello + langs)
  }
}
```

arrow function으로 인해 `this`가 `lexically`로 결정된다는 이유도 다시 한번 제기됩니다. arrow function에는 `this`가 없습니다. 대신 변수 조회와 마찬가지로 자바스크립트 인터프리터는 `this`가 참조하는 것을 판별하기 위해 둘러싸는 (부모)범위를 조사합니다.

## window Binding

마지막으로 "catch-all"의 경우 인 window Binding입니다. 다음 코드가 있다고 가정 해 봅시다. 

```javascript
function sayAge () {
  console.log(`My age is ${this.age}`)
}

const user = {
  name: 'Tyler',
  age: 27
}
```

앞에서 다뤘던 것처럼,`sayAge`를 `user`컨텍스트에서 호출하고 싶다면 `.call`, `.apply` 또는 `.bind`를 사용할 수 있습니다. 우리가 그 중 하나를 사용하지 않고 평소처럼 `sayAge`를 호출하면 어떻게 될까요?  

```javascript
sayAge() // My age is undefined
```

`this.age`가 정의되지 않았기 때문에 당신이 얻는 것은 놀랍지도 않지만, `My age is undefined`입니다. 여기가 좀 이상한 점이 있습니다. 여기에서 실제로 일어나고있는 것은 점의 왼쪽에 아무것도 없기 때문에 `.call`, `.apply`, `.bind` 또는 `new` 키워드를 사용하지 않기 때문에 자바스크립트는 `window`객체를 참조하기 위해 `this`를 기본으로 하고 있습니다. 즉, `window`객체에 `age property`를 추가하면 `sayAge`함수를 다시 호출 할 때 `this.age`는 더 이상 정의되지 않지만 대신 `age property`는 `window`객체에 있습니다. 날 믿지 않니? 이 코드를 실행하십시오.  

```javascript
window.age = 27

function sayAge () {
  console.log(`My age is ${this.age}`)
}
```
꽤 귀엽지? 이것이 바로 5번째 규칙인 window Binding이라는 이유입니다. 다른 규칙들 중 어느 것도 충족되지 않으면 자바스크립트는 `window`객체를 참조하기 위해 `this`키워드를 기본값으로 사용합니다.  

```
ES5에서 "strict mode"가 활성화 된 경우 자바스크립트는 올바른 작업을 수행하고 window객체를 기본값으로 설정하는 대신 "this"를 undefined 상태로 유지합니다.
```

```javascript
'use strict'

window.age = 27

function sayAge () {
  console.log(`My age is ${this.age}`)
}

sayAge() // TypeError: Cannot read property 'age' of undefined
```

따라서 모든 규칙을 실제로 적용하면 함수 내부에 `this`키워드가 표시 될 때마다 이러한 키워드가 참조하는 항목을 파악하기 위해 수행해야하는 단계입니다.

1. 함수 호출이 어디서 일어났는지 확인한다.
2. 점을 기준으로 왼쪽에 객체가 있는지 확인하고, 그것이 있다면 그게 바로 `this`키워드가 참조하는 것이다. 만약에 없다면 3번으로 가라.
3. “call”, “apply”, 혹은 “bind”와 함수가 호출되었는가? 만약에 그렇다면 `this`키워드가 참조하는 것을 명시적으로 선언할 것이다. 그렇지 않다면 4번으로 가라
4. 함수가 new 키워드와 호출이 되었는가? 그렇다면, `this`키워드는 새롭게 창조된 객체고 자바스크립트 인터프리터에 의해 생성된 것이다. 이것들과 호출된 게 아니라면 5번으로 가라.
5. 화살표 함수 안에 `this`가 있는가? 그렇다면 아마도 근처의 (부모)스코프에서 Lexically - 어휘적으로? - 찾을 수 있을 것이다. 그렇지 않다면 6번으로 가라.
6. Strict mode를 사용중인가? 그렇다면 `this`키워드는 undefined이다. 그렇지 않다면 7번으로 가라.
7. 자바스크립트는 이상한 애다. `this`는 window 객체를 참조한다.