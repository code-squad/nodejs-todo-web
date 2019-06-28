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
}