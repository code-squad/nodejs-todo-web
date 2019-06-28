
function holdLoginWindow() {
    const loginElements = document.querySelectorAll(".loginContainer > input");
    loginElements.forEach(element => {
        element.addEventListener("focus", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))
        element.addEventListener("blur", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))

    });
}
holdLoginWindow();

function setMemoEvent() {
    document.querySelector(".memoNote").addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            var text = e.target.value;
            if (text.length === 0) {
                alert('스케줄을 입력해 주세요.')
            } else {
                e.target.insertAdjacentHTML('afterend', `<p class="schedule" draggable="true">${text}</p>`)
                e.target.parentNode.removeChild(e.target);
            }
        }
    });
}

const addScheduleButtons = document.querySelectorAll(".addSchedule");
addScheduleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.closest(".status").querySelector('.memo').childNodes.length === 0 || e.target.closest(".status").querySelector('.memo').lastChild.className !== 'memoNote') {
            e.target.closest(".status").querySelector('.memo').insertAdjacentHTML('beforeend', '<input type="text" class="memoNote">');

            setMemoEvent();
        }
    })
})

let card;

document.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('Text', e.target.firstChild.nodeValue);
    card = e.target;
})

document.addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.addEventListener("drop", (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData('Text');
    if (e.target.className == "schedule") {
        e.target.insertAdjacentHTML('beforebegin', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
    if (e.target.className == "addSchedule") {
        e.target.closest(".status").querySelector('.memo').insertAdjacentHTML('beforeend', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
    if (e.target.nodeName === "LI") {
        e.target.closest(".status").querySelector('.memo').insertAdjacentHTML('beforeend', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
    if (e.target.className === "title") {
        e.target.closest(".status").querySelector('.memo').insertAdjacentHTML('afterbegin', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
});
