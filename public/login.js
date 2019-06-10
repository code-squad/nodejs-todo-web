const pw = document.getElementById("pw")
const pw_check = document.getElementById("pw_check")
const signUp = document.getElementById("signUp")
const loginInit = document.getElementById("loginInit")

const loginCheck = () => {
    let xhr = new XMLHttpRequest;
    let url = './login_process'
    xhr.onreadystatechange = function(){

        if (this.status === 200 && this.readyState == this.DONE && xhr.responseText){
            alert(xhr.responseText)
        }
    }
    xhr.open('GET', url, true)
    xhr.send();
}

signUp.addEventListener("click", () => {pw.value !== pw_check.value ? alert("비밀번호 정보와 비밀번호 확인이 다릅니다.") : signUp.type = 'summit'});

loginInit.addEventListener("load", loginCheck())