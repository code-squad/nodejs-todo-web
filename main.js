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
    if(setPath === "/" || setPath === "/event.js" ||setPath === "/css/main.css"){
        if(ext === '' ) {
            filePath = 'index.html';
            ext = '.html';
        }
        fs.createReadStream(filePath).pipe(response); 
    }
    
    else if(setPath === "/login"){
        response.writeHead(200);
        response.end(login.show("login"));
    }
    else if(setPath === "/signUp"){
        response.end(login.show("signup"));
    }
    else if(setPath === "/login_process"){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', async function(){
            var post = qs.parse(body);
            let loginCheck = await login.checkLogin(post);
            let sessionData = await session.makeSession(post.email);
            console.log(loginCheck)
            if(loginCheck ) {
            // if(loginCheck && request.headers.cookie ) {
                response.writeHead(302, {
                    'Set-Cookie':[
                    `sessionID=${sessionData.ID}`,
                    `HttpOnly=${sessionData.HttpOnly}`,
                    ],
                    Location: `/`
                });
                response.end();
            }else{
                response.writeHead(200);
                console.log("노노")
                response.end(login.show("login"));
            }
        });
    }
    else if(setPath === "/signup_process"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end',async function () {
            let post = qs.parse(body);
            let signUp = await login.signUp(post)
            if(signUp){
                console.log("signup")
                response.writeHead(302, {Location: `/login`}); 
                response.end();
            }else{
                console.log("login")
                setTimeout(function() {
                    response.writeHead(302, {Location: `/signUp`}); 
                    response.end();
                }, 2000);
            }
        });
    }

    
})
app.listen(3000);