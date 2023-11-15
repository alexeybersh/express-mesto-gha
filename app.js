const express = require("express");
const { connect } = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path")
const { PORT = 3000 , MONGO_URL='mongodb://127.0.0.1:27017/mestodb' } = process.env

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect(MONGO_URL, {
});

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  req.user = {
    _id: '65513c32fa328d041488a66d' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));


app.listen(PORT, () => {
});
