## The JavaScript Event Loop: Explained (자바스크립트 이벤트 루프 : 설명)

#### 이 게시물은 무엇에 관한 것입니까?  
자바스크립트는 웹 브라우저의 스크립트 언어로 거의 고유성에 가까워짐에 따라, 이벤트 기반 상호작용 모델에 대한 기본 이해와 Ruby, Python 및 Java와 같은 언어에서 일반적으로 발견되는 요청 응답 모델과 차이점을 이해할 수 있습니다.  

#### 이 자리는 누구를 위한 것인가?
이 게시물은 클라이언트 또는 서버에서 자바스크립트를 사용하거나 작업하고있는 웹 개발자를 대상으로합니다. 이벤트 루프에 이미 익숙하다면 이 게시물에 많은 부분이 익숙 할 것입니다. 그렇지 않은 사람들을 위해, 당신이 일상적으로 읽고, 쓰는 코드에 대해 더 많은 이유를 제기 할 수 있도록 기본적인 이해를 제공하기를 희망합니다.

#### Non-blocking I/O
자바스크립트에서 거의 모든 I / O는 차단되지 않습니다.(non-blocking) 여기에는 HTTP 요청, 데이터베이스 작업 및 디스크 읽기 및 쓰기가 포함됩니다. 실행의 single-threaded는 런타임에 작업을 수행하도록 요청하고 콜백 기능을 제공한 다음 다른 작업을 수행하도록 이동합니다. 작업이 완료되면 제공된 콜백 기능과 함께 메시지가 대기열에 포함됩니다. 앞으로 어떤 시점에서 메시지는 대기열에서 제외되고 콜백이 시작됩니다. 

이 상호작용 모델은 사용자 인터페이스("mouchown" 및 "click"과 같은 이벤트가 언제든지 트리거될 수 있는 경우)작업에 이미 익숙한 개발자에게는 친숙 할 수 있지만, 서버측 애플리케이션에서 일반적으로 발견되는 동기식 요청 응답 모델과는 다릅니다.

HTTP 요청을 www.google.com에 적용하고 응답을 콘솔에 출력하는 두 비트의 코드를 비교해보겠습니다. 첫번째, Ruby, Faraday:
```ruby
  response = Faraday.get 'http://www.google.com'
  puts response
  puts 'Done!'
```

실행 경로는 쉽게 따라 할 수 있습니다.  
1. get 메소드가 실행되고 응답 스레드가 수신 될 때까지 실행 스레드가 대기합니다. 
2. response은 Google에서 수신되어 변수가 저장된 호출자에게 반환됩니다.
3. 변수의 값 (이 경우 response)은 console에 출력됩니다.
4. "Done!"값이 콘솔에 출력됩니다. 

Node.js 및 요청 라이브러리를 사용하여 자바스크립트에서도 동일한 작업을 수행해 보겠습니다.

```javascript
  request('http://www.google.com', function(error, response, body) {
    console.log(body);
  });

  console.log('Done!');
```

약간의 다른 모양과 매우 다른행동:

1. 요청 함수가 실행되어 익명 함수를 콜백 함수로 전달하여 향후 언젠가 response을 사용할 수있을 때 실행합니다. 
2. "Done!"이 즉시 console에 출력됩니다.
3. 언젠가는 response이 돌아오고 콜백이 실행되어 body를 console로 출력합니다.

#### The Event Loop  
비동기 작업이 완료되고 콜백이 시작될 때까지 기다리는 동안 자바스크립트 런타임에서 다른 작업을 수행 할 수 있습니다. 그러나 메모리에서 이러한 콜백은 어디에 있으며 어떤 순서로 실행됩니까? 무엇 때문에 그들을 불려집니까?

자바스크립트 런타임에는 처리 할 메시지 목록과 관련 콜백 함수를 저장하는 메시지 대기열이 있습니다. 이러한 메시지는 콜백 기능이 제공되면 외부 이벤트 (마우스를 클릭하거나 HTTP 요청에 대한 응답을받는 것과 같은)에 대한 응답으로 대기합니다. 예를 들어 사용자가 버튼을 클릭하고 콜백 함수가 제공되지 않은 경우 아무런 메시지도 대기열에 추가되지 않습니다.

루프에서 대기열은 다음 메시지 ( 각 polling을 "tick"이라고 함)에 대해 polling되고 메시지가 발생하면 해당 메시지에 대한 콜백이 실행됩니다.

<img src="https://blog.carbonfive.com/wp-content/uploads/2013/10/event-loop.png" width="900" alt="">

이 콜백 함수의 호출은 호출 스택의 초기 프레임으로 사용되며 JavaScript가 single-threaded이므로 스택의 모든 호출이 반환 될 때까지 추가 메시지 polling 및 처리가 중단됩니다. 후속(동기)함수 호출은 새로운 호출 프레임을 스택에 추가합니다 (예 : function init은 function changeColor를 호출합니다).

```javascript
  function init() {
    var link = document.getElementById("foo");

    link.addEventListener("click", function changeColor() {
      this.style.color = "burlywood";
    });
  }
  init();
```
이 예제에서 사용자가 'foo'요소를 클릭하고 "onclick"이벤트가 발생하면 메시지(콜백, changeColor)가 대기열에 포함됩니다. 메시지가 대기열에서 제외되면 콜백 함수 changeColor가 호출됩니다. changeColor가 return되면 (또는 오류가 발생하면) 이벤트 루프가 계속됩니다. 'foo'요소에 대한 onclick 콜백으로 지정된 changeColor 함수가 있으면 해당 요소를 계속 클릭하면 더 많은 메시지(연관된 콜백 changeColor)가 대기열에 포함됩니다. 


#### Queuing Additional Messages
코드에 호출 된 함수가 비동기식 (setTimeout과 같은)이면 제공된 콜백은 이벤트 루프의 향후 틱에서 다른 대기열 메시지의 일부로 궁극적으로 실행됩니다. 예를 들면 : 

```javascript
  function f() {
    console.log("foo");
    setTimeout(g, 0);
    console.log("baz");
    h();
  }

  function g() {
    console.log("bar");
  }

  function h() {
    console.log("blix");
  }

  f();
```
setTimeout의 non-blocking 속성으로 인해 해당 콜백은 최소 0 밀리 초를 시작하며 이 메시지의 일부로 처리되지 않습니다.  
이 예제에서 setTimeout은 콜백 함수 g와 0 밀리 초의 타임 아웃을 전달하여 호출됩니다. 지정된 시간이 경과하면 (이 경우 거의 즉시) 콜백 함수로 g를 포함하는 별도의 메시지가 대기열에 포함됩니다. 
console 결과는 "foo", "baz", "blix" 그리고  이벤트 루프의 다음 틱인 "bar"와 같습니다. 
동일한 호출 프레임에서 두 번째 인수에 대해 동일한 값을 전달하는 setTimeout에 두 번의 호출이 수행되면 해당 호출의 순서대로 대기열에 표시됩니다.

#### Web Workers
Web Workers를 사용하면 별도의 실행 스레드로 분산하여 메인 스레드를 자유롭게하여 다른 작업을 수행 할 수 있습니다.
Worker는 별도의 메시지 대기열, 이벤트 루프 및 이를 인스턴스화 한 원래 스레드와 별개의 메모리 공간을 포함합니다. Worker와 주 스레드 간의 의사 소통은 메시지 전달을 통해 수행됩니다. 이는 기존에 발생했던 코드 예제와 매우 흡사합니다.

<img src="https://blog.carbonfive.com/wp-content/uploads/2013/10/web-workers.png" width="900" alt="">

첫째, our worker:  
```javascript
  // our worker, which does some CPU-intensive operation
  var reportResult = function(e) {
    pi = SomeLib.computePiToSpecifiedDecimals(e.data);
    postMessage(pi);
  };

  onmessage = reportResult;
```

그런 다음 HTML의 스크립트 태그에 있는 코드의 주요 묶음 :

```javascript
  // our main code, in a <script>-tag in our HTML page
  var piWorker = new Worker("pi_calculator.js");
  var logResult = function(e) {
    console.log("PI: " + e.data);
  };

  piWorker.addEventListener("message", logResult, false);
  piWorker.postMessage(100000);
```

이 예제에서 주 스레드는 Worker를 생성하고 logResult 콜백 함수를 "message"이벤트에 등록합니다. Worker에서 reportResult 함수는 자체 "message"이벤트에 등록됩니다. Worker 스레드가 주 스레드에서 메시지를 받으면 작업자는 메시지와 해당 reportResult 콜백을 대기열에 넣습니다. 대기열에서 빠져 나오면 (logResult 콜백과 함께) 새 메시지가 대기열에 포함되는 기본 스레드로 메시지가 다시 게시됩니다. 이 방법으로 개발자는 CPU 집약적인 작업을 별도의 스레드로 위임하여 메시지 처리 및 이벤트 처리를 계속하기 위해 주 스레드를 해제 할 수 있습니다.  


#### 클로저에 대한 참고 사항

자바스크립트의 클로저는 콜백의 실행이 완전히 새로운 콜 스택을 생성하더라도 생성 된 환경에 대한 액세스를 유지하면서 실행할 때 콜백을 등록 할 수있게 해줍니다. 특히 콜백이 생성 된 메시지와 다른 메시지의 일부로 콜백이 호출된다는 사실을 알고 있어야합니다. 다음 예제를 고려하십시오.  

```javascript
  function changeHeaderDeferred() {
    var header = document.getElementById("header");
    
    setTimeout(function changeHeader() {
      header.style.color = "red";

      return false;
    }, 100);

    return false;
  }

  changeHeaderDeferred();
```
이 예제에서는 변수 header를 포함하는 changeHeaderDeferred 함수가 실행됩니다. setTimeout함수가 호출되어 향후 메시지 대기열에 약 100밀리 초(0.1초)의 메시지가 추가됩니다(changeHeader 콜백 포함). 그런 다음 changeHeaderDeferred 함수는 false를 반환하여 첫 번째 메시지의 처리를 끝내지만 header변수는 여전히 클로저를 통해 참조되며 garbage collection에 수집되지 않습니다. 두 번째 메시지가 처리 될 때 (changeHeader 함수) 외부 함수의 범위에 선언 된 header 변수에 대한 액세스를 유지합니다. 두 번째 메시지 (changeHeader 함수)가 처리되면 헤더 변수가 garbage collection에 수집 될 수 있습니다.

#### Takeaways

자바스크립트의 이벤트 중심 상호 작용 모델은 많은 프로그래머들이 익숙한 요청 응답 모델과 다릅니다. 하지만 보다시피 로켓 과학??은 아닙니다. 자바스크립트는 간단한 메세지 대기열 및 이벤트 루프를 사용하여 개발자가 비동기식 콜백을 중심으로 시스템을 구축함으로써 외부 이벤트가 발생할 때까지 기다리는 동안 동시 작업을 처리하도록 런타임을 비울 수 있습니다.    
그러나 이것은 동시성에 대한 하나의 접근 방식에 지나지 않습니다.   
이 게시판의 두 번째 부분에서는 자바스크립트의 동시성 모델을 MRI Ruby(with threads and the GIL), EventMachine(Ruby), Java(threads)에서 볼 수 있는 것과 비교할 것입니다.

#### Additional Reading
- Check out [this](https://docs.google.com/presentation/d/1KtgaIvDQwMaqZ6ax3zU2oka62sF2ZQSPv1SEirD-XtY/edit#slide=id.p) presentation I did recently, titled “The JavaScript Event Loop: Concurrency in the Language of the Web”
- [Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) @ MDN
- [An intro to the Node.js platform](http://www.aaronstannard.com/intro-to-nodejs-for-net-developers/), by Aaron Stannard