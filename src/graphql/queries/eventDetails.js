export default `
... on NodeModuleEvent {
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
}`;
