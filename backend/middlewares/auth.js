require('dotenv').config();
const jwt = require('jsonwebtoken');
const Auth = require('../utils/Auth');

const { JWT_SECRET = 'some-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  let payload;
  if (!token) {
    throw new Auth('Необходима авторизация!');
  }
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }

  req.user = payload;

  next();

  return payload;
};
