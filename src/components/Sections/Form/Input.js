// @flow

import * as React from 'react';
import { StyledInput } from './Styled';

type Props = {
  content: any,
};

const Input = (props: Props) => {
  if (props.content) {
    const { type, name, value, placeholder } = props.content;
    return (
      <StyledInput
        className='form-group'
      >
        <input
          type={type}
          name={name}
          defaultValue={value || ''}
          className='form-control form-control-lg'
          required
          placeholder={placeholder}
        />
      </StyledInput>
    );
  }
  return null;
};

export default Input;
