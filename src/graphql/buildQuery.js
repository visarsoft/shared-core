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

const appendIncludes = includes => {
  let query = '';
  includes.split(/,/).forEach(name => {
    const includesQuery = getSchema(`includes_${name}`);
    if (includesQuery) {
      query += ` ${includesQuery}`;
    }
  });
  return query;
};

export default ({ type, title, category, includes }) => {
  const appSchema = getConfig().GRAPHQL;
  const variables = {
    type: `${appSchema.PREFIX ? `${appSchema.PREFIX}_` : ''}${type}`,
    title,
    category
  };
  console.log(type, variables);
  let query = getSchema(type);
  if (includes) {
    query += appendIncludes(includes);
  }

  return query && {
    query: `{
      ${injectVars(query, variables)}
    }`
  };
};
