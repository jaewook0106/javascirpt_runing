# Use Constructor Functions

지난 챕터에서 우리는 `object prototypes`과 `Object.create` 함수를 사용하여 새로운 객체를 생성하는 방법에 대해 이야기했습니다. 
새로운 객체를 생성 한 후에는 `init`이라는 함수를 호출했다. 이 `init`함수는 종종 새로운 객체를 "set up"하기 위해 실행하기를 원하며, 대부분의 객체 지향 언어는 이`init` 함수의 개념을 직접 구현합니다. Javascript에서, 내장된 `init`함수는 생성자 함수라고 불리며, 특별한 Javascript 키워드`new`를 사용하여 호출 할 수 있습니다.  

생성자 함수를 사용하여 객체를 생성하려면 객체에 대해 원하는 `init`기능을 포함하는 독립형 함수를 작성하면됩니다. 이 함수를 `init`라고 부르는 대신에, 이 함수는 우리 객체의 `class`이름을 가질 것입니다. 다음은 생성자 함수를 사용하여 지난 챕터의 `pastry code`를 다시 작성한 경우의 모습입니다.  

```javascript
var Pastry = {
  // initialize the pastry
  init: function (type, flavor, levels, price, occasion) {
    this.type = type;
    this.flavor = flavor;
    this.levels = levels;
    this.price = price;
    this.occasion = occasion;
  },
  ...
}

```
이렇게 될 것입니다.

```javascript
function Pastry(type, flavor, levels, price, occasion) {
  this.type = type;
  this.flavor = flavor;
  this.levels = levels;
  this.price = price;
  this.occasion = occasion;
}
```
이제 인스턴스화하려면 호출하는 대신

```javascript
Object.create(Pastry);
```
그런 다음 `init` 함수를 사용합니다

```javascript
new Pastry(type, flavor, levels, price, occasion);
```
그렇지만 `Pastry`객체에 의해 정의 된 다른 함수는 어떻습니까? 우리의 `Pastry`에는 `describe`함수가 있습니다.

```javascript
var Pastry = {
  // initialize the pastry
  init: function (type, flavor, levels, price, occasion) {
    this.type = type;
    this.flavor = flavor;
    this.levels = levels;
    this.price = price;
    this.occasion = occasion;
  },

  // Describe the pastry
  describe: function () {
    var description = "The " + this.type + " is a " + this.occasion + " pastry, has a " + this.flavor + " flavor, " + this.levels + " layer(s), and costs " + this.price + ".";
    return description;
  }
};
```
이것은 `Prototype`이 다시 들어오는 곳입니다.  

지난 챕터인 `Pastry`객체가 우리가 만든 모든 `Pastry`의 prototype 역할을 했음을 기억하십시오. `Pastry object`에서 정의한 `init`, `describe`와 같은 모든 함수는 우리가 생성 할 때`Pastry`를`Object.create`에 전달했기 때문에 사용 가능한 상태가 되어있습니다.

그러나 생성자 함수를 사용하는 것은 약간 다릅니다. 우리는 단순히 `Pastry`생성자 함수에 속성을 추가 할 수 없으며 생성자가 생성 한 객체의 prototype과 동일한 것이 아니기 때문에 class의 인스턴스화를 기대하기 어렵습니다.  

다행히도, 생성자 함수는 생성한 객체의 prototype에 대한 특별한 참조를 가지고 있으며, 지난 챕터에서 prototype과 같이 상속 가능한 속성을 연결할 수 있습니다. 이제는 생성자 함수를 사용하고 있으므로 우리는 `describe`함수를 다음과 같이 `Pastry` prototype에 할당합니다. 

```javascript
function Pastry(type, flavor, levels, price, occasion) {
  this.type = type;
  this.flavor = flavor;
  this.levels = levels;
  this.price = price;
  this.occasion = occasion;
}

Pastry.prototype.describe = function () {
  var description = "The " + this.type + " is a " + this.occasion + "pastry, has a " + this.flavor + " flavor, " + this.levels + " layer(s), and costs " + this.price + ".";
  return description;
}
```
지난 챕터에서, 우리는 모든 새로운 객체 생성을 두 줄로 만들었습니다.

```javascript
var muffin = Object.create(Pastry);
muffin.init("muffin", "blueberry", 1, "$2", "breakfast");

var cake = Object.create(Pastry);
cake.init("cake", "vanilla", 3, "$10", "birthday");

console.log(muffin.describe());
console.log(cake.describe());
```

이제, 객체 함수를 사용함으로서, 우리는 한 줄로 우리 객체를  인스턴스화 하여 같은 결과를 갖게 할 수 있습니다. 
```javascript
var muffin = new Pastry("muffin", "blueberry", 1, "$2", "breakfast");
var cake = new Pastry("cake", "vanilla", 3, "$10", "birthday");

console.log(muffin.describe());
console.log(cake.describe());
```

```
생성자함수를 호출 할 때는 'new'를 잊어버리지 마세요!
```

생성자함수와 관련하여 중요한 포인트가 있습니다.  
`pastry`객체를 반환하기를 기대하며 일반 함수로서 `Pastry`함수를 호출하는 대신에 , `new`키워드를 사용하는 것은 까먹을 가능성이 있습니다. 우리의 생성자함수는 `return`문을 가지고 있지 않다는 것을 알고 있더라도 말입니다.
반환 값을 지정하지 않는 함수의 반환 값은 "undefined"이므로, 특별한 `new`키워드를 사용하지 않고 생성자 함수를 호출하면 갖게 되는 값입니다.
이것은 당신이나 다른 사용자가 당신의 객체 라이브러리를 사용하면 버그로 이어지는 것을 흔하게 볼 수 있습니다.

```javascript
// gonna instantiate some sweet beignets...
var beignet = Pastry("beignet", "cream", 1, "$1.50", "anytime you want beignets");

console.log(beignet.describe());
> Uncaught TypeError: Cannot read property 'describe' of undefined
```


이것은 거의 확실히 당신의 함수가 실패할 수도 있습니다. 만약에 당신에게 행운이 있다면요!  

더 나쁘고 디버깅하기 어려운 여기서의 위험은 당신이 `callbeignet.describe()`를 호출할때가 아닌, 당신이 `new`키워드를 사용하지 않고 객체 함수를 호출할때 무언가 조용히 발생한다는 것입니다.    
당신이 `new`키워드 없이 `Pastry`함수를 실행한 후에 `window.type`의 값을 확인해보세요.

```javascript
var beignet = Pastry("beignet", "cream", 1, "$1.50", "anytime you want beignets");
window.type
> beignet
```

당신은 아마도 `window`객체가 익숙하지 않을 수도 있습니다. (우리는 다음 챕터에서 좀 더 배울 것입니다) 하지만, 이것은 당신의 모든 웹페이지의 기초와 근본이고 무의식적으로 프로퍼티들을 할당하는 것은 당신의 프로그램에 굉장히 위험한 것입니다.   
특히 당신이 우연히도 이미 존재하는 프로퍼티를 덮어쓴다면 말입니다.  

우리가 다음 챕터에서 스코프 개념을 배우고 전역 객체를 배울때 어떻게 이것이 발생하는지 우리는 좀 더 이야기 나눌 것입니다.   
지금은 당신이 객체를 생성자함수를 사용하여 초기화할때 `new`키워드를 생략할수도 있다는 것을 기억하세요.