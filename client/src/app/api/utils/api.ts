// API is on the same docker network or running on the same machine
export const getApiBaseUrl = () => {
  return process.env.API_URL?.trim();
};
