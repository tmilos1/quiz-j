const express = require('express')

const app = express.Router()
const util = require('../util')
const Instructor = require('../models/Instructor')

app.get('/', async (req, res) => {
    const listArgs = util.getListPaginationArgs(req.query)

    const instructors = await Instructor.find().sort({ [listArgs['col']]: listArgs['dir'] })
    const recordCount = await Instructor.find().countDocuments()

    util.addPaginationSupportHeaders(res, listArgs['start'], listArgs['end'], recordCount)
    res.json(instructors)
})

app.get('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.params.id)

    res.json(instructor)
})

app.post('/', async (req, res) => {
    const instructor = await Instructor.create({...req.body})    

    res.status(201).json(instructor)
})

app.put('/:id', async (req, res) => {
     const instructor = await Instructor.updateOne({_id: req.params.id}, {...req.body})  

    res.json(instructor)
})

app.delete('/:id', async (req, res) => {
    await Instructor.deleteOne({_id: req.params.id}) 

    res.status(204).end()
})

module.exports = app
