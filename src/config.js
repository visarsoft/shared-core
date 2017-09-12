let config = null;

const readAppConfig = () => {
  try {
    const appConfig = require('./../../../config/visar.js');
    return appConfig && appConfig.default;
  } catch (error) {
    return null;
  }
};

const getConfig = () => {
  const defaultConfig = {};
  const appConfig = (typeof __VSR_CONFIG__ !== 'undefined' && __VSR_CONFIG__) ||
    (typeof __BROWSER__ === 'undefined' && readAppConfig());

  return Object.assign({}, defaultConfig, appConfig);
};

export default () => {
  if (!config) {
    config = getConfig();
  }
  return config;
};
