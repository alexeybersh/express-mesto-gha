const express = require('express');
const { connect } = require('mongoose');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const { celebrate, Joi, errors } = require('celebrate');
const { URLRegExpression } = require('./utils/constants.js');
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env

const app = express();

connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(URLRegExpression))
  }),
}), createUser);

app.use(router);

app.use(errors());

app.use((err, req, res, next) => {
  console.log(err);
  if(err)
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
});