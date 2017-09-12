import eventDetails from './queries/eventDetails';
import eventsPage from './queries/eventsPage';

const getSchema = name => {
  const schema = {
    event_details: eventDetails,
    page_events: eventsPage
  };
  return schema[name];
};

const getDetailsQuery = name => {
  const schema = getSchema(name);
  return name && schema ?
    `details: route(path: "/${name}") {
      entity {
        title
        ${schema}
      }
    }` : '';
};

const getPageQuery = name => {
  const pageName = `page_${name}`;
  const schema = getSchema(pageName);
  return name && schema ?
    `page: nodeQuery(filter: {type: "${pageName}"}) {
      entities {
        ${schema}
      }
    }` : '';
};

export default ({ type, title }) => {
  return (
    `{
    ${getPageQuery(type)}
    ${getDetailsQuery(title)}
    }`
  );
};
