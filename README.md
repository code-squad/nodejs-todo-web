# nodejs-todo-web
[![Build Status](https://travis-ci.org/cocahack/nodejs-todo-web.svg?branch=master)](https://travis-ci.org/cocahack/nodejs-todo-web) 
[![Coverage Status](https://coveralls.io/repos/github/cocahack/nodejs-todo-web/badge.svg?branch=master)](https://coveralls.io/github/cocahack/nodejs-todo-web?branch=master&service=github)

Node.js TODO web project

## Demo!
[Link](https://todo-http.herokuapp.com)

## 프로젝트 설명

Trello clone을 목적으로 진행한 토이 프로젝트입니다.

### 제약조건

1. Express.js를 사용하지 않았습니다.  라우터, 미들웨어, 쿠키(세션)를 직접 구현해보거나, 구현하지 않았을 경우 어떤 문제점이 있을지 고민해보기 위함입니다.
2. DB를 사용하지 않았습니다.  파일을 DB로 사용했을 때 어떤 문제점이 있을지 알기 위함입니다.

### 미들웨어 구현

구현 아이디어와 코드는 [김정환님 블로그](http://jeonghwan-kim.github.io/series/2018/12/08/node-web-8_middleware.html)를 보고 따라해 봤습니다.

### 미들웨어 스타일의 라우터 구현

express.js의 라우터를 구현하기 전에 특징을 관찰해봤습니다. 그리고 발견한 점을 네 가지로 정리할 수 있었습니다. 

1. `express.Router()`로 라우터를 import한 다음 처리할 로직을 작성하고 라우터 객체를 다시 export.
2. 라우터마다 base가 되는 경로가 있고, 내부 로직을 쓸 때는 subpath만 작성. 정규식을 쓸 수 있고 `:`으로 parameter를 가져올 수 있음.
3. `express.use()`로 basepath와 라우터를 등록해서 사용.
4. 콜백 앞에 다른 미들웨어를 끼워 넣을 수 있음.

이 특징을 토대로 구현 방향을 이렇게 잡았습니다. 

1. Router 클래스를 만들어 사용.
2. 정규식과 `:` 기호까지는 구현하지 않고, basepath와 subpath까지 나누는 것만 구현.
3. 이미 구현한 Middleware 클래스의 `add()` 메소드에 라우터를 등록할 수 있도록 parameter를 1개에서 2개로 변경. Router 클래스에 `run()` 메소드를 만들고, 함수를 Middleware 클래스에 등록할 때는 이 메소드를 넣도록 구현.
4. 특정 메소드와 경로가 일치할 때 실행할 콜백 함수 앞에 여러 개의 미들웨어를 넣을 수 있는데, 이걸 중첩된 미들웨어 구조로 판단함. 따라서 Router 클래스에 Middleware 클래스의 인스턴스를 하나 더 만들기로 결정.

그림으로 그리면 다음과 같습니다.

![middlewareArch](https://user-images.githubusercontent.com/18232901/60646215-bc5bb600-9e75-11e9-8c76-a164ec153aa8.jpg)

각 미들웨어의 역할을 정리해봤습니다.

- staticRouter: 정적 파일 (html, css, js 파일 등) 요청에 응답하는 미들웨어.
- prohibitData: 데이터를 저장하는 디렉토리에 직접적으로 접근할 수 없도록 막는 미들웨어.
- cookieParser: 쿠키를 파싱하는 미들웨어.
- bodyParser: Request body를 파싱하는 미들웨어. 결과는 req.body에 넣는다.
- Routers: 각 경로에 대응되는 라우터 객체를 등록.
  - Middleware N: 콜백 함수를 부르기 전에 실행될 미들웨어를 표헌.
  - callback: 경로에 대응되는 콜백 함수.
  - passMiddleware: app.js의 next를 호출하는 미들웨어. 원래 미들웨어 객체로 돌아갈 수 있으며, 라우터 처리 도중 에러가 발생했을 때 이것도 같이 보낸다.
- catch404: 라우터에서 요청을 처리하지 못할 경우 404 응답을 보내는 미들웨어.
- errorHandler: 미들웨어를 실행하는 도중 에러가 발생했을 경우 500 응답을 보내는 미들웨어.

### DB scheme

사용자 데이터는 프로젝트 디렉토리 아래 data라는 디렉토리에 모두 저장됩니다. 
data 디렉토리 아래에는 계정과 동일한 이름의 디렉토리가 생성되며, 여기에 계정 비밀번호와 Todo 및 todolist 정보가 담기게 됩니다.

```sh
├─data
│  │
│  ├─user1 
│  │      account
│  │      todo
│  │      todolist
│  ├─user2
│  │      account
│  │      todo
│  │      todolist
```

`account` 파일은 계정 비밀번호를 저장합니다. 

`todo`와 `todolist` 파일은 객체의 프로퍼티를 `,`로 구분하여 저장합니다.

#### todo 파일 형식
프로퍼티 | 설명
---- | ----
id |  Todo를 식별하기 위한 프로퍼티로, 유일한 값을 가지며 항상 0 또는 양의 정수.
name | 사용자가 입력한 Todo의 제목.
position | 같은 todolist에 속한 todo 중 어느 위치에 있게 될 것인지를 나타낸다. 항상 0 또는 양의 정수를 가진다.
todolistname | Todo 객체가 어느 todolist에 속하는지 나타낸다.

#### todolist 파일 형식

프로퍼티 | 설명
---- | ----
id |  Todolist를 식별하기 위한 프로퍼티. 유일한 값을 가지며 항상 0 또는 양의 정수이다.
name | 사용자가 입력한 Todolist의 제목.
position | 여러 todolist 중 몇 번째 위치인지 나타낸다. 항상 0 또는 양의 정수이다.

### API

#### 계정 관련

- 로그인 페이지: `GET /`
- 로그인: `POST /login`
- 회원가입 페이지: `GET /signup`
- 회원가입: `POST /signup`
- 로그아웃: `POST /logout`

#### Todo 관련

- Todo 목록 조회: `GET /todo`
- Todo 추가: `POST /todo`
- Todo 이동: `PUT /todo`
- Todo 삭제: `DELETE /todo`
- Todolist 추가: `POST /todolist`
- Todolist 삭제: `DELETE /todolist`

### 세션

로그인 시 서버는 무작위로 session ID를 생성하고 이를 생성한 시간과 함께 `map` 객체에 저장합니다. 이를 관리하는 객체는 `sessionManager` 객체입니다. 세션은 6시간동안 지속됩니다. 서버는 요청이 들어오면 항상 현재 시간과 `map` 객체에 저장된 시간을 비교하여 세션이 만료되었는지 확인합니다. 만료되었다면 로그인 페이지로 리다이렉트합니다.

## 보완할 목록 (써놨으니깐 하겠지..)

### Priority 0
- [x] 백엔드 실행 흐름 개선하기
  - [x] `request.on('data')` 메소드 제어 - 라우터마다 사용된 이벤트 등록 코드를 제거
  - [x] 세션 미들웨어 구현
  - [x] 세션 미들웨어로 라우터마다 들어간 세션 체크 부분의 중복을 제거
  - [x] 에러 미들웨어 구현
- [x] 지저분한 코드 정리

### Priority 1
- [ ] DB 도입 (RDB or NoSQL?)
- [ ] 사용자 비밀번호 암호화

### Priority 2
- [ ] Todo, Todolist 간 순서를 정수로 구현하지 않고 linked list로 체이닝 
  - [ ] Todo 드롭 이벤트, Todo와 Todolist 삭제 시 모든 객체를 검색해 서버에 넘기지 않도록 변경

### Priority 3
- [ ] React 도입
  - [ ] React의 라이프사이클을 이용해서 event 관리하기(Memory leak 방지)
