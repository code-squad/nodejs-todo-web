const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const passwordBox = document.getElementById('password-box');
const idBox = document.getElementById('id-box');

idBox.focus();
signupButton.addEventListener('click', () => {
    window.location.href = './signup.html';
});

loginButton.addEventListener('click', login);

passwordBox.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if(key === 13) {
        login();
    }
})

function login() {
    const xhr = new XMLHttpRequest();
    const id = idBox.value;
    const password = passwordBox.value;

    if (!(password && id)) {
        alert("아이디와 패스워드를 입력해주세요.");
        return;
    }

    const info = {"id":id, "password":password};
    xhr.onreadystatechange = () => {
        if(xhr.readyState === xhr.DONE) {
            if(xhr.status === 200) {
                if(xhr.responseText === "success") {;
                    alert(`${id}님 웰컴!`);
                } else {
                    alert("회원정보가 틀립니다. 회원이 아니시라면 무료 가입하세요.");
                }
                window.location.href = '/';
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open('POST', '/login');
    xhr.send(JSON.stringify(info));
}