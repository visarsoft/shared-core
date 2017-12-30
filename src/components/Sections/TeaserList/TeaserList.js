import React from 'react';
import { StyledTeaserList, StyledTeaserNavLink } from './Styled';

class TeaserList extends React.Component {
  static renderTeasers(content) {
    const teasers = [];
    if (content) {
      content.forEach(teaserContent => {
        const attributes = {
          style: {},
          className: 'teaser'
        };
        if (teaserContent.fieldBackgroundColor) {
          attributes.style.backgroundColor = `${teaserContent.fieldBackgroundColor.value}`;
        }
        teasers.push((
          <div className='d-flex align-self-stretch col-md-4'>
            <div {...attributes}>
              <img src={teaserContent.fieldImage.url} alt='' />
              <h3>{teaserContent.fieldHeadline.value}</h3>
              <div className='text-center' dangerouslySetInnerHTML={{ __html: teaserContent.body.value }} />
              {teaserContent.fieldLink &&
                <StyledTeaserNavLink
                  className='btn btn-default'
                  target='_blank'
                  to={teaserContent.fieldLink.fieldTarget}
                >
                  <i className='fa fa-external-link' aria-hidden='true' />
                  {teaserContent.fieldLink.fieldHeadline}
                </StyledTeaserNavLink>
              }
            </div>
          </div>
        ));
      });
    }
    return teasers;
  }
  render() {
    if (this.props.content) {
      const attributes = {
        style: {
          backgroundColor: `${this.props.content.fieldBackgroundColor && this.props.content.fieldBackgroundColor.value}`
        },
        className: 'teaser-list'
      };
      return (
        <StyledTeaserList {...attributes}>
          <div className='container'>
            <div className='row equal'>
              {TeaserList.renderTeasers(this.props.content.fieldItems)}
            </div>
          </div>
        </StyledTeaserList>
      );
    }
    return null;
  }
}

export default TeaserList;
