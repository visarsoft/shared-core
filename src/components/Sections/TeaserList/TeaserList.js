import React from 'react';
import { StyledTeaserList } from './Styled';
import DefaultTeaser from './Teaser';

class TeaserList extends React.Component {
  renderTeasers() {
    const teasers = [];
    const content = this.props.content && this.props.content.items;
    if (content) {
      content.forEach(teaser => {
        const teaserContent = teaser && teaser.entity;
        if (teaserContent) {
          const Teaser = this.props.components.teaser;
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
              {this.renderTeasers()}
            </div>
          </div>
        </StyledTeaserList>
      );
    }
    return null;
  }
}

TeaserList.defaultProps = {
  components: {
    teaser: DefaultTeaser
  }
};

export default TeaserList;
