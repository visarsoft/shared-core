// @flow

import React from 'react';
import Cookies from 'universal-cookie';
import CONTENT from './locales';
import StyledCookieDialog from './Styled';
import CloseIcon from './CloseIcon';

type Props = {
  content: string,
  position: string
};

type State = {
  visible: boolean
};

const cookies = new Cookies();

class CookieDialog extends React.PureComponent<Props, State> {
  static shouldShow() {
    return typeof document !== 'undefined' && !cookies.get('privacy-cookie');
  }

  static resetBodyPadding() {
    document.body.style.paddingBottom = '0';
  }

  static defaultProps = {
    content: CONTENT,
    position: 'bottom'
  };

  static setBodyPadding() {
    const containerHeight = document.getElementById('cookie-dialog').offsetHeight;
    document.body.style.paddingBottom = `${containerHeight}px`;
  }

  static setUserAccepted() {
    cookies.set('privacy-cookie', true, {
      expires: new Date('2050-05-25')
    });
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: CookieDialog.shouldShow()
    };
    this.onAccept = this.onAccept.bind(this);
  }

  componentDidMount() {
    if (this.state.visible) {
      CookieDialog.setBodyPadding();
    }
  }

  componentWillUnmount() {
    CookieDialog.resetBodyPadding();
  }

  onAccept(e: any) {
    e.preventDefault();
    CookieDialog.setUserAccepted();
    CookieDialog.resetBodyPadding();
    this.setState({
      visible: false
    });
  }

  onAccept: Function;

  render() {
    if (this.state.visible) {
      return (
        <StyledCookieDialog {...this.props} id="cookie-dialog">
          <div className="text">
            <div
              dangerouslySetInnerHTML={{ __html: this.props.content }}
            />
          </div>
          <CloseIcon onAccept={this.onAccept} />
        </StyledCookieDialog>
      );
    }
    return null;
  }
}

export default CookieDialog;
