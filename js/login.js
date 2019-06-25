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
		if (response.ok) {
			location.href = '/';
		} else {
			location.href = '/error-404';
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

load();
