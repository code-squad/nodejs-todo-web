class Login{
    constructor(){  
        this.main;
        this.loginBox;
        this.inputBox;
        this.idTextarea;
        this.pwTextarea;
        this.buttonBox;
        this.loginButton;
        this.signUpButton;
    }

    setLoginPage(){
        this.main = document.querySelector('main');
        this.main.appendChild(this.setLoginBox());
    }

    setLoginBox(){
        this.loginBox = document.createElement('div');
        this.loginBox.appendChild(this.setInputBox());
        this.loginBox.appendChild(this.setButtonBox());
        return this.loginBox;
    }

    setInputBox(){
        this.inputBox = document.createElement('div');
        this.inputBox.appendChild(this.setIdTextarea());
        this.inputBox.appendChild(this.setPwTextarea());
        
        return this.inputBox;
    }
    
    setIdTextarea(){
        this.idTextarea = document.createElement('textarea');
        this.idTextarea.placeholder = 'please input your ID';
        return this.idTextarea;
    }
    setPwTextarea(){
        this.pwTextarea = document.createElement('textarea');
        this.pwTextarea.placeholder = 'please input your PW';
        return this.pwTextarea;
    }

    setButtonBox(){
        this.buttonBox = document.createElement('div');
        this.buttonBox.appendChild(this.setLoginButton());
        this.buttonBox.appendChild(this.setSignUpButton());

        return this.buttonBox;
    }

    setLoginButton(){
        this.loginButton = document.createElement('button');
        this.loginButton.innerText = 'login';
        this.addLoginButtonListener(this.loginButton);
        return this.loginButton;
    }
    setSignUpButton(){
        this.signUpButton = document.createElement('button');
        this.signUpButton.innerText = 'sign up';
        this.addSignUpButtonListener(this.signUpButton);
        
        return this.signUpButton;
    }   

    addLoginButtonListener(button){
        button.addEventListener('click', event => {
            if(this.idTextarea.value === '' || this.pwTextarea === ''){
                alert('id나 pw가 올바르지 않습니다.');
                return;
            }
        });
    }
    
    addSignUpButtonListener(button){
        button.addEventListener('click', event => {
            if(this.idTextarea.value === '' || this.pwTextarea === ''){
                alert('id나 pw가 올바르지 않습니다.');
                return;
            }
        });
    }

}



const loginPage = new Login();

loginPage.setLoginPage();