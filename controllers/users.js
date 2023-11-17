const User = require('../models/user');
const { MongoServerError } = require('mongodb');
const { STATUS_OK, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, ERROR_SERVER, ERROR_CODE_DUPLICATE_MONGO } = require('../utils/errors')

module.exports.createUser = ((req, res) => {
  const { name, about, avatar } = req.body;
console.log(CREATED);
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') return res.status(BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...error });
      if (error instanceof MongoServerError && error.code === ERROR_CODE_DUPLICATE_MONGO) return res.status(CONFLICT).send({ message: 'Пользователь уже существует!' });
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
});

module.exports.getUsers = ((req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
});

module.exports.getUserById = ((req, res) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') return res.status(NOT_FOUND).send({ message: 'Пользователь не найден!' });
      if (error.name === 'CastError') return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id!' });
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
});

module.exports.patchUser = ((req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      if (error.message === 'DocumentNotFoundError') return res.status(NOT_FOUND).send({ message: 'Пользователь не найден!' });
      if (error.name === 'CastError') return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id!' });
      if (error.name === 'ValidationError') return res.status(BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...error });
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
});

module.exports.patchAvatar = ((req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((error) => {
      if (error.message === 'DocumentNotFoundError') return res.status(NOT_FOUND).send({ message: 'Пользователь не найден!' });
      if (error.name === 'CastError') return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id!' });
      if (error.name === 'ValidationError') return res.status(BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...error });
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    });
});
