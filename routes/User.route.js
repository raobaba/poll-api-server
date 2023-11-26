const express = require("express");
const userRouter = express.Router();
const {
    serveQuestionsToUser
} = require("../controllers/User.controller");

userRouter.get('/userpolls/questions', serveQuestionsToUser);

module.exports = userRouter;