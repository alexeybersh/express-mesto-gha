const { Router } = require('express');

const { createCard, getCards, deleteCard, addLikes, deleteLikes } = require('../controllers/cards');

const cerdRouter = Router();

cerdRouter.get('/', getCards);

cerdRouter.delete('/:id', deleteCard);

cerdRouter.post('/', createCard);

cerdRouter.put('/:id/likes', addLikes);

cerdRouter.delete('/:id/likes', deleteLikes);

module.exports = cerdRouter;