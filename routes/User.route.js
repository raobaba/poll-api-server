// userRoutes.js
const express = require('express');
const userRouter = express.Router();
const { serveQuestionsToUser, submitPoll, fetchPollAnalytics, fetchOverallPollAnalytics } = require('../controllers/User.controller');

userRouter.get('/userpolls/questions', serveQuestionsToUser);
userRouter.post('/userpolls/submit', submitPoll);
userRouter.get('/polls/analytics', fetchPollAnalytics);
userRouter.get('/polls/overall-analytics', fetchOverallPollAnalytics);

module.exports = userRouter;
