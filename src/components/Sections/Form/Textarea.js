// @flow

import * as React from 'react';
import { StyledTextarea } from './Styled';

type Props = {
  content: any
};

const Textarea = (props: Props) => {
  if (props.content) {
    const { rows, name, placeholder } = props.content;
    return (
      <StyledTextarea
        className='form-group'
      >
        <textarea
          className='form-control form-control-lg'
          rows={rows}
          placeholder={placeholder}
          name={name}
        />
      </StyledTextarea>
    );
  }
  return null;
};

export default Textarea;
