const load = () => {
	window.addEventListener('load', () => {
		const loginButton = document.querySelector('#loginButton');

		loginButton.addEventListener('click', () => {
			isValidMember();
		});
	});
};

const isValidMember = async () => {
	const user_id = document.querySelector('#id').value;
	const user_password = document.querySelector('#password').value;
	const loginData = { user_id, user_password };

	try {
		const response = await fetch('/login', { method: 'POST', body: JSON.stringify(loginData) });
		const validMember = response.text();
		if (response.ok) {
			if (validMember) {
				location.href = '/';
			}
			location.href = '/login';
		}
		location.href = '/error-404';
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

load();
