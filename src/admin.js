// @flow

import { delCacheByPattern } from './utils/cache';

const DAY: Number = 24 * 3600 * 1000;

const debug = require('debug')('app:server:admin');

export default (app: Object) => {
  app.get('/admin/login', (req, res, next) => {
    res.cookie('isAdmin', true, { maxAge: DAY });
    res.redirect(302, '/');
    next();
  });
  app.get('/admin/logout', (req, res, next) => {
    res.cookie('isAdmin', '', { maxAge: DAY });
    res.redirect(302, '/');
    next();
  });
  app.delete('/admin/content', (req, res, next) => {
    try {
      delCacheByPattern('');
    } catch (err) {
      debug('Cache reset error', err.message);
      return next(err);
    }
    return res.status(201).send();
  });
};

