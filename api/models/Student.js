const mongoose = require('mongoose')

const { Schema } = mongoose

const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student
