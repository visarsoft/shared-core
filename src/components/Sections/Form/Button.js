// @flow

import * as React from 'react';
import { StyledButton } from './Styled';
import Spinner from '.././../Spinner';

type Props = {
  content: any,
  loading: string
};

const Button = (props: Props) => {
  if (props.content) {
    const { type, text } = props.content;
    return (
      <StyledButton
        className='form-group'
        loading={props.loading}
      >
        <div className='row'>
          <div className='col col-md-12 col-lg-6 offset-lg-3'>
            <button
              type={type}
              className='form-control'
            >
              {props.loading
                ? <Spinner />
                : text
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
