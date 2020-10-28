const request = require('supertest')
const app = require('../index')
const assert = require('assert')

let dummyId

describe('Quiz routes', () => {
    after(async function() {
        await request(app).delete('/quizzes/' + dummyId)
    })

    it('POST /quizzes', function () {
        return request(app)
            .post('/quizzes')
            .send(dummyQuiz)
            .expect(201)
            .then(response => {
                dummyId = response.body._id
            })
    })

    it('GET /quizzes', function (done) {
        request(app)
            .get('/quizzes')
            .expect(200, done)
    })

    it('GET /quizzes/:id', function () {
        request(app)
            .get('/quizzes/' + dummyId)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, dummyId, "Returned incorrect object id")
            })            
    })

    it('PUT /quizzes/:id', function (done) {
        dummyQuiz.introText = 'Changed Intro text'
        dummyQuiz.status = 'ARCHIVED'
        request(app)
            .put('/quizzes/' + dummyId)
            .send(dummyQuiz)
            .expect(200, done)
    })

    it('DELETE /quizzes/:id', function (done) {
        request(app)
            .delete('/quizzes/' + dummyId)
            .expect(204, done)
    })

    it('PATCH /quizzes/:id/publishStatus', function (done) {
        request(app)
            .patch(`/quizzes/${dummyId}/publishStatus`)
            .send({publishStatus: 'PUBLISHED'})
            .expect(200, done)
    })

    it('PATCH /quizzes/:id/publishStatus', function (done) {
        request(app)
            .patch(`/quizzes/${dummyId}/publishStatus`)
            .send({publishStatus: 'DELETED'})
            .expect(422, done)
    })    
})

const dummyQuiz = {
    introText: "Intro text",
    finalText: "Final text",
    timeoutText: "Timeout text",
}
