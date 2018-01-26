// @flow

import * as React from 'react';
import Helmet from 'react-helmet';
import getConfig from '../../config';
import Section from '../Sections/Section';
import StyledDynamicPage from './Styled';

type ContentSection = {
  entity: {
    title: string,
    type: string,
    components: Array<any>
  }
};

type Props = {
  title: string,
  content: {
    mainSections: Array<ContentSection>,
    sidebarSections?: Array<ContentSection>
  },
  components: any
};

class DynamicPage extends React.Component<Props> {

  static getSectionHeight() {
    let height = 0;
    if (typeof window !== 'undefined' && window.innerHeight) {
      height = window.innerHeight;
    } else if (typeof document !== 'undefined') {
      const documentEl = document.documentElement || document.body;
      if (documentEl && documentEl.clientHeight) {
        height = documentEl.clientHeight;
      }
    }
    return height;
  }

  static hasSidebar(sidebarSections: ?Array<ContentSection>): boolean {
    return (sidebarSections && sidebarSections.length > 0);
  }

  renderSections(contentSections: Array<ContentSection>): Array<any> {
    const sections = [];
    const content = this.props.content;
    if (content) {
      const height = DynamicPage.getSectionHeight();
      contentSections.forEach(({ entity }) => {
        if (entity) {
          sections.push(
            <Section
              height={height}
              content={entity}
              components={this.props.components}
              key={entity.title}
            />
          );
        }
      });
    }
    return sections;
  }

  renderSidebar(sidebarSections: ?Array<ContentSection>) {
    if (DynamicPage.hasSidebar(sidebarSections)) {
      return (
        <div className='sidebar'>{this.renderSections(sidebarSections)}</div>
      );
    }
    return null;
  }

  render() {
    if (this.props.content) {
      const { mainSections, sidebarSections } = this.props.content;
      return (
        <StyledDynamicPage
          className={DynamicPage.hasSidebar(sidebarSections) ?
            'has-sidebar' : ''
          }
        >
          <Helmet titleTemplate={`%s | ${getConfig().APP_NAME}`} title={this.props.title} />
          <div className='main-section'>{this.renderSections(mainSections)}</div>
          {this.renderSidebar(sidebarSections)}
        </StyledDynamicPage>
      );
    }
    return null;
  }
}

export default DynamicPage;
