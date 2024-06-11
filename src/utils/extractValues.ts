export const extractValues = (data: {}) => {
  const result: any = [];

  const extract = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          extract(obj[key]);
        } else {
          result.push(obj[key]);
        }
      }
    }
  };

  extract(data);
  return result;
};
