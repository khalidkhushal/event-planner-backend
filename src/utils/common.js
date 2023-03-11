exports.addHoursInCurrentDate = (hours) => {
  const date = Date.now() + 1000 * 60 * 60 * hours;
  return date;
};
