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
  app.get('/api/content', (req, res, next) => {
    const query = buildQuery(req.query);
    if (!query) {
      next('failed to build schema');
      return;
    }
    axios
      .post(`${API_BASE_URL}/graphql`, {
        query
      })
      .then(apiRes => {
        res.status(200).send(apiRes.data);
      })
      .catch(err => {
        const error = errorHandler(err);
        res.status(500).send(error);
        next(error);
      });
  });
};
