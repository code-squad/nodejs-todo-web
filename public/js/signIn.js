document.querySelector('#signInButton').addEventListener('click', () => {
    const id = document.querySelector('#userID').value;
    const pw = document.querySelector('#userPW').value;
    const body = JSON.stringify({ id : id, pw : pw });
    fetch('http://localhost:8888/signInCheck', { method : 'post', redirect : 'follow', body : body })
    .then(response => { 
        switch (response.status) {
            case 403: alert(`회원 정보가 존재하지 않습니다!`); break;
            case 302: window.location.href = '/todoList'; break;
            default: alert(`HTTP status : ${response.status}`); break;
        }
    });
});