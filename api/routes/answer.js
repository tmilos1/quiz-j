const express = require('express')

const app = express.Router()
const QuizSession = require('../models/QuizSession')

app.get('/', async (req, res) => {
    const quizSession = await QuizSession.findById(req.params.quizSessionId)

    res.json(quizSession.answers)
})

app.get('/:id', async (req, res) => {
    const quizSession = await QuizSession.findById(req.params.quizSessionId)

    res.json(quizSession.answers.id(req.params.id))
})

app.patch('/:id/content', async (req, res) => {
    const quizSession = await QuizSession.findById(req.params.quizSessionId)

    const answerForModify = quizSession.answers.id(req.params.id)
    answerForModify.content = req.body.content

    quizSession.answers.id(req.params.id).remove()
    quizSession.answers.push({
        ...answerForModify,
    })

    await quizSession.save()
    res.json(quizSession)    
})

app.patch('/:id/choices', async (req, res) => {
    // const quizSession = await QuizSession.findById(req.params.quizSessionId)

    // const answerForModify = quizSession.answers.id(req.params.id)
    // answerForModify.content = req.body.content

    // quizSession.answers.id(req.params.id).remove()
    // quizSession.answers.push({
    //     ...answerForModify,
    //     ...req.body
    // })

    // await quizSession.save()
    // res.json(quizSession) 
})

module.exports = app