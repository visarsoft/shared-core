export default `
... on NodePageEvents {
  title
  fieldHeadline {
    value
  }
  fieldSubheadline {
    value
  }
  fieldEvents {
    ... on NodeModuleEvent {
      title
      entityUrl {
        path
      }
      fieldLocation
      fieldDate {
        value
      }
      fieldImage
      body {
        value
        summary
      }
    }
  }
}`;
