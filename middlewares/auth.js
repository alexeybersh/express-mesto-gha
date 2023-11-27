const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/errorsStatus')
const { SECRET_CODE, NODE_ENV } = process.env;

const handleAuthError = (res) => {
  res
    .status(UNAUTHORIZED)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? SECRET_CODE: 'dev_simple_code');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
