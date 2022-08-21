const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле {PATH} не может быть пустым.'],
    minlength: [2, 'Поле {PATH} должно содержать минимум 2 символа.'],
    maxlength: [30, 'Поле {PATH} должно содержать максимум 30 символов.'],
  },
  link: {
    type: String,
    required: [true, 'Поле {PATH} не может быть пустым.'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'Неверный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле {PATH} не может быть пустым.'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', userSchema);
