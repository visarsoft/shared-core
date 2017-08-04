// @flow

const API_BASE_URL = 'http://salabay-api.visarsoft.de';

export const getFetcher = (route: Object): any => {
  const defaultFetcher = () => () => Promise.resolve('DEFAULT Promise');
  return (route.promise || defaultFetcher)();
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
