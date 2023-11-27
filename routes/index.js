const { Router } = require('express');
const { NOT_FOUND } = require('../utils/errorsStatus')
const { auth } = require('../middlewares/auth')
const userRouter = require('./users');
const cardRouter = require('./cards');

const router = Router();

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});


module.exports =  router;