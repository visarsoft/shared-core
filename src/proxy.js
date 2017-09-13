// @flow

import axios from 'axios';
import getConfig from './config';
import buildQuery from './graphql/buildQuery';

const { API_BASE_URL } = getConfig();

const errorHandler = error => {
  let { message } = error;
  if (error.response) {
    message = error.response.data.message;
  }
  return message;
};

export default (app: Object) => {
  app.get('/api/content', (req, res) => {
    const query = buildQuery(req.query);
    if (!query) {
      // eslint-disable-next-line
      console.log('failed to build schema', req.query);
      return res.status(404).send();
    }
    axios
      .post(`${API_BASE_URL}/graphql`, {
        query
      })
      .then(apiRes => res.status(200).send(apiRes.data))
      .catch(err => {
        // eslint-disable-next-line
        console.log(errorHandler(err), req.query);
        return res.status(500).send();
      });
  });
};
