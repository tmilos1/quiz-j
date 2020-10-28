const mongoose = require('mongoose')

const { Schema } = mongoose

const QuizSessionSchema = new Schema({
    quizId: mongoose.ObjectId,
    studentId: mongoose.ObjectId,
    sessionStatus: String,
    timeStarted: Date,
    timeFinished: Date,
    allowedDuration: Number,
    currentQuestionIndex: Number,
    answers: [
        {
            questionId: mongoose.ObjectId,
            content: String,
            answerType: String,
            isCorrect: Boolean,
            choices: [
                {
                    choice: String
                }
            ]
        }
    ]
})

const QuizSession = mongoose.model('QuizSession', QuizSessionSchema)

module.exports = QuizSession
