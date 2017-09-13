import eventDetails from './queries/eventDetails';
import eventsPage from './queries/eventsPage';

const getSchema = name => {
  const schema = {
    page_events: eventsPage,
    details_events: eventDetails
  };
  return schema[name];
};

const getDetailsQuery = (title, type) => {
  const queryName = `details_${type}`;
  const schema = getSchema(queryName);
  return title && schema ?
    `details: route(path: "/${title}") {
      entity {
        title
        ${schema}
      }
    }` : '';
};


const getPageQuery = type => {
  const queryName = `page_${type}`;
  const schema = getSchema(queryName);
  return type && schema ?
    `page: nodeQuery(filter: {type: "${queryName}"}) {
      entities {
        ${schema}
      }
    }` : '';
};

export default ({ type, title }) => {
  const pageQuery = getPageQuery(type);
  const detailsQuery = getDetailsQuery(title, type);
  return pageQuery && (
    `{
    ${pageQuery}
    ${detailsQuery}
    }`
  );
};
