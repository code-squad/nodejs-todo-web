const fs = require('fs');
const path = require('path');

class Cards {
	constructor(userId) { 
		this.userId = userId;
		this.targetCard = {};
		this.todoList = [];
		this.doingList = [];
		this.doneList = [];
		this.sampledbLocation = './filedb/sampleDB.json';
	}

	setUser(id) { this.userId = id;	}

	getFilePath() {
		return path.join(__dirname, `../filedb/${this.userId}_cards.json`);
	}

	loadCards(id) {
		this.userId = id;
		return new Promise((resolve, reject) => {
			if (this.userId) {
				fs.readFile(this.getFilePath(), (err, data) => {
					if (err) throw err;
					resolve(JSON.parse(data));
				});
			} else {
				reject(Error("파일읽기 실패"));
			}
		});
	}
	
	getCardList(cardIdList) {
		this.todoList = cardIdList.todo;
		this.doingList = cardIdList.doing;
		this.doneList = cardIdList.done;
		return cardIdList;
	}

	saveCards() {
		const cards = {};
		cards.todo = this.todoList;
		cards.doing = this.doingList;
		cards.done = this.doneList;
		fs.writeFile(this.getFilePath(), JSON.stringify(cards, null, 4), 'utf8', (err) => {
			if (err) console.log(err);
			console.log('저장되었습니다');
		});
	}

	addCard(columnType, text) {
		const card = {id: this.makeRandomNum(), text: text};
		if (columnType === 'todo-column') this.todoList.push(card);
		else if (columnType === 'doing-column') this.doingList.push(card);
		else if (columnType === 'done-column') this.doneList.push(card);
		this.saveCards();
	}

	makeRandomNum() {
		const cardIdList = this.todoList
								.concat(this.doingList, this.doneList)
								.map(card => { return card.id; });
		const num = Math.floor(Math.random() * 1000 + 1);
		while (true) 
			if (cardIdList.indexOf(num) === -1) return num;	
	}

	deleteCard(columnType, index) {
		if (columnType === 'todo-column') this.todoList.splice(index, 1);
		else if (columnType === 'doing-column') this.doingList.splice(index, 1);
		else if (columnType === 'done-column') this.doneList.splice(index, 1);
		this.saveCards();
	}

	moveCard(prevColumn, prevIndex, nextColumn, nextIndex) {
		if (prevColumn === 'todo-column') this.targetCard = this.todoList.splice(prevIndex, 1)[0];
		else if (prevColumn === 'doing-column') this.targetCard = this.doingList.splice(prevIndex, 1)[0];
		else if (prevColumn === 'done-column') this.targetCard = this.doneList.splice(prevIndex, 1)[0];

		if (nextColumn === 'todo-column') this.todoList.splice(nextIndex, 0, this.targetCard);
		else if (nextColumn === 'doing-column') this.doingList.splice(nextIndex, 0, this.targetCard);
		else if (nextColumn === 'done-column') this.doneList.splice(nextIndex, 0, this.targetCard);
		this.saveCards();
	}

	createCardsDB(id) {
		this.userId = id;
		fs.readFile(this.sampledbLocation, (err, data) => {
			if (err) throw err;
			const sample = JSON.parse(data);
			fs.writeFile(this.getFilePath(id), JSON.stringify(sample, null, 4), 'utf8', err => {
                if (err) throw err;
				console.log('새로운 db가 생성되었습니다.');
            });
		});
	}
}

module.exports = Cards;


