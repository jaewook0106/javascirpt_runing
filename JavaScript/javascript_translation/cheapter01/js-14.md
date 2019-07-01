## Class vs Factory function: 앞으로의 길을 모색하다.

ECMAScript 2015(일명 ES6)는 클래스 구문과 함께 제공되므로 이제 우리는 객체를 만들기 위해 두 가지 경쟁 패턴을 가지고 있습니다. 이를 비교하기 위해 클래스와 동일한 객체 정의(TodoModel)를 만든 다음 Factory function로 만들어 봅니다.  

[TodoModel as a Class](https://jsfiddle.net/cristi_salcescu/m9dhpzfx/)  

```javascript
class TodoModel {
  constructor(){
    this.todos = [];
    this.lastChange = null;
  }
  
  addToPrivateList(){
    console.log("addToPrivateList"); 
  }
  add() { console.log("add"); }
  reload(){}
}
```

[TodoModel as a Factory Function](https://jsfiddle.net/cristi_salcescu/bcta6yyv/)  

```javascript
function TodoModel(){
  var todos = [];
  var lastChange = null;
      
  function addToPrivateList(){
    console.log("addToPrivateList"); 
  }
  function add() { console.log("add"); }
  function reload(){}
  
  return Object.freeze({
    add,
    reload
  });
}
```

### Encapsulation (캡슐화)

우리가 알아차릴 수 있는 것은 클래스 객체의 모든 구성원, fields 그리고 methods가 public이라는 것입니다.

```javascript
var todoModel = new TodoModel();
console.log(todoModel.todos);     //[]
console.log(todoModel.lastChange) //null
todoModel.addToPrivateList();     //addToPrivateList
```

캡슐화의 부족은 보안 문제를 발생시킬 가능성이 있습니다. Developer Console에서 직접 수정할 수 있는 전역 객체의 예를 들어 보십시오. 
Factory function를 사용할 때 우리가 공개하는 메소드만 public이 되고, 나머지는 캡슐화됩니다.  

```javascript
var todoModel = TodoModel();
console.log(todoModel.todos);     //undefined
console.log(todoModel.lastChange) //undefined
todoModel.addToPrivateList();     //taskModel.addToPrivateList
                                    is not a function
```

### this

`this`가 context 잃는 문제는 클래스를 사용할때 여전히 존재합니다. 예를 들어 `this`는 중첩된 함수에서 context를 잃어 버리는 것입니다.  
코딩 과정에서 짜증나는 것은 아니지만 버그의 지속적인 원천이기도 합니다. 

```javascript
class TodoModel {
  constructor(){
    this.todos = [];
  }
  
  reload(){ 
    setTimeout(function log() { 
      console.log(this.todos);    //undefined
    }, 0);
  }
}
todoModel.reload();                   //undefined
```

또는 `this`는 메소드가 DOM 이벤트와 같이 콜백으로 사용할 경우 context를 잃어 버리는 것입니다.

```javascript
$("#btn").click(todoModel.reload);    //undefined
```

Factory function를 사용할 때 이와 같은 문제는 전혀 없습니다.  

```javascript
function TodoModel(){
  var todos = [];
      
  function reload(){ 
    setTimeout(function log() { 
      console.log(todos);        //[]
    }, 0);
  }
}
todoModel.reload();                   //[]
$("#btn").click(todoModel.reload);    //[]
```

### this 그리고 arrow function

Arrow function는 부분적으로 클래스의 context 문제를 해결하지만 동시에 새로운 문제를 만듭니다.

- `this`는 더 이상 중첩 된 함수에서 context를 잃지 않습니다. 
- 메서드가 콜백으로 사용될 때 `this`는 context를 잃어 버립니다.
- Arrow function는 익명 함수의 사용을 촉진합니다.  

[Arrow function을 사용하여 TodoModel을 리팩토링했습니다.](https://jsfiddle.net/cristi_salcescu/y0k18og2/) Arrow function으로 리팩토링하는 과정에서 우리는 가독성을 위해 매우 중요한 함수 이름 인 loose를 사용할 수 있다는 점에 유의해야합니다. [예를 보십시오:](https://jsfiddle.net/cristi_salcescu/y0k18og2/) 

```javascript
//using function name to express intent
setTimeout(function renderTodosForReview() { 
      /* code */ 
}, 0);
//versus using an anonymous function
setTimeout(() => { 
      /* code */ 
}, 0);
```

Discover Functional JavaScript는 BookAuthority가 개발 한 최고의 새로운 [Functional Programming eBook](https://bookauthority.org/books/new-functional-programming-ebooks?t=2zo8jf&s=award&book=B07PBQJYYG) 중 하나입니다!