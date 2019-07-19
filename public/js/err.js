class Error {
    addBtnEvent() { // 로그인, 회원가입 버튼에 이벤트 달기
        const btn = document.getElementById('back-btn');
        btn.addEventListener('click', event => this.back(event));
    }

    back() {
        event.preventDefault();
        location.href = '/';
    }
}

window.onload = function() {
    const myError = new Error();
    myError.addBtnEvent();
}