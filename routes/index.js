const { Router } = require('express');

const { errorMessage } = require('../utils/errorsMessage');

const { auth } = require('../middlewares/auth');

const userRouter = require('./users');

const cardRouter = require('./cards');

const router = Router();

router.use(auth);

router.use('/api/users', userRouter);

router.use('/api/cards', cardRouter);

router.use('*', (req, res, next) => next(errorMessage({ name: 'PageNotFound' })));

module.exports = router;
