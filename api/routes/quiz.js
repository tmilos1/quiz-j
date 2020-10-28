const express = require('express')
const mongoose = require('mongoose')

const app = express.Router()
const { quizPublishStatus } = require('../config/constants')
const util = require('../util')
const Quiz = require('../models/Quiz')
const Instructor = require('../models/Instructor')
const publishQuizService = require('../models/services/publishQuizService')
const config = require('../config/config')

let dummyUser = function (req, res, next) {
  req.user = {}
  req.user.instructorId = req.headers.instructorid ? req.headers.instructorid : ''
  next()
}

app.use(dummyUser)

app.get('/', async (req, res) => {
    if (req.query.range && req.query.sort) {
        await getPaginatedList(req, res)
    } else if (req.query.filter) {
        await getFilteredList(req, res)
    } else {
        await getSimpleList(req, res)
    }
})


const getPaginatedList = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.user.instructorId)) {
        return emptyResultset(res)
    }

    const instructor = await Instructor.findOne({ "_id": req.user.instructorId })
    if (!instructor) {
        return emptyResultset(res)
    }

    const listArgs = util.getListPaginationArgs(req.query)
    const teachingModulesIds = instructor.teachingModules.map(teachingModule => teachingModule.id)

    const quizzes = await Quiz.find().where('teachingModuleId').in(teachingModulesIds).sort({ [listArgs['col']]: listArgs['dir'] })
    const recordCount = await Quiz.find().where('teachingModuleId').in(teachingModulesIds).countDocuments()

    util.addPaginationSupportHeaders(res, listArgs['start'], listArgs['end'], recordCount)

    res.json(quizzes)
}

const emptyResultset = (res) => {
    util.addPaginationSupportHeaders(res, 0, 0, 0)
    res.end()
}

const getFilteredList = async (req, res) => {
    const filterObj = JSON.parse(req.query.filter)

    if ("id" in filterObj && Array.isArray(filterObj.id)) {
        await getListByManyIds(filterObj.id, res)
    }
}

const getListByManyIds = async (ids, res) => {
    const quizzes = await Quiz.find().where('_id').in(ids)

    res.json(quizzes)
}

const getSimpleList = async (ids, res) => {
    const quizzes = await Quiz.find()

    res.json(quizzes)
}

app.get('/:id', async (req, res) => {
    const quiz = await Quiz.findOne({ _id: req.params.id })

    res.json(quiz)
})

app.post('/', async (req, res) => {
    let instructor

    if (mongoose.Types.ObjectId.isValid(req.user.instructorId)) {
        instructor = await Instructor.findOne({ "_id": req.user.instructorId })
    }

    if (!instructor) {
        instructor = await Instructor.create({ teachingModules: [{}] })
    }
    const teachingModule = instructor.teachingModules.pop()
    const quizCode = Math.floor(Math.random() * 1000000000000)

    const quiz = new Quiz({
        ...req.body,
        teachingModuleId: teachingModule.id,
        publishStatus: quizPublishStatus.PUBLISHED,
        quizLink: config.QUIZ_HOST + '/q/' + quizCode,
        quizCode: quizCode,
        allowedDuration: 30,
        timeCreated: Date.now()
    })

    await quiz.save()

    res.status(201).json({...quiz, instructorId: instructor.id})
})

app.put('/:id', async (req, res) => {
    const protectedFields = ['teachingModuleId', 'publishStatus']

    const allowedData = util.cleanProtectedFields(req.body, protectedFields)

    const quiz = await Quiz.updateOne(
        { _id: req.params.id },
        { ...allowedData, publishStatus: quizPublishStatus.PUBLISHED, }
    )

    res.json(quiz)
})

app.delete('/:id', async (req, res) => {
    await Quiz.deleteOne({ _id: req.params.id })

    res.status(204).end()
})

/**
 * For changing publishStatus, we may have 'special' business rules,
 * so it is more convenient to use it as PATCH.
 */
app.patch('/:id/publishStatus', async (req, res) => {

    if (!req.body.action in Object.values(quizPublishStatus)) {
        return res.status(422).end()
    }

    if (req.body.action === quizPublishStatus.PUBLISHED) {
        try {
            await publishQuizService.execute(req.params.id)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    const quiz = await Quiz.updateOne({ _id: req.params.id }, { publishStatus: req.body.action })

    res.json(quiz)
    res.end()
})

module.exports = app
