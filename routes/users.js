const { Router}  = require('express')

const { getUsers, createUser, getUserById, patchUser, patchAvatar, patchUserMe, patchAvatarMe } = require('../controllers/users');

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/me', patchUserMe);

userRouter.patch('/me/avatar', patchAvatarMe);

userRouter.patch('/me/avatar/:id', patchAvatar);

userRouter.patch('/me/:id', patchUser);

module.exports = userRouter;