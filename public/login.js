var loginBtn = document.getElementById('login-btn');
var inputId = document.getElementById('userId');
var inputPassword = document.getElementById('password');

function fetchData(url = '/todo', data = {}, method = 'POST') {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  })
  .then(response => response.json());
}

loginBtn.addEventListener('click', function(e){
  e.preventDefault();
  var userId = inputId.value, password = inputPassword.value;

  fetchData(`http://${window.location.host}/login`, { userId, password })
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Server message:', JSON.stringify(response)));
});