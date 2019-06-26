var button = document.getElementById('loginBtn');
button.addEventListener('click', (event) => {
    alert('Hello world');
});

const arr = document.querySelectorAll(".loginContainer > input");
for (var id in arr) {
    arr[id].addEventListener("focus", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))
    arr[id].addEventListener("blur", (e) => e.target.closest(".loginWindow").classList.toggle("loginWindowActive"))
}
