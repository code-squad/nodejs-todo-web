class Login {
    addEvent() { // 로그인, 회원가입 버튼에 이벤트 달기
        const signInBtn = document.getElementById('signIn-btn');
        signInBtn.addEventListener('click', event => {
            event.preventDefault();
            this.signIn();
        });
        const signUpBtn = document.getElementById('signUp-btn');
        signUpBtn.addEventListener('click', event => {
            event.preventDefault();
            this.signUp()});

        const inputID = document.getElementById('uid');
        inputID.addEventListener('keydown', event => this.enterkeyEvent(event));
        const inputPW = document.getElementById('upw');
        inputPW.addEventListener('keydown', event => this.enterkeyEvent(event));
    }
    
    signIn() { // 로그인 요청
        const inputId = document.getElementById('uid');
        const inputPw = document.getElementById('upw');
        const [idValue, pwValue] = [inputId.value, inputPw.value];
        const user = { id: idValue, pw: pwValue };
        
        fetch('/login', {
            headers: {'Content-Type': 'application/json'}, 
            method: 'POST',
            body: JSON.stringify(user)
        }).then(res => {
            if (res.redirected) location.href = res.url;
            else if (res.status === 204) {
                alert('아이디와 비밀번호를 확인해주세요');
            } 
        }).catch(err => console.error(err));
    }

    signUp() { // 회원가입 페이지 요청
        location.href = '/register'; 
    }

    enterkeyEvent(event) {        
        if (event.keyCode === 13) this.signIn();
    }
    
}

window.onload = function() {
    const login = new Login();
    login.addEvent();
}
