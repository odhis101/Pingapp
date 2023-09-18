import Constants from "expo-constants"

const ENV = {
  dev: {
    API_URL: "https://de61-102-213-209-1.ngrok-free.app",
  },
  prod: {
    API_URL: "https://de61-102-213-209-1.ngrok-free.app",
  },
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev
  }
  return ENV.prod
}

export default getEnvVars
