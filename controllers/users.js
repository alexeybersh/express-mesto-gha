const User =  require("../models/user")

const ERROR_CODE_DUPLICATE_MONGO = 11000;

module.exports.createUser = ((req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((error) => {
      if (error.name === "ValidationError") return res.status(400).send({ message: "Ошибка валидации полей", ...error });
      if (error.code === ERROR_CODE_DUPLICATE_MONGO) return res.status(409).send({ message: "Пользователь уже существует!" });
      res.status(500).send({ message: 'Произошла ошибка' })
    });
});

module.exports.getUsers = ((req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports.getUserById = ((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if(!user) {
        throw new Error("NotFound");
      }
      res.send({ data: user})
    })
    .catch((error) => {
      if(error.message === 'NotFound') return res.status(404).send({ message: 'Пользователь не найден!' })
      if(error.name === 'CastError') return res.status(400).send({ message: 'Передан не валидный id!' })
      res.status(500).send({ message: 'Произошла ошибка' });
    })
});

module.exports.patchUser = ((req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name: name, about: about}, {
    new: true,
    runValidators: true
  })
    .then((user) => {
    if(!user) {
      throw new Error("NotFound");
    }
    res.status(200).send({ data: user})
    })
    .catch((error) => {
      if(error.message === 'NotFound') return res.status(404).send({ message: 'Пользователь не найден!' })
      if(error.name === 'CastError') return res.status(400).send({ message: 'Передан не валидный id!' })
      if(error.name === "ValidationError") return res.status(400).send({ message: "Ошибка валидации полей", ...error });
      res.status(500).send({ message: 'Произошла ошибка' });
    })
});

module.exports.patchAvatar = ((req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.params.id, { avatar: avatar }, {
    new: true,
    runValidators: true
  })
    .then((user) => {
      if(!user) {
        throw new Error("NotFound");
      }
      res.status(200).send({ data: user})
    })
    .catch((error) => {
      if(error.message === 'NotFound') return res.status(404).send({ message: 'Пользователь не найден!' })
      if(error.name === 'CastError') return res.status(400).send({ message: 'Передан не валидный id!' })
      if(error.name === "ValidationError") return res.status(400).send({ message: "Ошибка валидации полей", ...error });
      res.status(500).send({ message: 'Произошла ошибка' });
    })
});