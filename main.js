const http = require('http');
const url = require('url');
const loginTemplate = require('./login_template');
var qs = require('querystring');
const Login = require('./login');
const login = new Login

// let template = `<form action="/signup_process" method="post">
//                 <p><span>닉네임 </span><input type="text" name="nickName" placeholder="nickName"></p>
//                 <p><span>이메일 </span><input type="text" name="email" placeholder="email"></p>
//                 <p><span>비밀번호 </span><input type="password" name="pwd" placeholder="password"></p>
//                 <p><span>비밀번호 확인 </span><input type="password" name="check_pwd" placeholder="password"></p>
//                 <p>
//                 <input type="submit" value="signUp">
//                 </p>
//                 </form>`

const app = http.createServer( function(request,response){
    let _url = request.url;
    if(url.parse(_url, true).pathname === "/"){
        let template = 
        `<form action="/login_process" method="post">
        <p><span>이메일 </span><input type="text" name="email" placeholder="email"></p>
        <p><span>비밀번호 </span><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
        </form>
        <a href="/signUp">signUp</a>`
        response.end(loginTemplate.HTML(template));
        response.writeHead(200);
    }else if(url.parse(_url, true).pathname === "/signUp"){
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
        response.end(loginTemplate.HTML(template));
    }else if(url.parse(_url, true).pathname === "/login_process"){

    }else if(url.parse(_url, true).pathname === "/signup_process"){
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        // alert(body)
        // login.signUp()
        request.on('end',async function () {
            let post = qs.parse(body);
        //     var title = post.title;
        //     var description = post.description;
        //     fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        //       response.writeHead(302, {Location: `/?id=${title}`}); //302 - 강제이동
        //       response.end();
        //   }); 
            let signUp = await login.signUp(post)
            let error = "<p>이미 이메일주소가 있는 가입정보입니다.</p>"
            console.log(signUp)

            if(signUp){
                response.writeHead(302, {Location: `/`}); 
                response.end();
            }else{
                console.log("dd")
                response.writeHead(302, {Location: `/signUp`}); 
                response.end(loginTemplate.HTML(error+this.outerHTML));
            }
        });
    }
})
app.listen(3000);