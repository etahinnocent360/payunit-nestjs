export const configurations = () => {
  const appBasic = `${process.env.apiSecret}`;
  const buff = Buffer.from(appBasic);
  const base64data = buff.toString('base64');
  console.log(base64data);
  return {
    Authorization: `Basic ${base64data}`,
    apiKey: process.env.apiKey,
    mode: process.env.mode,
  };
};
