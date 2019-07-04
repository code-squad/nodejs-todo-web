var loginBtn = document.getElementById('login-btn');
var signupBtn = document.getElementById('signup-btn');
var inputId = document.getElementById('userId');
var inputPassword = document.getElementById('password');

function makeToast(text = '서버가 요청을 처리할 수 없는 상태입니다.'){
  M.toast({html: `<span> <i class="small material-icons">announcement</i>${text}</span>`});
}

function validatePassword(password) {
  return RegExp(/^[A-Za-z0-9!@#$%^&*-+=-_]{4,16}$/).test(password);
}

function validateUserId(userId) {
  return RegExp(/^[a-z][a-z|0-9]{3,11}$/).test(userId);
}

function fetchData(url = '/todo', data = {}) {
  return fetch(url, {
    method: 'POST', 
    redirect: 'follow',           
    headers: { 
      "Accept": "application/json , text/plain ,*/*",
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response);
}

signupBtn.addEventListener('click', function(e){
  e.preventDefault();
  window.location.href = '/signup';
});

loginBtn.addEventListener('click', function(e){
  e.preventDefault();
  var userId = inputId.value, password = inputPassword.value;
  var passValidation = true;
  if(!validateUserId(userId)){
    makeToast('ID 형식이 맞지 않습니다.')
    inputId.value = '';
    inputId.focus();
    passValidation = false;
  }

  if(!validatePassword(password)){
    makeToast('비밀번호 형식이 맞지 않습니다.');
    inputPassword.value = '';
    inputPassword.focus();
    passValidation = false;
  }

  if(!passValidation) return;

  fetchData(`/login`, {userId, password})
  .then(response => {
    if(response.status === 403) {
      makeToast('일치하는 정보가 없습니다.');
      inputPassword.value = '';
      inputPassword.focus();
    } else if (response.redirected) {
      window.location.href = response.url;
    } else {
      makeToast();
    }
  })
  .catch(error => {
    console.error(error);
    makeToast();
  });
});