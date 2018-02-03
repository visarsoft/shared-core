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
    const contentProvider = new ContentProvider(req.query);
    debug('getting content: ', contentProvider.getCacheKey());
    contentProvider.getContent(req.get('V-Sync-Content'))
      .then(content => res
        .status(200)
        .send(JSON.parse(content)))
      .catch(err => {
        debug('proxy graphql error on: ', req.query, errorHandler(err));
        res.status(500).send();
        return next(err.message);
      });
  });
};
