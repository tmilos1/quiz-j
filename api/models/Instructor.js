const mongoose = require('mongoose')

const { Schema } = mongoose

const InstructorSchema = new Schema({
    firstName: String,
    lastName: String,
    teachingModules: [
        {
            name: String,
            students: [
                {
                    studentId: mongoose.ObjectId
                }
            ]
        }
    ],
})

const Instructor = mongoose.model('Instructor', InstructorSchema)

module.exports = Instructor
