const request = require('supertest')
const app = require('../index')
const assert = require('assert')
const { answerType } = require('../config/constants')

let dummyInstructorId

describe('Teaching module routes', () => {
    after(async function() {
        // await request(app).delete('/instructors/' + dummyInstructorId)
    })

    it('POST /teachingModules', async function () {

        const instructorResponse = await request(app)
            .post('/instructors')
            .send(dummyInstructor)

        dummyInstructorId = instructorResponse.body._id

        dummyTeachingModule.instructorId = dummyInstructorId

        await request(app)
            .post(`/teachingModules`)
            .send(dummyTeachingModule)
            .expect(201)
    })

    // it('GET /teachingModules', function (done) {
    //     request(app)
    //         .get(`/teachingModules`)        
    //         .expect(200, done)
    // })

    // it('GET /teachingModules/:id', async function () {
    //     const instructorResponse = await request(app)
    //         .get(`/teachingModules`)        

    //     const teachingModule = instructorResponse.body.pop()

    //     request(app)
    //         .get(`/teachingModules/${teachingModule._id}`)
    //         .expect(200)
    //         .then(response => {
    //             assert.strictEqual(response.body._id, teachingModule._id, "Returned incorrect object id")
    //         })            
    // })

    // it('PUT /teachingModules/:id', async function () {
    //     const instructorResponse = await request(app)
    //         .get(`/teachingModules`)        

    //     const teachingModule = instructorResponse.body.pop()

    //     dummyTeachingModule.content = "Changed sample teachingModule to 2"

    //     await request(app)
    //         .put(`/teachingModules/${teachingModule._id}`)
    //         .send(dummyTeachingModule)
    //         .expect(200)
    // })

    // it('DELETE /teachingModules/:id', async function () {
    //     const instructorResponse = await request(app)
    //         .get(`/teachingModules`)        

    //     const teachingModule = instructorResponse.body.pop()
                
    //     await request(app)
    //         .delete(`/teachingModules/${teachingModule._id}`)
    //         .expect(204)
    // })
})

const dummyInstructor = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'nisek39056@wonwwf.com'
}

const dummyTeachingModule = {
    name: 'Medical Course I'
}
