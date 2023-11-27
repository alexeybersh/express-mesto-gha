const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { URLRegExpression } = require('../utils/constants.js');

const { getUsers, getUserById, getCurrentUser, patchUser, patchAvatar } = require('../controllers/users');

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).alphanum()
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  }),
}), patchUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(URLRegExpression))
  }),
}), patchAvatar);

module.exports = userRouter;