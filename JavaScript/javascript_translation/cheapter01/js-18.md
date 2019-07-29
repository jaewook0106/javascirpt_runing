# Object.create ()와 new 연산자의 차이점 이해

그 차이를 아는 것이 왜 중요한가요?

1. 최근의 자바스크립트가 아닌 코드를 실행합니다.
2. 훌륭한 개발자가 되려면 모든 유형의 코드를 다루는 방법을 배워야합니다. 그것은 오래된 코드를 포함합니다!
3. 후드 아래에서 ECMAScript 6에 도입 된 class 키워드는 `new` 연산자를 사용합니다.

먼저 Object.create가 수행하는 작업을 살펴 보겠습니다.

```javascript
var dog = {
    eat: function() {
        console.log(this.eatFood)
    }
};

var maddie = Object.create(dog);
console.log(dog.isPrototypeOf(maddie)); //true
maddie.eatFood = 'NomNomNom'; 
maddie.eat(); //NomNomNom
```
위의 예제를 단계별로 살펴보고 정확히 무엇이 일어나는지 봅시다.  

1. `eat`이라는 하나의 메소드를 가진 `dog`라는 이름의 객체 리터럴을 만듭니다.
2. 프로토타입을 `dog`로 설정해 완전히 새로운 객체를 생성하는 `Object.create(dog)`를 사용하여 `maddie`를 초기화합니다.
3. `dog`가 `maddie`의 프로토타입인지 테스트 해보십시오.
4. `this.eatFood`를 통해 출력 할 문자열을 설정하십시오.
5. 새로 생성 된 객체`maddie`를 사용하여 `eat`함수를 호출하십시오. 
6. 자바스크립트는 프로토타입 체인을 통과하여 `this`키워드가 `maddie`로 설정된 `dog`에 `eat`메소드를 찾습니다. 
7. NomNomNom을 콘솔에 출력합니다.  

Object.create()는 프로토타입이 `dog`로 설정된 완전히 새로운 객체인 `maddie`를 만들었습니다. 새롭게 생성 된 `maddie`객체는 이제`dog`의`eat` 메소드에 접근 할 수 있습니다.  

이제 new 연산자를 살펴 보겠습니다.  

```javascript
var Dog = function(){
    this.eatFood = 'NomNomNom';
    this.eat = function(){
        console.log(this.eatFood)
    }
};

var maddie = new(Dog);
console.log(maddie instanceof Dog); // True
maddie.eat(); //NomNomNom
```
new 연산자가 이 함수에 어떻게 적용되는지, 그리고 무엇을하는지 봅시다.  

1. `maddie`라는 새 객체를 만듭니다.
2. `maddie`는 생성자 함수의 프로토타입을 상속받습니다. 
3. 1번에서 생성 된 object에 `this`가 설정된 생성자를 실행합니다.
4. 생성 된 객체를 반환합니다 (생성자가 객체를 반환하지 않을 동안).

Object.create ()와 new연산자의 차이점은 무엇일까요? 그들은 둘 다 똑같은 것을하는 것처럼 보입니다.   
둘 다 새로운 객체를 만들고 프로토 타입을 상속받습니다.

바라건대. 이 예제는 혼란을 해결할 수 있습니다 :

```javascript
function Dog(){
    this.pupper = 'Pupper';
};

Dog.prototype.pupperino = 'Pups.';
var maddie = new Dog();
var buddy = Object.create(Dog.prototype);

//Using Object.create()
console.log(buddy.pupper); //Output is undefined
console.log(buddy.pupperino); //Output is Pups.

//Using New Keyword
console.log(maddie.pupper); //Output is Pupper
console.log(maddie.pupperino); //Output is Pups.
```

이 예제에서 주목할 핵심 사항은 다음과 같습니다.

```javascript
console.log(buddy.pupper); //Output is undefined
```

`buddy.pupper`의 결과는 정의되지 않았습니다. `Object.create()`가 `prototype`을 `Dog`로 설정하더라도 `buddy`는 생성자에서 `this.pupper`에 액세스 할 수 없습니다.   
이는 `new Dog가 실제로 생성자 코드를 실행하는 반면 Object.create는 생성자 코드를 실행하지 않는 중요한 차이 때문입니다.`

`Object.create()`와 `new 연산자`가 어떻게 서로 구별되는지에 대한 통찰력을 얻게 되었기를 바랍니다.