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
        this.main = document.querySelector('main');
        this.main.appendChild(this.setLoginBox());
    }

    setLoginBox() {
        this.loginBox = document.createElement('form');
        this.loginBox.appendChild(this.setInputBox());
        this.loginBox.appendChild(this.setButtonBox());
        return this.loginBox;
    }

    setInputBox() {
        this.inputBox = document.createElement('div');
        this.inputBox.appendChild(this.setIdTextarea());
        this.inputBox.appendChild(this.setPwTextarea());

        return this.inputBox;
    }

    setIdTextarea() {
        this.idTextarea = document.createElement('input');
        this.idTextarea.placeholder = 'please input your ID';
        return this.idTextarea;
    }
    setPwTextarea() {
        // name을 만들
        this.pwTextarea = document.createElement('input');
        this.pwTextarea.placeholder = 'please input your PW';
        return this.pwTextarea;
    }

    setButtonBox() {
        this.buttonBox = document.createElement('div');
        this.buttonBox.appendChild(this.setLoginButton());
        this.buttonBox.appendChild(this.setSignUpButton());

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
            console.log(id);
            console.log(pw);

            const request = new XMLHttpRequest();
            request.onload = () => {
                const url = 'http://localhost:3000/index';
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
            if (this.idTextarea.value === '' || this.pwTextarea === '') {
                alert('id나 pw가 올바르지 않습니다.');
                return;
            }
        });
    }

}



const loginPage = new Login();

loginPage.setLoginPage();