import eventsQuery from './queries/events';
import getConfig from '../config';

const getSchema = name => {
  const defaultSchema = {
    events: eventsQuery
  };
  const appSchema = getConfig().GRAPHQL;
  const schema = Object.assign({}, defaultSchema, appSchema.queries);
  return schema[name];
};

export default ({ type, title }) => {
  const query = getSchema(type);
  const variables = {
    type: `page_${type}`,
    title: `/${title}`
  };
  return query && {
    query: `query ($type: String!, $title: String) {
      ${query}
      }`,
    variables
  };
};
