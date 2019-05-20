## 자바스크립트 작동 방식 : 이벤트 루프 및 비동기 프로그래밍 + async/await를 사용하여 더 나은 코딩을 위한 5가지 방법

자바스트립트와 그 구성요소를 탐색하는데 전념하는 시리즈 4번째 게시판에 오신것을 환영합니다.
핵심 요소를 식별하고 설명하는 과정에서 경쟁력을 유지하기 위해 견고하고 뛰어난 성능을 갖춘 자바스크립트 응용 프로그램 인 [SessionStack](https://www.sessionstack.com/?utm_source=medium&utm_medium=blog&utm_content=Post-4-eventloop-intro)을 구축할때 사용하는 몇 가지 좋은규칙을 공유합니다.

처음 3챕터들을 놓치셨습니까?? 여기에서 찾을 수 있습니다. (이글은 4번째 챕터임..)

1. [An overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)(엔진, 런타임 그리고 콜스택에 대한 개요)
2. [Inside Google’s V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)(Google의 V8 엔진 + 최적화된 코드 작성 방법에 대한 5가지 팁)
3. [Memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)(메모리 관리 + 4 개의 공통 메모리 누출 처리 방법)

이번에는 싱글 스레드 환경에서 프로그래밍의 단점을 검토하고 이를 극복하여 멋진 Javascript Ui를 구축하는 방법을 통해 첫 번째 게시물을 확장 해 보곘습니다.
전통에 따라 글 마지막 부분에 async / await를 사용하여 깨끗한 코드를 작성하는 방법에 대한 5가지 팁을 공유할 것입니다.

#### 왜 싱글 스레드는 제한 적인 것일까?

첫 번째 게시물에서 우리는 처리하는 데 엄청난 시간이 걸리는 콜 스택에 함수 호출이 있을 때 어떤 일이 일어나는지 고민했습니다.
예를 들어 브라우저에서 실행되는 복잡한 이미지 변환 알고리즘을 상상해봅시다.

콜 스택에는 실행 기능이 있지만 브라우저는 다른 작업을 수행 할 수 없습니다. - 차단되고 있습니다.
브라우저가 렌더링 할 수 없으며, 다른 코드를 실행할 수 없다는 것을 의미합니다. 단지 막혔습니다. 
그리고 여기에 문제가 있는데 앱 UI가 더 이상 효율적이고 만족스럽지 않습니다.

앱이 작동하지 않습니다.

어떤 경우에는 이런 문제가 그렇게 중요한 문제가 아닐 수도 있습니다. 
하지만, 여기 더 큰 문제가 있습니다. 브라우저가 콜 스택에서 너무 많은 작업을 처리하기 시작하면 오랫동안 응답이 중단될 수 있습니다. 
그 시점에서 많은 브라우저가 오류를 제기하여 페이지를 종료해야하는지 여부를 묻는 조치를 취할 것입니다.

못생겼으며 그리고 UX를 완전히 망쳐버립니다.

<img src="https://cdn-images-1.medium.com/max/1600/1*MCt4ZC0dMVhJsgo1u6lpYw.jpeg" width="500" alt="">  

#### 자바스크립트 프로그램의 building blocks 구성 

자바 스크립트 애플리케이션을 하나의 .js 파일로 작성할 수도 있지만, 프로그램은 여러 블록으로 구성되어 있으며 그 중 하나만 실행되고 나머지는 나중에 실행됩니다. 가장 일반적인 블록 단위는 함수입니다.

대부분의 개발자들이 자바스크립트에 대해 처음 접하게 된 문제는 나중에 엄격하게 그리고 지금 당장 일어날 필요는 없다는 것을 이해하는 것입니다.
다른 말로 표현하자면, 현재 완료하지 못하는 업무(혹은 할 일)들은 비동기식으로 완료 되며 이것은 당신이 무의식적으로 예상했거나 바라는 바로써 위에서 언급한 방해 행위를 하지 않는다는 것을 의미합니다.

다음 예제를 살펴 보겠습니다.

```javascript
// ajax(..) is some arbitrary Ajax function given by a library
var response = ajax('https://example.com/api');

console.log(response);
// `response` won't have the response
```

표준 Ajax 요청은 동기식으로 완료되지 않는다는 것을 알고있을 것입니다. 
즉, 코드 실행시 ajax(..) 함수는 응답 변수에 할당되기 위해 되돌아 갈 값이 아직 없음을 의미합니다.

비동기 함수가 결과를 반환하도록 "waiting"하는 간단한 방법은 callback이라는 함수를 사용하는 것입니다:

```javascript
ajax('https://example.com/api', function(response) {
    console.log(response); // `response` is now available
});
```

참고 사항 : 실제로 동기식 Ajax 요청을 만들 수 있습니다. 절대로 그렇게하지 마십시오.  
동기식 Ajax 요청을하면 자바 스크립트 앱의 UI가 차단되어 사용자가 클릭하거나 데이터를 입력하거나 탐색하거나 스크롤 할 수 없습니다. 
이렇게하면 사용자 상호 작용이 방지됩니다. 그것은 끔찍한 연습입니다.

이렇게 생겼지만, 그러나 절대로 하지마세요. 웹을 망쳐 놓지 마세요:

```javascript
// This is assuming that you're using jQuery
jQuery.ajax({
    url: 'https://api.example.com/endpoint',
    success: function(response) {
        // This is your callback.
    },
    async: false // And this is a terrible idea
});
```

우리는 Ajax 요청을 예제로 사용했습니다. 코드를 비동기 적으로 실행할 수 있습니다.  
이 작업은 setTimeout (콜백, 밀리 초) 함수를 사용하여 수행 할 수 있습니다.  
setTimeout 함수는 이벤트 (시간 초과)를 나중에 설정하도록 설정합니다. 한 번 봅시다: 

```javascript
function first() {
    console.log('first');
}
function second() {
    console.log('second');
}
function third() {
    console.log('third');
}
first();
setTimeout(second, 1000); // Invoke `second` after 1000ms
third();
```

콘솔의 출력은 다음과 같습니다:
```
first
third
second
```
#### 이벤트 루프 분석

우리는 비동기 자바 스크립트 코드 (예 : setTimeout과 같은)를 허용하면서 ES6까지 자바 스크립트 자체에 실제로 비동기라는 직접적인 개념이 없었던 것은 다소 이상한 주장으로 시작합니다. JavaScript 엔진은 주어진 순간에 프로그램의 단일 덩어리를 실행하는 것 이상을 수행하지 않습니다.

자바 스크립트 엔진이 작동하는 방식 (Google의 V8 구체적)에 대한 자세한 내용은 이 주제에 대한 이전 내용중 하나를 확인해보세요.

그럼, JS 엔진에 프로그램 일부를 실행하라고 누가 지시한 겁니까? 실제로 JS 엔진은 독립적으로 실행되지 않습니다. 
대부분의 개발자가 일반적인 웹 브라우저 또는 Node.js인 호스팅 환경에서 실행됩니다. 
사실, 요즘, 자바스크립트는 로봇에서 전구에 이르기까지 모든 종류의 장치에 내장되어 있습니다. 모든 단일 장치는 JS 엔진의 다른 유형의 호스팅 환경을 나타냅니다.

모든 환경에서 공통 분모는 JS 엔진을 호출할 때마다 시간이 지남에 따라 프로그램의 여러 덩어리를 실행하는 이벤트 루프라는 내장 메커니즘입니다.  

즉, JS 엔진은 임의의 JS 코드에 대한 주문형 실행 환경 일뿐입니다. 이벤트를 예약하는 것은 주변 환경(JS 코드 실행)입니다.

예를 들어, JavaScript 프로그램이 서버에서 데이터를 가져 오기 위해 Ajax 요청을할 때 함수 ( "호출")에 "응답"코드를 설정하고 JS 엔진은 호스팅 환경에 대해 알려줍니다.
“이봐, 지금 당장은 실행을 중지할 테지만, 네트워크 요청을 끝내고 데이터가 있을 때마다 이 기능을 다시 불러줘.”

그런 다음 브라우저가 네트워크의 응답을 청취하도록 설정되고, 다시 반환할 것이 있으면 이벤트 루프에 삽입하여 콜백 기능을 실행하도록 예약합니다. 

아래 다이어그램을 살펴봅시다:

<img src="https://cdn-images-1.medium.com/max/1600/1*FA9NGxNB6-v1oI2qGEtlRQ.png" width="600" alt="">  

이전 내용에서 Memory Heap 및 Call Stack에 대한 자세한 내용을 볼 수 있습니다.

그리고 이러한 웹 API는 무엇입니까? 본질적으로, 그들은 액세스 할 수없는 스레드이며, 단지 호출 할 수 있습니다.  
그것들은 동시성이 시작되는 브라우저의 조각입니다. 여러분이 Node.js 개발자라면 C ++ API입니다.

결국 이벤트 루프는 무엇입니까?  

<img src="https://cdn-images-1.medium.com/max/1600/1*KGBiAxjeD9JT2j6KDo0zUg.png" width="600" alt="">  
 
이벤트 루프에는 호출 스택과 콜백 큐를 모니터링하는 간단한 작업이 하나 있습니다.  
호출 스택이 비어 있으면 큐의 첫 번째 이벤트가 호출 스택에 전달되어 효율적으로 실행됩니다.

이러한 반복을 이벤트 루프의 틱 (tick)이라고합니다. 각 이벤트는 단지 함수 콜백입니다.

```javascript
console.log('Hi');
setTimeout(function cb1() { 
    console.log('cb1');
}, 5000);
console.log('Bye');
```

이 코드를 "실행"하고 어떻게되는지 봅시다. 

1. 상태는 깨끗합니다. 브라우저 콘솔이 깨끗하고 호출 스택이 비어 있습니다. 

<img src="https://cdn-images-1.medium.com/max/1600/1*9fbOuFXJHwhqa6ToCc_v2A.png" width="600" alt=""> 

2. console.log ('Hi')가 호출 스택에 추가됩니다.

<img src="https://cdn-images-1.medium.com/max/1600/1*dvrghQCVQIZOfNC27Jrtlw.png" width="600" alt=""> 

3. console.log ( 'Hi')가 실행됩니다.

<img src="https://cdn-images-1.medium.com/max/1600/1*yn9Y4PXNP8XTz6mtCAzDZQ.png" width="600" alt=""> 

4. console.log ( 'Hi')가 호출 스택에서 제거되었습니다.

<img src="https://cdn-images-1.medium.com/max/1600/1*iBedryNbqtixYTKviPC1tA.png" width="600" alt=""> 

5.  setTimeout(function cb1() { ... }) 호출 스택에 추가됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*HIn-BxIP38X6mF_65snMKg.png" width="600" alt=""> 

6. setTimeout(function cb1() { ... }) 실행합니다.   
브라우저는 웹 API의 일부로 타이머를 작성합니다. 당신을위한 카운트 다운을 처리 할 것입니다.

<img src="https://cdn-images-1.medium.com/max/800/1*vd3X2O_qRfqaEpW4AfZM4w.png" width="600" alt="">

7. setTimeout (function cb1 () {...}) 자체가 완료되어 호출 스택에서 제거됩니다. 

<img src="https://cdn-images-1.medium.com/max/800/1*_nYLhoZPKD_HPhpJtQeErA.png" width="600" alt="">

8. console.log ('Bye')가 호출 스택에 추가됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*1NAeDnEv6DWFewX_C-L8mg.png" width="600" alt=""> 

9. console.log ('Bye')가 실행됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*UwtM7DmK1BmlBOUUYEopGQ.png" width="600" alt=""> 

10. console.log ('Bye')가 호출 스택에서 제거됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*-vHNuJsJVXvqq5dLHPt7cQ.png" width="600" alt=""> 

11. 5000ms 후에 타이머가 완료되고 cb1 콜백을 Callback Queue로 푸시합니다. 

<img src="https://cdn-images-1.medium.com/max/800/1*eOj6NVwGI2N78onh6CuCbA.png" width="600" alt=""> 

12. 이벤트 루프는 Callback Queue에서 cb1을 가져 와서 콜 스택에 푸시합니다.

<img src="https://cdn-images-1.medium.com/max/800/1*jQMQ9BEKPycs2wFC233aNg.png" width="600" alt=""> 

13. cb1이 실행되고 console.log ('cb1')가 호출 스택에 추가됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*hpyVeL1zsaeHaqS7mU4Qfw.png" width="600" alt=""> 

14. console.log ('cb1')이 실행됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*lvOtCg75ObmUTOxIS6anEQ.png" width="600" alt=""> 

15. console.log ('cb1')은 호출 스택에서 제거됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*Jyyot22aRkKMF3LN1bgE-w.png" width="600" alt=""> 

16. cb1이 호출 스택에서 제거됩니다.

<img src="https://cdn-images-1.medium.com/max/800/1*t2Btfb_tBbBxTvyVgKX0Qg.png" width="600" alt=""> 

빠른 요약 :
<img src="https://cdn-images-1.medium.com/max/800/1*TozSrkk92l8ho6d8JxqF_w.gif" width="600" alt="">

흥미로운 점은 ES6에서는 이벤트 루프가 작동하는 방식을 지정한다는 점입니다. 기술적으로는 JS 엔진의 책임 범위 내에 있으며 더 이상 호스팅 환경 역할을 수행하지 않습니다.  
이 변경의 주된 이유 중 하나는 이벤트 루프 대기열에 대한 스케줄 작업에 대한 직접적이고 세분화 된 제어에 대한 액세스가 필요하기 때문에 ES6에서 Promise를 도입한다는 것입니다 (자세한 내용은 나중에 설명합니다).

#### setTimeout (...) 작동 방식

setTimeout (...)이 콜백을 이벤트 루프 대기열에 자동으로 저장하지 않는다는 점에 유의해야합니다.   
그것은 타이머를 설정합니다. 타이머가 만료되면 환경이 콜백을 이벤트 루프에 배치하여 향후 틱이 이벤트 루프를 선택하여 실행합니다.
다음 코드를 살펴보십시오:

```javascript
setTimeout(myCallback, 1000);
```

그렇다고 1,000ms안에 myCallback이 실행되는 것이 아니라 1,000ms안에 myCallback이 대기열에 추가된다는 것을 의미합니다. 그러나 대기열에는 이전에 추가 된 다른 이벤트가있을 수 있습니다. 콜백은 대기해야합니다. 

setTimeout(callback, 0)을 제안하는 자바스크립트에서 비동기 코드를 시작하는 방법에 대한 기사와 튜토리얼이  많이 있습니다.  
자, 이제 Event Loop의 기능과 setTimeout의 작동 방식을 알 수 있습니다. setTimeout을 0으로 두 번째 인수로 호출하면 호출 스택이 해제 될 때까지 콜백을 연기 할 수 있습니다.  

다음 코드를 살펴보십시오:

```javascript
console.log('Hi');
setTimeout(function() {
    console.log('callback');
}, 0);
console.log('Bye');
```

대기 시간이 0ms로 설정되어 있지만 브라우저 콘솔의 결과는 다음과 같습니다:

```javascript
Hi
Bye
callback
```

#### ES6의 Job은 무엇입니까? 

ES6에는 "Job Queue"이라는 새로운 개념이 도입되었습니다.   
이벤트 루프 대기열의 맨 위에있는 레이어입니다. Promise의 비동기 동작을 처리 할 때 가장 많이 부딪 힐 수 있습니다 (우리는 그들에 대해서도 이야기 할 것입니다).

Promise와 비동기 동작에 대해 논의 할 때 해당 동작을 예약하고 처리하는 방법을 이해할 수 있도록 개념을 살펴 보겠습니다.  

다음과 같이 상상해보십시오.   
Job Queue은 이벤트 루프 대기열의 모든 tick의 끝에 첨부되는 대기열입니다. 이벤트 루프의 tick 동안 발생할 수있는 특정 비동기 작업으로 인해 이벤트 루프 대기열에 완전히 새로운 이벤트가 추가되지는 않지만 대신 현재 tick의  Job Queue 끝에 항목 (일명 Job)이 추가됩니다.  

즉, 나중에 실행될 다른 기능을 추가 할 수 있으며 다른 기능보다 먼저 실행될 것이라는 확신을 가질 수 있습니다.  

또한 Job은 같은 큐의 끝에 더 많은 Job을 추가하게 할 수 있습니다. 이론 상으로는 Job 루프 (다른 Job 추가 등을 계속하는 Job)가 무기한으로 회전 할 수 있으므로 다음 이벤트 루프 틱으로 이동하는 데 필요한 리소스가 부족한 프로그램을 굶주릴 수 있습니다. 개념적으로 이것은 코드에서 while (true) ..와 같이 장기 실행 또는 무한 루프를 표현하는 것과 유사합니다.  

Job은 일종의 setTimeout (콜백, 0) "해킹"과 비슷하지만 훨씬 더 잘 정의되고 보장 된 순서를 도입하는 방식으로 구현됩니다: 나중에는 가능한 한 빨리...

#### Callbacks

이미 알고 있듯이 자바스크립트 프로그램에서 비동기를 표현하고 관리하는 가장 일반적인 방법은 콜백입니다. 실제로 콜백은 자바스크립트 언어에서 가장 기본적인 비동기 패턴입니다.  
수많은 JS 프로그램, 심지어 매우 정교하고 복잡한 프로그램조차도 콜백보다 다른 비동기 기반 위에 작성되었습니다. 

콜백에는 결점이 없다는 점을 제외하면 말입니다. 많은 개발자들이 더 나은 비동기 패턴을 찾으려고 노력하고 있습니다.  
그러나 실제적인 내용을 이해하지 못한다면 추상화를 효과적으로 사용하는 것은 불가능합니다.  

다음 장에서는 이 추상화 중 몇 가지를 깊이 탐구해, 왜 더 정교한 비동기 패턴(이는 다음 글에서 논의될 것입니다)이 필요한지, 심지어 추천하는지 살펴볼 것입니다.  

#### Nested Callbacks
다음 코드를 살펴보십시오:

```javascript
listen('click', function (e){
    setTimeout(function(){
        ajax('https://api.example.com/endpoint', function (text){
            if (text == "hello") {
	        doSomething();
	    }
	    else if (text == "world") {
	        doSomethingElse();
            }
        });
    }, 500);
});
```

우리는 서로 중첩 된 3개의 함수 체인을 가지고 있습니다. 각각의 함수는 비동기식 시리즈의 한 단계를 나타냅니다.

이런 종류의 코드는 종종 "callback hell"이라고 불립니다.  
그러나 "callback hell"은 실제로 중첩 / 들여 쓰기와 거의 관련이 없습니다. 그것보다 훨씬 더 심각한 문제입니다.

먼저 "클릭" 이벤트를 기다리고 타이머가 작동하기를 기다렸다가 Ajax반응이 돌아오기를 기다리고 있는데, 그 때 다시 모든 것이 반복될지도 모릅니다.

언뜻보기에 코드는 비동기를 자연스럽게 순차적인 단계로 매핑하는 것처럼 보일 수 있습니다.

```javascript
listen('click', function (e) {
	// ..
});
```
그럼 우리는:

```javascript
setTimeout(function(){
    // ..
}, 500);
```

그런 다음 우리는:
```javascript
ajax('https://api.example.com/endpoint', function (text){
    // ..
});
```
그리고 마지막으로:
```javascript
if (text == "hello") {
    doSomething();
}
else if (text == "world") {
    doSomethingElse();
}
```

따라서 비동기 코드를 표현하는 순차적인 방식은 훨씬 더 자연스러운 것처럼 보이지 않습니까?   
그런 방법이 있어야합니다, 그렇죠?  

#### Promises

다음 코드를 살펴보십시오:
```javascript
var x = 1;
var y = 2;
console.log(x + y);
```

모두 매우 간단합니다 : x와 y의 값을 합하여 콘솔에 출력합니다.   
그러나 x 또는 y의 값이 누락되어 여전히 결정될 경우 어떻게됩니까?   
예를 들어 표현식에서 x와 y 값을 모두 사용하려면 서버에서 x와 y 값을 가져와야합니다. 서버에서 x와 y의 값을 각각 load하는 loadX와 loadY 함수가 있다고 상상해 봅시다. 그런 다음 두 함수가 모두 load되면 x와 y의 값을 합한 함수 합계가 있다고 상상해 보십시오.

그것은 다음과 같이 보일 수 있습니다 (상당히 드럽습니다).

```javascript
function sum(getX, getY, callback) {
    var x, y;
    getX(function(result) {
        x = result;
        if (y !== undefined) {
            callback(x + y);
        }
    });
    getY(function(result) {
        y = result;
        if (x !== undefined) {
            callback(x + y);
        }
    });
}
// A sync or async function that retrieves the value of `x`
function fetchX() {
    // ..
}


// A sync or async function that retrieves the value of `y`
function fetchY() {
    // ..
}
sum(fetchX, fetchY, function(result) {
    console.log(result);
});
```

여기에 매우 중요한 것이 있습니다.  
그 발췌문에서 우리는 x와 y를 미래의 값으로 취급했고, x나 y 또는 둘 모두가 사용 가능했는지 또는 사용 가능하지 않은지에 상관없이 (외부에서) 연산 합계 (...)를 표현했습니다.

물론,이 거친 콜백 기반 접근 방식은 많이 필요합니다. 그것은 미래의 값에 대한 추론의 이점을 이해할 수있는 첫 단계 일뿐입니다.  

#### Promise Value

Promises를 사용하여 x + y 예제를 표현할 수있는 방법을 간단히 살펴 보겠습니다.

```javascript
function sum(xPromise, yPromise) {
	// `Promise.all([ .. ])` takes an array of promises,
	// and returns a new promise that waits on them
	// all to finish
	return Promise.all([xPromise, yPromise])

	// when that promise is resolved, let's take the
	// received `X` and `Y` values and add them together.
	.then(function(values){
		// `values` is an array of the messages from the
		// previously resolved promises
		return values[0] + values[1];
	} );
}

// `fetchX()` and `fetchY()` return promises for
// their respective values, which may be ready
// *now* or *later*.
sum(fetchX(), fetchY())

// we get a promise back for the sum of those
// two numbers.
// now we chain-call `then(...)` to wait for the
// resolution of that returned promise.
.then(function(sum){
    console.log(sum);
});
```

이 발췌문에는 두 개의 Promise가 있습니다.  

fetchX () 및 fetchY ()가 직접 호출되고 반환하는 값 (promises)은 sum (...)에 전달됩니다. 이 promises이 나타내는 근본 값은 현재 또는 나중에 준비가되어있을 수 있지만, 각 Promise은 그 행동을 관계없이 동일하게 정상화합니다.   
우리는 시간에 독립적인 방식으로 x와 y 값을 추론합니다. 그것들은 미래의 값이자 기간입니다.  

두 번째 레이어는 sum (...)이 생성하는 promises입니다.
(Promise.all ([...])을 통해) 반환하고, 우리는 그때 (...)를 호출하여 기다립니다. 합계 (...) 연산이 완료되면 미래의 합계 값이 준비되고 출력 할 수 있습니다. 우리는 sum (...) 내부의 x와 y 미래 값을 기다리는 논리를 숨깁니다.  

참고 : sum (...) 내에서 Promise.all ([...]) 호출은 promiseX를 기다리고 (promiseY 및 promiseY가 해결하기 위해) Promise을 만듭니다. .then (...)에 대한 연쇄 호출은 또 다른 Promise을 생성하며,
values ​​[0] + values ​​[1] 라인은 즉시 (결과와 함께) 해석됩니다. 따라서, 우리가 (...) 호출의 끝에서 체인 (즉, 코드)의 끝에서 체인 (snippet의 끝 부분)을 연결하면 Promise가 만든 첫 번째 Promise보다는 실제로 반환 된 두 번째 Promise이 작동합니다. 모두 ([...]). 또한, 우리가 그 두 번째 (...)의 끝에서 연쇄하고 있지는 않지만, 우리가 그것을 관찰 / 사용하도록 선택한 경우에도 또 다른 Promise을 만들었습니다. 이 Promise 연결 관련 내용은이 장의 뒷부분에서 자세히 설명합니다.

Promises를 사용하면 then (...) 호출은 실제로 두 가지 기능을 수행 할 수 있습니다. 첫 번째는 이행(이전에 표시된 것처럼)에 대한 것이고 두 번째는 거부에 대한 것입니다.

```javascript
sum(fetchX(), fetchY())
.then(
    // fullfillment handler
    function(sum) {
        console.log( sum );
    },
    // rejection handler
    function(err) {
    	console.error( err ); // bummer!
    }
);
```

x 또는 y를 얻을 때 뭔가 잘못되었을 때 또는 추가하는 동안 어떻게 든 실패한 경우 sum (...)이 반환한다는 Promises은 거부되고 그 다음에 전달 된 두 번째 콜백 오류 핸들러 (...)는 거부를 수신합니다.

Promises는 시간 의존 상태를 캡슐화하기 때문에 (외부에서 기본 가치의 충족 또는 거부를 기다리는) Promise 자체는 시간에 독립적이므로 Promise은 타이밍이나 결과에 관계없이 예측 가능한 방식으로 구성 (결합) 될 수 있습니다.

또한 Promise가 해결되면 영원히 그 상태를 유지하며 그 시점에서 불변의 값이되며 필요한만큼 여러 번 관찰 할 수 있습니다.

실제로 Promise을 묶을 수 있는 것은 정말 유용합니다.  

```javascript
function delay(time) {
    return new Promise(function(resolve, reject){
        setTimeout(resolve, time);
    });
}

delay(1000)
.then(function(){
    console.log("after 1000ms");
    return delay(2000);
})
.then(function(){
    console.log("after another 2000ms");
})
.then(function(){
    console.log("step 4 (next Job)");
    return delay(5000);
})
// ...
```

delay(2000)을 호출하면 2000ms에 성취 될 Promise을 작성한 다음 첫 번째 (...) 이행 콜백에서 반환합니다.  
이 콜백은 두 번째 (...)가 2000ms동안 Promise을 기다리겠다는 Promise을합니다.  

참고 : Promise는 일단 해결되면 외부 적으로 변경할 수 없으므로 실수로 또는 악의적으로 수정할 수 없다는 것을 알고 있으면 해당 값을 모든 당사자에게 전달하는 것이 안전합니다. 이것은 Promise의 결의를 준수하는 여러 당사자와 관련하여 특히 그렇습니다. 한 당사자가 Promise 결정을 준수하는 다른 당사자의 능력에 영향을 미칠 수는 없습니다. 이터 빌리티는 학술적 주제처럼 들릴지 모르겠지만 실제로는 Promise 설계의 가장 중요하고 중요한 측면 중 하나이며 아무렇게나 넘어서는 안됩니다.  

#### To Promise or not to Promise? 

Promise에 대한 중요한 세부 사항은 어떤 값이 실제 Promise인지 여부를 아는 것입니다. 다른 말로하면 Promise처럼 행동 할 수있는 값입니까?

우리는 Promise가 새로운 Promise (...) 구문에 의해 생성된다는 것을 알고 있으며, Promise가 충분한 체크가 될 것이라고 생각할 수도 있습니다.

주로 현재 창의 또는 프레임과 다른 자체 브라우저가있는 다른 브라우저 창(예 : iframe)에서 Promise 값을받을 수 있으며이 확인은 Promise 인스턴스를 식별하지 못합니다.

또한 라이브러리 또는 프레임 워크는 자체 Promises를 판매하고 고유 ES6 Promise 구현을 사용하지 않을 수도 있습니다. 사실 Promise가 전혀없는 오래된 브라우저에서 라이브러리를 사용하면 Promise를 사용할 수 있습니다.

#### Swallowing exceptions

Promise 작성 중 또는 해결 과정에서 TypeError 또는 ReferenceError와 같은 자바스크립트 예외 오류가 발생하면 해당 Promise가 거부 될 수 있습니다.

예 :
```javascript
var p = new Promise(function(resolve, reject){
    foo.bar();	  // `foo` is not defined, so error!
    resolve(374); // never gets here :(
});

p.then(
    function fulfilled(){
        // never gets here :(
    },
    function rejected(err){
        // `err` will be a `TypeError` exception object
	// from the `foo.bar()` line.
    }
);
```

그러나 Promise가 수행되었지만 관찰 중에 JS 예외 오류가 발생하면 (예 : (...) 등록 된 콜백에서) 어떤 일이 발생합니까?   
잃어 버리지는 않겠지만 조금 놀랍게 다루는 방식을 발견 할 수 있습니다.  
당신이 조금 더 깊게 파기 때까지 :

```javascript
var p = new Promise( function(resolve,reject){
	resolve(374);
});

p.then(function fulfilled(message){
    foo.bar();
    console.log(message);   // never reached
},
    function rejected(err){
        // never reached
    }
);
```
foo.bar()의 예외는 정말로 삼켜진 것처럼 보입니다.  
하지만 뭔가 더 깊은 것이 잘못되어서 우리는 귀를 기울이지 않았습니다. p.then (...)은 또 다른 Promise을 반환하고 TypeError 예외로 거부 될 Promise입니다.  

#### Handling uncaught exceptions (잡히지 않는 예외처리)

많은 사람들이 더 낫다고 말할 수 있는 다른 방법들이 있습니다.  
일반적인 제안은 promise가 done (...)을 추가해야한다는 것인데, promise chain을 본질적으로 "done"으로 표시합니다. done (...)은 Promise를 생성하고 반환하지 않으므로 done (...)으로 전달된 콜백은 분명히 존재하지 않는 체인된 Promise 문제를 보고하기 위해 연결되어 있지 않습니다.

일반적으로 잡히지 않은 오류 상황에서 예상대로 대처할 수 있습니다. 
done(..) 내부의 모든 예외는 global uncaught error(개발자 콘솔에서는 기본적으로)로 처리됩니다.

```javascript
var p = Promise.resolve(374);

p.then(function fulfilled(msg){
    // numbers don't have string functions,
    // so will throw an error
    console.log(msg.toLowerCase());
})
.done(null, function() {
    // If an exception is caused here, it will be thrown globally 
});
```

#### ES8에서 무슨 일이 벌어지고 있는가? Async/await

JavaScript ES8은 Promise로 작업하는 일을보다 쉽게 ​​만들어주는 async / await를 도입했습니다.   
우리는 async / wwait offer와 async 코드를 작성하는 방법을 간략하게 살펴볼 것입니다. 

그럼 async / wwait이 어떻게 작동하는지 보겠습니다.

async 함수 선언을 사용하여 비동기 함수를 정의합니다. 이러한 함수는 AsyncFunction 객체를 반환합니다. AsyncFunction 객체는 해당 함수 내에 포함 된 코드를 실행하는 비동기 함수를 나타냅니다.  

비동기 함수가 호출되면 Promise을 반환합니다. async 함수가 Promise가 아닌 값을 반환하면 Promise가 자동으로 만들어지고 함수에서 반환 된 값으로 해결됩니다. 비동기 함수가 예외를 throw하면 던져진 값으로 Promise가 거부됩니다.  

비동기 함수에는 await식이 포함될 수 있습니다.이 함수는 함수의 실행을 일시 중지하고 전달 된 Promise의 해결을 기다린 다음 비동기 함수의 실행을 다시 시작하고 해결 된 값을 반환합니다. 

자바스크립트의 Promise를 Java의 Future 또는 C#의 Task와 동일하게 생각할 수 있습니다. 

##### async / await의 목적은 Promise를 사용하는 동작을 단순화하는 것입니다.

다음 예제를 살펴 보겠습니다:

```javascript
// Just a standard JavaScript function
function getNumber1() {
    return Promise.resolve('374');
}
// This function does the same as getNumber1
async function getNumber2() {
    return 374;
}
```
마찬가지로 예외를 던지는 함수는 거부된 Promise을 반환하는 함수와 같습니다: 
```javascript
function f1() {
    return Promise.reject('Some error');
}
async function f2() {
    throw 'Some error';
}
```

await 키워드는 비동기 함수에서만 사용할 수 있으며 Promise에서 동기적으로 대기 할 수 있습니다. 비동기 함수 밖에서 Promise을 사용한다면 콜백을 사용해야합니다.

```javascript
async function loadData() {
    // `rp` is a request-promise function.
    var promise1 = rp('https://api.example.com/endpoint1');
    var promise2 = rp('https://api.example.com/endpoint2');
   
    // Currently, both requests are fired, concurrently and
    // now we'll have to wait for them to finish
    var response1 = await promise1;
    var response2 = await promise2;
    return response1 + ' ' + response2;
}
// Since, we're not in an `async function` anymore
// we have to use `then`.
loadData().then(() => console.log('Done'));
```

또한 "비동기식 표현식"을 사용하여 비동기 함수를 정의 할 수 있습니다. 비동기 함수 표현식은 비동기 함수 구문과 매우 유사하며 거의 동일한 구문을가집니다. 비동기 함수 표현식과 비동기식 함수 구문의 주요 차이점은 함수 이름입니다.이 함수 이름은 익명 함수를 만들기 위해 비동기 함수 표현식에서 생략 할 수 있습니다. 비동기식 표현식은 정의되는 즉시 실행되는 IIFE (Immediately Invoked Function Expression)로 사용될 수 있습니다.

다음과 같습니다:

```javascript
var loadData = async function() {
    // `rp` is a request-promise function.
    var promise1 = rp('https://api.example.com/endpoint1');
    var promise2 = rp('https://api.example.com/endpoint2');
   
    // Currently, both requests are fired, concurrently and
    // now we'll have to wait for them to finish
    var response1 = await promise1;
    var response2 = await promise2;
    return response1 + ' ' + response2;
}
```

더 중요한 것은 모든 주요 브라우저에서 async / await가 지원된다는 것입니다.

<img src="https://cdn-images-1.medium.com/max/800/0*z-A-JIe5OWFtgyd2." width="600" alt=""> 
이 호환성이 여러분이 추구하는 것과 다르다면, 바벨(Babel)과 타입 스크립트(TypeScript) 같은 여러 가지 JS 변환기가 있습니다. 

결국 비동기 코드를 작성하는 "최신"방식을 맹목적으로 선택하지 않는 것이 중요합니다.   
비동기 자바스크립트의 내부 구조를 이해하고 필수적인 이유와 선택한 메소드의 내부를 심도있게 이해하는 것이 중요합니다. 모든 접근법은 프로그래밍의 모든 것과 마찬가지로 장단점이 있습니다.

### 유지 보수가 가능하고 쉬운 비동기 코드 작성에 관한 5가지 팁 

1. <b>깨끗한 코드</b> : async / await를 사용하면 훨씬 적은 코드를 작성할 수 있습니다. async를 사용할 때마다 몇 가지 불필요한 단계를 건너 뜁니다. .then을 쓰고, 익명 함수를 만들어 응답을 처리하고, 해당 콜백의 응답 이름을 지정합니다. 

```javascript
// `rp` is a request-promise function.
rp('https://api.example.com/endpoint1').then(function(data) {
 // …
});
```
Versus(와 대비하여):
```javascript
// `rp` is a request-promise function.
var response = await rp('https://api.example.com/endpoint1');
```

2. <b>오류 처리</b> : Async / await을 사용하면 잘 알려진 try / catch 문과 동일한 코드 구문을 사용하여 동기화 및 비동기 오류를 모두 처리 할 수 있습니다.  
Promises로 어떻게 보이는지 봅시다.

```javascript
function loadData() {
    try { // Catches synchronous errors.
        getJSON().then(function(response) {
            var parsed = JSON.parse(response);
            console.log(parsed);
        }).catch(function(e) { // Catches asynchronous errors
            console.log(e); 
        });
    } catch(e) {
        console.log(e);
    }
}
```
Versus(와 대비하여):
```javascript
async function loadData() {
    try {
        var data = JSON.parse(await getJSON());
        console.log(data);
    } catch(e) {
        console.log(e);
    }
}
```

3. <b>조건부</b> : async / await으로 조건부 코드를 작성하는 것이 훨씬 더 간단합니다.

```javascript
function loadData() {
  return getJSON()
    .then(function(response) {
      if (response.needsAnotherRequest) {
        return makeAnotherRequest(response)
          .then(function(anotherResponse) {
            console.log(anotherResponse)
            return anotherResponse
          })
      } else {
        console.log(response)
        return response
      }
    })
}
```
Versus(와 대비하여):
```javascript
async function loadData() {
  var response = await getJSON();
  if (response.needsAnotherRequest) {
    var anotherResponse = await makeAnotherRequest(response);
    console.log(anotherResponse)
    return anotherResponse
  } else {
    console.log(response);
    return response;    
  }
}
```

4. <b>Stack Frames</b> : async / await와는 달리, Promise 체인에서 반환 된 오류 스택은 오류가 발생한 위치를 알 수 없습니다.   
다음을보십시오 : 

```javascript
function loadData() {
  return callAPromise()
    .then(callback1)
    .then(callback2)
    .then(callback3)
    .then(() => {
      throw new Error("boom");
    })
}
loadData()
  .catch(function(e) {
    console.log(err);
// Error: boom at callAPromise.then.then.then.then (index.js:8:13)
});
```
Versus(와 대비하여):
```javascript
async function loadData() {
  await callAPromise1()
  await callAPromise2()
  await callAPromise3()
  await callAPromise4()
  await callAPromise5()
  throw new Error("boom");
}
loadData()
  .catch(function(e) {
    console.log(err);
    // output
    // Error: boom at loadData (index.js:7:9)
});
```

5. <b>디버깅</b> : Promise을 사용했다면 디버깅이 악몽이라는 것을 알고 있습니다. 예를 들어 .then 블록 내에 중단 점을 설정하고 "중지"와 같은 디버그 바로 가기를 사용하면 디버거가 동기 코드를 "단계별로"수행하기 때문에 다음으로 이동하지 않습니다.  
async / await을 사용하면 정상적인 동기 함수 인 것처럼 정확히 기다릴 수 있습니다.

비동기 자바스크립트 코드를 작성하는 것은 앱 자체뿐만 아니라 라이브러리에서도 중요합니다.  

예를 들어, SessionStack 라이브러리는 웹 애플리케이션 / 웹 사이트에있는 모든 DOM 변경 사항, 사용자 상호 작용, JavaScript 예외, 스택 추적, 실패한 네트워크 요청 및 디버그 메시지를 기록합니다.  

그리고이 모든 것은 UX에 영향을 미치지 않으면서 프로덕션 환경에서 발생해야합니다.   
이벤트 루프로 처리되는 이벤트의 수를 늘릴 수 있도록 코드를 최대한 많이 최적화하여 가능한 한 비동기로 만들어야합니다.  

그리고 라이브러리뿐 아니라! SessionStack에서 사용자 세션을 재생할 때 문제가 발생했을 때 사용자의 브라우저에서 발생한 모든 것을 렌더링해야하며 전체 상태를 재구성해야 세션 타임 라인에서 앞뒤로 이동할 수 있습니다. 이를 가능하게하기 위해 우리는 자바스크립트가 제공하는 비동기 기회를 많이 사용하고 있습니다.  

[무료로 시작할 수있는 계획이 있습니다.](https://www.sessionstack.com/solutions/developers/?utm_source=medium&utm_medium=blog&utm_content=Post-4-eventloop-GetStarted)

<img src="https://cdn-images-1.medium.com/max/800/0*xSEaWHGqqlcF8g5H." width="600" alt="">

Resources:

- https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch2.md
- https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md
- http://nikgrozev.com/2017/10/01/async-await/