export default `
page: nodeQuery(filter: {type: $type}) {
  entities {
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
    }
  }
}
details: route(path: "/$title") {
  entity {
    title
    ... on NodeModuleEvent {
      url: entityUrl {
        path
      }
      location: fieldLocation
      date: fieldDate {
        value
      }
      image: fieldImage {
        url
        alt
        large: derivative (style: large) {
          url
        }
      }
      body {
        value
        summary
      }
    }
  }
}
`;
