const GameManager = require('./gameManager');
const gameManager = new GameManager();

module.exports = io => {
  io.on('connection',  socket => {
    socket.emit('inQueue', { action: 'waiting' });
    socket.on('init user', nickname => {
      socket.nickname = nickname;
      gameManager.addInQueue(socket);
    });
  });
}