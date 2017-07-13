
//set the NODE_ENV to test

process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')

//Require test dependencies

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/index')
let should = chai.should()

chai.use(chaiHttp)

//User for: CREATE_USER && DUPLICATE TEST
let user = {
    username: "Agent_007",
    firstName: "James",
    lastName: "Bond",
    email: "JamesBond@test.com",
    password: "testing123"
}

//POST: CREATE_USER
describe('/POST Sign Up: Create User Profile', () => {
    it('CREATE_USER && RETURN_TOKEN', (done) => {

        chai.request(server)
            .post('/api/signUp')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('token')
                done()
            })
    })
})

//POST: DUPLICATE ACCOUNT

describe('/POST SignUp:', () => {
    it('DUPLICATE_ACCOUNTS', (done) => {
        chai.request(server)
            .post('/api/signUp')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.not.have.property('token')
                res.body.should.have.property('err')
                done()
            })
    })
})

//POST: MISSING_FIELDS   
//Wipe users after each done for following tests
describe('Wipe Users...', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done()
        })
    })
  
    let badUsers = [
            {
                username: null,
                firstName: "Archer",
                lastName: "Sterling",
                email: "Archer@test.com",
                password: "testing123",
                err: "NO USERNAME"
            },
            {
                username: "Agent",
                firstName: null,
                lastName: "Sterling",
                email: "Archer@test.com",
                password: "testing123",
                err: "NO FIRST_NAME"
            },
                        {
                username: "Agent",
                firstName: "Archer",
                lastName: null,
                email: "Archer@test.com",
                password: "testing123",
                err: "NO LAST_NAME"
            },
            {
                username: "Agent",
                firstName: "Archer",
                lastName: "Sterling",
                email: null,
                password: "testing123",
                err: "NO EMAIL"
            },
            {
                username: "Agent",
                firstName: "Archer",
                lastName: "Sterling",
                email: "Archer@gest.com",
                password: null,
                err: "NO PASSWORD"
            },
        ]

//mapping bad users and pushing err message for each unit test
        badUsers.map(user => {
            describe('/POST Sign Up Should FAIL:', () => {
                it(`DENY_BAD_USER: ${user.err}`, (done) => {
                    chai.request(server)
                        .post('/api/signUp')
                        .send(user)
                        .end((err, res) => {
                            res.should.have.status(401)
                            res.body.should.not.have.property('token')
                            res.body.should.have.property('err')
                            done()
                        })
            })
        })
    })
})