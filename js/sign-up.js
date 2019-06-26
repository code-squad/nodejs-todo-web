const load = () => {
	window.addEventListener('load', () => {
		const signUpButton = document.querySelector('#signUpButton');

		signUpButton.addEventListener('click', () => {
			inputValidCheck();
		});
	});
};

load();
