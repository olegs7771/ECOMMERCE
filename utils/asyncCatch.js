const asyncCatch = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); //calling function fn and catching error
  };
};

module.exports = asyncCatch;
