// @flow

import favicon from 'serve-favicon';
import { resolveAppStaticPath } from './utils/content';
import ContentProvider from './content/contentProvider';

const debug = require('debug')('app:server:proxy');

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
      env: process.env.NODE_ENV
    });
  });

  app.get('/api/content', (req, res, next) => {
    const contentProvider = new ContentProvider(req.query, req.get('V-Sync-Content'));
    debug('Getting content', contentProvider.getCacheKey(true));
    contentProvider.getContent()
      .then(content =>
        res.status(200).send(content)
      )
      .catch(err => {
        debug('Proxy graphql error', req.query, errorHandler(err));
        res.status(500).send(err.message);
        return next(err);
      });
  });
};
