# Maps in ES6 - A Quick Guide 

## 개요

Map과 set은 종종 같은 기사에 뭉쳐있었습니다. 둘 다 비슷한 인터페이스를 가진 새로운 ES6 컬렉션 유형이지만, 유사성은 없습니다. 그래서 각각 별도의 기사를 쓰는 것이 이치에 맞습니다.  

Map은 멋지고 깔끔한 인터페이스를 갖춘 배열 및 객체의 사랑하는 자식과 같습니다.  

다음과 같이 인스턴스화 할 수 있습니다.  

```javascript
const foo = new Map()
```

Symbols에 대한 마지막 기사에서 객체가 Strings 또는 Symbols를 키로 사용하는 방법을 살펴 보았습니다. Map은 모든 유형의 데이터를 키로 사용할 수 있습니다. 키 값 쌍을 추가하려면 .set() 메소드를 사용하세요.  

```javascript
Map.prototype.set(key, value) : this

// as `this` is returned, we can chain the set methods
foo.set(1, 'one')
   .set(null, 'nothing')

const bar = { name: 'Ben' }
foo.set(bar, { age: 25 })
```

Map을 생성 할 때 생성자에 2D iterable(2중)을 전달할 수도 있습니다.  

```javascript
const foo = new Map([
  [undefined, 'hello'],
  [null, 'nada']
])
```

Map에서 항목을 검색하려면 .get() 메소드를 사용하세요.    

```javascript
Map.prototype.get(key) : any

foo.get(undefined) // 'hello'
```

객체와는 달리 배열과 비슷하지만 Map에는 편리한 .size 속성이 있습니다.  

```javascript
const foo = new Map([
  [1, 1],
  [2, 2]
])

Map.prototype.size : number

foo.size // 2
```

Map은 객체에 대한 참조를 동일하게 확인하므로 객체 리터럴을 사용하는 것은 값을 검색할 수 없기 때문에 나쁜 생각입니다.  

```javascript
const foo = new Map()

foo.set({}, `you'll never catch me`)

foo.get({}) // undefined
```

Map이 제공하는 다른 유용한 방법이 많이 있습니다.  

```javascript
const zoe = { name: 'Zoe' }
const foo = new Map([
  ['hey', 0],
  [9, 'nine'],
  [zoe, { age: 23 }]
])

// .has checks if the collection contains a key
Map.proptype.has(key) : boolean
foo.has(9) // true
foo.has(5) // false


// .delete simply deletes an item
Map.prototype.delete(key) : boolean
foo.size // 3
foo.delete(5) // false
foo.size // 3
foo.delete(9) // true
foo.size // 2


// .clear deletes all values
Map.prototype.clear() : undefined
foo.clear() // undefined
foo.size // 0
```


## Map API Summary

```javascript
const foo = new Map()

foo.set(key, value) 

foo.get(key)

foo.has(key)

foo.delete(key)

foo.clear()

foo.size
```

## Usage  

Map은 객체보다 환상적인 이점 중 하나는 객체를 반복하는 방법입니다. 그것들은 .forEach와 같은 방법과 for..of 루프와 함께 사용하기 위한 반복자 프로토콜과 같은 방법으로 반복되도록 만들어졌습니다.  

또한 객체 및 배열과 달리 순서를 유지합니다. 따라서 모든 게 올바른 순서인지 확인할 수 있습니다.  

```javascript
const foo = new Map([
  [1, 'first'],
  [2, 'second'],
  [3, 'third']
])

Map.prototype.forEach(callback(value, key, map), [thisArg]) : undefined

foo.forEach((val, key) => console.log(val, key)) 
// first 1
// second 2
// third 3
```

for..of 루프는 예상 한 값뿐만 아니라 각 항목(키와 값 모두 포함)을 반환합니다.

비구조화를 사용하여 값을 분리 할 수 있습니다.  

```javascript
for(let [key, val] of foo) {
  console.log(key, val)
}
// 1 'first'
// 2 'second'
// 3 'third'
```

Object와 마찬가지로 .keys(), .values() 및 .entries()에 액세스 할 수 있습니다.  

```javascript
Map.prototype.keys() : Map iterator
const keys = foo.keys() // 1, 2, 3

Map.prototype.values() : Map iterator
const values = foo.values() // 'first', 'second', 'third'

Map.prototype.entries() : Map iterator
const entries = foo.entries() // [1, 'first'], [2, 'second'], [3, 'third']
``` 

이 메소드들은 모두 반복자 객체를 반환합니다. 모두 반복자 프로토콜을 준수하므로 generator와 같이 또는 스프레드 연산자를 사용할 수 있습니다.  

```javascript
const keys = foo.keys()
for(let key of keys) {
  console.log(key)
}
// 1
// 2
// 3

const entries = foo.entries()
entries.next() // { value: [1, 'first'], done: false }
entries.next() // { value: [2, 'second'], done: false }
entries.next() // { value: [3, 'third'], done: false }
entries.next() // { value: undefined, done: true }

const values = foo.values()
console.log(...values) // 'first', 'second', 'third'
```
위의 모든 iteration methods는 다양한 방법과 일관된 순서로 키 값 저장소를 통해 반복하는 훨씬 더 부드러운 접근법을 제공합니다. Object보다 상당히 낫습니다.

<hr>  

Map의 훌륭한 사용 사례는 기존 객체에 메타 데이터를 추가하거나 불변 객체에 추가 데이터를 추가할 수 있다는 것입니다. Symbols도 이것에 매우 좋습니다. 내 이전 기사를 참조하세요.  

```javascript
const dataObjects = [
  { name: 'Ben', age: 25 },
  { name: 'Zoe', age: 24 },
  { name: 'Roman', age: 50 },
]

const mapObjects = new Map()
dataObjects.forEach(val => mapObjects.set(val, { created: new Date() }))

console.log(mapObjects.get(dataObjects[0])) // [{ name: 'Ben', age: 25 }, { created: Sun Dec 17 2017 11:57:52 GMT+0000 (GMT) }]
```  

## Map이나 Object를 사용해야 합니까?  

Map에서 할 수있는 모든 작업을 본 후에는 "오래된 Object를 다시 사용할 필요가 있을까?"라고 생각할 수 있습니다.

각각의 장단점을 살펴 보겠습니다.  


### 장점
- Ordered. 배열과 같은 순서로 유지되며 많은 반복 방법이 있습니다.  

- 키와 같은 Object(또는 다른 유형). 객체를 키로 사용하는 것은 매우 강력 할 수 있습니다.  


### 단점
- 많은 Object 메소드를 잃습니다. 대부분은 거의 사용되지 않지만 일부는 편리합니다.  
- 빠른 점 표기법이 없으므로 비구조화가 없습니다.

따라서 객체를 반복해야하거나 문자열이 아닌 키를 원할 경우 유일한 옵션은 Map입니다. 객체의 모양을 알고 정적인 것으로(속성을 추가하거나 제거하지 않음) 예상하면 Object가 가장 좋습니다.  

## 세부사항 및 주의사항  

### equal이란 무엇입니까?  

Map은 SameValueZero라는 것을 사용하여 Map에 키가 있는지 확인합니다.

SameValueZero는 ===와 매우 유사하지만 다음과 같은 두 가지 차이점이 있습니다.  

- NaN is equal to NaN
- +0 is equal to -0  

```javascript
NaN === NaN // false

const foo = new Map()

foo.set(NaN, 'hello')
foo.get(NaN) // 'hello'
```  

### 존재하지 않는 키  

존재하지 않는 키를 찾으면 undefined가 반환됩니다. 반환 값이 undefined인 경우 이를 알고 있어야합니다. 

```javascript
new Map().get('notAKey') // undefined 
```  

### Building from Objects  

Object에는 Map에 필요한 2D(이중)배열 구조를 반환하는 편리한 .entries() 메서드가 있습니다.  

```javascript
const foo = { name: 'Ben', age: 25 }
const entries = Object.entries(foo) // [ ['name', 'Ben'], ['age', 25] ]
const foo = new Map(entries)
```  

### Weakmaps 

세부정보 및 주의사항 섹션에 있음에도 불구하고 WeakMaps는 결코 사소한 것이 아닙니다!     

WeakMaps는 Maps와 별도의 데이터 유형입니다. 필요한 경우 Javascript가 메모리에서 키를 제거하고 키가 객체이어야 한다는 점을 제외하고...  

그들은 Map이랑 매우 유사한 Api를 가지고 있으며, 몇 가지 method가 제거됩니다. WeakMaps이 가진 모든 method는 다음과 같습니다.  

```javascript
WeakMap.prototype.get(key) : this
WeakMap.prototype.set(key, value) : this
WeakMap.prototype.has(key) : boolean
WeakMap.prototype.delete(key, value) : boolean
```  

간단히 말해 WeakMaps는 기본적으로 자체 객체 키를 garbage collected(수집) 할 수있는 Map입니다. 메모리 누수에 도움이됩니다.  

Map에 객체가 키로 있고 객체가 파괴되면 Map은 여전히 그 객체를 키로 유지하고 메모리에 남아있어 "접근 가능"하기 때문에 garbage collected(수집)가 되지 않을 것입니다 (걱정하지 마세요, 곧 garbage collected(수집)가 어떻게 작동하는지에 대한 기사를 쓸 것입니다!).  

```javascript
const foo = new Map()

let bar = { name: 'Ben' }

foo.set(bar, { age: 25 })

foo.get(bar) // { age: 25 }

bar = null

foo.entries() // [ [{ name: 'Ben' }, { age: 25 }] ]
```

반대로 WeakMap에 삭제 된 객체가 키로있는 경우 WeakMap을 사용하면 garbage collected(수집)가 해당 키와 관련 값을 제거 할 수 있습니다.  

```javascript
const foo = new WeakMap()

// You can only use objects as keys, no primitives
foo.set('primitive', 1) // TypeError: Invalid value used as weak map key

let bar = { name: 'Ben' }

foo.set(bar, { age: 25 })

foo.get(bar) // { age: 25 }

bar = null

// If there are no other reference to bar, it is removed as a key from foo
```  

왜 WeakMap 위의 예제에서 bar 키를 유지하지 않는다는 것을 보여주지 않았는지 궁금 할 것입니다. 왜냐하면 내가 할 수 없기 때문입니다! 

WeakMap에는 .size, .entries(), .keys() 또는 .values()와 같이 확인할 도구가 없습니다. 그리고 이 제한에 대한 정당한 이유가 있습니다 : 그것을 보여주는 것은 안전하지 않을 것입니다. 

Javascript garbage는 실행중인 작업, 현재 작업의 강도, 수집 할 작업량 등에 따라 다른 시간에 수집됩니다. 각 Javascript 엔진은 이러한 작업을 약간 다르게 처리합니다. 따라서 WeakMaps 키가 garbage collector에서 제거된다는 것을 알고 있지만, 언제 실행 될지 정확히 알지 못합니다.    
.size와 같은 것을 사용하는 것은 안전하지 않습니다. 백그라운드에서 garbage 수집이 실행 중이므로 한 순간에 1개의 항목이 있고 다음에 0이 있을 수 있습니다. 

### Map에서 WeakMap을 사용하는 위치  

WeakMaps은 많은 사용량을 보지 못하지만 편리한 틈새 사례가 있습니다.  

잠재적 사용 사례 중 하나는 키로 객체가 필요한 상태 관리에 있습니다. 대부분의 더 큰 앱에는 Redux 또는 Vuex와 같은 상태 관리를위한 전용 라이브러리가 있습니다. 그러나 더 작은 응용 프로그램의 자체 상태 관리 시스템을 롤링하는 경우에는 WeakMaps를 사용하는 것이 편리 할 수 있습니다. 객체를 키로 저장하고 더 이상 필요하지 않은 객체를 garbage 수집하도록하는 것은 매우 강력 할 수 있습니다.  

<hr>

개인 데이터에 WeakMaps를 사용할 수도 있습니다.  

```javascript
const keepOut = new WeakMap()

class Person {
    constructor(name) {
    keepOut.set(this, { name })
  }
  get name () {
    return keepOut.get(this)
  }
}

const me = new Person('Ben')

me.name // { name: 'Ben' } 
```

Person의 인스턴스가 WeakMap에 키로 저장되므로 Person의 인스턴스가 없으면 데이터에 액세스 할 수 없습니다.  

<hr>  

위에서 Map을 사용하여 객체에 메타 데이터를 추가하거나 확장 할 수없는 객체를 확장하는 것에 대해 언급했습니다. WeakMaps는 DOM 요소로 이것을 수행하는 데 매우 편리합니다.  

```javascript 
const myH1 = document.querySelector('h1')
const myImg = document.querySelector('img')

const domElems = new Map([
  [myH1, { created: new Date() }],
  [myImg, { someExtraData: 'foo' }]
])
```  
이제 DOM 요소와 함께 추가 데이터를 추적 할 수 있으며 DOM 요소가 더 이상 필요하지 않을 때 WeakMap을 사용하여 garbage 수집 할 수 있습니다!  

