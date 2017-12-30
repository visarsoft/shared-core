import React from 'react';
import { StyledTeaserList, StyledTeaserNavLink } from './Styled';

class TeaserList extends React.Component {
  static renderTeasers(content) {
    const teasers = [];
    if (content) {
      content.forEach(teaser => {
        const teaserContent = teaser && teaser.entity;
        if (teaserContent) {
          const attributes = {
            style: {},
            className: 'teaser'
          };
          if (teaserContent.backgroundColor) {
            attributes.style.backgroundColor = `${teaserContent.backgroundColor}`;
          }
          teasers.push((
            <div className='d-flex align-self-stretch col-md-4'>
              <div {...attributes}>
                <img src={teaserContent.image.url} alt='' />
                <h3>{teaserContent.headline}</h3>
                <div className='text-center' dangerouslySetInnerHTML={{ __html: teaserContent.body }} />
                {teaserContent.link &&
                  <StyledTeaserNavLink
                    className='btn btn-default'
                    target='_blank'
                    to={teaserContent.link.target}
                  >
                    <i className='fa fa-external-link' aria-hidden='true' />
                    {teaserContent.link.headline}
                  </StyledTeaserNavLink>
                }
              </div>
            </div>
          ));
        }
      });
    }
    return teasers;
  }
  render() {
    if (this.props.content) {
      const attributes = {
        style: {
          backgroundColor: this.props.content.backgroundColor
        },
        className: 'teaser-list'
      };
      return (
        <StyledTeaserList {...attributes}>
          <div className='container'>
            <div className='row equal'>
              {TeaserList.renderTeasers(this.props.content.items)}
            </div>
          </div>
        </StyledTeaserList>
      );
    }
    return null;
  }
}

export default TeaserList;
