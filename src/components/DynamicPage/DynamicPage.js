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
    stageSections: Array<ContentSection>,
    mainSections: Array<ContentSection>,
    sidebarSections: Array<ContentSection>,
    bottomSections: Array<ContentSection>
  },
  components: any,
  children: any
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
    return !!(sidebarSections && sidebarSections.length > 0);
  }

  static buildSections(
    contentSections: Array<ContentSection>,
    components: any
  ): Array<any> {
    const sections = [];
    const height = DynamicPage.getSectionHeight();
    contentSections.forEach(({ entity }) => {
      if (entity) {
        sections.push(
          <Section
            height={height}
            content={entity}
            components={components}
            key={entity.title}
          />
        );
      }
    });
    return sections;
  }

  renderSections(contentSections: Array<ContentSection>): Array<any> {
    let sections = [];
    const content = this.props.content;
    if (content && contentSections) {
      sections = DynamicPage.buildSections(
        contentSections,
        this.props.components
      );
    }
    return sections;
  }

  renderSidebar(sidebarSections: Array<ContentSection>) {
    if (DynamicPage.hasSidebar(sidebarSections)) {
      return (
        <div className="sidebar">{this.renderSections(sidebarSections)}</div>
      );
    }
    return null;
  }

  render() {
    if (this.props.content) {
      const {
        mainSections,
        sidebarSections,
        stageSections,
        bottomSections
      } = this.props.content;
      return (
        <StyledDynamicPage
          className={
            DynamicPage.hasSidebar(sidebarSections) ? 'has-sidebar' : ''
          }
        >
          <Helmet
            titleTemplate={`%s | ${getConfig().APP_NAME}`}
            title={this.props.title}
          />
          <div className="stage-sections">
            {this.renderSections(stageSections)}
          </div>
          <div>
            <div className="main-sections">
              {this.props.children}
              {this.renderSections(mainSections)}
            </div>
            {this.renderSidebar(sidebarSections)}
          </div>
          <div className="bottom-sections">
            {this.renderSections(bottomSections)}
          </div>
        </StyledDynamicPage>
      );
    }
    return null;
  }
}

export default DynamicPage;
