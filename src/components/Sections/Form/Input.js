// @flow

import * as React from 'react';
import { StyledInput } from './Styled';

type Props = {
  content: any,
};

const Input = (props: Props) => {
  if (props.content) {
    const { fieldType, fieldName, fieldValue, fieldPlaceholder } = props.content;
    return (
      <StyledInput
        className='form-group'
      >
        <input
          type={fieldType && fieldType.value}
          name={fieldName && fieldName.value}
          defaultValue={fieldValue ? fieldValue.value : ''}
          className='form-control form-control-lg'
          placeholder={fieldPlaceholder && fieldPlaceholder.value}
        />
      </StyledInput>
    );
  }
  return null;
};

export default Input;
