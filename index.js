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

const title = new Title('Wangmin');
title.setTitle();