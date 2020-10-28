const request = require('supertest')
const app = require('../index')
const assert = require('assert')
const { answerType } = require('../config/constants')

let dummyQuizId, dummyQuestionId

describe('AnswerChoices routes', () => {
    after(async function() {
        await request(app).delete('/quizzes/' + dummyQuizId)
    })

    it('POST /quizzes/:quizId/questions/:questionId/answerChoices', async function () {

        const quizResponse = await request(app)
            .post('/quizzes')
            .send(dummyQuiz)

        dummyQuizId = quizResponse.body._id

        const questionResponse = await request(app)
            .post(`/quizzes/${dummyQuizId}/questions`)
            .send(dummyQuestion)

        dummyQuestionId = questionResponse.body.questions.pop()._id

        await request(app)
            .post(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices`)
            .send(dummyAnswerChoice)
            .expect(201)

        await request(app)
            .post(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices`)
            .send(dummyAnswerChoice2)
            .expect(201)
    })

    it('GET /quizzes/:quizId/questions/:questionId/answerChoices', async function () {
        const answerChoices = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices`)        
            .expect(200)
    })

    it('GET /quizzes/:quizId/questions/:questionId/answerChoices/:id', async function () {
        const answerChoices = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices`)        

        const answerChoice = answerChoices.body.pop()

        request(app)
            .get(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices/${answerChoice._id}`)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, answerChoice._id, "Returned incorrect object id")
            })            
    })

    it('PUT /quizzes/:quizId/questions/:questionId/answerChoices/:id', async function () {
        const answerChoices = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices`)     
            
        const answerChoice = answerChoices.body.pop()

        dummyAnswerChoice2.label = "Changed Choice 2"

        await request(app)
            .put(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices/${answerChoice._id}`)
            .send(dummyAnswerChoice2)
            .expect(200)
    })

    it('DELETE /quizzes/:quizId/questions/:questionId/answerChoices/:id', async function () {
        const answerChoices = await request(app)
            .get(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices`)            

        const answerChoice = answerChoices.body.pop()
                
        await request(app)
            .delete(`/quizzes/${dummyQuizId}/questions/${dummyQuestionId}/answerChoices/${answerChoice._id}`)
            .expect(204)
    })
})

const dummyQuiz = {
    introText: "Intro text",
    finalText: "Final text",
    timeoutText: "Timeout text",
}

const dummyQuestion = {
    content: "Sample question 1",
    answerType: answerType.RADIO_SELECT,
}

const dummyAnswerChoice = {
    label: 'Choice 1',
    value: 'choice_1'
}

const dummyAnswerChoice2 = {
    label: 'Choice 2',
    value: 'choice_2'
}
