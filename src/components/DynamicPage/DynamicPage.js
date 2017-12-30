// @flow

import React from 'react';
import Helmet from 'react-helmet';
import getConfig from '../../config';
import Section from '../Sections/Section';
import withFetching from '../withFetching';
import StyledDynamicPage from './Styled';

let height = 0;

class DynamicPage extends React.Component {
  static getSectionHeight() {
    if (typeof window !== 'undefined') {
      height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    }
    return height;
  }
  static renderSections(content: any) {
    const sections = [];
    if (content) {
      const height = DynamicPage.getSectionHeight();
      content.sections.forEach(sectionContent => {
        if (sectionContent) {
          sections.push(
            <Section
              height={height}
              content={sectionContent}
              key={sectionContent.title}
            />
          );
        }
      });
    }
    return sections;
  }
  props: {
    title: string,
    content: any
  };
  render() {
    if (this.props.content) {
      return (
        <StyledDynamicPage>
          <Helmet titleTemplate={`%s | ${getConfig().APP_NAME}`} title={this.props.title} />
          <div>{DynamicPage.renderSections(this.props.content)}</div>
        </StyledDynamicPage>
      );
    }
    return null;
  }
}

export default withFetching(DynamicPage);
