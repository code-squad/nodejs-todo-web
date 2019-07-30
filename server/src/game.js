const TOTAL_COIN_AMOUNT = 60;
const INITIAL_COIN_AMOUNT = 30;
const UNSHUFFLED_CARDS = [1,2,3,4,5,6,7,8,9,10];
const PLAYER_1 = 0;
const PLAYER_2 = 1;
const DRAW = 2;

class Card {
  constructor() {
    this.set = Array.from(UNSHUFFLED_CARDS);
  }
  shuffle() {
    for (let i = this.set.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.set[i], this.set[j]] = [this.set[j], this.set[i]];
    }
  }
}

class Game {
  constructor(p1soc, p2soc) {
    this.players = [p1soc, p2soc];
    this.cards = [new Card(), new Card()];
    this.coins = [INITIAL_COIN_AMOUNT, INITIAL_COIN_AMOUNT];
    this.school = 0;
    this.id = `${p1soc.id}${p2soc.id}`;
    this.turn = PLAYER_1;
    this.pickCards = [];
    this.roundNumb = 0;
    this.coinToCall = 0;
    this.ready = 0;
    p1soc.join(this.id);
    p2soc.join(this.id);
  }
  init() {
    this.cards[0].shuffle();
    this.cards[1].shuffle();
    return;
  }
  async startRound() {
    if (this.roundNumb === 10 || this.coins[PLAYER_1] === 0 || this.coins[PLAYER_2] === 0) {
      const { p1Res, p2Res } = await this.gameOver();
      return { p1res: p1Res, p2res: p2Res, isOver: true };
    }
    this.roundNumb += 1;
    this.pickCards = [
      this.cards[PLAYER_1].set.pop(), 
      this.cards[PLAYER_2].set.pop()
    ];
    this.coins[PLAYER_1] -= 1;
    this.coins[PLAYER_2] -= 1;

    this.school += 2;
    const res = {
      roundNo: this.roundNumb,
      gameId : this.id,
      school : this.school,
    }
    const p1Res = Object.assign({
      showCards: this.pickCards[PLAYER_2],
      myCoin : this.coins[PLAYER_1],
      oppositeCoin : TOTAL_COIN_AMOUNT - this.coins[PLAYER_1] - this.school,
    }, res);
    const p2Res = Object.assign({
      showCards: this.pickCards[PLAYER_1],
      myCoin : this.coins[PLAYER_2],
      oppositeCoin : TOTAL_COIN_AMOUNT - this.coins[PLAYER_2] - this.school,
    }, res);
    return { p1res: p1Res, p2res: p2Res, isOver: false };
  }
  yourTurn() {
    this.turn = this.takeTurn();
    const socket = this.players[this.turn];
    const sendRes = { 
      coinToCall: this.coinToCall,
      school: this.school,
      myCoin : this.coins[this.turn],
      gameId : this.id,
    }
    return { socket, sendRes };
  }
  takeTurn() {
    return this.turn === PLAYER_2 ? PLAYER_1 : PLAYER_2;
  }
  fold() {
    const opponent = this.turn === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    this.coins[opponent] += this.school;
    this.school = 0
    const message = [
      this.turn === PLAYER_1 ? 
      '라운드 종료!' : '상대의 fold로 라운드 종료!',
      this.turn === PLAYER_2 ? 
      '라운드 종료!' : '상대의 fold로 라운드 종료!',
    ];
    return message;
  }
  raise(throwCoin) {
    this.school += throwCoin;
    this.coins[this.turn] -= throwCoin;
    this.coinToCall = throwCoin - this.coinToCall;
    const message = [
      this.turn === PLAYER_1 ?
        `${this.coinToCall}만큼 raise하였습니다!` : 
        `상대가 ${this.coinToCall}만큼 raise하였습니다!`,
      this.turn === PLAYER_1 ?
        `상대가 ${this.coinToCall}만큼 raise하였습니다!` :
        `${this.coinToCall}만큼 raise하였습니다!`,
    ];
    return message;
  }
  call() {
    const opponent = this.turn === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    let winner = 0;
    let message = [];
    if (this.coins[this.turn] < this.coinToCall){
      this.school += this.coins[this.turn];
      this.coins[this.turn] = 0;
    } else {
      this.coins[this.turn] -= this.coinToCall;
      this.school += this.coinToCall;
    }
    this.coinToCall = 0;
    
    if (this.pickCards[this.turn] > this.pickCards[opponent]) {
      this.coins[this.turn] += this.school;
      this.school = 0;
      winner = this.turn;  
    } else if (this.pickCards[this.turn] < this.pickCards[opponent]){
      this.coins[opponent] += this.school;
      this.school = 0;
      winner = opponent;
    } else {
      message = [
        '무승부입니다! 판돈은 다음 라운드에 누적됩니다.',
        '무승부입니다! 판돈은 다음 라운드에 누적됩니다.'
      ];
      return message;
    }
    message = [
      winner === PLAYER_1 ?
        `당신이 이겼습니다!` :
        `상대가 이겼습니다!`,
      winner === PLAYER_1 ?
        `상대가 이겼습니다!` :
        `당신이 이겼습니다!`,
    ];
    return message;
  }

  async gameOver() {
    let winner = 0;
    let p1message = '';
    let p2message = '';
    if (this.coins[PLAYER_1] > this.coins[PLAYER_2]) {
      winner = PLAYER_1;
    } else if (this.coins[PLAYER_1] < this.coins[PLAYER_2]) {
      winner = PLAYER_2;
    } else {
      winner = DRAW;
    }

    if (winner ===  PLAYER_1) {
      p1message = '게임의 승자는 당신입니다!'
      p2message = '게임의 패자는 당신입니다!';
    } else if (winner === PLAYER_2) {
      p1message = '게임의 패자는 당신입니다!';
      p2message = '게임의 승자는 당신입니다!';
    } else {
      p1message = '게임을 비겼습니다!';
      p2message = p1message;
    }
    const p1Res = { message: p1message };
    const p2Res = { message: p2message };

    return { p1Res, p2Res };
  }
}

module.exports = Game;