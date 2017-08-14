let config;

const getConfig = () => {
  const defaultConfig = {};
  const appConfig = (typeof __VSR_CONFIG__ !== 'undefined' && __VSR_CONFIG__) ||
    (typeof __BROWSER__ == 'undefined' && __BROWSER__);

  config = Object.assign({}, defaultConfig, appConfig);
  return config;
}

export default () => {
  return config || getConfig();
};
