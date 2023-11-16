const { Router } = require('express');
const { NOT_FOUND } = require('../utils/errors')
const userRouter = require('./users');
const cerdRouter = require('./cards');

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cerdRouter);
router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});


module.exports =  router;