const QuizSession = require('../QuizSession')

exports.execute = async (quizSessionId) => {
    console.log(quizSessionId)
    
    
    await QuizSession.updateOne({_id: quizSessionId}, {
        currentQuestionIndex: 0,
        timeStarted: Date.now()
    }) 
}
