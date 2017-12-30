// @flow

import React from 'react';
import { StyledSection } from './Styled';
import StageSlider from './StageSlider/StageSlider';
import Info from './Info/Info';
import Image from './Image/Image';
import TeaserList from './TeaserList/TeaserList';
import Form from './Form/Form';
import Text from './Text/Text';

const availableComponents = {
  module_stage: StageSlider,
  module_info: Info,
  module_teaser_list: TeaserList,
  module_form: Form,
  module_text: Text,
  module_image: Image
};

class Section extends React.Component {
  props: {
    content: any
  };
  renderComponents() {
    const sections = [];
    const { fieldComponents } = this.props.content;
    if (fieldComponents) {
      fieldComponents.forEach(content => {
        if (content) {
          const Component = availableComponents[content.entityBundle];
          if (Component) {
            sections.push(<Component content={content} key={content.title} sectionHeight={this.props.height} />);
          }
        } else {
          console.log('component not found', content);
        }
      });
    }
    return sections;
  }
  renderHeadline() {
    if (this.props.content.fieldHeadline) {
      return (
        <div className="headline">
          <h2 className="container">
            {this.props.content.fieldHeadline.value}
          </h2>
        </div>
      );
    }
    return null;
  }
  render() {
    if (this.props.content) {
      const style = {};
      if (this.props.height) {
        style.minHeight = this.props.height;
      }
      if (this.props.content.fieldImage) {
        style.backgroundImage = `url(${this.props.content.fieldImage.url})`;
      }

      return (
        <StyledSection
          data-section={
            this.props.content.fieldName && this.props.content.fieldName.value
          }
          style={style}
        >
          {this.renderHeadline()}
          {this.renderComponents()}
        </StyledSection>
      );
    }
    return null;
  }
}

export default Section;
