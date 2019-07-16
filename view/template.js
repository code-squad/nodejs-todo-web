class Show{

    HTML(list){
        return `
        <!doctype html>
        <html>
        <head>
        <title>Login</title>
        <meta charset="utf-8">
        <script type="text/javascript" src="./event.js"></script>
        <link rel="stylesheet" type="text/css" href="./css/main.css"/>
        <link href="http://mozilla.github.io/foundation-icons/assets/foundation-icons.css" type="text/css" rel="stylesheet">
        </head>
        <body id = "loginInit">
        <header>
        <div class="headerDiv"><span class ="headerSubject">TODO LIST</span></div>
        </header>
        <div class ="body">
            ${list}
        </div>
        <script>
        const pw = document.getElementById("pw")
        const pw_check = document.getElementById("pw_check")
        const signUp = document.getElementById("signUp")
        signUp.addEventListener("click", () => {pw.value !== pw_check.value ? alert("비밀번호 정보와 비밀번호 확인이 다릅니다.") : signUp.type = 'submit'});

        </script>
        </body>
        </html>
        `;
    }

    loginTemplate(status){
        let template =  
        `${status}
        <div class = "wrap">
        <form action="/login_process" method="POST" class="form">
        <p><input type="text" name="email" placeholder="email" class="idpw"></p>
        <p><input type="password" name="pwd" placeholder="password" class="idpw"></p>
        <p>
          <input type="submit" value="login"  class="loginSignup login">
        </p>
        </form>
        <a href="/signUp"  class="loginSignup signup">signUp</a>
        </div>`
        return template;
    }

    signupTemplate(status){
        let template = 
        `${status}
        <div class = "wrap">
        <form action="/signup_process" method="post" class="form">
        <p><input type="text" name="nickName" placeholder="nickName"  class="idpw"></p>
        <p><input type="text" name="email" placeholder="email"  class="idpw"></p>
        <p><input type="password" name="pwd" placeholder="password" class="idpw" id="pw"></p>
        <p><input type="password" name="passwordCheck" placeholder="password Check" class="idpw" id="pw_check"></p>
        <p>
          <a href="/login"  class="loginSignup signup signup_login">login</a>
          <input type="button" value="signUp" class="loginSignup signup_signup" id= "signUp">
        </p>
        </form>
        </div>` 
        return template;
    }

    loginError(){
        let template = `
        <p class = "error">아이디와 비밀번호 정보가 다릅니다.</p>
        `
        return template
    }

    signUpError(){
        let template = `
        <p class = "error">이미 등록되어 있는 가입자 정보입니다.</p>
        `
        return template
    }
}

module.exports = Show;