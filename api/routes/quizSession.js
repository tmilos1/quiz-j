const express = require('express')

const app = express.Router()
const { quizSessionStatus } = require('../config/constants')
const util = require('../util')
const Student = require('../models/Student')
const Quiz = require('../models/Quiz')
const QuizSession = require('../models/QuizSession')
const createQuizSessionService = require('../models/services/createQuizSessionService')
const checkCorrectAnswersService = require('../models/services/checkCorrectAnswersService')
const startQuizSessionService = require('../models/services/startQuizSessionService')
const finishQuizSessionService = require('../models/services/finishQuizSessionService')

app.get('/', async (req, res) => {
    const filterObj = JSON.parse(req.query.filter)
    const quizId = filterObj.quizId

    if (req.query.range && req.query.sort) {
        await getPaginatedList(req, res, quizId)
    } else if (req.query.mailSlug) {
        await getListByMailSlug(req, res)
    } else {
        await getSimpleList(req, res, quizId)
    }
})

const getPaginatedList = async (req, res, quizId) => {
    const listArgs = util.getListPaginationArgs(req.query)

    const quizSessions = await QuizSession.find({ "quizId": quizId }).sort({ [listArgs['col']]: listArgs['dir'] })
    const recordCount = await QuizSession.find({ "quizId": quizId }).countDocuments()

    util.addPaginationSupportHeaders(res, listArgs['start'], listArgs['end'], recordCount)

    res.json(quizSessions)
}

const getListByMailSlug = async (req, res) => {
    const quizSession = await QuizSession.findOne({ "mailSlug": req.query.mailSlug })

    res.json(quizSession)
}

const getSimpleList = async (ids, res, quizId) => {
    const quizSessions = await QuizSession.find({ "quizId": quizId })

    res.json(quizSessions)
}

app.get('/:id', async (req, res) => {
    const quizSession = await QuizSession.findOne({ _id: req.params.id })

    res.json(quizSession)
})

app.get('/quizCode/:quizCode/userEmail/:userEmail', async (req, res) => {
    const student = await Student.findOne({ email: req.params.userEmail })
    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode })

    let quizSession = {}
    if (student && quiz) {
        quizSession = await QuizSession.findOne({ quizId: quiz.id, studentId: student.id })
    }

    res.json(quizSession)
})

app.post('/', async (req, res) => {
    let quizSession

    try {
        quizSession = await createQuizSessionService.execute(req.body.quizCode, req.body.userEmail)
    } catch (error) {
        return res.status(400).json(error.message)
    }

    res.json(quizSession)
})

app.post('/checkCorrectAnswers', async (req, res) => {
    const quizSession = await checkCorrectAnswersService.execute(req.body.quizSessionId)

    res.json(quizSession)
})

app.patch('/:id/status', async (req, res) => {
    if (!req.body.action in Object.values(quizSessionStatus)) {
        return res.status(422).end()
    }

    if (req.body.action === quizSessionStatus.RUNNING) {
        try {
            await startQuizSessionService.execute(req.params.id)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    if (req.body.action === quizSessionStatus.FINISHED) {
        try {
            await finishQuizSessionService.execute(req.params.id)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    const quizSession = await QuizSession.updateOne({ _id: req.params.id }, { sessionStatus: req.body.action })

    res.json(quizSession)
})

app.patch('/:id/answer', async (req, res) => {
    const quizSession = await QuizSession.findOne({ _id: req.params.id })
    if (quizSession.sessionStatus == quizSessionStatus.FINISHED) {
        res.end()
    }

    const answerForChange = quizSession.answers.find(answer => answer.questionId == req.body.questionId)

    answerForChange.content = req.body.answer
    quizSession.currentQuestionIndex = req.body.currentQuestionIndex

    await quizSession.save()

    res.json(quizSession)
    res.end()
})

module.exports = app
