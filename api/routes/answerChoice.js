const express = require('express')

const app = express.Router({mergeParams: true})
const Quiz = require('../models/Quiz')

app.get('/', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId)

    const questions = quiz.questions.id(req.params.questionId)

    res.json(questions.answerChoices)
})

app.get('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId)

    const question = quiz.questions.id(req.params.questionId)
    const answerChoice = question.answerChoices.id(req.params.id)

    res.json(answerChoice)
})

app.post('/', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId)

    const question = quiz.questions.id(req.params.questionId)

    question.answerChoices.push({ label: req.body.label, value: req.body.value })

    await quiz.save()    

    res.status(201).json(quiz)
})

app.put('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId)

    const question = quiz.questions.id(req.params.questionId)
    const answerChoiceForModify = question.answerChoices.id(req.params.id)

    question.answerChoices.id(req.params.id).remove()
    question.answerChoices.push({
        ...answerChoiceForModify,
        ...req.body
    })

    await quiz.save()
    res.json(quiz)
})


app.delete('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId)

    const question = quiz.questions.id(req.params.questionId)
    question.answerChoices.id(req.params.id).remove()

    await quiz.save()
    res.status(204).end()
})


module.exports = app
