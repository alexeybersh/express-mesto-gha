const { Router}  = require('express')

const { getUsers, createUser, getUserById, patchUser, patchAvatar } = require('../controllers/users');

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/me/:id', patchUser);

userRouter.patch('/me/avatar/:id', patchAvatar);

module.exports = userRouter;