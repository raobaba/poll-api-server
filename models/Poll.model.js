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

const getAllPolls = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM Polls');

    const pollsWithInfo = await Promise.all(
      rows.map(async (poll) => {
        const [voteCountRow] = await pool.query(
          'SELECT COUNT(*) AS total_votes FROM Polls WHERE poll_id = ?',
          [poll.poll_id]
        );

        const [questionSetsCountRow] = await pool.query(
          'SELECT COUNT(*) AS num_question_sets FROM QuestionSets WHERE poll_id = ?',
          [poll.poll_id]
        );

        return {
          ...poll,
          total_votes: voteCountRow[0].total_votes || 0,
          num_question_sets: questionSetsCountRow[0].num_question_sets || 0,
        };
      })
    );

    return pollsWithInfo;
  } catch (error) {
    console.error('Error fetching all polls:', error);
    throw error;
  }
};

const updatePollDetails = async (pollId, updateData) => {
  const {
    title,
    category,
    minReward,
    maxReward,
    startDate,
    endDate
  } = updateData;

  const updateValues = [];
  let updateQuery = 'UPDATE Polls SET';

  if (title) {
    updateQuery += ' title = ?,';
    updateValues.push(title);
  }
  if (category) {
    updateQuery += ' category = ?,';
    updateValues.push(category);
  }
  if (minReward !== undefined) {
    updateQuery += ' min_reward = ?,';
    updateValues.push(minReward);
  }
  if (maxReward !== undefined) {
    updateQuery += ' max_reward = ?,';
    updateValues.push(maxReward);
  }
  if (startDate) {
    updateQuery += ' start_date = ?,';
    updateValues.push(startDate);
  }
  if (endDate) {
    updateQuery += ' end_date = ?,';
    updateValues.push(endDate);
  }

  // Remove the trailing comma and space
  updateQuery = updateQuery.slice(0, -1);

  updateQuery += ' WHERE poll_id = ?';
  updateValues.push(pollId);

  try {
    const [result] = await pool.query(updateQuery, updateValues);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating poll details:', error);
    throw error;
  }
};

const updateQuestionSet = async (pollId, questionId, updateData) => {
  const {
    questionText,
    options,
    questionType
  } = updateData;

  try {
    const updateValues = [];
    let updateQuery = 'UPDATE QuestionSets SET';

    if (questionText) {
      updateQuery += ' question_text = ?,';
      updateValues.push(questionText);
    }
    if (questionType) {
      updateQuery += ' question_type = ?,';
      updateValues.push(questionType);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -1);

    updateQuery += ' WHERE poll_id = ? AND question_id = ?';
    updateValues.push(pollId, questionId);

    const [result] = await pool.query(updateQuery, updateValues);

    if (options && options.length > 0) {
      // Handle updating options if provided
      const deleteOptionsQuery = 'DELETE FROM Options WHERE question_id = ?';
      await pool.query(deleteOptionsQuery, [questionId]);

      const optionValues = options.map((option) => [questionId, option]);
      await pool.query(
        'INSERT INTO Options (question_id, option_text) VALUES ?',
        [optionValues]
      );
    }

    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating question set:', error);
    throw error;
  }
};


module.exports = {
  createPoll,
  addQuestionSet,
  getAllPolls,
  updatePollDetails,
  updateQuestionSet
};
