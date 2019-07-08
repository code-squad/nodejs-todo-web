# NodeJS-Todo-Web



## :computer:   Node.js TODO Web Front & Back-End Project



### :pencil2:   목적

:ballot_box_with_check:  Web Todo 프로젝트를 구현해보면서 Front-End 와 Back-End를 이해하기 위함입니다. 



### :pencil2:   요구사항

:arrow_right:   **Front-End**
* HTML, CSS 사용하기
* VanillaJS 만 사용해서 구현하기

:arrow_right:   **Back-End**
* node.js의 http 모듈을 사용하기
* Session, Cookie 동작 원리를 이해하고 직접 구현하기
* router 직접 구현해서 처리하기

:arrow_right:   **DataBase**
* FileSystem 모듈을 사용하여 CSV 파일로 DB 구현하기

:arrow_right:   **Test Framework**
* Test Framework 사용법을 익혀서 테스트 진행하기



### :pencil2:   요약

:arrow_right:   **HTML, CSS, VanillaJS 로 Front-End 구현**
**HTML** 과 **CSS** 로 웹을 구현할 초기에는 근사한 웹 디자인을 구현하리라 생각했으나 쉽지 않았다. **CSS**는 내가 하고 싶은 대로 적용되지 않아서 까다로웠다. 웹을 디자인하고 **VanillaJS** 만 사용해서 이벤트 처리를 했다. 초기에는 **HTML**의 form 태그를 사용해서 데이터를 처리했다. 하지만 페이지가 로드되지 않은 상태에서 데이터를 가져와야 하는 상황들이 생겼다. 그래서 중간에 **Javascript API의 fetch 함수**늘를 사용하여 데이터를 처리했다.

:arrow_right:   **Node HTTP 모듈만 사용해서 서버(Back-End) 구현**

* 정적 파일 로드
* 회원 가입
* 로그인 (쿠키, 세션)
* 로그아웃
* Todo 관리 (Show, Add, Delete, Update)

**정적 파일 로드**:page_with_curl:에 많은 시간을 들였다. 첫 번째로 MIME을 제대로 지정하지 않았다. 두 번째로 HTML 파일에 엮인 CSS, JS 파일을 불러오지 못해서 File System 모듈의 createReadStream() 함수와 pipe() 함수를 활용해서 해결했다.

**회원 가입**:busts_in_silhouette:의 경우에는 생각보다 수월하게 구현했다. 간단하게 설명하자면 ID 와 PW가 csv 파일에 저장되며, 초기 상태인 데이터가 csv 파일에 저장된다.

**로그인**:key:경우에는 쿠키와 세션을 직접 구현해야 하므로 어려웠다. 첫 로그인을 할 때에 세션을 관리하는 객체가 Session ID를 부여한다. 계속해서 요청이 들어올 때마다 쿠키를 분석해서 Session ID가 유효한지 판단하고 유효하면 요청을 처리하고 유효하지 않으면, Session ID를 삭제하고 새로운 Session ID를 부여하는 과정을 거친다.

**로그아웃**:lock:은 쿠키를 분석하여 Session Table에서 Session ID를 삭제하도록 했다. 쿠키의 유효 기간이 만료되었을 때도 자연스럽게 로그아웃이 가능하도록 구현했지만 Session Table 에는 Session 정보가 존재하기 때문에 메모리가 낭비된다. 이 부분은 고쳐야 할 부분이다.

**Todo**:white_check_mark:는 요청에 따라 해당 유저의 ID로 csv 파일에 있는 TodoList를 조회한다. 그리고 String 형태를 Object로 파싱하여 배열로 모델링하고 요청을 처리한다. drag & drop 처리 때문에 배열의 인덱스가 중요했고, 여러 가지 테스트와 시행착오 끝에 구현했다. 

:arrow_right:   **간단한 유틸리티 구현**
훌륭한 라이브러리가 많지만, 직접 구현해보고 싶어서 몇 가지를 구현해서 사용했다. 첫 번째는 쿠키를 파싱하는 유틸리티 모듈이다. 두 번째는 정적 파일의 확장자를 파싱하는 유틸리티 모듈을 구현해봤다. **( 다음부터는 존재하는 검증되고 훌륭한 라이브러리를 사용할 것!! )**

:arrow_right:   **Jest, SuperTest Package를 사용해서 테스트 코드 작성**
사용자가 접속해서 실제 사용할 때 발생하는 에러 상황이나 예외 상황들을 고려하여 테스트 코드를 작성했고, 작성한 코드의 대부분을 테스트했다. 또한, 테스트를 통해 버그까지 잘 찾아낼 수 있었다.



### :pencil2:   프로그램 구조
![image-20190708195255210](https://github.com/bestdevhyo1225/image_repository/blob/master/image-20190708195255210.png?raw=true)



### :pencil2:   DEMO

:arrow_right:   **회원가입**

![signUp](https://im3.ezgif.com/tmp/ezgif-3-f76c24b3edb6.gif)

:arrow_right:   **로그인**

![signIn](https://im3.ezgif.com/tmp/ezgif-3-2b35f17e103e.gif)

:arrow_right:   **로그아웃**

![signOut](https://im3.ezgif.com/tmp/ezgif-3-5f07e676c03d.gif)



### :pencil2:   API

:arrow_right:   **페이지 요청**
* 메인 페이지 : `GET /`
* 로그인 페이지 : `GET /signIn`
* 회원가입 페이지 : `GET /signUp`
* TodoList 페이지 : `GET /todoList`

:arrow_right:   **Todo CRUD**
* Todo 조회 : `POST /showTodo`
* Todo 추가 : `POST /addTodo`
* Todo 삭제 : `POST /deleteTodo`
* Todo 갱신 : `POST /updateTodo`

:arrow_right:   **회원 가입**
* 회원 가입 : `POST /signUpCheck`

:arrow_right:   **로그인 & 로그아웃**
* 로그인 : `POST /signInCheck`
* 로그아웃 : `POST /signOUt`



### :pencil2:   앞으로 남은 과제

:bookmark:  HTTP method 에서 'GET', 'POST' 를 제외한 'DELETE', 'PUT', 'PATCH' 에 대해 공부하고 적용할 것
:bookmark:  Middleware, Router로 다시 구현하기 (김정환님 블로그 참고할 것)
:bookmark:  404 Not Found 발생시, 에러 페이지 추가하기
:bookmark:  Heroku에 배포하기