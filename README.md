[![Build Status](https://travis-ci.org/dev-dongwon/todoapp.svg?branch=master)](https://travis-ci.org/cocahack/nodejs-todo-web) 

# TODO APP with Node.js

순수 node.js 만으로 **express의 미들웨어 패턴**을 구현해 todo app을 만들어보자!

(참고 : [김정환 블로그 : node.js 코드랩](http://jeonghwan-kim.github.io/series/2018/12/01/node-web-0_index.html) , **외쳐 갓정환!**)



## SUMMARY

#### express 미들웨어 구현

**express의 핵심 부분인 미들웨어를 vanilla node.js로 구현**하며 왜 express 웹 프레임워크의 구조가 이렇게 되었는지 이해할 수 있었다. 모든 개발은 필요의 산물이다. 선배 개발자가 express를 만들 때 무엇을 어떻게 고민했는지 사고의 흐름을 따라가며 express 구조에 익숙해 질 수 있었다.



#### 필요한 유틸과 라이브러리 직접 구현

테스트 프레임워크, 프론트엔드 구현을 위한 bootstrap을 제외한 **모든 유틸과 라이브러리를 직접 구현**했다. 구현하며 웹에 필요한 기술이 무엇인지, 어떤 과정을 통해 서버와 클라이언트가 커뮤니케이션하는 지 이해할 수 있었다. 생각보다 시간이 오래 걸린 작업이었고, 사람들이 왜 비즈니스 로직에 집중하기 위해 더 편하고 빠른 라이브러리를 찾는 지 알 수 있었다. 나중에 특정 상황에서 필요한 라이브러리를 고를 때 선구안에도 도움이 될 것 같다.



#### 테스트 코드

**Mocha, sinon, istanbul, should, node-mocks-http** 등 테스트 프레임워크와 라이브러리를 활용해 테스트 코드를 작성하는 연습을 해보며 친숙해질 수 있었다. 특히 외부 빌드나 배포에서 에러가 나는 상황을 체험하며 예외 상황이나 에러 상황을 꼼꼼히 체크해야 하는 필요성을 뼈저리게 느낄 수 있었다. (내꺼에선 분명히 잘됐는데!!!) '메서드 하나에 테스트 하나'라는 프로그래밍 사이클을 지키는 것이 생각보다 어려웠고, 의도적으로 수련해야 할 필요성을 느꼈다.



#### csv 파일 시스템으로 DB 구현

DB는 쓰지 않고 csv 파일로 사용자와 콘텐츠 정보를 저장했다. csv를 다시 객체로 변환하고, 필요한 정보를 획득하는 과정에서 많은 서버 자원의 낭비가 일어남을 알 수 있었다. 파일 시스템의 한계를 느끼며 RDBMS, NoSQL이 상황별로 언제 쓰면 적합할 지 생각해 볼 수 있는 기회가 되었다.



## STRUCTURE



![serverStructure](https://user-images.githubusercontent.com/43179397/60578364-0718f780-9dbc-11e9-9ff6-aa8c4676ab63.png)





## DEMO

#### 회원가입 & 로그인

ID 중복체크와 패스워드 매칭 ajax 요청

![register](https://user-images.githubusercontent.com/43179397/60584356-00907d00-9dc8-11e9-8869-0e45755bfe5b.gif)



#### 등록 & 삭제

![submit](https://user-images.githubusercontent.com/43179397/60583780-9b885780-9dc6-11e9-873b-6ea825ad76ff.gif)



#### 드래그 & 드롭

드래그 앤 드롭 후 redirect 해도 card 순서 그대로 유지

![drag](https://user-images.githubusercontent.com/43179397/60584430-303f8500-9dc8-11e9-84d6-c5140bd184a6.gif)



## API

#### 페이지 요청

- 로그인 페이지 : `GET /`
- 회원가입 페이지 : `GET /register`
- Todo 리스트 페이지 : `GET /todos`



#### Todos CRUD

- Todo 등록 : `POST /todos`
- Todo 삭제 : `DELETE /todos/:id`
- Todo 갱신 : `PATCH /todos/:id`
- Todo 시퀀스 갱신 : `PATCH /key`



#### 유저등록

- 중복 아이디 확인 : `GET /user/:id`
- 유저 등록 : `POST /user`



#### 로그인 & 로그아웃

- 로그인 : `POST /login`

- 로그아웃 : `POST /logout`



## RUN & TEST

#### run

`$ npm start`

#### test

`$ npm test`



## 한계와 과제

#### https 적용과 보안

- 현재는 session ID 발급에만 암호화를 적용한 상태이고, 모든 정보는 평문으로 전송

- 다음 프로젝트에선 https를 적용하고 xss, sql injection 등 기본적인 공격에 대응한 방법도 신경쓸 것

#### DB!

- 데이터베이스에 접근을 최소화 할 수 있도록 DB 스키마에 신경 쓸 것. 
- 파일 시스템에서 정보를 읽어 객체로 만든 후, 필요한 정보를 획득하는 과정에 지나친 오버헤드 발생

#### 비동기 제어

- heruku 배포를 한 후 일부 비동기 코드에서 pending 상태 지속되는 현상 발견 
- 비동기 제어 흐름이 어떻게 되는 지 꼼꼼하게 파악할 필요

#### 프론트엔드 클린코드

- DOM 획득이나 생성 과정에서 반복되는 부분 리팩토링 & 개선 필요
- 이벤트 리스너와 이벤트 코드를 깔끔하게 유지할 필요 있음. 지나치게 산개되어 유지 보수에 어려움 있을 듯.
- HTML 클래스나 ID 네이밍도 일관성 있게 하자! ([레진 마크업 가이드](https://github.com/dev-dongwon/markup-guide) 를 참고하자!)