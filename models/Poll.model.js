const pool = require("../config/db.js");

const createPoll = async (
  title,
  category,
  startDate,
  endDate,
  minReward,
  maxReward
) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO Polls (title, category, start_date, end_date, min_reward, max_reward) VALUES (?, ?, ?, ?, ?, ?)",
      [title, category, startDate, endDate, minReward, maxReward]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating poll:", error);
    throw error;
  }
};

const addQuestionSet = async (pollId, questionType, questionText, options) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO QuestionSets (poll_id, question_type, question_text) VALUES (?, ?, ?)",
      [pollId, questionType, questionText]
    );
    const questionId = result.insertId;

    // Insert options associated with the question set
    const optionValues = options.map((option) => [questionId, option]);
    await pool.query(
      "INSERT INTO Options (question_id, option_text) VALUES ?",
      [optionValues]
    );

    return questionId;
  } catch (error) {
    console.error("Error adding question set:", error);
    throw error;
  }
};

module.exports = {
  createPoll,
  addQuestionSet,
};
