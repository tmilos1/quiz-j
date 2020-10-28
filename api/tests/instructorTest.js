const request = require('supertest')
const app = require('../index')
const assert = require('assert')

let dummyId

describe('Instructor routes', () => {
    after(async function() {
        await request(app).delete('/instructors/' + dummyId)
    })

    it('POST /instructors', function () {
        return request(app)
            .post('/instructors')
            .send(dummyInstructor)
            .expect(201)
            .then(response => {
                dummyId = response.body._id
            })
    })

    it('GET /instructors', function (done) {
        request(app)
            .get('/instructors')
            .expect(200, done)
    })

    it('GET /instructors/:id', function () {
        request(app)
            .get('/instructors/' + dummyId)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, dummyId, "Returned incorrect object id")
            })            
    })

    it('PUT /instructors/:id', function (done) {
        dummyInstructor.email = 'changed_email@wonwwf.com'
        request(app)
            .put('/instructors/' + dummyId)
            .send(dummyInstructor)
            .expect(200, done)
    })

    it('DELETE /instructors/:id', function (done) {
        request(app)
            .delete('/instructors/' + dummyId)
            .expect(204, done)
    })
})

const dummyInstructor = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'nisek39056@wonwwf.com'
}
