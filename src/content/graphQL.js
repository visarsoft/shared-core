import getConfig from '../config';

const getSchema = name => {
  const defaultSchema = {};
  const appSchema = getConfig().GRAPHQL;
  const schema = Object.assign({}, defaultSchema, appSchema.queries);
  if (!schema[name]) {
    console.log('schema load failed:', name);
  }
  return schema[name];
};

const injectVars = (query, vars) => {
  let queryWithVars = query;
  Object.keys(vars).forEach(variable => {
    queryWithVars = queryWithVars.replace(new RegExp(`\\$${variable}`, 'g'), vars[variable]);
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

const appendPage = type => {
  let query = '';
  const pageQuery = getSchema(`page_${type}`);
  if (pageQuery) {
    query += ` ${pageQuery}`;
  }
  return query;
};

const appendDetails = type => {
  let query = '';
  const detailsQuery = getSchema(`details_${type}`);
  if (detailsQuery) {
    query += ` ${detailsQuery}`;
  }
  return query;
};

export default ({ type, title, category, details, language, includes }) => {
  const variables = {
    type,
    title,
    category,
    details,
    language
  };
  let query = '';

  if (type) {
    query += appendPage(type);
  }
  if (details) {
    query += appendDetails(type);
  }
  if (includes) {
    query += appendIncludes(includes);
  }
  return {
    query: `{
      ${injectVars(query, variables)}
    }`
  };
};
