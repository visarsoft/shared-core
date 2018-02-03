import redis from 'redis';
import bluebird from 'bluebird';
import getConfig from './../config';

const { REDIS } = getConfig();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisClient;

const getClient = () => {
  if (REDIS && !redisClient) {
    redisClient = redis.createClient({
      prefix: REDIS.prefix
    });
  }
  return redisClient;
};

export const getCache = key => {
  const client = getClient();
  return client && client.getAsync(key).then(res => res);
};

export const setCache = (key, value) => {
  const client = getClient();
  return client && client.setAsync(key, value);
};

export const delCache = key => {
  const client = getClient();
  return client && client.del(key);
};

