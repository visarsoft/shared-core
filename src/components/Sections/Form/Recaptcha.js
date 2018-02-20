// @flow

import * as React from 'react';
import RecaptchaLib from 'react-recaptcha';

type Props = {
  content: any
};

type State = {
  isCaptchaLoaded: boolean,
  permission: boolean
};

class Recaptcha extends React.Component<Props, State> {
  static loadCaptcha() {
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.type = 'text/javascript';
    scriptTag.src = 'https://www.google.com/recaptcha/api.js?hl=de';

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(scriptTag);
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isCaptchaLoaded: false,
      permission: false
    };
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onloadCallback = this.onloadCallback.bind(this);
  }

  componentDidMount() {
    Recaptcha.loadCaptcha();
  }

  onloadCallback() {
    this.setState({
      isCaptchaLoaded: true
    });
  }
  onloadCallback: Function;

  verifyCallback() {
    this.setState({
      permission: true
    });
  }

  verifyCallback: Function;

  render() {
    if (this.props.content && typeof document !== 'undefined') {
      const { sitekey, size, render, hl } = this.props.content;
      return (
        <RecaptchaLib
          sitekey={sitekey}
          size={size}
          render={render}
          hl={hl}
          verifyCallback={this.verifyCallback}
          onloadCallback={this.onloadCallback}
        />
      );
    }
    return null;
  }
}

export default Recaptcha;
