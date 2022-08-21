const { celebrate, Joi } = require('celebrate');

const validationSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const validationSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

function validateAnyId(id, helpers) {
  if (/^[a-f\d]{24}$/i.test(id)) {
    return id;
  }
  return helpers.error;
}

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(validateAnyId),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(validateAnyId),
  }),
});

module.exports = {
  validationSignUp,
  validationSignIn,
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
  validationCreateCard,
  validationCardId,
};
