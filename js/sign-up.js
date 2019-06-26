const load = () => {
	window.addEventListener('load', () => {
		const signUpButton = document.querySelector('#signUpButton');

		signUpButton.addEventListener('click', () => {
			inputValidCheck();
		});
	});
};

const isValidId = id => {
	if (!id) {
		document.querySelector('#id').focus();
		return;
	}
	return true;
};

const isValidPassword = (password, rePassword) => {
	if (!password) {
		document.querySelector('#password').focus();
		return;
	}
	if (!rePassword) {
		document.querySelector('#rePassword').focus();
		return;
	}
	if (password !== rePassword) {
		document.querySelector('#rePassword').value = '';
		document.querySelector('#password').focus();
		return;
	}
	return true;
};

load();
