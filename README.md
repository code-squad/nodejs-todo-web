# nodejs-todo-web

> Express를 사용하지 않고 Todo Web 버전 구현

## 학습 목표

- http 모둘만으로 Todo Web을 구현해보면서 http의 동작 방식을 이해한다. 

### 사용법

1. 아래 명령어를 입력한다.

```bash
npm install
node bin.js
```

2. 아래 주소로 이동하여 회원가입 및 로그인 후 사용한다.

```bash
http://localhost:3000
```


## App 구조

![](https://user-images.githubusercontent.com/34808501/60821376-64f37800-a1de-11e9-8623-0006144720f5.png)

### Bootstrap

- `bin.js` : 서버를 구동하는 역할을 한다.
    
    - 도메인 주소와 포트 번호를 정해 어플리케이션(`app.js`)에 전달한다.

- `app.js` : `bin.js`에서 전달 받은 정보를 이용해 서버 객체를 생성한다.
    
    - 어플리케이션의 주요 로직을 실행한다. 

### Express.js

> src 폴더

- http를 이용해서 Express의 주요 기능인 미들웨어(Middlewares)를 구현하였다.

    - [김정환님의 블로그](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html)를 참고하여 구현했다.
    
### 3rd-party library

- `serve-static` : 정적 파일(html, css, js 등)을 처리한다.

- `body-parser` : 사용자에게 입력받은 데이터를 `req.body`에 담는다.

### business logic

> 어플리케이션의 주요 서비스 기능이 담겨있다.

#### 미들웨어

- `error.js` : 에러 처리

- `logger.js` : 클라이언트의 요청과 서버의 응답을 log로 남기다.

#### 회원가입 / 로그인

- `login.js` : 로그인 기능

- `logout.js` : 로그아웃 기능

- `register.js` : 회원 가입 기능

#### Todo Api

- `addTask` : 할 일 목록 추가
- `updateTask` : 할 일 목록 수정
- `deleteTask` : 할 일 목록 삭제
- `updateStatus` : 할 일 상태 변경

등등

## 아쉬운 점

- 에러 처리와 테스트 코드 작성을 제대로 하지 못 했다. 

- 다음 미션 부터는 테스트 코드 작성과 에러처리 부분에 좀 더 신경을 더 써야겠다.
 