import path from 'path';

let config = null;
const configPath = path.join(__dirname, '/../../../config/visar');
const readAppConfig = () => {
  try {
    // eslint-disable-next-line
    const appConfig = require(configPath);
    return appConfig && appConfig.default;
  } catch (err) {
    console.log('app config load failed:', configPath, err.message);
    return null;
  }
};

const getConfig = () => {
  const defaultConfig = {};
  // eslint-disable-next-line
  const appConfig = (typeof __VSR_CONFIG__ !== 'undefined' && __VSR_CONFIG__) ||
    (typeof __BROWSER__ === 'undefined' && readAppConfig());

  return Object.assign({}, defaultConfig, appConfig);
};

export default () => {
  if (!config) {
    config = getConfig();
    if (!config) {
      console.log('app config not found');
      return null;
    }
  }
  return config;
};
