## Todo App

### About

 node js core module를 사용한 todo web version application

### 기능

1. 회원 가입
2. 로그인, 로그아웃
3. 아이템 추가, 삭제, 변경

### 부가 설명

1. 프레임워크 없이 NodeJS core module만 사용해서 구현.
2. Router, middleware 없이 url 조건에 의한 분기문으로 구현.

3. integration test 작성

### URL

* 로그인 상태에 따라 url의 function이 달라짐.

| session | Method | url          | query | Function              |
| ------- | ------ | ------------ | ----- | --------------------- |
| X       | GET    | /            | X     | 로그인 페이지 이동    |
| X       | GET    | /signup.html | X     | 회원 가입 페이지 이동 |
| X       | POST   | /auth        | X     | 로그인                |
| X       | POST   | /members     | X     | 회원 가입             |
| O       | GET    | /            | X     | 메인 화면으로 이동    |
| O       | GET    | /items       | X     | 유저의 아이템 요청    |
| O       | POST   | /items       | X     | 아이템 추가           |
| O       | PATCH  | /items       | X     | 아이템 상태 업데이트  |
| O       | DELETE | /items       | id    | 쿼리 id의 아이템 삭제 |
| O       | DELETE | /auth        | X     | 로그아웃              |
|         |        |              |       |                       |

### DB

1. members.json
   * 가입한 회원의 아이디와 패스워드 저장.
   * [{id:[id], password:[password]}……….]
2. items.json
   * 가입한 회원의 아이템 저장.
   * {[id]:[{name:[name], status:[status], id:[id]}]}

### Modules

1. server
   * Create server
   * header parsing
   * Url에 따른 function 수행
   * 로그인 성공시 cookie session 추가 및  관리
   * static file request시 model을 통해 읽어서 바로 전송.
2. controller
   * signup-controller
     * signup(id, password)
       * 회원 DB(members.json)에서 회원 목록 받아옴
       * 아이템 DB(items.json)에서 아이템 목록 받아옴
       * 중복된 아이디인지 확인
       * 회원 DB에 {id, password} 추가.
       * 아이템 DB에 {id:[]}추가.
       * model로 DB update 요청
   * login-controller
     * login(id, password)
       * 회원 DB(members.json)에서 회원 목록 받아옴
       * 해당 id 와 password 일치하는지 확인
   * add-controller
     * add(user, item)
       * 아이템 DB(items.json)에서 아이템 목록 받아옴
       * 해당 item에 랜덤 상수 id추가
       * model로 DB update 요청
   * update-controller
     * update(user, targetID, siblingID, status)
       * 아이템 DB(items.json)에서 아이템 목록 받아옴
       * targetId 와 일치하는 아이템의 status를 parameter인 status로 변경.
       * target item을 siblingID를 갖고 있는 sibling item 앞으로 위치 변경.
       * model로 DB update 요청
   * delete-controller
     * delete(user, id)
       * 아이템 DB(items.json)에서 아이템 목록 받아옴
       * id를 갖는 item 삭제
       * model 로 DB update 요청
3. model
   * readStaticFile(file)
     * fs module로 file을 읽는 promise 객체 return.
   * writeStaticFile(file)
     * fs modulefh file을 덮어 쓰는 promise 객체 return



### 회고

* http 와 Restful API의 실습.
*  조건문이 반복으로 인해 스크립트가 매우 난잡하다. 라우터가 필요함.
* DB schema를 잘 짜야 api function을 구현하기에도 편하다.
* Unit test, integration test를 하면서 진행하자.
