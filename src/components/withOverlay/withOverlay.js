// @flow

import * as React from 'react';

import Styled from './Styled';

type Props = {
  headline: string,
  onClose: Function,
};

function withOverlay(WrappedComponent: any) {
  class OverlayComponent extends React.Component<Props> {
    constructor() {
      super();
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside: Function

    handleClickOutside(e: any) {
      if (e.target.className.includes('overlay-background')) {
        this.props.onClose();
      }
    }

    renderHeadline() {
      const { headline, onClose } = this.props;
      return (
        <div className='overlay-headline'>
          {headline ? <h4>{this.props.headline}</h4> : null}
          <button
            className='overlay-closeBtn'
            onClick={() => onClose()}
          >
            x
          </button>
        </div>
      );
    }

    render() {
      return (
        <Styled className='overlay-background' onClick={e => this.handleClickOutside(e)}>
          <div className='overlay-content'>
            {this.renderHeadline()}
            <div className='overlay-body'>
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </Styled>
      );
    }
  }

  return OverlayComponent;
}

export default withOverlay;
