import React from 'react';
import { StyledTeaserList } from './Styled';
import Teaser from './Teaser';

class TeaserList extends React.Component {
  static renderTeasers(content) {
    const teasers = [];
    if (content) {
      content.forEach(teaser => {
        const teaserContent = teaser && teaser.entity;
        if (teaserContent) {
          teasers.push(<Teaser content={teaserContent} key={teaserContent.title} />);
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
