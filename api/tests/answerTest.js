const request = require('supertest')
const app = require('../index')
const assert = require('assert')
const { answerType } = require('../config/constants')

let dummyQuizId

describe('Answer routes', () => {

    it('GET /quizSessions/:quizSessionId/answers', function (done) {
        request(app)
            .get(`/quizSessions/${dummyQuizSessionId}/answers`)        
            .expect(200, done)
    })

    // it('GET /quizzes/:quizId/questions/:id', async function () {
    //     const quizResponse = await request(app)
    //         .get(`/quizzes/${dummyQuizId}/questions`)        

    //     const question = quizResponse.body.pop()

    //     request(app)
    //         .get(`/quizzes/${dummyQuizId}/questions/${question._id}`)
    //         .expect(200)
    //         .then(response => {
    //             assert.strictEqual(response.body._id, question._id, "Returned incorrect object id")
    //         })            
    // })

    // it('PUT /quizzes/:quizId/questions/:id', async function () {
    //     const quizResponse = await request(app)
    //         .get(`/quizzes/${dummyQuizId}/questions`)        

    //     const question = quizResponse.body.pop()

    //     dummyQuestion.content = "Changed sample question to 2"

    //     await request(app)
    //         .put(`/quizzes/${dummyQuizId}/questions/${question._id}`)
    //         .send(dummyQuestion)
    //         .expect(200)
    // })
})
