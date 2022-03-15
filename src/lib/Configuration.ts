export const configurations = () => {
  return {
    apiSecret: process.env.apiSecret,
    apiKey: process.env.apiKey,
    mode: process.env.mode,
    apiUser: process.env.apiUser,
  };
};
