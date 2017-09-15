export default `
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
}`;
