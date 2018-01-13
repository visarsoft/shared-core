import React from 'react';
import StyledInfo from './Styled';

type Props = {
  content: any
}

const Image = (props: Props) => {
  if (props.content) {
    return (
      <StyledInfo
        style={{
          backgroundImage: `url(${props.content.fieldImage.url})`
        }}
      />
    );
  }
  return null;
};

export default Image;
