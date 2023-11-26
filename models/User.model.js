// User.model.js
const pool = require("../config/db.js");

const UserModel = {
  fetchUserPolls: async (userId, startDate, endDate) => {
    try {
      const userPolls = await pool.query(
        "SELECT * FROM Polls WHERE end_date >= ? AND start_date <= ? AND poll_id NOT IN (SELECT DISTINCT poll_id FROM UserPolls WHERE user_id = ?)",
        [endDate, startDate, userId]
      );
      return userPolls;
    } catch (error) {
      console.error("Error fetching user polls:", error);
      throw new Error("Error fetching user polls");
    }
  },

  fetchNextQuestion: async (userId, pollId) => {
    try {
      const nextQuestion = await pool.query(
        `SELECT * FROM Questions 
          WHERE poll_id = ? AND question_id NOT IN 
          (SELECT question_id FROM UserPolls WHERE user_id = ? AND poll_id = ?) 
          ORDER BY question_order LIMIT 1`,
        [pollId, userId, pollId]
      );
      return nextQuestion.length > 0 ? nextQuestion[0] : null;
    } catch (error) {
      console.error("Error fetching next question:", error);
      throw new Error("Error fetching next question");
    }
  },

  submitPoll: async (userId, pollId, questionId, optionId) => {
    try {
      // Check if the provided option is valid for the question
      const isValidOption = await pool.query(
        'SELECT * FROM Options WHERE question_id = ? AND option_id = ?',
        [questionId, optionId]
      );

      if (isValidOption.length === 0) {
        throw new Error('Invalid option for the question');
      }

      // Update user's data to indicate completion of the question
      await pool.query(
        'INSERT INTO UserPolls (user_id, poll_id, question_id, answered, user_response) VALUES (?, ?, ?, ?, ?)',
        [userId, pollId, questionId, true, optionId]
      );

      // Retrieve poll details for reward calculation
      const [pollDetails] = await pool.query(
        'SELECT min_reward, max_reward FROM Polls WHERE poll_id = ?',
        [pollId]
      );
      const { min_reward: minReward, max_reward: maxReward } = pollDetails;

      // Calculate reward within the range of min and max rewards
      const rewardAmount = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;

      // Update poll analytics for the selected option
      await pool.query(
        'INSERT INTO PollAnalytics (poll_id, option_id, vote_count) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE vote_count = vote_count + 1',
        [pollId, optionId]
      );

      return rewardAmount;
    } catch (error) {
      console.error('Error submitting poll:', error);
      throw new Error('Error submitting poll');
    }
  },


  fetchPollAnalytics: async (pollId) => {
    try {
      // Fetch total votes for the specified poll
      const totalVotes = await pool.query(
        'SELECT total_votes FROM Polls WHERE poll_id = ?',
        [pollId]
      );

      if (totalVotes.length === 0) {
        throw new Error('Specified poll does not exist');
      }

      // Fetch counts of each option selected within the poll
      const optionCounts = await pool.query(
        'SELECT Options.option_id, option_text, vote_count FROM Options LEFT JOIN PollAnalytics ON Options.option_id = PollAnalytics.option_id WHERE poll_id = ?',
        [pollId]
      );

      return {
        totalVotes: totalVotes[0].total_votes,
        optionCounts: optionCounts,
      };
    } catch (error) {
      console.error('Error fetching poll analytics:', error);
      throw new Error('Error fetching poll analytics');
    }
  },

  fetchOverallPollAnalytics: async () => {
    try {
      // Fetch total votes across all polls
      const totalVotes = await pool.query(
        'SELECT SUM(total_votes) AS total FROM Polls'
      );

      // Fetch counts of each option selected across all polls
      const optionCounts = await pool.query(
        'SELECT option_id, option_text, SUM(vote_count) AS total_count FROM Options o JOIN PollAnalytics pa ON o.option_id = pa.option_id GROUP BY o.option_id, o.option_text'
      );

      return {
        totalVotes: totalVotes[0].total || 0,
        optionCounts: optionCounts,
      };
    } catch (error) {
      console.error('Error fetching overall poll analytics:', error);
      throw new Error('Error fetching overall poll analytics');
    }
  },
};

module.exports = UserModel;
