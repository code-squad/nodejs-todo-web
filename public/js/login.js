class Login {
    addBtnEvent() { // 로그인, 회원가입 버튼에 이벤트 달기
        const signInBtn = document.getElementById('signIn-btn');
        signInBtn.addEventListener('click', event => this.signIn(event));
        const signUpBtn = document.getElementById('signUp-btn');
        signUpBtn.addEventListener('click', event => this.signUp(event));
    }
    
    signIn(event) { // id와 pw 서버로 전송
        event.preventDefault();
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

    signUp(event) { 
        event.preventDefault();
        location.href = '/register'; 
    }
}

window.onload = function() {
    const login = new Login();
    login.addBtnEvent();
}