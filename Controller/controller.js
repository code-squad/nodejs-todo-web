const Users = require('../Model/users');
const Cards = require('../Model/cards');

class controller {
	constructor() {
		this.users = new Users();
		this.cards = new Cards();
	}

	setUser(id) {
		this.cards.setUser(id);
	}

	login(userInput) {
		userInput = JSON.parse(userInput);
		if (this.users.isValidUser(userInput)) return userInput.id;
		return null;
	}

	logout() {
		this.cards.setUser(null);
	}

	signUp(newUser) { 
		this.users.signUp(newUser);
		this.cards.createCardsDB(newUser.id);
	}

	async loadCards(id) {
		const jsonCards = await this.cards.loadCards(id);
		const cardList = await this.cards.getCardList(jsonCards);
		return cardList;
	}

	addCard(card) {
		const {columnType, text} = card;
		this.cards.addCard(columnType, text);
	}

	deleteCard(card) {
		let {columnType, index} = card;
		columnType = columnType.split('-')[0] + '-column';
		this.cards.deleteCard(columnType, index);
	}

	moveCard(dragInfo) {
		let {prevColumn, prevIndex, nextColumn, nextIndex} = dragInfo;
		prevColumn = prevColumn.split('-')[0] + '-column';
		nextColumn = nextColumn.split('-')[0] + '-column';
		this.cards.moveCard(prevColumn, prevIndex, nextColumn, nextIndex);
	}
}

module.exports = controller;
