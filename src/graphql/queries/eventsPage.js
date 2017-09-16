export default `
... on NodePageEvents {
  title
  headline: fieldHeadline {
    value
  }
  subHeadline: fieldSubheadline {
    value
  }
  events: fieldEvents {
    ... on NodeModuleEvent {
      title
      url: entityUrl {
        path
      }
      location: fieldLocation
      date: fieldDate {
        value
      }
      body {
        value
        summary
      }
    }
  }
  aboutUs: fieldAboutUs {
    ... on NodeModuleAboutus {
      headline: fieldHeadline {
        value
      }
      body {
        value
      }
      image: fieldImage {
        url
      }
    }
  }
}`;
