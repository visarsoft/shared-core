// @flow
import path from 'path';
import getConfig from './config';

const { API_BASE_URL, STATIC_PATH } = getConfig();

export const getFetcher = (route: Object): any => {
  const defaultFetcher = () => () => Promise.resolve('DEFAULT Promise');
  return (route.promise || defaultFetcher)();
};

export const resolveAppStaticPath = (filename: string) => {
  return path.join(__dirname, `/../../..${STATIC_PATH}`, filename);
};

export const resolveFilePath = (url: string) => {
  const path = `${API_BASE_URL}/sites/default/files/`;
  return url.replace('public://', path);
};

export const resolveThumbnailPath = (url: string) => {
  const path = `${API_BASE_URL}/sites/default/files/styles/file_entity_browser_thumbnail/public/`;
  return url.replace('public://', path);
};

export const normalizeFileName = (filename: string) => {
  const extensiontPos = filename.lastIndexOf('.');
  return filename.substr(0, extensiontPos);
};

export const parseBody = (body: any) => {
  const path = `${API_BASE_URL}/sites/default/files/`;
  const regex = /src\s*=\s*"(.+?)"/;
  const src = regex.exec(body);
  if (!src) return body;
  return body.replace(
    regex,
    `src="${path.replace('/sites/default/files/', src[1])}"`,
  );
};