import React from 'react';
import StyledInfo from './Styled';
import { StyledNavLink } from '../Styled';

class Info extends React.Component {
  render() {
    if (this.props.content) {
      return (
        <StyledInfo>
          <div className='container'>
            <hr />
            <div className='section-body' dangerouslySetInnerHTML={{ __html: this.props.content.body.value }} />
            {this.props.content.fieldLink &&
              <StyledNavLink
                className='btn btn-default'
                to={this.props.content.fieldLink.fieldTarget}
              >
                {this.props.content.fieldLink.fieldHeadline}
              </StyledNavLink>
            }
          </div>
        </StyledInfo>
      );
    }
    return null;
  }
}

export default Info;
