// User.controller.js
const { fetchUserPolls, fetchNextQuestion, submitPoll, fetchPollAnalytics, fetchOverallPollAnalytics } = require('../models/User.model.js');

const UserController = {
  serveQuestionsToUser: async (req, res) => {
    const { userId, startDate, endDate } = req.query;

    try {
      const userPolls = await fetchUserPolls(userId, startDate, endDate);

      const servedQuestions = [];
      for (const poll of userPolls) {
        const nextQuestion = await fetchNextQuestion(userId, poll.poll_id);
        if (nextQuestion) {
          servedQuestions.push({
            poll_id: poll.poll_id,
            poll_title: poll.title,
            next_question: nextQuestion,
          });
        }
      }

      if (servedQuestions.length === 0) {
        return res.status(404).json({ message: 'No new polls or questions exist for the user' });
      }

      res.status(200).json(servedQuestions);
    } catch (error) {
      res.status(500).json({ error: 'Could not serve questions to the user' });
    }
  },

  submitPoll: async (req, res) => {
    const { userId, pollId, questionId, optionId } = req.body;

    try {
      const rewardAmount = await submitPoll(userId, pollId, questionId, optionId);

      res.status(200).json({ rewardAmount });
    } catch (error) {
      res.status(500).json({ error: 'Could not submit poll' });
    }
  },
  
  fetchPollAnalytics: async (req, res) => {
    const { pollId } = req.query;

    try {
      const pollAnalytics = await fetchPollAnalytics(pollId);

      res.status(200).json(pollAnalytics);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch poll analytics' });
    }
  },

  fetchOverallPollAnalytics: async (req, res) => {
    try {
      const overallPollAnalytics = await fetchOverallPollAnalytics();

      res.status(200).json(overallPollAnalytics);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch overall poll analytics' });
    }
  },
};

module.exports = UserController;
