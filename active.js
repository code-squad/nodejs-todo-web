var button = document.getElementById('loginBtn');
button.addEventListener('click', (event) => {
    alert('Hello world');
});

const arr = document.querySelectorAll(".loginContainer > input");
arr.forEach(element => {
    element.addEventListener("focus", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))
    element.addEventListener("blur", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))

});

// var text = document.querySelector(".memoNote");
// console.log(text)
// text.addEventListener("keydown", (e) => console.log(e.keyCode));
document.querySelector(".memoNote").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        var text = e.target.value;
        e.target.insertAdjacentHTML('afterend', `<p class="schedule">${text}</p>`)
        e.target.parentNode.removeChild(e.target);
    }
});

// function makeSchedule() {
//     var key = window.event.keyCode;
//     console.log(key)

//     if (key === 13) {
//         // document.getElementById("aa").innerHTML = document.getElementById("drag1").value;
//         var textarea = document.getElementById('drag1');
//         var text = document.getElementById("drag1").value;
//         textarea.insertAdjacentHTML('afterend', `<p id="schedule">${text}</p>`);
//     }
//     else {
//         return true;
//     }
// }