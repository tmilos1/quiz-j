require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')

const serverless = require('serverless-http')

const config = require('./config/config')

const studentRoutes = require('./routes/student')
const instructorRoutes = require('./routes/instructor')
const teachingModuleRoutes = require('./routes/teachingModule')
const quizRoutes = require('./routes/quiz')
const questionRoutes = require('./routes/question')
const quizSessionRoutes = require('./routes/quizSession')


app = express()

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

/** Provide Dummy instructor user */
// let dummyUser = function (req, res, next) {
//     req.user = {}
//     req.user.instructorId = req.headers.instructorid ? req.headers.instructorid : ''
//     next()
// }
// app.use(dummyUser)


/** ROUTES */
app.use('/students', studentRoutes)
app.use('/instructors', instructorRoutes)
app.use('/teachingModules', teachingModuleRoutes)
app.use('/questions', questionRoutes)
app.use('/quizzes', quizRoutes)
app.use('/quizSessions', quizSessionRoutes)


app.listen(config.APP_PORT, () => {
    console.log('Server running on PORT: ' + config.APP_PORT)
})

app.use('/.netlify/functions/index/students', studentRoutes)
app.use('/.netlify/functions/index/instructors', instructorRoutes)
app.use('/.netlify/functions/index/teachingModules', teachingModuleRoutes)
app.use('/.netlify/functions/index/questions', questionRoutes)
app.use('/.netlify/functions/index/quizzes', quizRoutes)
app.use('/.netlify/functions/index/quizSessions', quizSessionRoutes)

module.exports = app
module.exports.handler = serverless(app)
