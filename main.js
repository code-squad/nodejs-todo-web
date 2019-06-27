const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const path = require('path')
const Login = require('./login');
const Session = require('./session');

const login = new Login;
const session = new Session;

const app = http.createServer( function(request,response){
    let _url = request.url;
    let setPath = url.parse(_url, true).pathname
    let filePath = `.${_url}`;
    let ext = path.extname(filePath); 

    if(ext === '') {
        filePath = 'index.html';
        ext = '.html';
    }
    if(filePath !== "./favicon.ico"){
        fs.createReadStream(filePath).pipe(response); 
    }
    
    if(setPath === "/login"){
        let template = 
        `<form action="/login_process" method="post">
        <p><span>이메일 </span><input type="text" name="email" placeholder="email"></p>
        <p><span>비밀번호 </span><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
        </form>
        <a href="/signUp">signUp</a>`
        response.end(login.HTML(template));
        response.writeHead(200);
    }
    if(setPath === "/signUp"){
        let template = 
        `<form action="/signup_process" method="post">
        <p><span>닉네임 </span><input type="text" name="nickName" placeholder="nickName"></p>
        <p><span>이메일 </span><input type="text" name="email" placeholder="email"></p>
        <p><span>비밀번호 </span><input type="password" name="pwd" placeholder="password"></p>
        <p><span>비밀번호 확인 </span><input type="password" name="check_pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="signUp">
        </p>
        </form>`
        response.end(login.HTML(template));
    }
    if(setPath === "/login_process"){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', async function(){
            var post = qs.parse(body);
            let loginCheck = await login.checkLogin(post);
            let sessionData = await session.makeSession(post.email);
            if(loginCheck ) {
            // if(loginCheck && request.headers.cookie ) {
                response.writeHead(302, {
                    'Set-Cookie':[
                    `sessionID=${sessionData.ID}`,
                    `HttpOnly=${sessionData.HttpOnly}`,
                    ],
                    Location: `/`
                });
            }
            response.end();
        });
    }
    if(setPath === "/signup_process"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end',async function () {
            let post = qs.parse(body);
            let signUp = await login.signUp(post)
            if(signUp){
                response.writeHead(302, {Location: `/login`}); 
                response.end();
            }else{
                setTimeout(function() {
                    response.writeHead(302, {Location: `/signUp`}); 
                    response.end();
                }, 2000);
            }
        });
    }

    
})
app.listen(3000);