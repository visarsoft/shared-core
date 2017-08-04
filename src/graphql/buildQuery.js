
const getSchema = name => {
  const schema = {};
  return schema[name];
};

export default ({ type, title }) => {
  const pageSchema = getSchema(type);
  return (
    pageSchema &&
    `{
    content: nodeQuery(type: "sa_page_${type}"
    ${title ? ` , title: "${title}"` : ''}) {
      ${pageSchema}
    }
  }`
  );
};
