## 구글 v8 자바스크립트 엔진에 대한 간략한 역사

by CLAIR SMITH
September 28, 2017

자바스크립트는 재발자 커뮤니티에서 끔찍한 언어로 명성이 높습니다. class가 없고, 루주한 타입 이며, 크로스 브라우져 이슈로 어려움이 겪습니다.  
JavaScript: The Good Parts의 저자인 Douglas Crockford는 "자바스크립트는 프로그래밍 언어에 들어간 최고의 아이디어 중 일부를 포함하고 있으며 프로그래밍 언어에 들어간 최악의 아이디어 중 일부를 포함하고 있다"고 말했습다. 그것은 1995년에 불과 10일 만에 만들어졌고 거의 3년 후까지 ECMA에 의해 표준화되지 않았습다. 마이크로소프트는 초기에 새로운 표준을 구현하지 않기로 결정하여 초기 단계에서 거의 언어에 종지부를 찍었습니다.  

SpiderMonkey라는 코드명을 가진 최초의 자바스크립트 엔진은 Netscape Navigator용으로 제작되었으며 단순히 소스코드를 읽고 실행하는 인터프리터였습니다. 그 당시, 그리고 몇년 동안, 자바스크립트는 일반적으로 웹페이지의 head나 인라인 이벤트에 쓰여진 몇 가지 기능으로 구성되었습니다. 필요에 따라 코드를 해석하는 것은 빠르지는 않았지만 만족 스러웠습니다.  

구글이 새로운 애플리케이션인 구글 맵을 도입한 2004년까지 앞으로 10년간은 생략하겠습니다. 모든 곳에서 자바스크립트와 개발자들에게 구글맵스는 게임체인저(판도를 바꾸는 것)입니다. 아주, 아주 느린 게임 체인저입니다. 자바스크립트 엔진이 그 모든 코드를 간단히 제거했을 때 브라우저는 다운되었습니다.

자바스크립트 엔진에 대한 설명에 전념하는 무수한 페이지와 bits가 있습니다. 이 게시물의 마지막 부분에있는 '자세히 알아보기'섹션을 참조하십시오. 또한 가장 전문적인 JS 개발자조차도 분명하지 않은 주제입니다. 그래서 엔진에 대한 아주 간략한 개요를 알려드리고 싶은데, 특히 지금은 상자안에서 가장 빛나는 장난감인 V8입니다. 

대부분의 자바스크립트 엔진은 몇 단계로 코드를 처리합니다.  
첫째, lexical analysis은 그 의미를 확인하기 위해 코드를 토큰으로 나눕니다.  
토큰은 파서에 의해 분석되고 bytecode와 같은 중간 언어로 구문 트리에 내장됩니다. 마침내 JIT 컴파일러가 코드를 실행합니다.  

<br>
#### 2008년에 구글은 엔진의 보급형 버전인 V8을 발표했습니다.       

V8 엔진은 여러 스레드를 사용합니다. 메인 쓰래드는 당신이 기대하는 대로 수행합니다 : 코드를 가져 와서 컴파일하고 실행합니다.   
또한 컴파일을 위한 별도의 스레드가있어 메인 스레드가 코드를 최적화하는 동안 계속 실행될 수 있도록하고 컴파일러가 최적화 할 수 있도록 많은 시간을 보내는 방법을 런타임에 알려주는 프로파일러 스레드를 제공합니다. garbage collection 및 dead code elimination를 처리 할 수있는 스레드가 있습니다.  

V8에는 Full-Codegen과 Crankshaft라는 2가지 컴파일러가 있습니다. Full-Codegen은 중간 언어없이 자바스크립트를 기계어 코드로 직접 파싱하므로 더 빨리 실행될 수 있습니다. Crankshaft라는 JIT 컴파일러는 최신 메소드에 최적화된 코드를 생성합니다. 즉, 동일한 V8 프로그램에서 서로 다른 수준의 최적화 된 코드가 동시에 공존합니다.  

Crankshaft는 실제로 속도가 나오는 곳입니다. Full-Codgen이 실행되는 동안 런타임 프로파일러는 여러 번 실행되는 코드인 "hot code"를 식별합니다. 이 시점에서 현재 스레드는 코드 실행을 중지하고 이를 Crankshaft에 전달합니다. 모든 최적화를 위한 기본은 Smaltalk가 개척 한 기술인 inline-caching입니다. 더 나은 코드로 코드를 즉시 패치하는 것으로 구성됩니다.  

파싱된 JS는 먼저 대부분의 최적화가 수행되는 Hydrogen이라는 고수준 표현으로 컴파일됩니다. 이것은 type-specialization가 일어나는 곳입니다. type-specialization은 자바스크립트가 boxing 및 unboxing 작업을 호출하는 것을 제거합니다. 예를 들어 스크립트가 정수 집합에 함수를 실행하는 경우 문자열과 부동 소수점을 parse하는데 필요한 모든 단계를 정렬하지 않고 정수를 parse하기 위해 필요한 단계를 저장하여 다시 실행하지 않아도 됩니다.  

JS는 type이 지정되지 않았기 때문에 specialized generated code가 계속 작동한다는 보장이 없습니다. 문자열이나 두 배로 작업하기 위해 함수를 호출 할 수 있습니다. 이 코드는 이제 최적화되지 않고 실행 중인 스레드에서 빠져 나와 원래 런타임 코드로 교체해야 합니다. 이것은 온스택 교체 (OSR)라고하는 기술로 수행됩니다. OSR은 최적화된 코드와 최적화되지 않은 코드를 전환하면서 현재 스택 프레임의 의미론을 보존하는 메커니즘입니다. OSR을 사용하여 함수 인수가 type을 전환할 때 최적화된 코드가 당겨지고 스레드가 원래 Hydrogen generated 스레드로 다시 던져져 다시 컴파일됩니다.

Crankshafts의 마지막 임무는 건축물마다 다른 Lithium 레벨로 표현을 낮추는 것입니다.(Crankshafts final job is to lower the representation to a level called Lithium, which is architecture specific.)??  
Lithium은 최종적으로 기계 코드로 변환되는 표현입니다. 여기서 OSR을 다시 보게됩니다. 이 모든 단계가 진행되는 동안 브라우저 또는 응용 프로그램에서 코드가 실행되었으며, 이제 완전히 컴파일되고 최적화된 버전이 있으므로 실행 중간에 최적화된 버전으로 전환할 수 있습니다.  

두 컴파일러를 동시에 실행하면 성능이 27% 향상되며, 아직 끝나지 않았습니다 6주마다 V8 팀이 새로운 지점을 출시합니다. 9월 11일에 팀은 6.2 버전을 발표했으며 몇 주 안에 Chrome 62와 함께 출시 될 예정입니다. 이 다음 버전에는 팀에서 "모든 종류의 개발자 지향적 인 기능"과 성능 최적화를 포함합니다. [여기에 대한 다음 자료](https://v8.dev/blog/v8-release-62)를 읽을 수 있습니다. 

<br>
##### 더 알아보기

- Chrome V8 developer channel: https://developers.google.com/v8/

- Red Hat Developer Program: Javascript Engine & Performance Comparison (V8, Chakra, Chakra Core): https://developers.redhat.com/blog/2016/05/31/javascript-engine-performance-comparison-v8-charkra-chakra-core-2/

- Lars Bak: V8: an open source JavaScript engine: https://www.youtube.com/watch?v=hWhMKalEicY

- Daniel  Clifford: Google I/O 2012 - Breaking the JavaScript Speed Limit with V8: https://www.youtube.com/watch?v=UJPdhx5zTaw&t=48s


<br>
##### Additional Resources
- [AMP'lify Your Website: Google AMP 101](https://www.mediacurrent.com/blog/amplify-your-website-google-amp-101/) | Blog
- [Next-Level Drupal: Applied Progressive Decoupling with Javascript](https://www.mediacurrent.com/videos/next-level-drupal-applied-progressive-decoupling-javascript/) | Video
- [Decoupled Blocks with Drupal 8 and Javascript](https://www.mediacurrent.com/blog/decoupled-blocks-drupal-8-and-javascript/) | Blog


