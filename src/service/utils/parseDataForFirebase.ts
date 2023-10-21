export const parseDataForFirebase = <T>(data: T) => {
  return JSON.parse(JSON.stringify(data));
};
