# Javascript — ES8 `async / await` 기능 소개  

사람들이 왜 ES8 `async/await`기능에 열광하는지에 대한 관점을 얻으려면, 당신은 JS에서 비동기 행동과 솔루션의 진화에 익숙해야합니다.  

## Callbacks

더 정확하게는, 콜백 내부의 콜백 내부의 콜백... 

<img src="https://miro.medium.com/max/3612/1*nVyPbbzSaDhw1QjGDc3E9g.png" alt="" width="900">  
callback hell (일명: 콜백 지옥)   
<br/><br/><br/>

콜백은 여러 가지 문제를 제기합니다. 콜백은 구조뿐만 아니라 따라가기 어려울 수 있습니다. 콜백은 형태가 단단하고 추하고 다루기 힘든 존재입니다. 결국 ‘콜백 지옥’이라는 용어가 생겨났습니다.  

콜백은 목적에 부합하지만 복잡한 관계형 데이터를 사용하여 더 복잡한 애플리케이션과 네비게이션 패턴을 작업하기 시작하면 더 나은 솔루션이 필요합니다. `PROMISES`를 입력하세요.  

<hr>

## Promises

사람들에게 힘을 돌려주세요.  

Promises는 JS의 비동기 문제에 대한 정교한 솔루션입니다. Promise 개체는 비동기 작업의 최종 완료(또는 실패)와 결과 값을 나타냅니다. Promises는 항상 3가지 상태 중 하나입니다.  

1. pending : 초기 상태이며 이행 또는 거부되지 않았습니다.  
2. fulfilled : 작업이 성공적으로 완료되었음을 의미합니다.  
3. rejected : 작업이 실패했음을 의미합니다.   

보류중인(pending) Promises는 이행 또는 거부 될 수 있으며, 이때 성공을 위해 `.then()` 및 오류에 대한 `.catch()`를 통해 적절한 핸들러가 호출됩니다.  

명심해야 할 사항 : Promises는 비동기 작업의 결과를 나타냅니다.  
몇 가지 코드를 살펴 보겠습니다.   

<img src="https://miro.medium.com/max/3480/1*LgOY5Lg0idsnRBznPhVzjQ.png" alt="" width="900">   
기본적인 Promise 예제 코드  
<br/><br/><br/>

#### 실제 Promises 예제 코드    
<img src="https://miro.medium.com/max/3752/1*bXJ_GYOZeL6ot7Xumnrlmg.png" alt="" width="900">  

34-36 행보면 콜백 예제보다 훨씬 더 깔끔하다는 것을 알 수 있습니다.    

개선되었지만 여전히 문제가됩니다. 콜백과 마찬가지로 Promises의 피라미드로 끝날 수 있습니다. Promises를 반복하는 것은 미묘하고 직관적이지 않습니다. 또한 `catch()`및 `deferred`와 같은 것을 사용해야합니다.  

`Async / Await` 기능을 입력하십시오.  

<hr>

## ES8 async/await 기능  

이제 JS의 `async/await` 함수에서 비동기 솔루션의 최신 반복을 살펴 보겠습니다.  

`async function`선언은 비동기 함수를 정의하여 [AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 객체를 반환합니다.   

`async`함수가 호출되면 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)가 반환됩니다. `async`함수가 값을 반환하면 `Promise`는 반환 된 값으로 해결됩니다. `async`함수가 예외 또는 일부 값을 throw하면 `Promise`는 throw된 값과 함께 거부됩니다.

`async`함수는 [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)표현식을 포함 할 수 있으며, `async`함수의 실행을 일시 중지하고 전달된 `Promises`를 기다린 다음 `async`함수의 실행을 재개하고 해결 된 결과를 리턴합니다.  

몇 가지 코드를 살펴 보겠습니다.  

이 예제에서는 <strong>`STANDARD PROMISE`</strong>가 작동하고 <strong>`ASYNC/AWAIT`</strong>로 구현 된 동일한 코드가 나타납니다.

<img src="https://miro.medium.com/max/3692/1*XS9LZVbeEwVBIGpvlcfwTw.png" alt="" width="900">   
standard promise vs async/await

<br/><br/><br/>

Promise 체인(4-11)코드 대신에 동일한 함수를 단일 함수(16–23)으로 작성할 수 있습니다.

코드에서 async/await 구현을 시작하려는 주된 이유는 스레드를 차단하지 않고 비동기적으로 보이며 실행되는 코드를 작성할 수 있기 때문입니다.   

<hr>

