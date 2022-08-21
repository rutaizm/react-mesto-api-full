const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../utils/BadRequest');
const NotFound = require('../utils/NotFound');
const Conflict = require('../utils/Conflict');

const { JWT_SECRET = 'some-secret-key' } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Неверный запрос!'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send({
      _id: user._id,
      email,
      name,
      about,
      avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Неверный запрос'));
      }

      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует!'));
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  // eslint-disable-next-line function-paren-newline
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Неверный запрос'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Неверный запрос'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateUserAvatar, login, getCurrentUser,
};
