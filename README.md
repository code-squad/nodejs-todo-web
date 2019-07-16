## TODO APP 

---

[DEMO]: https://ymink16-todo-web.herokuapp.com/	"TODO APP"

 웹 버전 TODO APP을 구현하였습니다. html, css, javascript로 화면을 구성하였고, node.js의 http 모듈로 backend를 구성했습니다. 기타 프레임워크는 사용하지 않았고, 파일로 데이터베이스의 역할을 대체하였습니다. 

---

### 구현기능 

사용자 관련 : 로그인, 회원가입, 로그아웃
TODO 기능 :  추가, 이동, 삭제
에러 처리 : 잘못된 URL로 요청이 들어온 경우 에러 화면으로 전환

---

### API

GET / : 초기 진입화면(로그인 페이지) 
GET /todos : 할일 관리 페이지 
GET /register : 회원가입 페이지

GET /card : 할일 목록 불러오기
POST /card : 할일 추가
DELETE /card : 할일 삭제
PATCH /card : 할일을 다른 카테고리로 이동

POST /login : 로그인 요청
POST /logout : 로그아웃 요청
POST /signUp : 회원가입 요청

이 밖의 url은 기타 정적파일에 대한 요청을 처리하거나 해당사항이 없는 경우 404 에러로 처리 





