
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

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    event.preventDefault();
    console.log(event.target.nodeName)
    var data = event.dataTransfer.getData('Text');
    if (event.target.className == "schedule") {
        event.target.insertAdjacentHTML('beforebegin', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
    if (event.target.className == "addSchedule") {
        event.target.insertAdjacentHTML('beforebegin', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
    if (event.target.nodeName === "LI") {
        event.target.insertAdjacentHTML('beforeend', `<p class="schedule" draggable="true">${data}</p>`);
        card.parentNode.removeChild(card);
    }
});
