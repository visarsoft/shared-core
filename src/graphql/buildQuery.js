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

const injectVars = (query, vars) => {
  let queryWithVars = query;
  Object.keys(vars).forEach(variable => {
    queryWithVars = queryWithVars.replace(`$${variable}`, `"${vars[variable]}"`);
  });
  return queryWithVars;
};

export default ({ type, title }) => {
  const query = getSchema(type);
  const variables = {
    type: `page_${type}`,
    title: `/${title}`
  };

  return query && {
    query: `{
      ${injectVars(query, variables)}
    }`
  };
};
