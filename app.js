const express = require('express');
const { connect } = require('mongoose');
const router = require('./routes');
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env

const app = express();

connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6554bad81b69f21c875bb160' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
});