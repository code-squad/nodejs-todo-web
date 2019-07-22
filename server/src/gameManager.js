const Game = require('./game');

class GameManager {
  constructor () {
    this.inQueue = [];
    this.games = [];
  }

  addInQueue (socket) {
    this.inQueue.push(socket);
    const matched = this.inQueue.length === 2 ? true : false;
    if (matched) {
      console.log(this.inQueue[0].nickname, this.inQueue[1].nickname);
      this.startGame();
      return;
    }
    return;
  }

  startGame() {
    const game = new Game(this.inQueue[0], this.inQueue[1]);
    this.games.push(game);
    this.inQueue = [];
    console.log(game.room);
    return;
  }
}
module.exports = GameManager;