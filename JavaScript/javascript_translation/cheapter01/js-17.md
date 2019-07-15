# ES6 클래스와 프로토타입 상속 이해하기

JavaScript언어의 초기 역사에서 대부분의 객체 지향 언어와 같은 클래스를 정의하기 위한 적절한 구문이 부족하여 적대감의 구름이 형성되었습니다. 2015년 `ES6`규격이 공개되기 전까지 `class`키워드가 도입되지 않았습니다. 그것은 기존의 프로토타입 기반 상속에 대한 구문적 설탕(syntactical sugar)으로 묘사됩니다.  

가장 기본적인 수준에서,`ES6`의 `class`키워드는 프로토타입 기반 상속에 부합하는 생성자함수 정의와 같습니다. 이미 존재하는 기능을 감싸기 위해 new 키워드가 도입되었지만 읽을 수있는 코드로 이어지고 미래의 객체 지향적인 기능을 구축할 수 있는 기반을 마련하는 것은 중복적으로 보일 수 있습니다.

`ES6`이전에 동일한 유형의 많은 객체를 생성하기위한 blueprint(클래스)을 작성해야한다면 다음과 같은 생성자 함수를 사용합니다.  

```javascript
function Animal (name, fierce) {
  Object.defineProperty(this, 'name', {
    get: function() { return name; }
  });

  Object.defineProperty(this, 'fierce', {
    get: function() { return fierce; }
  });
}

Animal.prototype.toString = function() {
  return 'A' + ' ' + ( this.fierce ? 'fierce' : 'tame' ) + ' ' + this.name;
}
```

이것은 `Animal`클래스의 인스턴스를 생성하기위한 blueprint을 나타내는 간단한 객체 생성자입니다. 우리는 생성자함수에 두 개의 읽기 전용 `own`프라퍼티와 커스텀`toString` 메소드를 정의했습니다. new 키워드로 `Animal`인스턴스를 생성 할 수 있습니다 :

```javascript
var Lion = new Animal('Lion', true);
console.log(Lion.toString()); // "A fierce Lion"
```

좋아! 그것은 예상대로 작동합니다. 간결한 버전을 위해 ES6클래스를 사용하여 코드를 다시 작성할 수 있습니다.

```javascript
class Animal {

  constructor(name, fierce){
      this._name = name;
      this._fierce = fierce;
  }

  get name() {
    return this._name;
  }

  get fierce() {
    return ` This animal is ${ this._fierce ? 'fierce' : 'tame' }`;
  }

  toString() {
    return `This is a ${ this._fierce ? 'fierce' : 'tame' } ${this._name}`;
  }

}
```
이전처럼 new 키워드를 사용하여 `Animal`클래스의 인스턴스를 만듭니다.

```javascript
let Lion = new Animal('Lion', true);

    console.log(Lion.fierce); 

    console.log(Lion.toString())
```

`ES6`에서 클래스를 정의하는 것은 매우 간단하며 객체 생성자를 사용하는 이전 시뮬레이션보다 객체 지향적인 느낌이 더 자연스럽습니다.   
`ES6`클래스의 속성과 파급 효과를 탐구하여 `ES6`클래스를 심층적으로 살펴봅시다.  

## Defining Classes

`class`키워드는 단지 특별한 `function`이고 예상 된 함수 행위를 보여주기 때문에 이전 객체 생성자를 사용하는 것에서 새로운 `ES6` 클래스로 전환하는 것은 어렵지 않아야합니다. 예를 들어, 함수처럼, `class`는 선언이나 표현식에 의해 정의 될 수 있습니다.  

Essential Reading: [Learn React from Scratch! (2019 Edition)](https://scotch.io/starters/react/getting-started-with-react-2019-edition)  

## Class Declarations

클래스 선언은 `class`키워드로 정의되고 클래스의 이름이 뒤따릅니다.  

```javascript
class Animal {}
```

우리는 이미 `Animal`생성자 함수의 `ES6`버전을 작성할 때 `class`선언을 사용했습니다.

```javascript
class Animal {
  constructor(name, fierce){
    this._name = name;
    this._fierce = fierce;
  }
}
```

## Class Expressions

클래스 표현식은 좀 더 유연성을 허용합니다. 클래스의 이름이 지정되거나 이름이 지정되지 않을 수도 있지만 클래스 표현식의 이름이 지정되면 name 속성은 클래스 본문의 로컬 속성이되고 `.name`속성을 사용하여 액세스 할 수 있습니다.  

이름없는 클래스 표현식은 `class`키워드를 따서 이름을 건너뛰는 것입니다.  

```javascript
 // unnamed
    let animal = class {}
```
반면에 명명 된 클래스 표현식은 이름을 포함합니다. 

```javascript
// named
    let animal = class Animal {}
```
객체 생성자를 `ES6 클래스`와 비교할때 [호이스트](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)로 인해 범위가 정의되기 전에 액세스 할 수있는 객체 생성자와 달리 클래스는 호이스트가 될 수없고 호이스트가 되지 않습니다.

`ES6 클래스`에 큰 한계로 보일 수 있지만 그럴 필요는 없다. 좋은 `ES6`연습은 어떤 기능이 클래스의 인스턴스를 변경해야 한다면 프로그램 내의 어느 곳에서나 정의될 수 있지만, `class`자체가 정의된 후에만 호출되어야 한다고 요구합니다.  

## Constructor and Body of a Class

명시된 두 가지 방법 중 하나를 사용하여 클래스를 정의한 후 중괄호{}는 클래스 변수 (예 : 인스턴스 변수, 메소드 또는 생성자)를 보유해야합니다. 중괄호 안에있는 코드는 클래스의 본문을 구성합니다.  

클래스의 생성자는 단순히 그 클래스의 인스턴스를 초기화하는 것을 목적으로하는 메소드입니다. 즉, 클래스의 인스턴스가 생성 될 때마다 클래스의 생성자(정의 된 곳)가 호출되어 해당 인스턴스에서 작업을 수행합니다. 전자를 사용할 수 없을 때 수신 된 매개 변수 또는 기본값을 사용하여 객체의 속성을 초기화 할 수 있습니다.  

하나의 생성자 메소드가 클래스와 연관 될 수 있기 때문에 여러 생성자 메소드를 정의하지 않도록 조심해야합니다. 결과적으로 [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)가 발생합니다. [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)키워드는 객체의 생성자 내에서 `superclass`의 생성자를 호출하는 데 사용될 수 있습니다.  

```javascript
class Animal {
  constructor(name, fierce){ // there can only be one constructor method
    this._name = name;
    this._fierce = fierce;
  }
}
```
```
클래스 본문 내의 코드는 엄격 모드에서 실행됩니다.
```

## Defining Methods

클래스의 본문은 일반적으로 클래스의 인스턴스의 상태를 정의하는 인스턴스 변수와 해당 클래스의 인스턴스의 동작을 정의하는 프로토 타입 방법을 포함합니다. `ES6`이전에 생성자 함수에 대한 방법을 정의해야 한다면 다음과 같이할 수 있습니다.  

```javascript
function Animal (name, fierce) {
  Object.defineProperty(this, 'name', {
    get: function() { return name; }
  });

  Object.defineProperty(this, 'fierce', {
    get: function() { return fierce; }
  });
}

Animal.prototype.toString = function() {
  return 'A' + ' ' + ( this.fierce ? 'fierce' : 'tame' ) + ' ' + this.name;
}
```

혹은

```javascript
function Animal (name, fierce) {
  Object.defineProperty(this, 'name', {
    get: function() { return name; }
  });

  Object.defineProperty(this, 'fierce', {
    get: function() { return fierce; }
  });

  this.toString = function() {
    return 'A' + ' ' + ( this.fierce ? 'fierce' : 'tame' ) + ' ' + this.name;
  }
}
```

위에 정의한 두 가지 메소드를 프로토타입 메소드라고하며 클래스의 인스턴스에서 호출 할 수 있습니다. ES6에서는 프로토타입과 Static메소드의 두 가지 유형을 정의 할 수 있습니다. ES6에서 프로토타입 메소드를 정의하는 것은 구문이 더 깨끗하고(프로토 타입 속성을 포함하지 않음) 더 읽기 쉽다는 점을 제외하고는 위에서 설명한 것과 매우 유사합니다. 

```javascript
class Animal {

  constructor(name, fierce){
    this._name = name;
    this._fierce = fierce;
  }

  get name() {
    return this._name;
  }

  get fierce() {
    return ` This animal is ${ this._fierce ? 'fierce' : 'tame' }`;
  }

  toString() {
 return `This is a ${ this._fierce ? 'fierce' : 'tame' } ${this._name}`;
  }

}
```

여기에서는 더 짧은 구문을 사용하여 두 개의 getter 메소드를 정의한 다음 기본적으로 `Animal` 클래스의 인스턴스가 야생이거나 길들인 동물인지 여부를 확인하는 `toString` 메소드를 작성합니다. 이 메소드는 `Animal`클래스의 모든 인스턴스에서 호출 할 수 있지만 클래스 자체에서는 호출 할 수 없습니다. 

`ES6` 프로토타입 메소드는 자식 클래스에서 상속받아 자바스크립트에서 객체지향적 행동을 시뮬레이션할 수 있지만 후드에서는 상속 기능이 기존 프로토 타입 체인의 기능 일 뿐이며 곧 살펴 보겠습니다.  

```
모든 `ES6`메소드는 생성자로 작동 할 수 없으며 `new`키워드로 호출 된 경우 `TypeError`를 발생시킵니다.
```

## Static Methods

Static 메소드는 호출 대상의 행동을 정의하지만 클래스의 인스턴스에 의해 호출 될 수 없기 때문에 프로토타입 대응 물과 다르다는 점에서 프로토타입 방법과 유사합니다. Static 메소드는 클래스에서만 호출할 수 있습니다. 클래스의 인스턴스를 사용하여 Static 메소드를 호출하려는 시도는 예상치 못한 행동으로 이어질 수 있습니다. 

Static 메소드는 static 키워드로 정의해야합니다. 대부분의 경우 Static 메소드는 클래스의 유틸리티 함수로 사용됩니다.

동물 리스트를 반환하는 Animal 클래스에 Static 유틸리티 메소드를 정의 해 봅시다 :

```javascript
class Animal {

  constructor(name, fierce){
    this._name = name;
    this._fierce = fierce;
  }

  static animalExamples() {
    return `Some examples of animals are Lion, Elephant, Sheep, Rhinocerus etc`
  }

}
```

이제 클래스 자체에서 animalExamples() 메소드를 호출 할 수 있습니다.  

```javascript
console.log(Animal.animalExamples()); // "Some examples of animals are Lion, Elephant, Sheep, Rhinocerus etc"

```

## Subclassing in ES6

객체 지향 프로그래밍에서는 일반적인 메소드와 속성을 가진 기본 클래스를 만들고, 기본 클래스 등에서 이러한 일반적인 메소드를 상속하는 다른 특정 클래스를 만드는 것이 좋습니다. ES5에서는 프로토타입 체인을 사용하여 이러한 동작을 시뮬레이션했으며 구문은 때로는 지저분해질 수 있습니다. 

ES6는 상속을 쉽게 하는 다소 익숙한 `extends`키워드를 도입했습니다. 하위 클래스는 다음과 같은 기본 클래스의 속성을 쉽게 상속할 수 있습니다.  

```javascript
class Animal {

  constructor(name, fierce){
    this._name = name;
    this._fierce = fierce;
  }

  get name() {
    return this._name;
  }

  get fierce() {
    return ` This animal is ${ this._fierce ? 'fierce' : 'tame' }`;
  }

  toString() {
     return `This is a ${ this._fierce ? 'fierce' : 'tame' } ${this._name}`;
  }

}


class Felidae extends Animal {

  constructor(name, fierce, family){
    super(name, fierce);
    this._family = family;
  }

  family() {
     return `A ${this._name} is an animal of the ${this._family} subfamily under the ${Felidae.name} family`;
  }
}
```

우리는 Felidae(대개 고양이라고 함) 하위 클래스를 만들고 Animal 클래스의 메소드를 상속합니다. super클래스(기본 클래스) 생성자를 호출하기 위해 `Felidae`클래스의 생성자 메소드에서 `super`키워드를 사용합니다. `Felidae`클래스의 인스턴스를 만들고 메소드와 상속 된 메소드를 호출해 봅시다.  

```javascript
  var Tiger = new Felidae('Tiger', true, 'Pantherinae');

    console.log(Tiger.toString()); // "This is a fierce Tiger"

    console.log(Tiger.family()); // "A Tiger is an animal of the Pantherinae subfamily under the Felidae family"
```
```
생성자가 하위 클래스 내에 있으면 "this"를 사용하기 전에 `super()`를 호출해야합니다.

함수를 기반으로하는 "클래스"를 확장하기 위해 `extends`키워드를 사용할 수도 있지만, 객체 리터럴만으로 생성 된 클래스를 확장하려고 시도하면 오류가 발생합니다.  
```
이 기사의 시작 부분에서 우리는 ES6의 새로운 키워드의 대부분이 기존 프로토 타입 기반 상속에 대한 구문적 설탕(syntactical sugar)이라는 것을 알았습니다. 시트를보고 프로토타입 체인이 어떻게 작동하는지 살펴 보겠습니다. 

## Prototypal Inheritance

새로운 'ES6` 키워드로 클래스를 정의하고 상속을 수행하는 것이 좋지만, 표준 레벨에서 어떻게 작동하는지 이해하는 것이 더 좋습니다. 자바 스크립트 객체를 살펴 봅시다. 모든 자바 스크립트 객체는 두 번째 객체를 가리키는 private 속성을 갖습니다 (예외적으로 두 번째 객체는 'null'을 가리킴).이 두 번째 객체는 '프로토 타입'이라고합니다.   

첫 번째 객체는`prototype` 객체의 속성을 상속 받고 프로토 타입은 자체 프로토 타입의 일부 속성을 상속받을 수 있으며 체인의 마지막 프로토 타입의 속성이'null'이 될 때까지 계속 진행됩니다.  

객체 리터럴의 값을 식별자로 할당하여 생성 된 모든 자바스크립트객체는 동일한 프로토타입 객체를 공유합니다. 즉, 프로토타입 체인에서 동일한 프로토타입 속성이 동일한 객체를 가리키고 해당 속성을 상속받습니다. 이 객체는 자바스크립트 코드에서 'Object.prototype`으로 참조 될 수 있습니다.  

클래스의 생성자 또는 생성자 함수를 호출하여 생성 된 객체는 생성자 함수의 프로토타입 속성에서 프로토 타입을 초기화합니다. 즉, new object()를 호출하여 새 객체를 만들면 해당 객체의 프로토 타입은 객체 리터럴에서 만든 객체와 마찬가지로 Object.prototype이됩니다. 마찬가지로, `new Date()`객체는 `Date.prototype()`과 `Number.prototype()`의 `new Number()`를 상속받습니다.
 
```
자바스크립트의 거의 모든 객체는 프로토 타입 체인의 상단에 있는 객체의 인스턴스입니다.
```
자바스크립트 객체가 다른 객체(프로토타입)로부터 속성을 상속받는 것은 정상이지만, `Object.prototype`은 프로토타입이 없고 다른 객체로부터 속성(프로토타입 체인 상단에 앉음)을 상속받지 않는 드문 행동을 보인다.  

거의 모든 자바스크립트의 내장 생성자는`Object.prototype`에서 상속되므로`Number.prototype`은`Object.prototype`의 속성을 상속한다고 말할 수 있습니다. 이 관계의 효과는 ( 'new Number ()'를 사용하여) 자바 스크립트에서`Number`의 인스턴스를 생성하면`Number.prototype`과`Object.prototype`에서 프로퍼티를 상속받을 것이고 프로토 타입 체인이됩니다.  

자바스크립트 객체는 정의 된 속성을 보유하고 있으므로 이러한 속성을 "자체 속성(own property)"이라고 부르지만 자체 속성에만 국한되지 않으므로 컨테이너로 간주 할 수 있습니다. 프로토타입 체인은 객체를 대상으로 속성을 검색 할 때 큰 역할을합니다.  

- 이 속성은 먼저 객체에서 자체 속성(own property)으로 검색됩니다.  
- 객체에 속성이 없으면 프로토타입이 다음으로 검사됩니다.
- 속성이 프로토타입에 없으면 프로토타입의 프로토 타입이 쿼리됩니다. 
- 프로토타입 이후의 프로토타입 쿼리는 속성이 발견되거나 프로토타입 체인의 끝에 도달하여 오류가 반환 될 때까지 계속됩니다.  

자바스크립트에서 프로토타입 상속의 동작을 명확하게 시뮬레이트하기 위한 코드를 작성해 보겠습니다.

이 예제에서는 `ES5`메소드 `Object.create()`를 사용하므로 정의 해 보겠습니다.

Object.create()는 첫 번째 인수를 해당 객체의 프로토타입으로 사용하여 새 객체를 만드는 메소드입니다.  

```javascript
let Animals = {}; // Animal inherits object methods from Object.prototype.

    Animals.eat = true; // Animal has an own property - eat ( all Animals eat ).

    let Cat = Object.create(Animals); // Cat inherits properties from Animal and Object.prototype.

    Cat.sound = true; // Cat has it's own property - sound ( the animals under the cat family make sounds).

    let Lion = Object.create(Cat); // Lion ( a prestigious cat ) inherits properties from Cat, Animal, and Object.prototype.

    Lion.roar = true; // Lion has its own property - roar ( Lions can raw )

    console.log(Lion.roar); // true - This is an "own property".

    console.log(Lion.sound); // true - Lion inherits sound from the Cat object.

    console.log(Lion.eat); // true - Lion inherits eat from the Animal object.

    console.log(Lion.toString()); // "[object Object]" - Lion inherits toString method from Object.prototype.
```

우리가 위에서 한 것에 대한 구술적인 해석은 다음과 같습니다. 

- 우리는`Animals`객체를 만들었고`Object.prototype`의 속성을 상속받습니다.  
- 우리는 `Animals` own property에 -eat-을 true로 설정했습니다 (모든 동물이 먹습니다)
- Cat이라는 새로운 객체를 만들고 Animals의 프로토타입을 초기화 했습니다.(그러므로 Cat은 `Animals`과 `Object.prototype`의 속성을 상속받습니다)
- 우리는`Cat` own property에 -sound-를 true로 초기화 했습니다 (고양이 가족 아래의 동물은 소리를냅니다)  
- Lion이라는 새로운 객체를 만들어 Cat의 프로토타입을 초기화 했습니다 (따라서 Lion은`Cat`,`Animal` 및`Object.prototype`의 속성을 상속받습니다). 
- 우리는 `Lion` own property에 -roar-을 true로 초기화 했습니다 (라이언은 으르렁합니다.)
- 마지막으로 `Lion` 객체에 자신의 속성과 상속 된 속성을 기록했으며, `Lion` 객체의 속성을 먼저 찾은 다음 객체가 아닌 프로토타입(프로토타입의 프로토타입)으로 이동하여 올바른 값을 반환했으며 전자에서 사용할 수 있습니다.  

프로토타입 체인을 사용하는 자바스크립트의 프로토타입 상속에 대한 기본이지만 정확한 시뮬레이션입니다.  

## Summing Up

이 글에서 우리는 ES6 클래스와 프로토타입 상속의 기본을 살펴보았습니다. 기사를 읽으면서 한두 가지를 배웠으면 좋겠습니다. 질문이 있으면 아래 댓글 섹션에 남겨주세요.

이 기사처럼?? 트위터에서 @neoighodaro를 팔로우하세요.