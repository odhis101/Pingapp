import Constants from 'expo-constants';

const ENV = {
  dev: {
    API_URL: 'https://a32f-196-207-134-81.ngrok-free.app',
  },
  prod: {
    API_URL: 'https://a32f-196-207-134-81.ngrok-free.app',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars;
