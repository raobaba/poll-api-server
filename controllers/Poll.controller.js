const {
  createPoll,
  addQuestionSet,
  getAllPolls,
  updatePollDetails,
  updateQuestionSet,
} = require("../models/Poll.model.js");

const createPollController = async (req, res) => {
  const { title, category, startDate, endDate, minReward, maxReward } =
    req.body;
  try {
    const pollId = await createPoll(
      title,
      category,
      startDate,
      endDate,
      minReward,
      maxReward
    );
    const response = {
      message: "Poll created successfully",
      poll: {
        pollId,
        title,
        category,
        startDate,
        endDate,
        minReward,
        maxReward,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Could not create poll" });
  }
};

const addQuestionSetController = async (req, res) => {
  const { pollId } = req.params;
  const { questionType, questionText, options } = req.body;
  try {
    const questionId = await addQuestionSet(
      pollId,
      questionType,
      questionText,
      options
    );
    const response = {
      message: "Question set added successfully",
      questionSet: {
        questionId,
        pollId,
        questionType,
        questionText,
        options,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Could not add question set" });
  }
};

const getAllPollsController = async (req, res) => {
  try {
    const polls = await getAllPolls();
    if (polls.length === 0) {
      return res.status(404).json({ error: "No polls found" });
    }
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch polls" });
  }
};

const updatePollDetailsController = async (req, res) => {
  const { pollId } = req.params;
  const updateData = req.body;

  try {
    const updated = await updatePollDetails(pollId, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Poll not found or no changes applied' });
    }
    res.status(200).json({ message: 'Poll details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update poll details' });
  }
};

const updateQuestionSetController = async (req, res) => {
  const { pollId, questionId } = req.params;
  const updateData = req.body;

  try {
    const updated = await updateQuestionSet(pollId, questionId, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Question set not found or no changes applied' });
    }
    res.status(200).json({ message: 'Question set updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update question set' });
  }
};

module.exports = {
  createPollController,
  addQuestionSetController,
  getAllPollsController,
  updatePollDetailsController,
  updateQuestionSetController
};
