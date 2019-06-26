var loginBtn = document.getElementById('login-btn');
var inputId = document.getElementById('userId');
var inputPassword = document.getElementById('password');

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

loginBtn.addEventListener('click', function(e){
  e.preventDefault();
  var userId = inputId.value, password = inputPassword.value;

  fetchData(`http://${window.location.host}/login`, {userId, password})
  .then(response => {
    if(response.status === 403) {
      M.toast({html: '<span> <i class="small material-icons">announcement</i> 사용자 정보가 존재하지 않습니다.</span>'});
      inputPassword.value = '';
      inputPassword.focus();
    } else if (response.redirected) {
      window.location.href = response.url;
    } else {
      M.toast({html: '<span> <i class="small material-icons">announcement</i> 사바기 요청을 처리할 수 없는 상태입니다.</span>'});
    }
  })
  .catch(error => {
    M.toast({html: '<span> <i class="small material-icons">announcement</i> 사바기 요청을 처리할 수 없는 상태입니다.</span>'});
  });
});