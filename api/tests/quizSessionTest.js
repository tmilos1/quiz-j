const request = require('supertest')
const app = require('../index')
const assert = require('assert')

const { quizSessionStatus } = require('../config/constants')
const QuizSession = require('../models/QuizSession')

let dummyId, dummyId2

describe('QuizSession routes', () => {
    before(async function() {       
        const quizSession = await QuizSession.create({
            mailSlug: Math.floor(Math.random() * 100000000000),
            status: quizSessionStatus.NOT_STARTED,
            allowedDuration: 30,
            currentQuestionIndex: 0,
            questions: [],
        })
        dummyId = quizSession.id

        const quizSession2 = await QuizSession.create({
            mailSlug: 1234567890,
            status: quizSessionStatus.NOT_STARTED,
            allowedDuration: 45,
            currentQuestionIndex: 0,
            questions: [],
        })
        dummyId2 = quizSession2.id
    })

    after(async function() {
        await QuizSession.deleteOne({_id: dummyId}) 
    })

    it('GET /quizSessions', function (done) {
        request(app)
            .get('/quizSessions')
            .expect(200, done)
    })

    it('GET /quizSessions?mailSlug=1234567890', function (done) {
        request(app)
            .get('/quizSessions?mailSlug=1234567890')
            .then(response => {
                assert.strictEqual(response.body.allowedDuration, 45, "Returned incorrect mailSlug match.")
                done()
            })  
    })

    it('GET /quizSessions/:id', function () {
        request(app)
            .get('/quizSessions/' + dummyId)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, dummyId, "Returned incorrect object id")
            })            
    })
})

