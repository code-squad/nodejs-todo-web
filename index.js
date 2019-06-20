class Title {
    constructor(name){
        this.name = name;
    }

    setTitle(){
        const body = document.querySelector('body');
        const header = document.createElement('header');
        header.innerHTML = `<h1>${this.name}'s Todo</h1>`;
        body.insertBefore(header,body.firstChild);

    }
}

class section{
    constructor(name){
        this.headerName = name;
    }

    setSection(){
        const main = document.querySelector('main');
        const section = document.createElement('section');
        section.appendChild(this.setHeader());
        section.appendChild(this.setOpenButton());
        section.appendChild(this.setAddingCardBox());
        main.appendChild(section);
    }

    setHeader(){
        const header = document.createElement('header');
        header.innerHTML(`<h1>${this.headerName}</h1>`);

        return header;
    }

    setOpenButton(){
        const button = document.createElement('button');
        button.innerText('+');
        this.addingCardBoxOpenListener(button);
        
        return button;
    }

    addingCardBoxOpenListener(button){
        button.addEventListener('click', (event) => {
            const addingCardBox = event.target.nextElementSibling;
            addingCardBox.classList.toggle("adding-box");
            addingCardBox.firstElementChild.focus();
        });
    }

    // 내용입력부분만들기(){
    //     div만들기
    //     텍스트area삽입하기 (텍스트area만들기())
    //     입력,취소 버튼삽입하기 (입력,취소버튼만들기())

    //     return div
    // }

    // 텍스트area만들기(){
    //     textarea 만들기
    //     placeHolder 정하기

    //     return textarea
    // }

    // 입력,취소버튼만들기(){
    //     div 만들기
    //     add 버튼 삽입하기(add버튼만들기())
    //     cancle 버튼 삽입하기(cancle버튼만들기())
    
    //     return div
    // }

    // add버튼만들기(){
    //     add버튼 만들기
    //     add 클릭이벤트리스너 추가하기()

    //     return add버튼
    // }
    // add클릭이벤트리스너 추가하기(){
    //     텍스트area가져오기
    //     if textarea.value === ""{
    //         alert 내용 입력해주세요
    //         return
    //     }
    //     카드 객체 만들기
    //     카드에 텍스트area.value 넣기
    //     섹션에 appendchild 카드
    //     텍스트 area 비우기
    //     내용입력부분 숨기기 클래스 토글하기

    // }

    // cancle버튼만들기(){
    //     cancle 버튼 만들기
    //     cancle 클릭이벤트 리스너 추가하기()

    //     return cancle버튼 
    // }

    // cancle클릭이벤트 리스너 추가하기(){
    //     textarea 가져오기
    //     textarea 비우기
    //     내용입력부분 숨기기 클래스 토글하기
    // }
}

class card{
    constructor(text){
        this.text = text;
    }
    setCard(){
        const article = document.createElement('article');
        article.innerText = this.text;
        return article;
    }

}

const title = new Title('Wangmin');
title.setTitle();