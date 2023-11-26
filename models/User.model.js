const pool = require("../config/db.js");

const UserModel = {
  fetchUserPolls: async (startDate, endDate) => {
    try {
      const userPolls = await pool.query(
        "SELECT * FROM Polls WHERE end_date >= ? AND start_date <= ?",
        [endDate, startDate]
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
        `SELECT * FROM QuestionSets 
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
};

module.exports = UserModel;
