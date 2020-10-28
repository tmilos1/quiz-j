const Quiz = require('../Quiz')
const QuizSession = require('../QuizSession')
const { answerType } = require('../../config/constants')

exports.execute = async (quizSessionId) => {
    const quizSession = await QuizSession.findOne({ _id: quizSessionId })
    const quiz = await Quiz.findOne({ _id: quizSession.quizId })

    quizSession.answers.forEach( async (answer) => {
        const question = quiz.questions.id(answer.questionId)

        switch (question.answerType) {
            case answerType.RADIO_SELECT:
                checkRadioSelect(question, answer)
                break;
        
            default:
                checkGenericAnswerType(question, answer)
                break;
        }
    })

    quizSession.save()
}

const checkRadioSelect = (question, answer) => {
    const correctAnswer = "Choice_" + question.correctAnswer

    if (answer.content == correctAnswer) {
        answer.isCorrect = true
    } else {
        answer.isCorrect = false
    }
}

const checkGenericAnswerType = (question, answer) => {
    if (normalizeAnswer(answer.content) === normalizeAnswer(question.correctAnswer)) {
        answer.isCorrect = true
    } else {
        answer.isCorrect = false
    }       
}

const normalizeAnswer = (answer) => {
    return answer.toLowerCase()
    .replace(/\s/g, '')
    .replace(/[.,!?-_#;:(){}$%^'"]/g, '')
}
