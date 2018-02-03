import axios from 'axios';

import { getApiEndpoint } from '../utils/content';
import { getCache, setCache } from '../utils/cache';
import buildQuery from './graphQL';

const debug = require('debug')('app:content:provider');

class ContentProvider {
  constructor(params) {
    this.type = params.type;
    this.name = params.name;
    this.includes = params.includes;
    this.setCacheKey();
  }

  setCacheKey() {
    let cacheKey = `content-${this.type}`;
    if (this.name) {
      cacheKey += `-${this.name}`;
    }
    if (this.includes) {
      cacheKey += `-${this.includes}`;
    }
    this.cacheKey = cacheKey;
  }

  getCacheKey() {
    return this.cacheKey;
  }

  getContent(syncContent) {
    if (!syncContent) {
      const cache = getCache(this.cacheKey);
      if (cache) {
        return cache.then(content => {
          if (content) {
            debug('Getting content from cache', this.cacheKey);
            return Promise.resolve(content);
          }
          return this.fetchContent();
        });
      }
    }
    return this.fetchContent();
  }

  fetchContent() {
    debug('Fetching new content');
    const query = buildQuery({
      type: this.type,
      title: this.name
    });
    if (!query) {
      throw new Error('Failed to build graphql schema');
    }
    return axios
      .post(getApiEndpoint(), { query })
      .then(apiRes => {
        const content = apiRes.data;
        setCache(this.cacheKey, content);
        return Promise.resolve(content);
      });
  }
}

export default ContentProvider;
