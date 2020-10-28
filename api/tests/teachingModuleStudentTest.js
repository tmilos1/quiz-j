const request = require('supertest')
const app = require('../index')
const assert = require('assert')

let dummyInstructorId, dummyTeachingModuleId

describe('Teaching Modules students routes', () => {
    after(async function() {
        await request(app).delete('/instructors/' + dummyInstructorId)
    })

    it('POST /instructors/:instructorId/teachingModules/:teachingModuleId/students', async function () {

        const instructor = await request(app)
            .post('/instructors')
            .send(dummyInstructor)

        dummyInstructorId = instructor.body._id

        const teachingModule = await request(app)
            .post(`/instructors/${dummyInstructorId}/teachingModules`)
            .send(dummyTeachingModule)

        dummyTeachingModuleId = teachingModule.body.teachingModules.pop()._id

        await request(app)
            .post(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students`)
            .send(dummyStudent1)
            .expect(201)

        await request(app)
            .post(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students`)
            .send(dummyStudent2)
            .expect(201)
    })

    it('GET /instructors/:instructorId/teachingModules/:teachingModuleId/students', async function () {
        await request(app)
            .get(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students`)        
            .expect(200)
    })

    it('GET /instructors/:instructorId/teachingModules/:teachingModuleId/students/:id', async function () {
        const students = await request(app)
            .get(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students`)        

        const student = students.body.pop()

        request(app)
            .get(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students/${student._id}`)
            .expect(200)
            .then(response => {
                assert.strictEqual(response.body._id, student._id, "Returned incorrect object id")
            })            
    })

    it('PUT /instructors/:instructorId/teachingModules/:teachingModuleId/students/:id', async function () {
        const students = await request(app)
            .get(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students`)     
            
        const dummyStudent2 = students.body.pop()

        dummyStudent2.firstName = "Bill"

        await request(app)
            .put(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students/${dummyStudent2._id}`)
            .send(dummyStudent2)
            .expect(200)
    })

    it('DELETE /instructors/:instructorId/teachingModules/:teachingModuleId/students/:id', async function () {
        const students = await request(app)
            .get(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students`)            

        const dummyStudent = students.body.pop()

        await request(app)
            .delete(`/instructors/${dummyInstructorId}/teachingModules/${dummyTeachingModuleId}/students/${dummyStudent._id}`)
            .expect(204)
    })
})

const dummyInstructor = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'nisek39056@wonwwf.com'
}

const dummyTeachingModule = {
    name: 'Medical Course I'
}

const dummyStudent1 = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'nisek39056@wonwwf.com'
}

const dummyStudent2 = {
    firstName: 'Ruy',
    lastName: 'Lopez',
    email: 'nisek39057@wonwwf.com'
}
