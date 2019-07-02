import { createHash } from 'crypto';

class Login {
    constructor() {

    }

    addBtnEvent() { // 로그인, 회원가입 버튼에 이벤트 달기
        const signInBtn = document.getElementById('signInBtn');
        signInBtn.addEventListener('click', event => this.signIn(event));
        const signUpBtn = document.getElementById('signUpBtn');
        signUpBtn.addEventListener('click', event => this.signUp(event));
    }
    
    signIn(event) { // id와 pw 서버로 전송
        const inputId = document.getElementById('uid');
        const inputPw = document.getElementById('upw');
        const idValue = inputId.value;
        const pwValue = this.encodePassword(inputPw.value);
        console.log(pwValue);
        // 서버로 전송
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/signIn", true);
        xhr.send();
        console.log('사인인');
    }
    encodePassword(value) {
        return createHash('sha512').update(value).digest('base64');
    }

    signUp(event) { // 회원가입 창으로 리다이렉션해야되나...
        console.log('사인업');
    }
}

window.onload = function() {
    const login = new Login();
    login.addBtnEvent();
}