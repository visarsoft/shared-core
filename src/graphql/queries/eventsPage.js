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
      image: fieldImage
      body {
        value
        summary
      }
    }
  }
}`;
