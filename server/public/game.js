const socket = io({
  transports: ['websocket']
});
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
const PLAYER_1 = 0;
const PLAYER_2 = 1;
const gamePlate = document.getElementById("game-plate");
const state = document.getElementById("state");
const controller = gamePlate.children["controller"];
const schoolView = controller.children["school"];
const me = gamePlate.children["me"];
const opposite = gamePlate.children["opposite"];
const call = document.getElementById("call");
const raise = document.getElementById("raise");
const fold = document.getElementById("fold");

$(function() {
  socket.on('inQueue', function (data) {
    console.log(data);
    const state = document.getElementById("state");
    console.log(state);
    const user = document.getElementById("user");
    state.innerHTML= data.message;
    const tokens = document.cookie.split(';');
    const cookies = tokens.reduce((acc, cur) => {
      cur =  cur.trim();
      const key = cur.split('=')[0];
      const value = cur.split('=')[1];
      acc[key] = value;
      return acc;
    }, {});
    user.innerHTML = cookies['name'];
    socket.emit('init user', { nickname: cookies['name'] });
  });
  
  socket.on('matched',  async data => {
    const { message, players } = data;
    const me = document.querySelector('#user');
    console.log(me.innerHTML);
    const oppositePlayer = players[0] === me.innerHTML ? players[1] : players[0];

    const state = document.getElementById("state");
    state.innerHTML = message;
    let stateMessage = document.createElement("h3")
    stateMessage = state.appendChild(stateMessage);
    stateMessage.innerHTML = `${oppositePlayer}님과의 매치!`;
    let countDown= document.createElement("p")
    countDown = state.appendChild(countDown);
    for (let i=5; i>-1; i--) {
      countDown.innerHTML = i;
      await sleep(1000);
    }
    countDown.remove();
    state.innerHTML = 'GAME START';
    socket.emit('game start', { gameId: data.gameId });
  });
   
  socket.on('round start', async data => {
    const { roundNo, gameId, school, showCards, myCoin, oppositeCoin } = data;
    state.innerHTML = `${roundNo} 라운드 시작!`;
    gamePlate.children["round"].innerHTML = `ROUND ${roundNo}`;
    controller.hidden = false;
    controller.children["school"].innerHTML = `판돈 : ${school}`;
    me.children["my-coin"].innerHTML = `내 코인 : ${myCoin}`;
    me.children["my-card"].innerHTML = '내 카드 : ?';
    opposite.children["opposite-card"].innerHTML = `상대 카드 : ${showCards}`;
    opposite.children["opposite-coin"].innerHTML = `상대 코인 : ${oppositeCoin}`;
  });

  socket.on('your turn', async data => {
    const raiseCoin = () => {
      const throwCoin = Number(event.target.innerHTML) + coinToCall;
      raise.disabled = true;
      call.disabled = true;
      fold.disabled = true;
      console.log('throw coin :', throwCoin, 'coin to call :',coinToCall)
      socket.emit('raise', { gameId: gameId, throwCoin: throwCoin, });
    }
    const foldRound = () => {
      raise.disabled = true;
      call.disabled = true;
      fold.disabled = true;
      socket.emit('fold', { gameId: gameId });
    }
    const callRound = () => {
      raise.disabled = true;
      call.disabled = true;
      fold.disabled = true;
      socket.emit('call', { gameId: gameId });
    }
    const { coinToCall, school, myCoin, gameId } = data;
    const raiseOptions = document.getElementById("raise-options");
    const maximumRaise = myCoin - coinToCall;
    schoolView.innerHTML = `판돈 ${school}`;
    me.children["my-coin"].innerHTML = `내 코인 : ${myCoin}`;
    state.innerHTML = '내 차례입니다!';
    if (coinToCall !== 0){
      call.disabled = false;
    }
    raise.disabled = false;
    fold.disabled = false;
    fold.onclick = foldRound;
    call.onclick = callRound;
    while (raiseOptions.firstChild) {
      raiseOptions.removeChild(raiseOptions.firstChild);
    }
    if (maximumRaise <= 0) {
      raise.disabled = true;
      return;
    }
    for (let i = 1; i<= maximumRaise; i++) {
      let tmpButton = document.createElement('button');
      tmpButton.className = "dropdown-item";
      tmpButton.onclick = raiseCoin;
      tmpButton.innerHTML = i;
      raiseOptions.appendChild(tmpButton);
    }
  });

  socket.on('alert', async data => {
    const { id, school, message, coins, cards } = data;
    const player = socket.id === id[PLAYER_1] ? PLAYER_1 : PLAYER_2;
    const enemy = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    
    state.innerHTML = message[player];
    opposite.children["opposite-coin"].innerHTML =  
      `상대 코인 : ${coins[enemy]}`;
    me.children["my-coin"].innerHTML = 
      `내 코인 : ${coins[player]}`;
    if (cards){
      me.children["my-card"].innerHTML = `내 카드 : ${cards[player]}`;
    }
    schoolView.innerHTML = `판돈 ${school}`;
  }); 
  
  socket.on('game over', async data => {
    const { message } = data;
    state.innerHTML = message;
    gamePlate.hidden = true;
  });
});

