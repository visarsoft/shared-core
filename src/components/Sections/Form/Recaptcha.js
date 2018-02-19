// @flow

import * as React from 'react';
import Recaptcha from 'react-recaptcha';

type Props = {
  content: any,
};

loadCaptcha() {
	if (typeof document === "undefined") return;

	const scriptTag = document.createElement('script');
	scriptTag.async = true;
	scriptTag.deffer = true;
	scriptTag.type = 'text/javascript';
	scriptTag.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=de';

	const head = document.getElementsByTagName('head')[0];
	head.appendChild(scriptTag);
}

onloadCallback() {
	this.setState({
		isCaptchaLoaded: true
	});
	console.log('onloadCallback');
}

verifyCallback() {
	this.setState({
		permission: true
	});
}

const RecaptchaModule = (props: Props) => {
	if (props.content) {
		const { sitekey, size, render } = props.content;
		return (
			{
				typeof document !== "undefined" && this.state.isCaptchaLoaded ?
					<Recaptcha
						sitekey={ sitekey }
						size={size}
						render={render}
						verifyCallback={this.verifyCallback.bind(this)}
						onloadCallback={this.onloadCallback.bind(this)} 
					/> :
						this.loadCaptcha()
			}
			);
			}
			return null;
};

export default RecaptchaModule;
