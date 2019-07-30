const Game = require('./game');

class GameManager {
  constructor () {
    this.inQueue = [];
    this.games = [];
  }

  addInQueue (socket) {
    this.inQueue.push(socket);
    return this.inQueue.length === 2 ? true : false;
  }

  startGame() {
    const game = new Game(this.inQueue[0], this.inQueue[1]);
    this.games.push(game);
    this.inQueue = [];
    return game;
  }
}
module.exports = GameManager;