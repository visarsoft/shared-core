import getConfig from '../config';

const getSchema = name => {
  const defaultSchema = {};
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

export default ({ type, title, category }) => {
  const appSchema = getConfig().GRAPHQL;
  const query = getSchema(type);
  const variables = {
    type: `${appSchema.PREFIX ? `${appSchema.PREFIX}_` : ''}${type}`,
    title,
    category
  };

  return query && {
    query: `{
      ${injectVars(query, variables)}
    }`
  };
};
