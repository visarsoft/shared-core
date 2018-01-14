// @flow

import * as React from 'react';
import Helmet from 'react-helmet';
import getConfig from '../../config';
import Section from '../Sections/Section';
import StyledDynamicPage from './Styled';

type Props = {
  title: string,
  content: any,
  components: any,
};

class DynamicPage extends React.Component<Props> {

  static getSectionHeight() {
    let height = 0;
    if (typeof window !== 'undefined') {
      height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    }
    return height;
  }
  renderSections() {
    const sections = [];
    const content = this.props.content;
    if (content) {
      const height = DynamicPage.getSectionHeight();
      content.sections.forEach(section => {
        if (section && section.entity) {
          const sectionContent = section.entity;
          sections.push(
            <Section
              height={height}
              content={sectionContent}
              components={this.props.components}
              key={sectionContent.title}
            />
          );
        }
      });
    }
    return sections;
  }
  render() {
    if (this.props.content) {
      return (
        <StyledDynamicPage>
          <Helmet titleTemplate={`%s | ${getConfig().APP_NAME}`} title={this.props.title} />
          <div>{this.renderSections()}</div>
        </StyledDynamicPage>
      );
    }
    return null;
  }
}

export default DynamicPage;
