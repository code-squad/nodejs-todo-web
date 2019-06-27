
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
        if (e.target.previousSibling.className !== 'memoNote' || e.target.previousSibling.className === 'title') {
            e.target.insertAdjacentHTML('beforebegin', '<input type="text" class="memoNote">');

            setMemoEvent();
        }
    })
})

let card;

document.addEventListener('dragstart', (e) => {
    card = e.target;
    e.target.style.opacity = "0.4";
})

document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "1";
});

/////
document.addEventListener("dragenter", function (event) {
    if (event.target.className == "aaaa") {
        event.target.style.border = "3px dotted red";
    }
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("dragleave", function (event) {
    if (event.target.className == "aaaa") {
        event.target.style.border = "";
    }
});

////
document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className == "aaaa") {
        event.target.style.border = "";
        event.target.appendChild(card);
    }
});