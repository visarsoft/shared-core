import React from 'react';
import { StyledInput } from './Styled';

class Input extends React.Component {
  render() {
    if (this.props.content) {
      const { fieldType, fieldName, fieldValue, fieldPlaceholder } = this.props.content;
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
  }
}

export default Input;
