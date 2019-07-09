<h1 align="center">Node.js TODO APP</h1><p>

[![Build Status](https://travis-ci.org/mukeunzi/todo-app.svg?branch=master)](https://travis-ci.org/mukeunzi/todo-app)

> 순수 Node.js 만으로 구현한 TODO APP!

## :globe_with_meridians: DEMO

[TODO APP](https://muk-todos.herokuapp.com/)

## :memo: Description

Node.js HTTP 모듈을 사용한 TODO APP 입니다. 웹 개발에 필요한 기술과 흐름을 학습하기 위해 Express 와 Database 를 사용하지 않았습니다.

## :page_facing_up: API

**계정**

- 로그인 : `GET /auth`
- 로그인 요청 : `POST /auth`
- 로그아웃 : `DELETE /users`
- 회원가입 : `GET /users`
- 회원가입 요청 : `POST /users`
- 접근 권한 : `GET /permission`

**TODO**

- TODO 메인페이지 : `GET /`
- TODO 목록 조회 : `GET /todos`
- TODO 목록 추가 : `POST /todo`
- TODO 상태 변경 : `PUT /events`
- TODO 목록 삭제 : `DELETE /todos/:todos_id`

**오류**

- Not Found : `GET /error-404`
- Internal Server Error : `GET /error-500`

## :woman_technologist: Usage

```
$ npm install
$ npm start
```

위 명령어를 실행한 후,

```
http://localhost:8000
```

브라우저에서 접속한다.
