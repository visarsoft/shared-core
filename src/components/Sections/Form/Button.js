import React from 'react';
import { StyledButton } from './Styled';
import Spinner from '.././../Spinner';

type Props = {
  content: any,
  loading: string
};

const Button = (props: Props) => {
  if (props.content) {
    const { fieldType, fieldButtonText } = props.content;
    return (
      <StyledButton
        className='form-group'
        loading={props.loading}
      >
        <div className='row'>
          <div className='col col-md-12 col-lg-6 offset-lg-3'>
            <button
              type={fieldType && fieldType.value}
              className='form-control'
            >
              {props.loading
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
};

export default Button;
