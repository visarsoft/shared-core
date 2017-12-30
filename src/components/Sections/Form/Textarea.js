import React from 'react';
import { StyledTextarea } from './Styled';

class Textarea extends React.Component {
  render() {
    if (this.props.content) {
      const { fieldRows, fieldName, fieldPlaceholder } = this.props.content;
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
  }
}

export default Textarea;
