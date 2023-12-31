const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const cors = require('cors');

const { errors } = require('celebrate');
const { connect } = require('mongoose');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const { userValidateAuth } = require('./middlewares/userValidate');
const { errorHandler } = require('./middlewares/error-handler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

// app.use(cors({
//   origin: ['http://mesto.balex.nomoredomainsmonster.ru/'],
//   credentials: true,
// }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  }),
);

app.use(helmet());

connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/signin', userValidateAuth, login);

app.post('/api/signup', userValidateAuth, createUser);

app.use('/api', router);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
});
