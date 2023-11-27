const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { URLRegExpression } = require('../utils/constants.js');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: {
      value: true
    },
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле с паролем является обязательным'],
    minlength: [8, 'Минимальная длина пароля 8 символов'],
    select: false
  },
  name: {
    type: String,
    minlength: [2, "Минимальная длинна 2 символа"],
    maxlength: [30, "Максимальная длинна 30 символов"],
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длинна 2 символа"],
    maxlength: [30, "Максимальная длинна 30 символов"],
    default: "Исследователь"
  },
  avatar: {
    type: String,
    match: [URLRegExpression, 'Некорректная ссылка'],
    default: "https://www.rgo.ru/sites/default/files/styles/head_image_article/public/1034295-e1477344635669-1.jpg?itok=4U4Dw9en"
  }
}, {versionKey: false})

  userSchema.statics.findUserByCredentials = function(email, password) {
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }

        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }

            return user;
          });
      });
  };

module.exports = mongoose.model('user', userSchema);