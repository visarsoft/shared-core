import React from 'react';
import { StyledButton } from './Styled';
import Spinner from '.././../Spinner';

class Button extends React.Component {
  render() {
    if (this.props.content) {
      const { fieldType, fieldButtonText } = this.props.content;
      return (
        <StyledButton
          className="form-group"
          loading={this.props.loading}
        >
          <div className="row">
            <div className="col col-md-12 col-lg-6 offset-lg-3">
              <button
                type={fieldType && fieldType.value}
                className="form-control"
              >
                {this.props.loading
                  ? <Spinner />
                  : fieldButtonText && fieldButtonText.value
                }
              </button>
            </div>
          </div>
        </StyledButton>
      );
    }
    return null;
  }
}

export default Button;
