# :desktop_computer: Welcome to Todo App
> HTML 과 CSS, JS와 Node.js의 HTTP 모듈을 사용하여 TodoApp을 구현을 할 수 있었습니다.

<br/>

## :star: DEMO
[TodoApp](https://rubywebtodolist.herokuapp.com/index.html)

<br/>

## :woman_technologist: 기능
1. 회원가입
2. 로그인, 로그아웃
3. TODOLIST 작성
4. LIST Drag and Drop 
5. LIST 삭제 및 이동 자동 저장 기능

<br/>

## :notebook: 구현 내용
### :point_right: DataBase
- File System 모듈을 사용하여 csv와 txt로 DB 구현

### :point_right: FrontEnd
- HTML 과 CSS, JS를 활용한 화면 구현
- 정적인 HTML 파일과 동적인 template(js) 함께 사용
- JQuery 없이 순수 JS 로 구현

### :point_right: BackEnd
- Node.js 의 http 모듈 사용
- session 과 cookie를 활용한 로그인, 로그아웃
- express 모듈을 사용하지 않아, URL로 기능 분리
    - login
    - signUp
    - index.html
    - getData 
    - sendData 
    - deleteData
    - changeData
    - error page

### :point_right: Design
- https://trello.com 참고

<br/>

## :writing_hand: API
TODO Page
- 메인페이지 : /index.html
- 계정 data 호출 : /getData
- data 추가 : /sendData
- data 삭제 : /deleteData
- data 이동 : /changeData

로그인, 회원가입 Page
- 로그인 페이지 : /login
- 로그인 과정 : /login_process
- 로그아웃 : /logout
- 회원가입 페이지 : /signUp
- 회원가입 과정 : /signUp_process

Error
- 로그인 에러 : /error_login
- 회원가입 에러 : /error_signUp

