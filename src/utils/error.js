exports.apiError = (res, err, code = 400, next) => {
  const response = {
    result: {},
    errors: [],
    stack: "",
  };
  response.errors.push(err.message);
  response.stack = err.stack;
  res.status(code).json(response);
  next(err);
};

exports.errorHandlerAll = (err, req, res, next) => {
  next(new Error(err.message));
};
