## VueJs
- 데이터 바인딩과 화면 단위를 컴포넌트 형태로 제공하며 관련 API를 지원하는데에 궁극적인 목적

#### MVVM 패턴
Backend 로직과 client의 마크업 & 데이터 표현단을 분리하기 위한 구조 

#### Vue Instance
````
var vm = new Vue({
	template:
	el: 화면 구성
	methods:{} 클릭 이나 http 요청
	created:{}
})

````
