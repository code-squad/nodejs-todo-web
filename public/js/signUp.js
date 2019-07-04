document.querySelector('#signUpButton').addEventListener('click', () => {
    const id = document.querySelector('#userID').value;
    const pw = document.querySelector('#userPW').value;
    const body = JSON.stringify({ id : id, pw : pw });
    fetch('http://localhost:8888/signUpCheck', { method : 'post', redirect : 'follow', body : body })
    .then(response => {
        switch (response.status) {
            case 403: alert(`존재 하는 회원 정보 입니다!`); break;
            case 302: alert(`회원 가입 완료!`); window.location.href = '/'; break;
            default: alert(`HTTP status : ${response.status}`); break;
        }
    });
});