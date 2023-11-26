const UserModel = require('../models/User.model.js');

const UserController = {
    serveQuestionsToUser: async (req, res) => {
        const { userId, startDate, endDate } = req.query;

        try {
            const userPolls = await UserModel.fetchUserPolls(userId, startDate, endDate);

            const servedQuestions = [];
            for (const poll of userPolls) {
                const nextQuestion = await UserModel.fetchNextQuestion(userId, poll.poll_id);
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
    }
};

module.exports = UserController;