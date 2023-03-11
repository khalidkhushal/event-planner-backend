exports.apiRes = (res, result) => {
  if (result.password) delete result.password;
  const response = {
    result,
    errors: [],
    stack: "",
  };
  res.status(200).json(response);
};
