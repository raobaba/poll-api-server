const express = require('express');
const pollRouter = express.Router();
const {createPollController,addQuestionSetController} = require('../controllers/Poll.controller.js');

pollRouter.post('/polls', createPollController);

pollRouter.post('/polls/:pollId/questions', addQuestionSetController);


module.exports = pollRouter;
