// API is on the same docker network or running on the same machine
export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  } else {
    return process.env.API_URL;
  }
};
