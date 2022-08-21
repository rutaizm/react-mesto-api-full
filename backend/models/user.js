const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Auth = require('../utils/Auth');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Необходимо указать почту.'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Неверно указана почта.',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль.'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'Неверный URL.',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Auth('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Auth('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
