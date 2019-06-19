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

    섹션만들기(){
        main 가져오기
        섹션 생성하기
        헤더 삽입하기(헤더만들기())
        버튼 삽입하기(입력부분 열고닫는 버튼만들기()
        내용 입력부분 삽입하기(내용입력부분만들기())

    }

    헤더만들기(){
        헤더 생성하기
        헤더에 이름넣기
    
        return 헤더
    }

    입력부분열고닫는버튼만들기(){
        버튼 생성하기
        버튼에 "+" 넣기
        열고닫기 클릭이벤트리스너 추가하기()
        
        return 버튼
    }

    열고닫기 클릭이벤트리스너 추가하기(){
        내용입력부분 가져오기
        숨기기 클래스 토글하기
        내용입력부분 focus 하기
    }

    내용입력부분만들기(){
        div만들기
        텍스트area삽입하기 (텍스트area만들기())
        입력,취소 버튼삽입하기 (입력,취소버튼만들기())

        return div
    }

    텍스트area만들기(){
        textarea 만들기
        placeHolder 정하기

        return textarea
    }

    입력,취소버튼만들기(){
        div 만들기
        add 버튼 삽입하기(add버튼만들기())
        cancle 버튼 삽입하기(cancle버튼만들기())
    
        return div
    }

    add버튼만들기(){
        add버튼 만들기
        add 클릭이벤트리스너 추가하기()

        return add버튼
    }
    add클릭이벤트리스너 추가하기(){
        텍스트area가져오기
        if textarea.value === ""{
            alert 내용 입력해주세요
            return
        }
        카드 객체 만들기
        카드에 텍스트area.value 넣기
        섹션에 appendchild 카드
        텍스트 area 비우기
        내용입력부분 숨기기 클래스 토글하기

    }

    cancle버튼만들기(){
        cancle 버튼 만들기
        cancle 클릭이벤트 리스너 추가하기()

        return cancle버튼 
    }

    cancle클릭이벤트 리스너 추가하기(){
        textarea 가져오기
        textarea 비우기
        내용입력부분 숨기기 클래스 토글하기
    }
}

class card{
    constructor(text){
        this.text = text;
    }
    카드만들기(){
        article 만들기
        article 에 text 넣기
        return article
    }

}

const title = new Title('Wangmin');
title.setTitle();