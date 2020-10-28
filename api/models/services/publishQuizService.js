const sgMail = require('@sendgrid/mail')

const Quiz = require('../Quiz')
const Instructor = require('../Instructor')
const Student = require('../Student')
const QuizSession = require('../QuizSession')
const { quizPublishStatus, quizSessionStatus, answerType } = require('../../config/constants')

exports.execute = async (quizId) => {
    const quiz = await Quiz.findById(quizId)

    if (quiz.publishStatus !== quizPublishStatus.DRAFT) {
        throw new Error('Status transition incorrect.')
    }

    const instructor = await Instructor.findOne({ "teachingModules._id": quiz.teachingModuleId })
    if (!instructor) {
        throw new Error("Teaching Module doesn't exists.")
    }

    const teachingModule = instructor.teachingModules.pop()

    if (teachingModule.students.length === 0) {
        throw new Error("There are no students for Teaching Module.")
    }

    const answers = quiz.questions.map((question) => {
        return {
            questionId: question.id,
            answerType: question.answerType,
            content: '',
            choices: []
        }
    })

    teachingModule.students.forEach(async studentObj => {

        const student = await Student.findById(studentObj.studentId)
        const session = await QuizSession.create({
            quizId: quiz.id,
            studentId: student.id,
            mailSlug: Math.floor(Math.random() * 100000000000),
            sessionStatus: quizSessionStatus.NOT_STARTED,
            timeStarted: null,
            timeFinished: null,
            allowedDuration: quiz.allowedDuration,
            currentQuestionIndex: 0,
            answers,
        })

        /** TEST: temporary disabled */
        return
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const quizLink = 'https://quiz-jdemo.netlify.app/emailLink/' + session.mailSlug
        const msg = {
            to: student.email,
            from: 'tmilos1@gmail.com',
            subject: 'Quiz invitation Link',
            text: 'Please use this link to open the quiz. Link: ' + quizLink,
        }

        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }       
    })
}
