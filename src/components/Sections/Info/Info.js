import React from 'react';
import StyledInfo from './Styled';
import { StyledNavLink } from '../Styled';

type Props = {
  content: any
}

const Info = (props: Props) => {
  if (props.content) {
    return (
      <StyledInfo>
        <div className='container'>
          <hr />
          <div className='section-body' dangerouslySetInnerHTML={{ __html: props.content.body.value }} />
          {props.content.fieldLink &&
            <StyledNavLink
              className='btn btn-default'
              to={props.content.fieldLink.fieldTarget}
            >
              {props.content.fieldLink.fieldHeadline}
            </StyledNavLink>
          }
        </div>
      </StyledInfo>
    );
  }
  return null;
};

export default Info;
