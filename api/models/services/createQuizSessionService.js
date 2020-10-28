const Quiz = require('../Quiz')
const Instructor = require('../Instructor')
const Student = require('../Student')
const QuizSession = require('../QuizSession')
const { quizSessionStatus } = require('../../config/constants')

exports.execute = async (quizCode, userEmail) => {
    // create new student if doesn't exists
    let student = await Student.findOne({ email: userEmail })
    if (!student) {
        student = await Student.create({ email: userEmail })
    }

    // fetch quiz by given quizCode
    let quiz = await Quiz.findOne({quizCode: quizCode})
    if (!quiz) {
        throw new Error("Quiz with given quizCode: " + quizCode + " doesn't exists.")
    }

    // add student to teaching module
    const instructor = await Instructor.findOne({ "teachingModules._id": quiz.teachingModuleId })
    if (!instructor) {
        throw new Error("Teaching Module doesn't exists.")
    }  
    const teachingModule = instructor.teachingModules.find(teachingModule => teachingModule.id == quiz.teachingModuleId)  

    // is student already registered to teaching module?
    let registeredStudent = await teachingModule.students.find(registeredStudent => registeredStudent.studentId == student.id)
    if (!registeredStudent) {
        teachingModule.students.push({studentId: student.id})
        await instructor.save()
    }

    // add empty answers to quizSession
    const answers = quiz.questions.map((question) => {
        return {
            questionId: question.id,
            answerType: question.answerType,
            content: '',
            choices: []
        }
    })    

    // create new quiz session
    const quizSession = await QuizSession.create({
        quizId: quiz.id,
        studentId: student.id,
        sessionStatus: quizSessionStatus.NOT_STARTED,
        timeStarted: Date.now(),
        timeFinished: null,
        allowedDuration: quiz.allowedDuration,
        currentQuestionIndex: 0,
        answers,
    })

    return quizSession
}