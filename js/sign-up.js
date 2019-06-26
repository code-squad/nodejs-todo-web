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

load();
