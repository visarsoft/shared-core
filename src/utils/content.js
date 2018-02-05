// @flow
import pathLib from 'path';
import { matchPath } from 'react-router-dom';
import getConfig from './../config';

const { API_BASE_URL, STATIC_PATH } = getConfig();

const FILES_PATTERN = '/sites/default/files';

export const getFetcher = (route: Object): any => {
  const defaultFetcher = () => () => Promise.resolve('DEFAULT Promise');
  return (route.promise || defaultFetcher)();
};

export const getCurrentRoute = (pathname: string, routes: any): any => {
  let currentRoute;
  routes.some(route => {
    const match = matchPath(pathname, route);
    if (match && match.isExact) {
      currentRoute = route;
    }
    return match;
  });
  return currentRoute;
};

export const resolveAppStaticPath = (filename: string) => pathLib.join(__dirname, `/../../../..${STATIC_PATH}`, filename);

export const resolveFilePath = (url: string) => {
  const path = `${API_BASE_URL}/sites/default/files/`;
  return url.replace('public://', path);
};

export const resolveThumbnailPath = (url: string) => {
  const path = `${FILES_PATTERN}/styles/file_entity_browser_thumbnail/public/`;
  return url && url.replace(FILES_PATTERN, path);
};

export const normalizeFileName = (filename: string) => {
  const extensiontPos = filename.lastIndexOf('.');
  return filename.substr(0, extensiontPos);
};

export const parseBody = (body: any) => {
  const regex = new RegExp(FILES_PATTERN, 'g');
  const found = regex.test(body);
  if (!found) return body;
  return body.replace(
    regex,
    `${API_BASE_URL}${FILES_PATTERN}`
  );
};
