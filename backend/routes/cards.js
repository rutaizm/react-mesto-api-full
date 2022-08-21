const routesCard = require('express').Router();

const {
  getCard, createCard, deleteCard, setCardLike, removeCardLike,
} = require('../controllers/cards');

const { validationCreateCard, validationCardId } = require('../middlewares/validation');

routesCard.get('/', getCard);
routesCard.post('/', validationCreateCard, createCard);
routesCard.delete('/:cardId', validationCardId, deleteCard);
routesCard.put('/:cardId/likes', validationCardId, setCardLike);
routesCard.delete('/:cardId/likes', validationCardId, removeCardLike);

module.exports = routesCard;
