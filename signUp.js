document.querySelector('#signUpButton').addEventListener('click', () => {
    const id = document.querySelector('#userID').value;
    const pw = document.querySelector('#userPW').value;
    fetch('http://localhost:8888/signUpCheck', {
        method: 'post',
        body: JSON.stringify({ id: id, pw: pw }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then((response) => {
        switch (response.status) {
            case 200:
                alert(`존재 하는 회원 정보 입니다!`);
                break;
            case 301:
                alert(`회원 가입 완료!`);
                window.location = '/';
                break;
            default:
                alert(`HTTP status : ${response.status}`);
                break;
        }
    });
});

// 중복 체크 하는 부분 추가하기..