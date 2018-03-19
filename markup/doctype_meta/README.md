## DOCTYPE 선언

HTML을 시작하기 위해선 DOCTYPE을 선언해야된다. (선언을 하면서 웹문서를 시작하곘다 라는 의미)

### DOCTYPE 종류

#### HTML5
최신버전으로 현재 사용하고있는 선언문
#### 선언방식
````
<!DOCTYPE html>
````

#### HTML4.01

##### 모드 종류
- strict (엄격 모드)(표현 효과 위주의 마크업 태크 금지)
- transitional (일반적으로 많이 사용하는 모드)
- frameset (프레임셋에서만 사용할 경우 선언)

#### 선언방식
````
strict 방식
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 
transitional 방식
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
frameset 방식
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
````

#### XHTML 1.0

##### 모드 종류
- strict (엄격 모드)(표현 효과 위주의 마크업 태크 금지)
- transitional (일반적으로 많이 사용하는 모드)
- frameset (프레임셋에서만 사용할 경우 선언)
````
strict 방식
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 
transitional 방식
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
frameset 방식
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

````


[html5 vs html4 참고](http://cafe.daum.net/clearring/Pthj/94?q=html4)


## META 태그
HTML문서가 어떤 무서인지 설명하거나 추가적인 정보를 알리는 태그

#### 기본적인 메타 태그
인코딩 
````
<meta charset="UTF-8">
````

제목
````
<meta name="title" content="문서제목">
````
해당 문서 설명
````
<meta name="description" content="문서 설명">
````
키워드 등록
````
<meta name="keywords" content="최재욱,edwad,love">
````
문서 작성한 사람
````
<meta name="author" content="edward">
````

viewport 지정
````
<meta name="viewport" content="width=device-width, initial-scale=1.0">
모바일 용도에서 쓰이는것으로 다양한 기기에 따라 웹 페이지 배율을 의미한다.
 
최소 최대 배율설정
minimum-scale=1.0, maximum-scale=2.0
````
단 IE10은 뷰포트 조절을 위해 meta viewport 대신에 @viewport rule 사용
````
<style>
	@-ms-viewport{width:device-width}
	@-o-viewport{width:device-width}
	@viewport{width:device-width}
</style>
````

````
<meta name="viewport" content="width=1200, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi, width=device-width">
모바일이나 반응형이 아닌 일반 웹일경우 모바일에서 보면 화면이 크게 나타나는 현상이 일어난다. 그걸 방지 하기위해 모바일 크게에 맞춰 viewport 조절방법
````

[viewport 참고 사이트](http://aboooks.tistory.com/352?category=516603) 


ios 숫자 자동 주소창 방지
````
<meta name='format-detection' content='telephone=no, address=no, email=no'>
ios 경우 숫자만 써져있을 경우 tel로 자동 링크, mail 일경우 mail로 자동 링크 걸림
````

홈페이지 열었을 경우 해당 ie 버전으로 열리는 메타태그
````
<meta http-equiv="X-UA-Compatible" content="IE=edge">
````

[메타태그 종류 사이트](http://www.nanumtip.com/qa/75671/)



#### 파비콘
````
<link rel="shortcut icon" href="/images/common/ico_favicon.ico">
````


### css 선언

- inline 방식 (직접 태그에 작성하는 방식) ````<div style="width:100%">술마시자</div>````
- link 방식  ````<link href="../css/style.css" rel="stylesheet">````
- static 방식 (head style 방식) ````<style> #id{width:100%} </style>````

### js 선언
````<script type="text/javascript" src="/js/head.js"></script>````

head에 넣을 경우
````
	jQuery 예시
	
 <script>
 	$(document).ready(function(){
 
 	});
 </script>
 
  html은 순차적으로 읽혀서 실행된다. div 태그보다 위에 javascript를 실행할 경우 태그 자체를 찾을수 없어 오류가 난다. 그러기 위해 상단에 위치할 경우 document를 전부 읽히고 자바스크립트를 읽어야된다.
````