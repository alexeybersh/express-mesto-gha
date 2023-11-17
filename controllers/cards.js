const Card =  require("../models/card")
const { STATUS_OK, CREATED, BAD_REQUEST, NOT_FOUND, ERROR_SERVER } = require('../utils/errors')

module.exports.createCard = ((req, res) => {
  owner = req.user._id;

  const { name, link} = req.body;

  Card.create({ name, link, owner})
    .then(card => res.status(CREATED).send({ data: card }))
    .catch((error) => {
      if (error.name === "ValidationError") return res.status(BAD_REQUEST).send({ message: "Ошибка валидации полей", ...error });
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' })
    });
});

module.exports.getCards = ((req, res) => {
  Card.find({})
    .then(cards => res.status(STATUS_OK).send({ data: cards }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
});

module.exports.deleteCard = ((req, res) => {
  Card.findByIdAndDelete(req.params.id).orFail()
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((error) => {
      if(error.name === 'DocumentNotFoundError') return res.status(NOT_FOUND).send({ message: 'Карточка не найдена!' })
      if(error.name === 'CastError') return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id!' })
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    })
});

module.exports.addLikes = ((req, res) => {
  userId = req.user._id;

  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: userId } }, {
    new: true
  }).orFail()
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((error) => {
      if(error.name === 'DocumentNotFoundError') return res.status(NOT_FOUND).send({ message: 'Карточка не найдена!' })
      if(error.name === 'CastError') return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id!' })
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    })
});

module.exports.deleteLikes = ((req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } }, {
    new: true
  }).orFail()
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((error) => {
      if(error.name === 'DocumentNotFoundError') return res.status(NOT_FOUND).send({ message: 'Карточка не найдена!' })
      if(error.name === 'CastError') return res.status(BAD_REQUEST).send({ message: 'Передан не валидный id!' })
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
    })
});