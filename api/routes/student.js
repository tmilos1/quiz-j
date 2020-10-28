const express = require('express')

const app = express.Router()
const Student = require('../models/Student')

const util = require('../util')

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

    const students = await Student.find().sort({ [listArgs['col']]: listArgs['dir'] })
    const recordCount = await Student.find().countDocuments()

    util.addPaginationSupportHeaders(res, listArgs['start'], listArgs['end'], recordCount)

    res.json(students)
}

const getFilteredList = async (req, res) => {
    filterObj = JSON.parse(req.query.filter)

    if ("id" in filterObj && Array.isArray(filterObj.id)) {
        await getListByManyIds(filterObj.id, res)
    }
}

const getListByManyIds = async (ids, res) => {
    const students = await Student.find().where('_id').in(ids)

    res.json(students)
}

app.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id)

    res.json(student)
})

app.post('/', async (req, res) => {
    const student = await Student.create({ ...req.body })

    res.status(201).json(student)
})

app.put('/:id', async (req, res) => {
    const student = await Student.updateOne({ _id: req.params.id }, { ...req.body })

    res.json(student)
})

app.delete('/:id', async (req, res) => {
    await Student.deleteOne({ _id: req.params.id })

    res.status(204).end()
})

module.exports = app
