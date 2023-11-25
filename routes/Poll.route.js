const express = require("express");
const pollRouter = express.Router();
const {
  createPollController,
  addQuestionSetController,
  getAllPollsController,
  updatePollDetailsController,
  updateQuestionSetController,
} = require("../controllers/Poll.controller.js");

pollRouter.post("/polls", createPollController);

pollRouter.post("/polls/:pollId/questions", addQuestionSetController);

pollRouter.get("/polls", getAllPollsController);

pollRouter.put('/polls/:pollId', updatePollDetailsController);

pollRouter.put('/polls/:pollId/questions/:questionId', updateQuestionSetController);

module.exports = pollRouter;
