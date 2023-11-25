const { createPoll, addQuestionSet } = require('../models/Poll.model.js');

const createPollController = async (req, res) => {
  const { title, category, startDate, endDate, minReward, maxReward } = req.body;
  try {
    const pollId = await createPoll(title, category, startDate, endDate, minReward, maxReward);
    const response = {
      message: 'Poll created successfully',
      poll: {
        pollId,
        title,
        category,
        startDate,
        endDate,
        minReward,
        maxReward
      }
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Could not create poll' });
  }
};

const addQuestionSetController = async (req, res) => {
  const { pollId } = req.params;
  const { questionType, questionText, options } = req.body;
  try {
    const questionId = await addQuestionSet(pollId, questionType, questionText, options);
    const response = {
      message: 'Question set added successfully',
      questionSet: {
        questionId,
        pollId,
        questionType,
        questionText,
        options
      }
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Could not add question set' });
  }
};

module.exports = {
  createPollController,
  addQuestionSetController
};

