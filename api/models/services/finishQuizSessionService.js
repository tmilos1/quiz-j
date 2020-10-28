const QuizSession = require('../QuizSession')

exports.execute = async (quizSessionId) => {
    await QuizSession.updateOne({_id: quizSessionId}, {
        timeFinished: Date.now()
    }) 
}
