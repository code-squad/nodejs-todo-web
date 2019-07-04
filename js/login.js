const load = () => {
	window.addEventListener('load', () => {
		const loginButton = document.querySelector('#loginButton');
		const signUpButton = document.querySelector('#signUpButton');

		loginButton.addEventListener('click', () => {
			login();
		});
		signUpButton.addEventListener('click', () => {
			location.href = '/users';
		});
	});
};

const login = async () => {
	const user_id = document.querySelector('#id').value;
	const user_password = document.querySelector('#password').value;
	const loginData = { user_id, user_password };

	try {
		const response = await fetch('/auth', { method: 'POST', body: JSON.stringify(loginData) });
		if (response.redirected) {
			return (location.href = response.url);
		}
		if (response.ok) {
			document.querySelector('#password').value = '';
			document.querySelector('#id').focus();
			alert('아이디나 비밀번호가 올바르지 않습니다.');
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

load();
