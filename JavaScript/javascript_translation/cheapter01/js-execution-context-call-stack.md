# Javascript : 실행 컨텍스트(Context)란 무엇인가? / 콜 스택(Call Stack)은 무엇인가?

## 자바스크립트에서 실행 컨텍스트는 무엇인가?

<!-- ![고급 자바스크립트](https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-what-is-execution-context-call-stack-ft.png) -->

<img src="https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-what-is-execution-context-call-stack-ft.png" width="800"  alt="고급자바스크립트">

당신은 답을 모르는게 분명합니다.  
프로그래밍 언어의 가장 기본적인 구성 요소는 무엇입니까?  
변수와 함수가 맞습니까? 누구나 기본원칙은 배울 수 있습니다.  
하지만 기본을 넘어서는 것은 무엇입니까?  
자신을 중급(또는 시니어) 자바스크립트 개발자라고 부르기 전에 숙달해야 할 자바스크립트의 개념은 무엇입니까?  
스코프(Scope), 클로저(Closure)(클로저에 관한 블로그 게시물이 있지만 이탈리아어로되어 있습니다), 콜백(Callbacks), 프로토타입(Prototype)등 다양합니다.  
이탈이아어 클로져 블로그 : https://www.servermanaged.it/blog/closures-javascript/

그러나 이러한 개념들을 깊이 연구하기 전에 당신은 적어도 자바스크립트 엔진이 어떻게 작동하는지 이해해야 합니다.  
이 게시물에서 우리는 모든 자바스크립트 엔진의 두 가지 기본 요소인 실행 컨텍스트와 콜 스택을 살펴볼 것입니다.  
(두려워하지 마세요. 생각보다 쉽습니다.)  

준비됐습니까?

이 자료는 나의 고급 자바스크립트 수업의 일부로서 원격 1:1 교육이나 유럽에서 현장 교육으로 이용할 수 있습니다.

***

## JavaScript: 실행 컨텍스트란? 무엇을 배울 것인가?

이 게시물을 통해 당신은 배울것입니다.
- 자바스크립트 엔진의 작동 방식
- 자바스크립트의 실행 컨텍스트
- 콜스택 
- 글로벌 실행 컨텍스트와 로컬 실행 컨텍스트의 차이

***

## JavaScript : 실행 컨텍스트란 무엇입니까? Javascript는 코드를 어떻게 실행합니까?

자바스크립트 코드는 어떻게 실행합니까?  
만약 상급 개발자라면 당신은 이미 답을 알고 있을 것입니다.  
당신이 초보자라면 우리는 함께 알아 볼 것입니다.  

이제 다음 코드를 보십시오.  


```javascript
  1 var num = 2;
  2 function pow(num){
  3   return num * num;
  4 }
```

다 됐습니까?  

어려워 보이지 않습니다.  
이제 말해보세요. 브라우저가 코드를 어떤 순서대로 평가할 거라고 생각하십니까?  
다시말해, 당신이 브라우저라면, 코드를 어떻게 읽을 것입니까?  
쉬운 일처럼 들립니다.  
대부분 사람들은 "그래~ 브라우저가  function pow를 실행하고 결과를 반환한 다음 2를 num에 할당한다.”고 생각합니다.  
제 학생의 대답을 알고 싶습니까?  
위에서 아래로  
브라우저는  function pow에서 시작하여 num * num을 계산합니다.  
JS 엔진은 코드 라인을 한 줄씩(일종의) 실행합니다.  
나는 그것을 예상하고 있었습니다.  
나도 몇 년 전에 똑같은 말을 했습니다.  
다음 섹션에서는 단순한 코드 라인 뒤에 있는 장치를 발견할 것입니다.  

***

## JavaScript : 실행 컨텍스트란 무엇입니까? Javascript 엔진

자바스크립트가 어떻게 코드를 실행하는지 이해하기 위해서는 첫번째 무서운 일 : 즉 실행 컨텍스트를 충족시켜야 됩니다.  
자바스크립트에서 실행 컨텍스트는 무엇입니까?  
브라우저 (혹은 node)에서 자바스크립트를 실행할 때 마다 엔진은 일련의 단계를 거칩니다.  
이 단계중 하나는 글로벌 실행 컨텍스트의 생성을 포함합니다.  

잠깐 Valentino(글쓴이 이름), 엔진은 무엇입니까?  

즉, 자바스크립트 엔진은 자바스크립트 코드를 실행하는 '엔진'입니다.  
요즘에는 두개의 유명한 자바스크립트 엔진이 있습니다. 
```
- Google V8
- SpiderMonkey
```
V8은 Google Chrome 및 Node.js에서 사용되는 Google의 오픈 소스 자바스크립트 엔진입니다.  
SpiderMonkey는 Firefox에서 사용되는 Mozilla의 자바스크립트 엔진입니다.  

지금까지 우리는 자바스크립트 엔진과 실행 컨텍스트를 가지고 있습니다.    
이제 그것들이 어떻게 함께 일하는지 이해할 때가 되었습니다.  

***

## JavaScript : 실행 컨텍스트란 무엇입니까? 작동 원리는?

엔진은 자바스크립트 코드를 실행할 때마다 전역 실행 컨텍스트를 만듭니다.  
실행 컨텍스트는 자바스크립트 코드가 실행되는 환경을 설명하기 위한 멋진 단어입니다.  
이런 추상적인 것들을 상상하기란 쉽지 않습니다.  

현재 전역 실행 컨텍스트를 상자로 생각해 보십시오:


<img src="https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-what-is-global-execution-context-1.png" width="800"  alt="글로벌 메모리">

코드를 다시 한번 살펴봅시다.

```javascript
  1 var num = 2;
  2 function pow(num){
  3  return num * num;
  4 }
```

엔진은 어떻게 코드를 읽습니까?

다음은 간단한 버전:

엔진 : 라인 1번. 변수가 있다! 좋아. 글로벌 메모리에 저장합니다.  
엔진 : 라인 3번. function 선언이 보인다. 좋아. 글로벌 메모리에 저장합니다!  
엔진 : 다 끝난 것 같습니다.

다시 묻는다면 : 브라우저가 다음 코드를 "보는"방법은 무엇입니까?  
If I were to ask you again: how does the browser “see” the following code, what would you say?

그래, 위에서 맨 아래...  
Yeah, it’s kind of top to bottom but …  

보다시피 엔진이 function pow를 실행하지 않습니다.  

함수 선언이지 함수 호출이 아닙니다.

위의 코드는 전역메모리에 저장된 일부 값을 변환합니다: 함수 선언과 변수  

글로벌 메모리?

Valentino, 나는 이미 실행컨텍스트 때문에 혼란스운데 지금 글로벌 메모리를 던지는거야?  

네 맞습니다.  

글로벌 메모리가 무엇인지 봅시다.  


***

## JavaScript : 실행 컨텍스트란 무엇입니까? 글로벌 메모리...  

자바스크립트 엔진에도 글로벌 메모리가 있습니다.  

글로벌 메모리에는 나중에 사용할 수 있게 전역 변수 및 함수 선언이 포함되어 있습니다.  
카일 심슨(Kyle Simpson)이 쓴 "Scope and Closures"을 읽으면 글로벌 메모리가 글로벌 스코프의 개념과 겹친다는 사실을 알게 될 것입니다.  

사실 같은 것입니다.  
나는 지금 1만피트 높이를 날고있는 좋은 이유가 있습니다.  
그것들은 어려운 개념입니다.  

하지만 지금은 걱정할 필요가 없습니다.  
우리 퍼즐의 중요한 두 조각을 이해해줬으면 좋겠습니다.  
자바스크립트 엔진이 코드를 실행하면 다음과 같이 생성 됩니다.  

- 전역 실행 컨텍스트(Global Execution context)
- (Global Memory)전역 메모리 (Global Scope 또는 전역변수 환경(Global Variable Environment))  

모든 것을 알겠습니까?  

이 시점에서 내가 너라면 나는 다음과 같이 하겠습니다.  

- 자바스크립트 코드를 적으세요.
- 당신이 엔진인 것처럼 차근차근 코드를 분석하세요.
- 실행 중에 글로벌 실행 컨텍스트와 글로벌 메모리를 모두 그래픽으로 표현하십시오.  

연습은 종이에 쓰거나 prototyping tool을 사용하여 쓸 수 있습니다.  
나의 작은 예는 다음과 같습니다.  

<img src="https://www.valentinog.com/blog/wp-content/uploads/2018/05/javascript-global-execution-context-global-memory.png" width="800"  alt="자바스크립트 엔진">

다음 섹션에서는 또 다른 무서운 것을 살펴 볼 것입니다 : 콜 스택 (Call Stack)


***

## JavaScript : 실행 컨텍스트란 무엇입니까? 콜 스택 (Call Stack)은 무엇 입니까?  

실행 컨텍스트, 글로벌 메모리 및 자바스크립트 엔진이 어떻게 조화를 이루는지 잘 아십니까?  
그렇지 않은 경우에는 이전 섹션을 검토하십시오.  
우리는 퍼즐에서 다른 조각을 소개할 것입니다 : 콜 스택 (Call Stack)  
자바스크립트 엔진이 당신의 코드를 작동시킬 때 어떤 일이 일어나는지 먼저 다시 한번 정리해 봅시다.  
다음을 생성합니다.  

- 전역 실행 컨텍스트(Global Execution context)
- 전역 메모리(Global Memory)  

우리의 예제에서 더이상 아무것도 일어나지 않았습니다:

```javascript
  1 var num = 2;
  2 function pow(num){
  3  return num * num;
  4 }
```  