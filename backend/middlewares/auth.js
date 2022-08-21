const jwt = require('jsonwebtoken');
const Auth = require('../utils/Auth');

const { JWT_SECRET = 'some-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Auth('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }

  req.user = payload;

  next();
};
