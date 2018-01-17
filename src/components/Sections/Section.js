// @flow

import * as React from 'react';
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

type Props = {
  content: any,
  components?: {
    [string]: {
      self?: React.ComponentType<any>,
      components?: [React.ComponentType<any>]
    }
  },
  height: number
};

class Section extends React.Component<Props> {

  getExternalComponentProps(type: string) {
    if (this.props.components && this.props.components[type]) {
      return this.props.components[type];
    }
    return null;
  }

  renderComponents() {
    const sections = [];
    const { components } = this.props.content;
    if (components) {
      components.forEach(component => {
        const content = component && component.entity;
        if (content) {
          const externalComponentProps = this.getExternalComponentProps(content.type);
          const Component = externalComponentProps ? externalComponentProps.self
            : availableComponents[content.type];
          if (Component) {
            sections.push(
              <Component
                content={content}
                components={externalComponentProps && externalComponentProps.components}
                key={content.title}
                sectionHeight={this.props.height}
              />
            );
          }
        } else {
          console.log('component not found', component);
        }
      });
    }
    return sections;
  }
  renderHeadline() {
    if (this.props.content.headline) {
      return (
        <div className='headline'>
          <h2 className='container'>
            {this.props.content.headline}
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
      if (this.props.content.image) {
        style.backgroundImage = `url(${this.props.content.image.url})`;
      }

      return (
        <StyledSection
          data-section={
            this.props.content.name
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
