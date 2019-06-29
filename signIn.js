document.querySelector('#signInButton').addEventListener('click', () => {
    const id = document.querySelector('#userID').value;
    const pw = document.querySelector('#userPW').value;
    fetch('http://localhost:8888/signInCheck', {
        method: 'post',
        redirect: 'follow',
        body: JSON.stringify({ id: id, pw: pw }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then((response) => { 
        switch (response.status) {
            case 200:
                alert(`회원 정보가 존재하지 않습니다!`);
                break;
            case 301:
                window.location.href = '/todoList';
                break;
            default:
                alert(`HTTP status : ${response.status}`);
                break;
        }
    });
});