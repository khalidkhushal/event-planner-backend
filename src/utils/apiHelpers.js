const apiRes = (res, result) => {
  const response = {
    result,
    errors: [],
    stack: "",
  };
  res.send(response);
};

module.exports = { apiRes };
