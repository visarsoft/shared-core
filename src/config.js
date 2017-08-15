let config = null;

const readAppConfig = () => {
  try {
    return require('./../../../config/visar.js').default;  
  } catch (error) {
    console.log('visar app config not found');
  }
}

const getConfig = () => {
  const defaultConfig = {};
  const appConfig = (typeof __VSR_CONFIG__ !== 'undefined' && __VSR_CONFIG__) ||
    (typeof __BROWSER__ == 'undefined' && readAppConfig());

  return Object.assign({}, defaultConfig, appConfig);
}

export default () => {
  if (!config) {
    config = getConfig();
  }
  console.log('DEBUG: config', config);
  return config;
};
