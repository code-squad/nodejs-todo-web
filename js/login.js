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
		if (response.ok) {
			const validMember = await response.text();
			if (validMember === 'true') {
				location.href = '/';
			}
		} else {
			location.href = '/error-404';
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

load();
