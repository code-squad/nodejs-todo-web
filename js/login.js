const load = () => {
	window.addEventListener('load', () => {
		const loginButton = document.querySelector('#loginButton');

		loginButton.addEventListener('click', () => {
			isValidMember();
		});
	});
};

const isValidMember = async () => {
	const user_id = document.querySelector('#id');
	const user_password = document.querySelector('#password');

	const response = await fetch('/login', { method: 'POST', body: { user_id, user_password } });
};

load();
