const request = require('supertest')
const app = require('../index')
const assert = require('assert')
const { answerType } = require('../config/constants')

let dummyQuizId

describe('Question routes', () => {
    after(async function() {
        await request(app).delete('/quizzes/' + dummyQuizId)
    })

    it('POST /quizzes/:quizId/questions', async function () {

        const quizResponse = await request(app)
            .post('/quizzes')
            .send(dummyQuiz)

        dummyQuizId = quizResponse.body._id

        await request(app)
            .post(`/quizzes/${dummyQuizId}/questions`)
            .send(dummyQuestion)
            .expect(201)
    })

    it('GET /quizzes/:quizId/questions', function (done) {
        console.log('dummyQuizId:' + dummyQuizId)
        request(app)
            .get(`/quizzes/${dummyQuizId}/questions`)        
            .expect(200, done)
    })

    it('GET /quizzes/:quizId/questions/:id', async function () {
        const quizResponse = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions`)        

        const question = quizResponse.body.pop()

        request(app)
            .get(`/quizzes/${dummyQuizId}/questions/${question._id}`)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, question._id, "Returned incorrect object id")
            })            
    })

    it('PUT /quizzes/:quizId/questions/:id', async function () {
        const quizResponse = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions`)        

        const question = quizResponse.body.pop()

        dummyQuestion.content = "Changed sample question to 2"

        await request(app)
            .put(`/quizzes/${dummyQuizId}/questions/${question._id}`)
            .send(dummyQuestion)
            .expect(200)
    })

    it('DELETE /quizzes/:quizId/questions/:id', async function () {
        const quizResponse = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions`)        

        const question = quizResponse.body.pop()
                
        await request(app)
            .delete(`/quizzes/${dummyQuizId}/questions/${question._id}`)
            .expect(204)
    })
})

const dummyQuiz = {
    introText: "Intro text",
    finalText: "Final text",
    timeoutText: "Timeout text",
}

const dummyQuestion = {
    title: "Question title",
    content: "Sample question 1",
    answerType: answerType.SHORT_TEXT,
}