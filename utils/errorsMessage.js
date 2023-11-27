const { MongoServerError } = require('mongodb');
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, CONFLICT, ERROR_SERVER, ERROR_CODE_DUPLICATE_MONGO } = require('../utils/errorsStatus')

module.exports.errorMessage= (error, type = '') => {
  if (error.name === 'ValidationError') {
    return err = { statusCode: BAD_REQUEST, message: 'Ошибка валидации полей' };
  } else if (error instanceof MongoServerError && error.code === ERROR_CODE_DUPLICATE_MONGO) {
    return err = { statusCode: CONFLICT, message: 'Пользователь уже существует!'};
  } else if (error.name === 'CastError') {
    return err = { statusCode: BAD_REQUEST, message: 'Передан не валидный id!' };
  } else if (error.name === 'DocumentNotFoundError') {
    return err = { statusCode: NOT_FOUND, message: type==='user'? 'Пользователь не найден!': 'Карточка не найдена!' };
  } else if (error.message === 'Неправильные почта или пароль') {
    return err = { statusCode: UNAUTHORIZED, message: 'Неправильные почта или пароль!' };
  } else if (error.message === 'Удаление не своей карточки') {
  return err = { statusCode: UNAUTHORIZED, message: 'Нельзя удалять карточки других пользователей' };
  } else {
    return err = { statusCode: ERROR_SERVER, message: 'Произошла ошибка' };
  }
}