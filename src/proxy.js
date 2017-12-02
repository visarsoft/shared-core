// @flow

import axios from 'axios';
import favicon from 'serve-favicon';
import getConfig from './config';
import { resolveAppStaticPath } from './utils';
import buildQuery from './graphql/buildQuery';

const errorHandler = error => {
  let { message } = error;
  if (error.response) {
    message = error.response.data.message;
  }
  return message;
};

export default (app: Object) => {
  app.use(favicon(resolveAppStaticPath('favicon.ico')));

  app.get('/health', (req, res) => {
    res.status(200).send({
      status: 'OK',
      env: process.env
    });
  });

  app.get('/api/content', (req, res) => {
    const { API_BASE_URL } = getConfig();
    const queryPayload = buildQuery(req.query);
    if (!queryPayload) {
      // eslint-disable-next-line
      console.log('failed to build schema', req.query);
      return res.status(404).send();
    }
    return axios
      .post(`${API_BASE_URL}/graphql`, queryPayload)
      .then(apiRes => res.status(200).send(apiRes.data))
      .catch(err => {
        // eslint-disable-next-line
        console.log("proxy graphql error on: ", req.query, errorHandler(err));
        return res.status(500).send();
      });
  });
};
