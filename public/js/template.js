class Template {
    jsFile(userTodo) {
        let userTodoString;
        if (userTodo) {
            userTodoString = JSON.stringify(userTodo);
            console.log('로그인되있음')
        } else {
            console.log('로그인 안됌')
        }
        return `
        
class DynamicEvent {
    constructor() {
        this.card;
    }

    addSchedule() {
        const addScheduleButtons = document.querySelectorAll(".addSchedule");
        addScheduleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target.closest(".status").querySelector('.memo').childNodes.length === 0 || e.target.closest(".status").querySelector('.memo').lastChild.className !== 'memoNote') {
                    const data = '<input type="text" class="memoNote">';
                    this.insertElement({ target: e.target.closest(".status").querySelector('.memo'), index: 'beforeend', data });
                    this.setMemoEvent();
                }
            })
        })
    }

    setMemoEvent() {
        document.querySelector(".memoNote").addEventListener("keydown", (e) => {
            if (e.keyCode === 13) {
                var text = e.target.value;
                if (text.length === 0) {
                    alert('스케줄을 입력해 주세요.');
                } else {
                    const data = '<p class="schedule" draggable="true">' + text + '</p>';
                    this.insertElement({ target: e.target, index: 'afterend', data });
                    e.target.parentNode.removeChild(e.target);
                }
            }
        });
    }

    holdLoginWindow() {
        const loginElements = document.querySelectorAll(".loginWindow > div > input");
        loginElements.forEach(element => {
            element.addEventListener("focus", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))
            element.addEventListener("blur", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))

        });
    }

    toggleClass({ target, className }) {
        target.classList.toggle(className)
    }

    insertElement({ target, index, data }) {
        target.insertAdjacentHTML(index, data);
    }

    applyDynamicEvent(target) {
        if (target.className === "schedule") {
            this.toggleClass({ target, className: 'activeSchedule' });
        } else if (target.className === "schedule activeSchedule") {
            this.toggleClass({ target, className: 'activeSchedule' });
        }
        if (target.id === "trashCan") {
            this.toggleClass({ target, className: 'activeTrashCan' });
        }
    }

    dragDrop() {
        document.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('Text', e.target.firstChild.nodeValue);
            this.card = e.target;
        })

        document.addEventListener("dragenter", (e) => {
            this.applyDynamicEvent(e.target);

        }, false);

        document.addEventListener("dragleave", (e) => {
            this.applyDynamicEvent(e.target);
        }, false);

        document.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        document.addEventListener("drop", (e) => {
            e.preventDefault();
            var data = e.dataTransfer.getData('Text');
            const schedule = '<p class="schedule" draggable="true">' + data + '</p>';
            if (e.target.className === "schedule activeSchedule") {
                this.toggleClass({ target: e.target, className: 'activeSchedule' });
                this.insertElement({ target: e.target, index: 'beforebegin', data: schedule });
                this.card.parentNode.removeChild(this.card);
            }
            if (e.target.className === "addSchedule") {
                this.insertElement({ target: e.target.closest(".status").querySelector('.memo'), index: 'beforeend', data: schedule });
                this.card.parentNode.removeChild(this.card);
            }
            if (e.target.nodeName === "LI") {
                this.insertElement({ target: e.target.closest(".status").querySelector('.memo'), index: 'beforeend', data: schedule });
                this.card.parentNode.removeChild(this.card);
            }
            if (e.target.className === "title") {
                this.insertElement({ target: e.target.closest(".status").querySelector('.memo'), index: 'afterbegin', data: schedule });
                this.card.parentNode.removeChild(this.card);
            }
            if (e.target.id === "trashCan") {
                this.toggleClass({ target: e.target, className: 'activeTrashCan' });
                this.card.parentNode.removeChild(this.card);
            }
        });
    }

    insertUserSchedule(userTodo) {
        if (userTodo !== 'undefined') {
            const obj = JSON.parse(userTodo)
            for (status in obj) {
                obj[status].forEach(schedule => {
                    const target = document.querySelector('#' + status);
                    const element = '<p class="schedule" draggable="true">' + schedule + '</p>';
                    this.insertElement({ target, index: 'beforeend', data: element });
                })
            }
        }
    }
}

class LoginSignup {

    constructor() {
        this.signUpBtn = document.getElementById('signUpBtn');
        this.backToLogin = document.getElementById('back');
        this.userNameToUse = document.getElementById('userNameToUse');
        this.identification = document.getElementById('identification');
        this.createID = document.getElementById('createID');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.loginBtn = document.getElementById('loginBtn');
    }

    changeLoginWindow() {
        const informs = document.getElementsByClassName('inform');
        for (let i = 0; i < informs.length; i++) {
            informs[i].value = '';
        }
        const loginContainer = document.getElementById('loginContainer');
        const signUpContainer = document.getElementById('signUpContainer');
        loginContainer.classList.toggle('displayNone');
        signUpContainer.classList.toggle('displayNone');
    }

    ischeckedID() {
        if (this.userNameToUse.dataset.possible === 'yes') {
            return true;
        } else {
            return false;
        }
    }

    clickSignupBackToLogin() {
        this.signUpBtn.addEventListener('click', (e) => {
            this.changeLoginWindow();
        })
        this.backToLogin.addEventListener('click', (e) => {
            this.changeLoginWindow();
        })
    }

    changeDataSetPossibleNo() {
        this.userNameToUse.addEventListener('keydown', (e) => {
            this.userNameToUse.dataset.possible = "no";
        })
    }

    clickIdentification() {
        this.identification.addEventListener('click', async (e) => {
            const userNameToUseValue = this.userNameToUse.value;

            if (!/^[a-z0-9+]{4,12}$/.test(userNameToUseValue) || / /.test(userNameToUseValue)) {
                alert('아이디는 공백없이 영어 소문자와 숫자의 조합으로 4글자 이상 12글자 이하로 작성해 주세요');
            } else if (!/[a-z]/.test(userNameToUseValue)) {
                alert('영어(소문자)가 없습니다.')
            } else if (!/[0-9]/.test(userNameToUseValue)) {
                alert('숫자가 없습니다.')
            } else {
                try {
                    const id = 'id=' + userNameToUseValue;
                    const response = await fetch('/identification', {
                        method: 'POST',
                        body: id
                    })
                    const data = await response.text();
                    if (data === 'Not exit') {
                        this.userNameToUse.dataset.possible = "yes"
                        alert('사용가능한 아이디입니다.')
                    } else {
                        this.userNameToUse.dataset.possible = "no"
                        alert('이미 사용중인 아이디입니다.')
                    }
                } catch (err) {
                    throw err;
                }
            }
        })
    }

    clickCreateID() {
        this.createID.addEventListener('click', async (e) => {
            const passwordToUse = document.getElementById('passwordToUse').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (this.ischeckedID()) {
                if (passwordToUse.length < 8) {
                    alert('비밀번호는 최소 8자리 이상 입력해주세요');
                } else {
                    if (passwordToUse !== confirmPassword) {
                        alert('비밀번호가 일치하지 않습니다.')
                    } else {
                        const idAndPwd = 'id=' + this.userNameToUse.value + '&pwd=' + passwordToUse;
                        const response = await fetch('/createID', {
                            method: 'POST',
                            body: idAndPwd
                        })
                        const data = await response.text();
                        if (data === 'create') {
                            this.changeLoginWindow();
                            alert('아이디가 생성되었습니다.');
                        } else {
                            alert('실패')
                        }
                    }
                }
            } else {
                alert('아이디 중복체크를 해주세요.')
            }
        })
    }

    clickLoginBtn() {
        this.loginBtn.addEventListener('click', async (e) => {
            const idAndPwd = 'id=' + this.username.value + '&pwd=' + this.password.value;
            const response = await fetch('/login', {
                method: 'POST',
                body: idAndPwd
            });
            const data = await response.text();
            if (data === 'success') {
                document.location.reload();
            } else {
                alert('없는 아이디거나 비밀번호가 틀렸습니다.')
            }
        })
    }

}

let userData = {}

const dynamicEvent = new DynamicEvent();
dynamicEvent.dragDrop();
dynamicEvent.holdLoginWindow();
dynamicEvent.addSchedule();
dynamicEvent.insertUserSchedule('${userTodoString}')

const loginSignup = new LoginSignup();
loginSignup.clickCreateID();
loginSignup.clickIdentification();
loginSignup.changeDataSetPossibleNo();
loginSignup.clickSignupBackToLogin();
loginSignup.clickLoginBtn();

        `
    }
}

module.exports = Template;