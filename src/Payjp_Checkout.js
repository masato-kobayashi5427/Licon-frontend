import React from 'react';

class PayjpCheckout extends React.Component {
	constructor(props) {
		super(props);
		this.payjpCheckoutRef = null;
	}

	static defaultProps = {
		className: 'payjp-button',
		dataKey: '',
		onCreatedHandler: () => {},
		onFailedHandler: () => {},
	};

	/* UNSAFE_componentWillMount() {
	} */

	componentDidMount() {
		this.windowAlertBackUp = window.alert;
		window.reactPayjpCheckoutOnCreated = this.onCreated;
		window.reactPayjpCheckoutOnFailed = this.onFailed;
		window.reactPayjpCheckoutContext = this;
		// カード情報が不正のときに window.alert が payjp の checkout から呼ばれるため
		window.alert = () => {};

		this.script = document.createElement('script');
		this.script.setAttribute('src', 'https://checkout.pay.jp/');
		this.script.setAttribute('class', this.props.className);
		this.script.setAttribute('data-key', this.props.dataKey);
		this.props.dataPartial && this.script.setAttribute('data-partial', this.props.dataPartial);
		this.props.dataText && this.script.setAttribute('data-text', this.props.dataText);
		this.props.dataSubmitText && this.script.setAttribute('data-submit-text', this.props.dataSubmitText);
		this.props.dataTokenName && this.script.setAttribute('data-token-name', this.props.dataTokenName);
		this.props.dataPreviousToken && this.script.setAttribute('data-previous-token', this.props.dataPreviousToken);
		this.props.dataLang && this.script.setAttribute('data-lang', this.props.dataLang);
		this.script.setAttribute('data-on-created', 'reactPayjpCheckoutOnCreated');
		this.script.setAttribute('data-on-failed', 'reactPayjpCheckoutOnFailed');
		this.props.dataNamePlaceholder && this.script.setAttribute('data-name-placeholder', this.props.dataNamePlaceholder);
		this.payjpCheckoutRef = document.getElementById('payjpCheckout');
		this.payjpCheckoutRef && this.payjpCheckoutRef.appendChild(this.script);
	}

	componentWillUnmount() {
		// すでに https://checkout.pay.jp/ の checkout.js が実行済みで、script タグを削除しているだけ
		this.payjpCheckoutRef.removeChild(this.script);
		window.reactPayjpCheckoutOnCreated = null;
		window.reactPayjpCheckoutOnFailed = null;
		// window.reactPayjpCheckoutContext = null;
		window.alert = this.windowAlertBackUp;
		window.PayjpCheckout = null;
	}

	shouldComponentUpdate() {
		return false;
	}

	onCreated(response) {
		const payload = { token: response.id }
		window.reactPayjpCheckoutContext.props.onCreatedHandler(payload);
	}

	onFailed(statusCode, errorResponse) {
		const payload = { message: errorResponse.message }
		window.reactPayjpCheckoutContext.props.onFailedHandler(payload);
	}

	render() {
		return <div id="payjpCheckout"></div>;
	}
}

export default PayjpCheckout;