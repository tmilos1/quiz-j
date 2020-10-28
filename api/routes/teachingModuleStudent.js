const express = require('express')

const app = express.Router({mergeParams: true})
const Instructor = require('../models/Instructor')

app.get('/', async (req, res) => {
    const instructor = await Instructor.findById(req.params.instructorId)

    const teachingModules = instructor.teachingModules.id(req.params.teachingModuleId)

    res.json(teachingModules.students)
})

app.get('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.params.instructorId)

    const teachingModule = instructor.teachingModules.id(req.params.teachingModuleId)
    const student = teachingModule.students.id(req.params.id)

    res.json(student)
})

app.post('/', async (req, res) => {
    const instructor = await Instructor.findById(req.params.instructorId)

    const teachingModule = instructor.teachingModules.id(req.params.teachingModuleId)
    teachingModule.students.push({ studentId: req.body.studentId })

    await instructor.save()    

    res.status(201).json(instructor)
})

app.put('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.params.instructorId)

    const teachingModule = instructor.teachingModules.id(req.params.teachingModuleId)

    teachingModule.students.id(req.params.id).remove()
    teachingModule.students.push({
        studentId: req.params.id
    })

    await instructor.save()
    res.json(instructor)
})


app.delete('/:id', async (req, res) => {
    const instructor = await Instructor.findById(req.params.instructorId)

    const teachingModule = instructor.teachingModules.id(req.params.teachingModuleId)
    teachingModule.students.id(req.params.id).remove()

    await instructor.save()
    res.status(204).end()
})


module.exports = app
