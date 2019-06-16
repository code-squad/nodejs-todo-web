// card 삭제 : 카드 안에 삭제 버튼 이벤트
// card 수정 : 카드 안에 수정 버튼 이벤트 
// card 추가 : 칼럼 푸터에 add 클릭 이벤트
// card 이동 : 드래그 앤 드롭 이벤트

function clickAdd() {

};

function addCard(type, text) {
    const ulId = type + '-list';
    const ulElement = document.getElementById(ulId);
    const liElement = document.createElement('li');
    liElement.innerHTML = text;
    ulElement.appendChild(liElement);
};


