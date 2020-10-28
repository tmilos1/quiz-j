const mongoose = require('mongoose')

const { Schema } = mongoose

const QuizSchema = new Schema({
    teachingModuleId: mongoose.ObjectId,
    quizLink: String,
    quizCode: String,
    name: String,
    publishStatus: String, // DRAFT, PUBLISHED, ARCHIVED
    introText: String,
    finalText: String,
    timeoutText: String,
    timeCreated: Date,
    allowedDuration: Number,
    questions: [
        {
            title: String,   
            content: String,  
            correctAnswer: String, 
            imageUrl: String,
            videoUrl: String,         
            answerType: String,
            answerChoices: [
                { 
                    label: String,
                    value: String
                }
            ]
        }
    ]
})

const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = Quiz
