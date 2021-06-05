(() => {
	document.addEventListener('DOMContentLoaded', () => {
		addStylesheet();

		let buttons = Array.from(document.getElementsByClassName('sawiroad-button'));

		if (buttons.length === 0) return;

		const loadingSpinner = addLoader();

		buttons.map((button) => {
			if (button.getAttribute('data-show') === null) return;

			const href = button.getAttribute('href');

			if (href === '' || !validURL(href)) return;

			const url = new URL(href);

			if (!url.hostname.includes('gum.co') && !url.hostname.includes('gumroad.com')) {
				// TODO: handle domain case, but cors issue when fetching
			}

			// handle gumroad domain case
			button.addEventListener('click', (e) => {
				if (button.getAttribute('data-embed') === null) return;

				loadingSpinner.style.display = 'block';
				setTimeout(() => (loadingSpinner.style.display = 'none'), 200);

				e.preventDefault();

				let iframe = document.createElement('iframe');
				// let productCode = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
				iframe.src = href;
				iframe.className = 'sawiroad-overlay-iframe';
				iframe.allowFullscreen = 'allowFullScreen';
				iframe.allowPaymentRequest = 'allowPaymentRequest';
				iframe.scrolling = 'yes';

				let div = document.createElement('div');
				div.className = 'sawiroad-scroll-container';

				let innerDiv = document.createElement('div');
				let overlayDiv = document.createElement('div');
				overlayDiv.className = 'sawiroad-scroll-overlay';
				innerDiv.appendChild(overlayDiv);
				innerDiv.appendChild(iframe);
				div.appendChild(innerDiv);

				div.addEventListener('click', (e) => {
					e.preventDefault();

					div.style.opacity = 0;

					setTimeout(() => div.remove(), 200);
				});

				document.body.insertBefore(div, document.body.lastElementChild);
			});
		});
	});
})();

function validURL(str) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return !!pattern.test(str);
}

function addStylesheet(domain = 'https://gumroad.com') {
	let style = document.createElement('style');
	style.innerHTML = `
.sawiroad-button {
				box-sizing: border-box;
				padding: 16px;
				border-radius: 10px;
				border: 2px solid #ececec;
				transition: all 0.25s ease-in-out;
				background-image: url(https://gumroad.com/button/button_bar.jpg);
				background-repeat: repeat-x;
				border-radius: 4px;
				color: #999;
				text-decoration: none;
				font-weight: 500;
				max-width: 200px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-family: -apple-system, '.SFNSDisplay-Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
			}

			.sawiroad-button::before {
				background-image: url('https://gumroad.com/button/button_logo.png');
				margin-right: 1rem;
				background-size: 20px 20px;
				display: inline-block;
				width: 20px;
				height: 20px;
				content: '';
			}

			.sawiroad-button:hover {
				cursor: pointer;
			}

			.sawiroad-scroll-container {
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				position: fixed;
				z-index: 10;
				transition: opacity 0.2s ease-in-out;
			}

			.sawiroad-scroll-container > div {
				display: flex;
				justify-content: center;
				align-items: center;
				min-height: 100%;
				min-width: 100%;
			}

			.sawiroad-scroll-overlay {
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				position: fixed;
				background-color: black;
				opacity: 75%;
				transition: opacity 0.2s ease-in-out;
			}

			.sawiroad-overlay-iframe {
				position: absolute;
				width: 100%;
				max-width: 800px;
				height: 85vh;
				border: none !important;
				overflow: auto;
			}

			.sawiroad-loading-indicator {
				background: white;
				border-radius: 50%;
				box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
				box-sizing: border-box;
				display: none;
				height: 60px;
				left: 50% !important;
				margin-left: -30px !important;
				margin-top: -30px !important;
				padding: 10px;
				position: fixed;
				top: 50% !important;
				width: 60px;
				z-index: 99997;
			}

			.sawiroad-loading-indicator i {
				background: url('https://gumroad.com/js/loading-rainbow.svg');
				height: 40px;
				width: 40px;
				display: inline-block;
				background-size: contain;
				animation: sawiroad-spin 1.5s infinite linear;
			}

			@keyframes sawiroad-spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(359deg);
				}
			}
	`;

	document.getElementsByTagName('head')[0].appendChild(style);
}

function addLoader() {
	let loadingSpinner = document.createElement('div');
	let loadingIcon = document.createElement('i');
	loadingSpinner.className = 'sawiroad-loading-indicator';
	loadingSpinner.appendChild(loadingIcon);
	loadingSpinner.style.display = 'none';
	document.body.insertBefore(loadingSpinner, document.body.lastElementChild);

	return loadingSpinner;
}
