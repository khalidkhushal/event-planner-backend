const { apiError } = require("./error");

exports.addHoursInCurrentDate = (hours) => {
  const date = Date.now() + 1000 * 60 * 60 * hours;
  return date;
};

exports.catchAsync = (func) => {
  try {
    return func;
  } catch (e) {
    apiError(res, e, 400, next);
  }
};

exports.extractPagePerPageFromReq = (req) => {
  const page = parseInt(String(req.query.page)) || 1;
  const perPage = parseInt(String(req.query.perPage)) || 10;
  return { page, perPage };
};

exports.extractData = (dataModel, data) => {
  const newData = new dataModel();
  Object.entries(data._doc).forEach(([key, value]) => {
    if (Object.keys(newData).includes(key)) {
      newData[key] = value;
    }
  });
  return newData;
};
