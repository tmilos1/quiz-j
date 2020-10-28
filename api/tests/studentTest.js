const request = require('supertest')
const app = require('../index')
const assert = require('assert')

let dummyId

describe('Student routes', () => {
    after(async function() {
        await request(app).delete('/students/' + dummyId)
    })

    it('POST /students', function () {
        return request(app)
            .post('/students')
            .send(dummyStudent)
            .expect(201)
            .then(response => {
                dummyId = response.body._id
            })
    })

    it('GET /students', function (done) {
        request(app)
            .get('/students')
            .expect(200, done)
    })

    it('GET /students/:id', function () {
        request(app)
            .get('/students/' + dummyId)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, dummyId, "Returned incorrect object id")
            })            
    })

    it('PUT /students/:id', function (done) {
        dummyStudent.email = 'changed_email@wonwwf.com'
        request(app)
            .put('/students/' + dummyId)
            .send(dummyStudent)
            .expect(200, done)
    })

    it('DELETE /students/:id', function (done) {
        request(app)
            .delete('/students/' + dummyId)
            .expect(204, done)
    })
})

const dummyStudent = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'nisek39056@wonwwf.com'
}
