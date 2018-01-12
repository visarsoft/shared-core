import React from 'react';
import StyledInfo from './Styled';

class Info extends React.Component {
  render() {
    if (this.props.content) {
      return (
        <StyledInfo
          style={{
            backgroundImage: `url(${this.props.content.fieldImage.url})`
          }}
        />
      );
    }
    return null;
  }
}

export default Info;
