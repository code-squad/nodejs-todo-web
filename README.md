# nodejs-todo-web
Node.js TODO web front project



### 프로젝트 구조

Server-Side <-> Client-side <-> Browser



회원가입, 로그인 기능 -> http 요청, 응답

Game 기능 -> Socket.io를 사용



### git ignore

- server/data/user.json 을 추가했다.
- 사용시 server/data/user.json에 빈배열 []을 추가시키고 사용

### Todo list

1. middleware 구현하기 우선
2. user.js 에서 CRUD 구현
3. 이후 user CRUD에 해당하는 프론트 구현
4. session 구현
5. 이후 로그인 프론트 구현

(이전 프로젝트 참고할것)



### middleware 구현

1. 미들웨어의 작동방식 
   - 함수들의 배열을 만들고 거기에 담아놓는다.
   - next라는 변수를 통해 함수들이 연쇄적으로 실행되도록한다.
2. 미들웨어를 구현하기 위해 필요한 조건들
   1. 미들웨어 배열을 만든다.
   2. 배열에 미들웨어 함수를 추가한다.
   3. 함수들은 request, response, next를 받고, next()를 실행시킨다.
   4. add()로 미들웨어를 등록하고, run()으로 실행한다. 
   5. 인자가 4개일 경우 에러발생으로 간주하고 다음 미들웨어가 아닌 에러미들웨어로 건너 뛰도록 한다.

### public-files 구현

- path 모듈을 사용한다.
- 확장자를 추출해낸다.
- 확장자에 해당하는 content-type을 res header에 담는다.



### 회원가입 기능 구현

- 홈디렉토리에서 /signIn path로 이동
- POST /user를 통해 회원가입 완료

[미들웨어 구현 블로그 출처](http://jeonghwan-kim.github.io/series/2018/12/08/node-web-8_middleware.html)