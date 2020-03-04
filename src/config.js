export default {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'https://warm-meadow-39006.herokuapp.com/api',
  // API_ENDPOINT: 'http://localhost:8000/api',
  REACT_APP_TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'metro-cleaners-app-client-token',
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || 'change-this-secret'
};
