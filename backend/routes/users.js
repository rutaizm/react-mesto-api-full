const routesUsers = require('express').Router();

const {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validation');

routesUsers.get('/', getUsers);
routesUsers.get('/:userId', validationUserId, getUser);
routesUsers.patch('/me', validationUpdateUser, updateUser);
routesUsers.patch('/me/avatar', validationUpdateAvatar, updateUserAvatar);
routesUsers.get('/me', getCurrentUser);

module.exports = routesUsers;
