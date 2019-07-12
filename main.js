const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const Login = require('./login');
const Session = require('./session');
const ControlData = require('./control_data');

const login = new Login;
const session = new Session;
const controlData = new ControlData;

const app = http.createServer( function(request,response){
    let _url = request.url;
    let filePath = `.${_url}`;
    let cookie = request.headers.cookie 
    let sessionID = cookie !== undefined ? cookie.match('(^|;) ?sessionID=([^;]*)(;|$)')[2] : false;
    let isSessionId = () => {
        return session.sessionData[sessionID] ? true : false
    }
    let goToMain = (_url === "/index.html" || _url === "/event.js" || _url === "/todo.js"|| _url === "/css/main.css"); 
    if(!isSessionId() && _url === "/index.html"){
        response.writeHead(302, {Location: `/login`});
        response.end();
    }
    else if(goToMain){
        fs.createReadStream(filePath).pipe(response);         
    } 
    else if(_url === "/login"){
        response.writeHead(200);
        response.end(login.show("login"));
    }
    else if(_url === "/signUp"){
        response.writeHead(200);
        response.end(login.show("signup"));
    }
    else if(_url === "/login_process" && request.method === "POST"){
        let body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', async function(){
            let post = qs.parse(body);
            let loginCheck = await login.checkLogin(post);
            let sessionData = await session.makeSession(post.email);
            if(loginCheck ) {
                response.writeHead(302, {
                    'Set-Cookie':[
                    `sessionID=${sessionData.ID}`,
                    `HttpOnly=${sessionData.HttpOnly}`,
                    `Max-Age= 1000 * 60 * 60`,
                    ],
                    Location: `/index.html`
                });
                response.end();
            }else{
                response.writeHead(302, {Location: `/login`});
                response.end();
            }
        });
        
    }
    else if(_url === "/signup_process"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', async function () {
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
    else if(_url === "/logout"){
        response.writeHead(302, {
            'Set-Cookie':[
                `sessionID = `,
                `Max-Age = 0`
            ],
            Location: `/login`
        });
        response.end();
    }
    else if(_url === "/getData"){
        let userDataString = ""
        if(controlData.readTodoData()){
            let body = JSON.parse(controlData.readTodoData());
            let email = session.sessionData[sessionID][0].email
            userDataString = JSON.stringify(body[email])
        
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(userDataString)
        }
    }
    else if(_url === "/sendData"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            let todoData = body
            let email = session.sessionData[sessionID][0].email
            todoData = JSON.parse(todoData)
            controlData.makeTodoData(email, todoData)
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            response.end()
        })
    }
    else if(_url === "/deleteData"){
        let deleteInfoString = '';
        request.on('data', function (data) {
           deleteInfoString += data;
        });
        request.on('end', function () {
            let deleteData = deleteInfoString;
            let email = session.sessionData[sessionID][0].email;
            controlData.deleteData(email, deleteData)
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end()
        })
    }
    else if(_url === "/changeData"){
        let changedInfoString = '';
        request.on('data', function (data) {
            changedInfoString += data;
         });
        request.on('end', function () {
            let changeData = changedInfoString;
            let email = session.sessionData[sessionID][0].email;
            controlData.changeData(email, changeData)
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end()
         })
    }
    
})
app.listen(3000);
