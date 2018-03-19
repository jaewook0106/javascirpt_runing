## HTML 태그

[생활코딩 html 정보](https://opentutorials.org/module/552/4786)
[생활코딩 css 정보](https://opentutorials.org/module/441/3798)

### 단일태그
ex)
````
<img src="">이처럼 닫는 태그가 없는것을 단일태그라고 한다.
HTML5 쓰이는 방식  - <img src="">
HTML5 이전 방식 - <img src="" />  끝에 '/' 꼭 해줘야된다.
````

### inline 요소
- inline 요소안에 block 요소가 들어올 수 없다.
- inline 요소안에는 inline 요소만 쓸수 있다.

ex)
span, strong, em, img, a, button, textarea, label, input, select, sub, sup 등


### block 요소
- HTML 문서상에서 전반적인 흐름을 유도하는 컨텐츠
- block 요소안에 block, inline 모두 포함시킬수 있다.
- p 태그는 block 요소이지만 p태그 안에 p태그가 들어오면 안된다.

ex) 
div, p, ul, ol, li, h1~6, dl, dt, dd, form, fieldset, header, nav, foot, section, article, aside, video, audio, adress 등


### inline-block 요소
- 인라인과 블록요소 둘다 성격을 지닌 요소
- 하지만 인라인이 완전한 블록요소가 될수 없으며, 또한 블록요소도 완전한 인라인요소로 될순 없다.


## 태그

#### article, section
문서내에 독립적인 컨텐츠를 나타낸다.
section 태그와 비슷하게 느껴지겠지만 section 경우 독립적이지 않으며, 다른 영역과 구분되는 용도로 사용된다.

#### aside
페이지 전체 내용과는 직접적인 연관성이 없는 부분에 사용된다.

#### p
문단 태그로 p태그 안에 p태그는 존재할수 없다.

#### ul, ol
- ul은 순서가 중요하지 않는 목록을 나타내며, ol은 순차적인 목록을 나타낸다.
- ul, ol은 li 태그만 들어 갈 수 있다.

#### dl, dt, dd
- 용어를 정의와 설명을 하는 태그이다.
- dl을 사용할시 dt가 처음으로 존재 하여야된다.
- dt 다음 dd가 존재하여야되며 dl 태그 안에 여러번 쓸수 있다.

ex)
````
	<dl>
		<dt></dt>
		<dd></dd>
		<dd></dd>
		<dt></dt>
		<dd></dd>
	</dl>
````

#### form, fieldset, legend
- 폼 태그로써 홈페이지 상호 작용할 수 있게 사용한다.
- form 태그는 페이지당 하나만 존재 할 수 있다.
- fieldset은 label과 input등 그룹화를 시켜주는 역활을 한다.
- legend는 fieldset에 대한 제목이라고 생각하면된다.

ex)
````
	<form action="" method="" name="">
		<fieldset>
			<legend>사용자 이름</legend>
			<label for="userName">이름</label>
			<input type="text" id="userName" name="">
		</fieldset>
		<div>
			<ul>
				<li></li>
				<li></li>
			</ul>
		</div>
		<fieldset>
			<legend>사용자 나이</legend>
			<label for="userAge">나이</label>
			<input type="text" id="userAge" name="">
		</fieldset>
	</form>
````

#### label
- input, select, textarea 해당되는 이름표이다.
- label은 for속성을 사용하여 input, select, textarea에 속성 id 값과 일치 시켜 동기화합니다.

#### input
##### type
- text: 텍스트 입력필드 
- password: 비밀번호 입력필드
- checkbox: 체크박스 생성
- radio: 라이오버튼 생성
- submit: 송신버튼 생성
- image: 이미지버튼 생성
- hidden: 감춰진 필드

##### name
type 속성이 checkbox나 radio 경우 name 속성이 같으면 하나의 그룹으로 취급

##### value
##### size
type이 text나 password 일 경우 문자수를 지정하며 그외는 픽셀값을 지정

##### maxlength
최대 입력 문자수 지정
##### max, min
최대 최소 값 지정
##### width, height
##### placeholder
사용자 입력을 도와주는 짧은 안내문

#### select
선택목록 생성

- autofocus : 페지이 로드할때 해당 요소에 자동으로 포커스
- disabled : 포커스, 선택 변경등 조작 불가능
- multiple : 복수 선택가능
- size : 목록 갯수 지정
- required : 필수요소 지정
- name
- form

ex)
````
	<label for="fruit">과일선택</label>
	<select id="fruit">
		<option value="" selected>바나나</option>
		<option value="">복숭아</option>
		<option value="">수박</option>
	</select>
````

#### textarea
여러줄의 텍스트를 편집할 수 있는 입력필드
- autofocus : 페지이 로드할때 해당 요소에 자동으로 포커스
- cols : textarea에 표시될 폭 문자수
- rows : textarea에 표시될 줄 수
- disabled : 포커스, 선택 변경등 조작 불가능
- maxlength : 최대 입력 문자수 지정
- placeholder : 사용자 입력을 도와주는 짧은 안내문
- readonly : 컨트롤은 조작 불가능 하지만 데이터는 전송가능하다.
- required : 필수요소 지정
- dirname : 요소의 방향성 결정 (name.dir)
- form
- name
- wrap : soft, hard 두가지. soft는 텍스트 제출시 줄바꿈이 되지않음, hard는 줄바꿈




## table

태그 종류
- table, thead, tbody, tfoot, tr, th, td, caption, colgroup, col

ex)
````
	<table>
		<caption>테이블 제목</caption>
		<colgroup>
			<col>
			<col>
			<col>
		</colgroup>
		<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col"></th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row"></th>
				<td colspan="2"></td>
			</tr>
			<tr>
				<th scope="row"></th>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
````


