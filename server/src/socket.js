const GameManager = require('./gameManager');
const gameManager = new GameManager();
const PLAYER_1 = 0;
const PLAYER_2 = 1;
const games = [];
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

module.exports = io => {
  io.on('connection',  socket => {
    socket.emit('inQueue', { message: '상대를 찾는 중입니다!' });
    
    socket.on('init user', async data => {
      const { nickname } = data;
      socket.nickname = nickname;
      const matched = gameManager.addInQueue(socket);
      if (matched) {
        const game = await gameManager.startGame();
        games.push(game);
        
        io.to(game.id).emit('matched', { 
          message : '매칭 되었습니다!', 
          players : [
            game.players[PLAYER_1].nickname, 
            game.players[PLAYER_2].nickname
          ],
          gameId : game.id,
        });
        return;
      }
    });
    
    socket.on('game start', async data => {
      const gameId = data.gameId;
      const game = await games.filter(g => gameId === g.id)[0];
      game.ready += 1;
      if (game.ready !== 2) {
        return;
      }
      game.ready = 0;
      game.init();
      const { p1res, p2res, isOver } = await game.startRound();
      if (isOver) {
        // 게임 종료
        console.log('게임종료기능');
        return;
      }
      game.players[PLAYER_1].emit('round start', p1res);
      game.players[PLAYER_2].emit('round start', p2res);

      const { socket, sendRes } = game.yourTurn();
      await sleep(500);
      socket.emit('your turn', sendRes);
      return;
    });
    
    socket.on('raise', async data => {
      const { gameId, throwCoin } = data;
      const game = await games.filter(g => gameId === g.id)[0];
      const message = await game.raise(throwCoin);
      await turnOver(game, message);
      return;
    });
    socket.on('fold', async data => {
      const { gameId } = data;
      const game = await games.filter(g => gameId === g.id)[0];
      const message = await game.fold();
      await roundOver(game, message);
      return;
    });
    socket.on('call', async data => {
      const { gameId } = data;
      const game = await games.filter(g => gameId === g.id)[0];
      const message = await game.call();
      await roundOver(game, message);
      return;
    })
    const roundOver = async (game, message) => {
      const res = {
        id: [ 
          game.players[PLAYER_1].id,
          game.players[PLAYER_2].id,
        ],
        school: game.school,
        message: message,
        coins: [
          game.coins[PLAYER_1],
          game.coins[PLAYER_2],
        ],
        cards: [
          game.pickCards[PLAYER_1],
          game.pickCards[PLAYER_2],
        ]
      };
      io.to(game.id).emit('alert', res);
      await sleep(3000);
      const { p1res, p2res, isOver } = await game.startRound();
      if (isOver) {
        // 게임 종료
        console.log('게임종료기능');
        return;
      }
      game.players[PLAYER_1].emit('round start', p1res);
      game.players[PLAYER_2].emit('round start', p2res);
      await sleep(2000);
      res.message[PLAYER_1] = '상대를 기다리는 중입니다.';
      res.message[PLAYER_2] = '상대를 기다리는 중입니다.';
      io.to(game.id).emit('alert', res);
      const { socket, sendRes } = game.yourTurn();
      socket.emit('your turn', sendRes);
      return;
    }
    const turnOver = async (game, message) => {
      const res = {
        id: [ 
          game.players[PLAYER_1].id,
          game.players[PLAYER_2].id,
        ],
        school: game.school,
        message: message,
        coins: [
          game.coins[PLAYER_1],
          game.coins[PLAYER_2],
        ],
      };
      io.to(game.id).emit('alert', res);
      await sleep(3000);
      const { socket, sendRes } = game.yourTurn();
      socket.emit('your turn', sendRes);
      return;
    }
  });
}

