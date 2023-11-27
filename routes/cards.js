const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { URLRegExpression } = require('../utils/constants.js');



const { createCard, getCards, deleteCard, addLikes, deleteLikes } = require('../controllers/cards');

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).alphanum()
  }),
}), deleteCard);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(URLRegExpression))
  }),
}), createCard);

cardRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).alphanum()
  }),
}), addLikes);

cardRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).alphanum()
  }),
}), deleteLikes);

module.exports = cardRouter;