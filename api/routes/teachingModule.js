const express = require('express')

const app = express.Router()
const util = require('../util')
const Instructor = require('../models/Instructor')

app.get('/', async (req, res) => {
    if (req.query.range && req.query.sort) {
        await getPaginatedList(req, res)
    }

    if (req.query.filter) {
        await getFilteredList(req, res)
    }
})

const getPaginatedList = async (req, res) => {
    const listArgs = util.getListPaginationArgs(req.query)

    const instructors = await Instructor.find()
    const teachingModules = []

    instructors.forEach(function (instructor) {
        instructor.teachingModules.forEach(function (module) {
            teachingModules.push(module)
        })
    })

    const recordCount = teachingModules.length

    util.addPaginationSupportHeaders(res, listArgs['start'], listArgs['end'], recordCount)

    res.json(teachingModules)
}

const getFilteredList = async (req, res) => {
    filterObj = JSON.parse(req.query.filter)

    if ("id" in filterObj && Array.isArray(filterObj.id)) {
        await getListByManyIds(filterObj.id, res)
    }
}

const getListByManyIds = async (ids, res) => {
    const instructors = await Instructor.find().where('teachingModules._id').in(ids)

    res.json(instructors)
}

app.get('/', async (req, res) => {
    const instructor = await Instructor.findById(req.user.instructorId)

    res.json(instructor.teachingModules)
})

app.get('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.user.instructorId)

    res.json(instructor.teachingModules.id(req.params.id))
})

app.post('/', async (req, res) => {
    const instructor = await Instructor.findById(req.body.instructorId)

    instructor.teachingModules.push({ name: req.body.name })
    await instructor.save()

    res.status(201).json(instructor)
})

app.put('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.user.instructorId)
    const teachingModuleForModify = instructor.teachingModules.id(req.params.id)

    instructor.teachingModules.id(req.params.id).remove()
    instructor.teachingModules.push({
        ...teachingModuleForModify,
        ...req.body
    })

    await instructor.save()
    res.json(instructor)
})


app.delete('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.user.instructorId)
    instructor.teachingModules.id(req.params.id).remove()

    await instructor.save()
    res.status(204).end()
})


module.exports = app
