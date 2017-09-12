export default `
... on NodeModuleEvent {
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
}`;
