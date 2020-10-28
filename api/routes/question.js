const express = require('express')

const app = express.Router()
const util = require('../util')

const Quiz = require('../models/Quiz')

app.get('/', async (req, res) => {
    const filterObj = JSON.parse(req.query.filter)
    const quizId = filterObj.quizId

    if (req.query.range && req.query.sort) {
        await getPaginatedList(req, res, quizId)
    } else {
        await getSimpleList(req, res, quizId)
    }
})

const getPaginatedList = async (req, res, quizId) => {
    const listArgs = util.getListPaginationArgs(req.query)
    const quiz = await Quiz.findOne({_id: quizId}).sort({ [listArgs['col']]: listArgs['dir'] })

    if (!quiz.questions) {
        return
    }
    const recordCount = await quiz.questions.length

    util.addPaginationSupportHeaders(res, listArgs['start'], listArgs['end'], recordCount)

    res.json(quiz.questions)
}

const getSimpleList = async (ids, res, quizId) => {
    const quiz = await Quiz.findOne({"_id": quizId})

    res.json(quiz.questions)
}

app.get('/', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId)

    res.json(quiz.questions)
})

app.get('/:id', async (req, res) => {
    const quiz = await Quiz.findOne({"questions._id": req.params.id})
    res.json(quiz.questions.id(req.params.id))   
})

app.post('/', async (req, res) => {
    const quiz = await Quiz.findById(req.body.quizId)

    quiz.questions.push({...req.body})
    await quiz.save()    

    res.status(201).json(quiz)
})

app.put('/:id', async (req, res) => {
    const quiz = await Quiz.findOne({"questions._id": req.params.id})
    const questionForModify = quiz.questions.id(req.params.id)

    quiz.questions.id(req.params.id).remove()
    quiz.questions.push({
        ...questionForModify,
        ...req.body
    })

    await quiz.save()
    res.json(questionForModify)
})

app.delete('/:id', async (req, res) => {
    const quiz = await Quiz.findOne({"questions._id": req.params.id})
    quiz.questions.id(req.params.id).remove()

    await quiz.save()
    res.status(204).end()
})

module.exports = app
