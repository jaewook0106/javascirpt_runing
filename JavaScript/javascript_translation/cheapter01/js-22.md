# 고차 함수 : 유지 보수가 쉬운 코드를 위해 `Filter`,`Map` 및 `Reduce` 사용

작성자 Guido Schmitz

고차 함수는 코드를 보다 선언적으로 만들어 자바스크립트를 강화하는 데 도움이 될 수 있습니다. 즉, 짧고 간단하게 읽을 수 있습니다.  

이러한 기능을 언제 어떻게 사용하는지 알고 있는 것이 중요합니다. 코드를 이해하고 유지하기 쉽게 만듭니다.   
또한 기능을 서로 쉽게 결합 할 수 있습니다. 이것을 구성(composition)이라고하며 여기서는 자세히 설명하지 않겠습니다. 이 기사에서는 자바스크립트에서 가장 많이 사용되는 3가지 고차 함수를 다룰 것입니다. 이들은 `.filter()`, `.map()` 및 `.reduce()`입니다.  

## Filter
18세 이상인 사람들을 걸러낸 리스트 코드를 작성하는 것을 상상해봅시다.  
우리의 리스트는 다음과 같습니다.  

```javascript
const people = [ 
  { name: ‘John Doe’, age: 16 }, 
  { name: ‘Thomas Calls’, age: 19 }, 
  { name: ‘Liam Smith’, age: 20 }, 
  { name: ‘Jessy Pinkman’, age: 18 }
];
```

18세 이상인 사람을 선택하는 1차 함수의 예를 살펴 보겠습니다. ECMAScript 표준 또는 ES6의 일부인 화살표 함수를 사용하여 짧게 쓰고 있습니다. 함수를 정의하는 짧은 방법일 뿐이므로 괄호, 중괄호 및 세미콜론뿐만 아니라 function 타이핑 및 리턴을 건너뛸 수 있습니다.  

```javascript
const peopleAbove18 = (collection) => {  
  const results = [];   
  for (let i = 0; i < collection.length; i++) {    
    const person = collection[i];     
    if (person.age >= 18) {     
      results.push(person);   
    }  
  }
  return results;
};
```
이제 18세에서 20세 사이의 모든 사람들을 선택하려면 어떻게해야합니까?   
다른 함수를 만들 수 있습니다.  

```javascript
const peopleBetween18And20 = (collection) => {  
  const results = [];   
  for (let i = 0; i < collection.length; i++) {    
    const person = collection[i];     
    if (person.age >= 18 && person.age <= 20) {      
      results.push(person);    
    }  
  }
  return results;
}
```
이미 많은 반복 코드를 알고있을 것 입니다. 보다 일반적인 솔루션으로 추상화 될 수 있습니다. 이 두 함수에는 공통점이 있습니다. 그들은 리스트를 반복하고 주어진 조건에서 필터링합니다.  

"고차 함수는 하나 이상의 함수를 인수로 취하는 함수입니다." — [Closurebridge](https://clojurebridge.org/community-docs/docs/clojure/higher-order-function/)  

보다 선언적 접근방식인 `.filter()`를 사용하여 이전 함수를 개선 할 수 있습니다.  

```javascript
const peopleAbove18 = (collection) => {  
  return collection.filter((person) => person.age >= 18);
}
```

그게 다입니다! 이 고차 함수를 사용하면 많은 추가 코드를 줄일 수 있습니다. 또한 코드를 더 잘 읽을 수 있게합니다. 필터링되는 방식은 중요하지 않으며 필터링만 하면 됩니다. 이 게시글 뒷부분에서 함수를 결합하는 방법에 대해 살펴 보겠습니다.   

## Map
커피를 마시는 것을 좋아하는지 알려주는 동일한 사람 리스트와 이름의 배열을 봅시다.

```javascript
const coffeeLovers = [‘John Doe’, ‘Liam Smith’, ‘Jessy Pinkman’];
```

명령 방식은 다음과 같습니다:   

```javascript
const addCoffeeLoverValue = (collection) => {  
  const results = [];   
  for (let i = 0; i < collection.length; i++) {    
    const person = collection[i];
    if (coffeeLovers.includes(person.name)) {      person.coffeeLover = true;    
    } else {      
      person.coffeeLover = false;   
    }    
    results.push(person);  
  } 
  return results;
};

```  

`.map()`을 사용하여 더 선언적으로 만들 수 있습니다.  

```javascript
const incrementAge = (collection) => {  
  return collection.map((person) => {    
    person.coffeeLover = coffeeLovers.includes(person.name);     return person;  
  });
};
```
`.map()`은 고차 함수입니다. 함수가 인수로 전달 될 수 있습니다.  

## Reduce 

언제, 어떻게 사용하는지 알때 이 함수를 마음에 들어 할 것입니다.
`.reduce()`의 멋진 점은 위 대부분의 함수를 사용하여 만들 수 있다는 것입니다.  

먼저 간단한 예를 들어 보겠습니다. 우리는 모든 사람들의 나이를 합치고  싶습니다. 다시 한 번 명령 방식을 사용하여 이 작업을 수행하는 방법을 살펴 보겠습니다. 기본적으로 컬렉션(수집)을 반복하고 연령에 따라 변수를 증가시킵니다. 

```javascript
const sumAge = (collection) => {  
  let num = 0;   
  collection.forEach((person) => {    
    num += person.age;  
  });   
  return num;
}
```

그리고 `.reduce()`를 사용하는 선언적 접근 방식. 

```javascript
const sumAge = (collection) => collection.reduce((sum, person) => { return sum + person.age;
}, 0);

```

우리는 `.reduce()`를 사용하여 `.map()` 및 `.filter()`의 구현을 만들 수도 있습니다.  

```javascript
const map = (collection, fn) => { 
  return collection.reduce((acc, item) => {    
    return acc.concat(fn(item));  
  }, []);
}
```

```javascript
const filter = (collection, fn) => {  
  return collection.reduce((acc, item) => {    
    if (fn(item)) {      
      return acc.concat(item);    
    }     
    return acc;  
  }, []);
}
```

처음에는 이해하기 어려울 수 있습니다. 그러나 `.reduce()`는 기본적으로 컬렉션과 초기 값을 가진 변수로 시작합니다. 그런 다음 컬렉션을 반복하고 값을 변수에 덧붙이거나(또는 추가) 합니다. 

## Combining map, filter and reduce  

이러한 함수가 존재한다는 점은 훌륭합니다. 그러나 좋은 점은 자바스크립트의 Array 프로토 타입에 존재한다는 것입니다. 즉,이 함수들을 함께 사용할 수 있습니다! 이를 통해 재사용 가능한 함수를 쉽게 만들고 특정 함수를 작성하는 데 필요한 코드의 양을 줄일 수 있습니다.  

그래서 우리는 18세 이하의 사람들을 걸러내기 위해 `.filter()`를 사용하는 것에 대해 이야기했습니다. `coffeeLover property`을 추가하는 `.map()`과  `reduce()`를 합쳐서 마침내 모든 사람의 나이를 합한 합계를 만듭니다.
실제로 이 세 단계를 결합한 코드를 작성해 봅시다.

```javascript
const people = [ 
  { name: ‘John Doe’, age: 16 }, 
  { name: ‘Thomas Calls’, age: 19 }, 
  { name: ‘Liam Smith’, age: 20 },
  { name: ‘Jessy Pinkman’, age: 18 }
];
```
```javascript
const coffeeLovers = [‘John Doe’, ‘Liam Smith’, ‘Jessy Pinkman’];
```
```javascript
const ageAbove18 = (person) => person.age >= 18;
const addCoffeeLoverProperty = (person) => { 
  person.coffeeLover = coffeeLovers.includes(person.name);  
  return person;
}
```
```javascript
const ageReducer = (sum, person) => { return sum + person.age;}, 0);
```
```javascript
const coffeeLoversAbove18 = people.filter(ageAbove18).map(addCoffeeLoverProperty);
```
```javascript
const totalAgeOfCoffeeLoversAbove18 = coffeeLoversAbove18.reduce(ageReducer);
```
```javascript
const totalAge = people.reduce(ageReducer);
```

만일 의무적인 방식으로 수행하면 많은 반복 코드를 작성하게됩니다.  

`.map()`, `.reduce()`, `.filter()`로 함수를 만드는 사고방식은   
당신이 쓸 코드의 품질을 향상시킬 것입니다.   
하지만 가독성도 많이 더합니다.   
함수 안에서 무슨 일이 일어나고 있는지 생각할 필요도 없습니다.   
이해하기 쉽습니다.