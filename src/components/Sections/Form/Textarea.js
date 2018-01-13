import React from 'react';
import { StyledTextarea } from './Styled';

type Props = {
  content: any
};

const Textarea = (props: Props) => {
  if (props.content) {
    const { fieldRows, fieldName, fieldPlaceholder } = props.content;
    return (
      <StyledTextarea
        className='form-group'
      >
        <textarea
          className='form-control form-control-lg'
          rows={fieldRows && fieldRows.value}
          placeholder={fieldPlaceholder && fieldPlaceholder.value}
          name={fieldName && fieldName.value}
        />
      </StyledTextarea>
    );
  }
  return null;
};

export default Textarea;
