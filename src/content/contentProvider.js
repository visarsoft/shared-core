import axios from 'axios';

import getConfig from './../config';
import { getCache, setCache, delCacheByPattern } from '../utils/cache';
import buildQuery from './graphQL';

const debug = require('debug')('app:content:provider');

class ContentProvider {
  constructor(params, syncContent) {
    const { REDIS, API_BASE_URL } = getConfig();
    this.config = {
      hasCaching: !!REDIS,
      apiBaseUrl: API_BASE_URL
    };
    this.params = params;
    this.syncContent = syncContent;
  }

  getCacheKey(withIncludes) {
    const { type, language, title, details, category, includes } = this.params;
    let cacheKey = `content-${type}`;
    if (language) {
      cacheKey = `${language}-${cacheKey}`;
    }
    if (title) {
      cacheKey += `-${title}`;
    }
    if (details) {
      cacheKey += `-${details}`;
    }
    if (category) {
      cacheKey += `-${category}`;
    }
    if (withIncludes && includes) {
      cacheKey += `-${includes.replace(',', '')}`;
    }
    return cacheKey;
  }

  cacheContent(content) {
    setCache(this.getCacheKey(true), JSON.stringify(content));
  }

  getContent() {
    if (this.config.hasCaching && !this.syncContent) {
      return getCache(this.getCacheKey(true))
      .then(content => {
        if (content) {
          debug('Getting content from cache');
          return Promise.resolve(JSON.parse(content));
        }
        return this.fetchContent();
      })
      .catch(err => {
        Promise.reject(err);
        debug('Error on getting content from cache', err);
      });
    }
    return this.fetchContent();
  }

  onContentFetch(content) {
    if (this.config.hasCaching) {
      if (this.syncContent) {
        delCacheByPattern(this.getCacheKey()).then(() => {
          this.cacheContent(content);
        });
      } else this.cacheContent(content);
    }

    return Promise.resolve(content);
  }

  fetchContent() {
    const cacheKeyWithIncludes = this.getCacheKey(true);
    debug('Fetching new content', cacheKeyWithIncludes);
    const query = buildQuery({ ...this.params });
    if (!query) {
      throw new Error(`Failed to build graphql schema: ${cacheKeyWithIncludes}`);
    }
    return axios.post(`${this.config.apiBaseUrl}/graphql`, query).then(apiRes => this.onContentFetch(apiRes.data));
  }
}

export default ContentProvider;
