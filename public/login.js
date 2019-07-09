class Login {
    constructor() {
        this.main;
        this.loginBox;
        this.inputBox;
        this.idTextarea;
        this.pwTextarea;
        this.buttonBox;
        this.loginButton;
        this.signUpButton;
    }

    setLoginPage() {
        this.body = document.querySelector('body');
        this.body.insertBefore(this.setTitle(),this.body.firstChild);
        this.main = document.querySelector('main');
        this.main.appendChild(this.setLoginBox());
    }
    setTitle(){
        this.title = document.createElement('header');
        this.title.innerText = 'todo';
        return this.title;
    }

    setLoginBox() {
        this.loginBox = document.createElement('div');
        this.loginBox.appendChild(this.setInputBox());
        this.loginBox.appendChild(this.setButtonBox());
        return this.loginBox;
    }

    setInputBox() {
        this.inputBox = document.createElement('div');
        this.inputBox.appendChild(this.setIdTextarea());
        this.inputBox.appendChild(this.setPwTextarea());
        this.inputBox.classList.add("inputBox");
        return this.inputBox;
    }

    setIdTextarea() {
        this.idTextarea = document.createElement('input');
        this.idTextarea.placeholder = 'please input your ID';
        this.idTextarea.classList.add('inputText');
        return this.idTextarea;
    }
    setPwTextarea(text) {
        if (text) {
            this.pwTextarea2 = document.createElement('input');
            this.pwTextarea2.setAttribute('type', 'password');
            this.pwTextarea2.placeholder = 'please input again';
            this.pwTextarea2.classList.add('inputText');
            this.pwTextarea2.addEventListener('keyup', event => {
                if (event.keyCode === 13) {
                    this.signUpButton.click();
                }
            });
            return this.pwTextarea2;
        }
        this.pwTextarea = document.createElement('input');
        this.pwTextarea.setAttribute('type', 'password');
        this.pwTextarea.placeholder = 'please input your PW';
        this.pwTextarea.classList.add('inputText');
        this.pwTextarea.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                this.loginButton.click();
            }
        });
        return this.pwTextarea;
    }

    setButtonBox() {
        this.buttonBox = document.createElement('div');
        this.buttonBox.appendChild(this.setLoginButton());
        this.buttonBox.appendChild(this.setSignUpButton());
        this.buttonBox.classList.add('buttonBox');

        return this.buttonBox;
    }

    setLoginButton() {
        this.loginButton = document.createElement('button');
        this.loginButton.innerText = 'Log in';
        this.addLoginButtonListener(this.loginButton);
        return this.loginButton;
    }
    setSignUpButton() {
        this.signUpButton = document.createElement('button');
        this.signUpButton.innerText = 'Sign up';
        this.addSignUpButtonListener(this.signUpButton);

        return this.signUpButton;
    }

    addLoginButtonListener(button) {
        button.addEventListener('click', event => {
            event.preventDefault();
            if (this.idTextarea.value === '' || this.pwTextarea === '') {
                alert('id나 pw가 올바르지 않습니다.');
                return;
            }
            const id = this.idTextarea.value;
            const pw = this.pwTextarea.value;
            const request = new XMLHttpRequest();
            request.onload = () => {
                const url = 'http://localhost:3000/todo';
                if (request.status === 409) {
                    return alert("id나 pw가 올바르지 않습니다.");
                } else if (request.status === 200) {
                    if (request.responseURL === url) {
                        return window.location.replace(request.responseURL);
                    }
                }
            }

            request.open('POST', './login');
            request.setRequestHeader('Content-type', 'application/json');
            request.send(JSON.stringify({ id: id, pw: pw }));
            this.idTextarea.value = '';
            this.pwTextarea.value = '';


        });
    }

    addSignUpButtonListener(button) {
        button.addEventListener('click', event => {
            event.preventDefault();
            if (this.inputBox.childElementCount == 2) {
                this.inputBox.appendChild(this.setPwTextarea('again'));
                return;
            }

            if (this.pwTextarea.value === '' || this.pwTextarea2.value === '' || this.idTextarea === '') {
                alert('id와 pw를 입력해 주세요');
                return;
            }

            if (this.pwTextarea.value !== this.pwTextarea2.value) {
                alert('pw가 일치하지 않습니다.');
                return;
            }

            const id = this.idTextarea.value;
            const pw = this.pwTextarea.value;
            const request = new XMLHttpRequest();
            request.onload = () => {
                const url = 'http://localhost:3000/todo';
                if (request.status === 409) {
                    return alert("id가 이미 존재합니다.");
                } else if (request.status === 200) {
                    if (request.responseURL === url) {
                        return window.location.replace(request.responseURL);
                    }
                }
            }

            request.open('POST', '/signup');
            request.setRequestHeader('Content-type', 'application/json');
            request.send(JSON.stringify({id, pw}));
            this.idTextarea.value = '';
            this.pwTextarea.value = '';
            this.pwTextarea2.value = '';
        });
    }

}



const loginPage = new Login();

loginPage.setLoginPage();