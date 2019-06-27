const Register = class {
  constructor() {
    this.inputIdBox = document.getElementById('inputId');
    this.inputPasswordBox = document.getElementById('inputPassword');
    this.idMessageBox = document.getElementById('ajax-checkId');
    this.registerBtn = document.getElementById('btn-register');
    
    this.validIdFlag = false;
    this.validPasswordFlag = false;
    
    this.checkPasswordBox = document.getElementById('checkPassword');
    this.checkPassWordMessageBox = document.getElementById('ajax-isValidPassword');
  }

  ajax() {
    const checkDupleIdAjax = async (inputText) => {
      const url = `/user/${inputText}`;
      const response = await fetch(url, {
        method : 'GET',
      });
      const ajaxText = await response.text(); 
      return ajaxText;
    }

    const submitRegisterInfoAjax = async ({id, password}) => {
      const url = `/user`;
      const response = await fetch(url, {
        method : 'POST',
        redirect: 'follow',
        body : `id=${id}&password=${password}`
      });

      if (response.redirected) {
        window.location.replace("/");
      }
    }

    return {
      checkDupleIdAjax,
      submitRegisterInfoAjax
    }
  }

  addInputIdEvent() {
    this.inputIdBox.addEventListener('keyup', (event) => {
      this.inputIdEvent(event);
    })
  }

  async inputIdEvent(event) {
    this.validIdFlag = false;
    const value = this.inputIdBox.value;

    if (value === "") {
      const message = `<p style="color : red">아이디를 입력해주세요</p>`;
      this.idMessageBox.innerHTML = message;
      return;
    }

    const answer = await this.ajax().checkDupleIdAjax(value);

    if (answer === 'deny') {
      const message = `<p style="color : red">중복된 ID입니다</p>`;
      this.idMessageBox.innerHTML = message;
    } else if (answer === 'success') {
      const message = `<p style="color : green">사용해도 좋은 ID입니다</p>`;
      this.idMessageBox.innerHTML = message;
      this.validIdFlag = true;
    }
  }

  isValidRegisterInfo() {
    return this.validIdFlag && this.validPasswordFlag;
  }

  async checkAndSubmitRegisterInfoEvent(event) {
    if (!this.isValidRegisterInfo()) {
      alert('아이디나 비밀번호가 올바르지 않습니다');
      return;
    } else {
      const id = this.inputIdBox.value;
      const password = this.inputPasswordBox.value;
      await this.ajax().submitRegisterInfoAjax({id, password});
    }
  }

  addCheckAndSubmitRegisterInfoEvent() {
    this.registerBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.checkAndSubmitRegisterInfoEvent(event);
    })
  }

  addCheckPasswordEvent() {
    this.checkPasswordBox.addEventListener('keyup', (event) => {
      this.checkSameStatusPasswordEvent(event);
    })
  }

  isSamePassword() {
    return this.inputPasswordBox.value === this.checkPasswordBox.value;
  }

  checkSameStatusPasswordEvent(event) {
    this.validPasswordFlag = false;
    if (this.isSamePassword() && (this.checkPasswordBox !== '')) {
      const message = `<p style="color : green">비밀번호가 일치합니다</p>`;
      this.checkPassWordMessageBox.innerHTML = message;
      this.validPasswordFlag = true;
    } else {
      const message = `<p style="color : red">비밀번호가 올바르지 않습니다</p>`;
      this.checkPassWordMessageBox.innerHTML = message;
    }
  }

  run() {
    this.addInputIdEvent();
    this.addCheckPasswordEvent();
    this.addCheckAndSubmitRegisterInfoEvent();
  }
}

window.addEventListener('load', () => {
  const register = new Register();
  register.run();
})