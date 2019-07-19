class Register {
    constructor() {
        this.newUser = {};
    }

    addEvent() { // 버튼에 이벤트 달기
        const okButton = document.getElementById('ok');
        okButton.addEventListener('click', event => {
            event.preventDefault();
            this.signUp();
        });
        const cencelButton = document.getElementById('cancel');
        cencelButton.addEventListener('click', event => {
            event.preventDefault();
            this.cancel(event);
        });

        const inputID = document.getElementById('uid');
        inputID.addEventListener('keydown', event => this.enterkeyEvent(event));
        const inputPW1 = document.getElementById('upw1');
        inputPW1.addEventListener('keydown', event => this.enterkeyEvent(event));
        const inputPW2 = document.getElementById('upw2');
        inputPW2.addEventListener('keydown', event => this.enterkeyEvent(event));
    }

    signUp() {
        const idElement = document.getElementById('uid');
        const pw1Element = document.getElementById('upw1');
        const pw2Element = document.getElementById('upw2');

        const [id, pw1, pw2] = [idElement.value, pw1Element.value, pw2Element.value];
        if ((pw1 === pw2) && (pw1.length !== 0))  {
            this.newUser.id = id;
            this.newUser.pw = pw1;
            fetch('/signUp', {
                headers: {'Content-Type': 'application/json'}, 
                method: 'POST',
                body: JSON.stringify(this.newUser)
            }).then(res => {
                if (res.redirected) location.href = res.url; 
            }).catch(err => console.error(err));
        } else {
            alert('비밀번호를 확인하세요');
        }
    }

    cancel() { location.href = '/'; }

    enterkeyEvent(event) { if (event.keyCode === 13) this.signUp(); }
}

window.onload = function() {
    const register = new Register();
    register.addEvent();
}