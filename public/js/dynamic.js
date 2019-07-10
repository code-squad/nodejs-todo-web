
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
                    const data = `<p class="schedule" draggable="true">${text}</p>`;
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
        target.classList.toggle(`${className}`)
    }

    insertElement({ target, index, data }) {
        target.insertAdjacentHTML(`${index}`, data);
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
            const schedule = `<p class="schedule" draggable="true">${data}</p>`;
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

}

const signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', (e) => {
    const loginContainer = document.getElementById('loginContainer');
    const signUpContainer = document.getElementById('signUpContainer');
    loginContainer.classList.toggle('displayNone');
    signUpContainer.classList.toggle('displayNone');
})

const backToLogin = document.getElementById('back');
backToLogin.addEventListener('click', (e) => {
    const loginContainer = document.getElementById('loginContainer');
    const signUpContainer = document.getElementById('signUpContainer');
    loginContainer.classList.toggle('displayNone');
    signUpContainer.classList.toggle('displayNone');
})

const identification = document.getElementById('identification');
identification.addEventListener('click', (e) => {
    const userNameToUse = document.getElementById('userNameToUse').value;

    if (!/^[a-z0-9+]{4,12}$/.test(userNameToUse)) {
        alert('아이디는 영어 소문자와 숫자의 조합으로 4글자 이상 12글자 이하로 작성해 주세요');
    } else if (!/[a-z]/.test(userNameToUse)) {
        alert('영어(소문자)가 없습니다.')
    } else if (!/[0-9]/.test(userNameToUse)) {
        alert('숫자가 없습니다.')
    } else {
        alert('성공!')
    }
})

const dynamicEvent = new DynamicEvent();
dynamicEvent.dragDrop();
dynamicEvent.holdLoginWindow();
dynamicEvent.addSchedule();
