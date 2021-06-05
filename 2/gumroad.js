'use strict';
function _toConsumableArray(e) {
	if (Array.isArray(e)) {
		for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
		return i;
	}
	return Array.from(e);
}
function _inherits(e, t) {
	if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
	(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
function _classCallCheck(e, t) {
	if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
}
function createGumroadOverlay() {
	window.GumroadOverlay || (window.GumroadOverlay = new GumroadOverlayManager());
}
var _get = function get(e, t, i) {
		for (var a = !0; a; ) {
			var n = e,
				r = t,
				o = i;
			(a = !1), null === n && (n = Function.prototype);
			var s = Object.getOwnPropertyDescriptor(n, r);
			if (s !== undefined) {
				if ('value' in s) return s.value;
				var l = s.get;
				return l === undefined ? undefined : l.call(o);
			}
			var d = Object.getPrototypeOf(n);
			if (null === d) return undefined;
			(e = d), (t = r), (i = o), (a = !0), (s = d = undefined);
		}
	},
	_createClass = (function () {
		function a(e, t) {
			for (var i = 0; i < t.length; i++) {
				var a = t[i];
				(a.enumerable = a.enumerable || !1), (a.configurable = !0), 'value' in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
			}
		}
		return function (e, t, i) {
			return t && a(e.prototype, t), i && a(e, i), e;
		};
	})(),
	GumroadClass = (function () {
		function e() {
			_classCallCheck(this, e);
		}
		return (
			_createClass(e, [
				{
					key: 'setEnvironment',
					value: function t() {
						(this.environment = 'production'), (this[this.environment] = !0), (this.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''));
					},
				},
				{
					key: 'startNodeAdditionObserver',
					value: function i() {
						MutationObserver &&
							((this.nodeAdditionObserver = new MutationObserver(
								function (e) {
									for (var t = 0; t < e.length; t++) for (var i = 0; i < e[t].addedNodes.length; i++) this.nodeAdditionCallback && this.nodeAdditionCallback(e[t].addedNodes[i]);
								}.bind(this)
							)),
							this.nodeAdditionObserver.observe(document.body, { childList: !0, subtree: !0 }));
					},
				},
				{
					key: 'convertAffiliateProductUrl',
					value: function o(e) {
						var t = e.match(this.affiliateProductUrlRegExp);
						if (null === t) return e;
						var i = t.groups,
							a = /\/a\/.+(\/.+)/,
							n = function n(e, t) {
								return '/l' + t;
							},
							r = new URL(e.replace(a, n));
						return r.searchParams.append('affiliate_id', i.affiliateId), r.href;
					},
				},
				{
					key: 'affiliateProductUrlRegExp',
					get: function a() {
						return /.+\/a\/(?<affiliateId>.+)\/.+/;
					},
				},
			]),
			e
		);
	})();
!(function (e) {
	e.hasOwnProperty('remove') ||
		Object.defineProperty(e, 'remove', {
			configurable: !0,
			enumerable: !0,
			writable: !0,
			value: function t() {
				null !== this.parentNode && this.parentNode.removeChild(this);
			},
		});
})(Element.prototype);
var GumroadLink = (function () {
		function a(e, t) {
			_classCallCheck(this, a),
				_get(Object.getPrototypeOf(a.prototype), 'constructor', this).call(this),
				(this.validParams = ['locale', 'referrer', 'wanted', 'email', 'gift', 'monthly', 'quarterly', 'biannually', 'yearly', 'duration', 'recommended_by', 'quantity', 'price', 'variant', 'affiliate_id']),
				(this.preserveRawValueParams = ['variant']),
				(this.element = e),
				(this.manager = t),
				(this.vars = { as_modal: !0, referrer: encodeURIComponent(document.referrer + '/' + window.location.search.substring(1)), url_parameters: { source_url: encodeURIComponent(window.location.href) } });
			var i = this.element.getAttribute('href');
			i && this.element.setAttribute('href', this.convertAffiliateProductUrl(i)), this.validateUrl(), this.vars.affiliate_id && (this.vars.url_parameters.affiliate_id = this.vars.affiliate_id);
		}
		return (
			_inherits(a, GumroadClass),
			_createClass(a, [
				{
					key: 'makeActiveLink',
					value: function o() {
						var e = document.createElement('span'),
							t = this,
							i = !1;
						if (((e.className = this.manager.logoClassName), !this.element.getAttribute('data-gumroad-ignore'))) {
							if (this.manager.hasClass(this.element, 'gumroad-button')) {
								if (this.element.hasChildNodes())
									for (var a = 0; a < this.element.childNodes.length; a++) {
										var n = this.element.childNodes[a];
										'span' === n.nodeName.toLowerCase() && this.manager.hasClass(n, this.manager.logoClassName) && (i = !0);
									}
								i || this.element.insertBefore(e, this.element.firstChild);
							}
							if (this.element.getAttribute('data-gumroad-default-cover')) {
								var r = document.createElement('img');
								(r.src = this.manager.domain + '/products/' + this.vars.permalink + '/default_cover'), this.element.insertBefore(r, this.element.firstChild);
							}
							this.element.getAttribute('data-gumroad-single-product') && (this.manager.isSingleProductMode = !0),
								this.origin !== this.manager.domain && (this.element.target = '_blank'),
								(this.element.onclick = function (e) {
									e.preventDefault(), t.manager.showInIframe(t);
								});
						}
					},
				},
				{
					key: 'setUrlVars',
					value: function s(e) {
						if (e) {
							var t = e.split('&');
							if (t.length)
								for (var i = 0; i < t.length; i++)
									if (t[i]) {
										var a = decodeURIComponent(t[i]).split('='),
											n = t[i].split('=')[1];
										if (2 === a.length) {
											var r = a[0],
												o = -1 !== this.preserveRawValueParams.indexOf(r) ? n : a[1];
											-1 < this.validParams.indexOf(a[0]) ? (this.vars[r] = o) : (this.vars.url_parameters[r] = o);
										}
									}
						}
					},
				},
				{
					key: 'validateUrl',
					value: function r() {
						for (var e = this.element.href.split('?'), t = e[0], i = 0; i < this.manager.productMatches.length; i++) {
							var a = this.manager.productMatches[i];
							if (0 === t.indexOf(a)) {
								var n = t.replace(a, '').split('/');
								return (
									(this.vars.permalink = n[0]),
									'function' == typeof window.URLSearchParams && (this.vars.offerCodeName = new URLSearchParams(this.element.search).get('offer_code')),
									!this.vars.offerCodeName && n[1] && 0 < n[1].length && (this.vars.offerCodeName = n[1]),
									this.setUrlVars(e[1]),
									this.manager.links.push(this),
									this.manager.allPermalinks.indexOf(this.vars.permalink) < 0 && this.manager.allPermalinks.push(this.vars.permalink),
									(this.manager.allPermalinks = this.manager.allPermalinks.slice(-4)),
									this.makeActiveLink(),
									!0
								);
							}
						}
					},
				},
			]),
			a
		);
	})(),
	GumroadOverlayManager = (function () {
		function e() {
			_classCallCheck(this, e),
				_get(Object.getPrototypeOf(e.prototype), 'constructor', this).call(this),
				this.setEnvironment(),
				(this.links = []),
				(this.allPermalinks = []),
				window.addEventListener
					? window.addEventListener(
							'message',
							function (e) {
								this.gotMessage(e);
							}.bind(this),
							!1
					  )
					: window.attachEvent(
							'onmessage',
							function (e) {
								this.gotMessage(e);
							}.bind(this),
							!1
					  ),
				this.setDomain(),
				this.insertStylesheet(),
				this.insertLoadingIndicator(),
				this.bindKeys(),
				this.addLinks(),
				this.domain !== this.origin && 1 === this.links.length && (this.isSingleProductMode = !0),
				this.createIframe(),
				this.startNodeAdditionObserver(),
				(this.maxWindowHeight = /iPhone/.test(navigator.userAgent) ? window.innerHeight : null);
		}
		return (
			_inherits(e, GumroadClass),
			_createClass(e, [
				{
					key: 'setDomain',
					value: function t() {
						var e = document.querySelector("script[src*='/js/gumroad.js']");
						e && ((this.domain = new URL(e.src).origin), this.productMatches.push(this.domain + '/l/'), (this.productMatches = [].concat(_toConsumableArray(new Set(this.productMatches)))));
					},
				},
				{
					key: 'addClass',
					value: function a(e, t) {
						var i = e.classList.toString().split(/\s+/);
						this.hasClass(e, t) && (i.push(t), (e.className = className.join(' ')));
					},
				},
				{
					key: 'addLinks',
					value: function n() {
						for (var e = document.querySelectorAll('a:not(.gr-overlay-disabled),area'), t = this, i = 0; i < e.length; i++) new GumroadLink(e[i], t);
					},
				},
				{
					key: 'append',
					value: function i(e, t) {
						(t = t || 'body'), document.getElementsByTagName(t)[0].appendChild(e);
					},
				},
				{
					key: 'askForProduct',
					value: function r() {
						if (this.currentLink) {
							var e = this.getGoogleAnalyticsClientId();
							e && (this.currentLink.vars.googleAnalyticsClientId = e), this.messageIframe({ overlayMethod: 'getProduct', overlayArgs: this.currentLink.vars });
						}
					},
				},
				{
					key: 'getGoogleAnalyticsClientId',
					value: function o() {
						if ('string' == typeof window.GoogleAnalyticsObject && 'function' == typeof window[window.GoogleAnalyticsObject] && 'function' == typeof window[window.GoogleAnalyticsObject].getAll) {
							var e = window[window.GoogleAnalyticsObject].getAll(),
								t = 'object' == typeof e ? e[0] : null;
							if ('object' == typeof t && 'function' == typeof t.get) return t.get('clientId');
						}
					},
				},
				{
					key: 'bindKeys',
					value: function s() {
						document.onkeydown = function (e) {
							27 === e.keyCode && this.minimizeIframe();
						}.bind(this);
					},
				},
				{
					key: 'buildIframeSrc',
					value: function l() {
						var e = (this.domain ? this.domain : '') + '/overlay_page',
							t = [];
						if ((this.isSingleProductMode && t.push('single_product_mode=true'), this.allPermalinks && 0 < this.allPermalinks.length && t.push('all_permalinks=' + this.allPermalinks.join(',')), this.currentLink))
							for (var i in this.currentLink.vars) this.currentLink.vars.hasOwnProperty(i) && t.push(i + '=' + this.currentLink.vars[i]);
						return 0 < t.length && (e += '?' + t.join('&')), e;
					},
				},
				{
					key: 'setScrollContainerStyle',
					value: function d(e) {
						e || (e = { width: '0px', height: '0px' });
						var t = 'max-width:' + window.innerWidth + 'px;max-height:' + (this.maxWindowHeight || window.innerHeight) + 'px;';
						this.scrollContainer && (this.scrollContainer.style = t + 'width:' + e.width + ';height:' + e.height);
					},
				},
				{
					key: 'createIframe',
					value: function h() {
						var e = this;
						this.iframe && (this.iframe.remove(), delete this.iframe, delete this.iframeReady),
							(this.scrollContainer = document.createElement('div')),
							(this.scrollContainer.className = 'gumroad-scroll-container'),
							this.setScrollContainerStyle(),
							this.append(this.scrollContainer),
							(this.iframe = document.createElement('iframe')),
							this.iframe.setAttribute('scrolling', 'no'),
							this.iframe.setAttribute('allowFullScreen', 'allowfullscreen'),
							this.iframe.setAttribute('allowPaymentRequest', 'allowpaymentrequest'),
							(this.iframe.allowtransparency = !0),
							(this.iframe.className = 'gumroad-overlay-iframe'),
							(this.iframe.onload = function () {
								e.setupMessaging();
							}),
							(this.iframe.src = this.buildIframeSrc()),
							this.scrollContainer.append(this.iframe);
					},
				},
				{
					key: 'gotMessage',
					value: function c(e) {
						var t = {};
						if (e.data)
							try {
								t = JSON.parse(e.data);
							} catch (i) {}
						t.parentMethod && this[t.parentMethod] && this[t.parentMethod](t.parentArgs);
					},
				},
				{
					key: 'handshake',
					value: function u() {
						this.iframeReady || ((this.iframeReady = !0), clearInterval(this.handshakeTimer), delete this.handshakeTimer, this.messagingSetupCallback());
					},
				},
				{
					key: 'hasClass',
					value: function m(e, t) {
						return -1 < e.classList.toString().split(/\s+/).indexOf(t);
					},
				},
				{
					key: 'hideLoadingIndicator',
					value: function f() {
						this.setOpacity(this.loadingIndicator, 0);
					},
				},
				{
					key: 'insertLoadingIndicator',
					value: function p() {
						(this.loadingIndicator = document.createElement('div')), (this.loadingIndicator.className = 'gumroad-loading-indicator'), this.loadingIndicator.appendChild(document.createElement('i')), this.append(this.loadingIndicator);
					},
				},
				{
					key: 'insertStylesheet',
					value: function g() {
						var e =
								'a.gumroad-button { background-color: white !important; background-image: url("GUMROAD_ORIGIN/button/button_bar.jpg") !important; background-repeat: repeat-x !important; border-radius: 4px !important; box-shadow: rgba(0, 0, 0, 0.4) 0 0 2px !important; color: #999 !important; display: inline-block !important; font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif !important; font-size: 16px !important; font-style: normal !important; font-weight: 500 !important; line-height: 50px !important; padding: 0 15px !important; text-shadow: none !important; text-decoration: none !important; } .gumroad-button-logo { background-image: url("GUMROAD_ORIGIN/button/button_logo.png") !important; background-size: cover !important; height: 17px !important; width: 16px !important; display: inline-block !important; margin-bottom: -3px !important; margin-right: 15px !important; } .gumroad-loading-indicator { background: white; border-radius: 50%; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); box-sizing: border-box; display: none; height: 60px; left: 50% !important; margin-left: -30px !important; margin-top: -30px !important; padding: 10px; position: fixed; top: 50% !important; width: 60px; z-index: 99997; } .gumroad-loading-indicator i { background: url("GUMROAD_ORIGIN/js/loading-rainbow.svg"); height: 40px; width: 40px; display: inline-block; background-size: contain; animation: gumroad-spin 1.5s infinite linear; } .gumroad-scroll-container { -webkit-overflow-scrolling: touch; overflow-y: auto; position: fixed !important; z-index: 99998 !important; top: 0 !important; right: 0 !important; -ms-overflow-style: none; scrollbar-width: none; text-align: start; } .gumroad-scroll-container::-webkit-scrollbar { display: none; } .gumroad-overlay-iframe { position: absolute; min-width: 100%; min-height: 100%; border: none !important; } @keyframes gumroad-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(359deg); } } '.replace(
									/GUMROAD_ORIGIN/g,
									this.domain
								),
							t = document.createElement('style');
						(t.type = 'text/css'), t.appendChild(document.createTextNode(e)), this.append(t, 'head');
					},
				},
				{
					key: 'maximizeIframe',
					value: function v() {
						var e = this.maxWindowHeight || window.innerHeight,
							t = { width: window.innerWidth + 'px', height: e + 'px' };
						this.hideLoadingIndicator(), this.setScrollContainerStyle(t), this.resizeIframe(t);
					},
				},
				{
					key: 'messageIframe',
					value: function y(e) {
						this.iframe && ('object' == typeof e && (e = JSON.stringify(e)), this.iframe.contentWindow.postMessage(e, this.domain));
					},
				},
				{
					key: 'messagingSetupCallback',
					value: function w() {
						this.askForProduct(), this.messageIframe({ overlayMethod: 'getPersistentBundle' });
					},
				},
				{
					key: 'minimizeIframe',
					value: function k(e) {
						this.hideLoadingIndicator(), this.isSingleProductMode ? this.setScrollContainerStyle() : (this.setScrollContainerStyle(e), this.resizeIframe(e)), this.messageIframe('stopPreviews');
					},
				},
				{
					key: 'nodeAdditionCallback',
					value: function b() {
						this.resetLinks();
					},
				},
				{
					key: 'redirect',
					value: function C(e) {
						e && e.match(/^http/) && (window.location.href = e);
					},
				},
				{
					key: 'reload',
					value: function O() {
						this.minimizeIframe(), this.resetLinks();
					},
				},
				{
					key: 'removeClass',
					value: function x(e, t) {
						for (; this.hasClass(e, t); ) {
							var i = e.classList.toString().split(/\s+/),
								a = i.indexOf(t);
							-1 < a && i.splice(a, 1), (e.className = i.join(' '));
						}
					},
				},
				{
					key: 'resetLinks',
					value: function I() {
						(this.links = []), this.addLinks();
					},
				},
				{
					key: 'resizeIframe',
					value: function _(e) {
						if (this.iframe) {
							var t = [];
							(e = e || { width: '0px', height: '0px' }).width && t.push('width: ' + e.width), e.height && t.push('height: ' + e.height), (this.iframe.style = t.join(';'));
						}
					},
				},
				{
					key: 'sendDomain',
					value: function A() {
						this.messageIframe({ overlayMethod: 'setOverlayParentDomain', overlayArgs: this.origin });
					},
				},
				{
					key: 'setEnvironment',
					value: function P() {
						_get(Object.getPrototypeOf(e.prototype), 'setEnvironment', this).call(this), (this.productMatches = ['http://gum.co/', 'https://gum.co/', 'https://gumroad.com/l/']);
					},
				},
				{
					key: 'setOpacity',
					value: function L(e, t) {
						(e.style.display = 0 === t ? 'none' : 'block'), (e.style.opacity = e.style.MozOpacity = e.style.khtmlOpacity = t), (e.style.filter = 'alpha(opacity=' + 100 * t + ');');
					},
				},
				{
					key: 'setupMessaging',
					value: function S() {
						this.handshakeTimer = setInterval(
							function () {
								this.sendDomain();
							}.bind(this),
							100
						);
					},
				},
				{
					key: 'showInIframe',
					value: function N(e) {
						(this.currentLink = e), this.showLoadingIndicator(), this.iframeReady ? this.askForProduct() : this.createIframe();
					},
				},
				{
					key: 'showLoadingIndicator',
					value: function M() {
						this.setOpacity(this.loadingIndicator, 1);
					},
				},
				{
					key: 'logoClassName',
					get: function j() {
						return 'gumroad-button-logo';
					},
				},
			]),
			e
		);
	})();
window.addEventListener ? window.addEventListener('load', createGumroadOverlay) : window.attachEvent && window.attachEvent('onload', createGumroadOverlay);
