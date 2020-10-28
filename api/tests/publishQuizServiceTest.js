const request = require('supertest')
const app = require('../index')
const assert = require('assert')


describe('Publish quiz service test', () => {
    it('PATCH /quizzes/:id/publishStatus', function (done) {
        const dummyId = '5f05c6be78e86287e017d4a4'
        
        request(app)
            .patch(`/quizzes/${dummyId}/publishStatus`)
            .send({publishStatus: 'PUBLISHED'})
            .expect(200, done)
    })
})

module.exports = app
