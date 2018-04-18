import axios from 'axios';

import getConfig from './../config';
import { getCache, setCache, delCacheByPattern } from '../utils/cache';
import buildQuery from './graphQL';

const debug = require('debug')('app:content:provider');

class ContentProvider {
  constructor(params) {
    this.type = params.type;
    this.title = params.title;
    this.language = params.language;
    this.includes = params.includes;
    this.setCacheKey();
  }

  setCacheKey() {
    let cacheKey = `content-${this.type}`;
    if (this.language) {
      cacheKey = `${this.language}-${cacheKey}`;
    }
    if (this.title) {
      cacheKey += `-${this.title}`;
    }
    if (this.includes) {
      cacheKey += `-${this.includes}`;
    }
    this.cacheKey = cacheKey;
  }

  getCacheKeyWithoutIncludes() {
    let cacheKey = `content-${this.type}`;
    if (this.language) {
      cacheKey = `${this.language}-${cacheKey}`;
    }
    if (this.title) {
      cacheKey += `-${this.title}`;
    }
    return cacheKey;
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
            return Promise.resolve(JSON.parse(content));
          }
          return this.fetchContent();
        });
      }
    }
    return this.fetchContent();
  }

  fetchContent() {
    debug('Fetching new content', this.cacheKey);
    const { API_BASE_URL, REDIS } = getConfig();
    const query = buildQuery({
      type: this.type,
      title: this.title,
      language: this.language,
      includes: this.includes
    });
    if (!query) {
      throw new Error('Failed to build graphql schema');
    }
    return axios.post(`${API_BASE_URL}/graphql`, query).then(apiRes => {
      const content = apiRes.data;
      if (REDIS) {
        delCacheByPattern(this.getCacheKeyWithoutIncludes()).then(() => {
          setCache(this.cacheKey, JSON.stringify(content));
        });
      }
      return Promise.resolve(content);
    });
  }
}

export default ContentProvider;
