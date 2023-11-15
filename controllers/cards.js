const Card =  require("../models/card")

module.exports.createCard = ((req, res) => {
  owner = req.user._id;
  const { name, link} = req.body;

  Card.create({ name, link, owner})
    .then(card => res.send({ data: card }))
    .catch((error) => {
      if (error.name === "ValidationError") return res.status(400).send({ message: "Ошибка валидации полей", ...error });
      res.status(500).send({ message: 'Произошла ошибка' })
    });
});

module.exports.getCards = ((req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports.deleteCard = ((req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if(!card) {
        throw new Error("NotFound");
      }
      res.send({ data: card})
    })
    .catch((error) => {
      if(error.message === 'NotFound') return res.status(404).send({ message: 'Карточка не найдена!' })
      if(error.name === 'CastError') return res.status(400).send({ message: 'Передан не валидный id!' })
      res.status(500).send({ message: 'Произошла ошибка' });
    })
});

module.exports.addLikes = ((req, res) => {
  userId = req.user._id;

  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: userId } }, {
    new: true
  })
    .then((card) => {
      if(!card) {
        throw new Error("NotFound");
      }
      res.send({ data: card})
    })
    .catch((error) => {
      if(error.message === 'NotFound') return res.status(404).send({ message: 'Карточка не найдена!' })
      if(error.name === 'CastError') return res.status(400).send({ message: 'Передан не валидный id!' })
      res.status(500).send({ message: 'Произошла ошибка' });
    })
});

module.exports.deleteLikes = ((req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } }, {
    new: true
  })
    .then((card) => {
      if(!card) {
        throw new Error("NotFound");
      }
      res.send({ data: card})
    })
    .catch((error) => {
      if(error.message === 'NotFound') return res.status(404).send({ message: 'Карточка не найдена!' })
      if(error.name === 'CastError') return res.status(400).send({ message: 'Передан не валидный id!' })
      res.status(500).send({ message: 'Произошла ошибка' });
    })
});