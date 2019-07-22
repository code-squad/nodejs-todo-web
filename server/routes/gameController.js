const fs =require('fs');
const gameController = (req, res, next) => {
  if (req.method === 'GET' && req.url === '/game') {
    res.statusCode = 200;
    data = fs.readFileSync(__dirname + '/../public/game.html', 'utf-8');
    res.write(data);
    res.end();
    return;
  }
  console.log('player is waiting for a game');
}

module.exports = gameController;