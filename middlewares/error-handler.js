/* eslint-disable no-unused-vars */
const { ERROR_SERVER } = require('../utils/errorsStatus')

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER } = err.statusCode;

  res.status(statusCode).send({ message: statusCode === ERROR_SERVER ? 'На сервере произошла ошибка' : err.message });
};
