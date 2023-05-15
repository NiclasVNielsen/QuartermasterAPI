const chai = require("chai")
const expect = chai.expect
const should = chai.should()
const chaiHttp = require("chai-http")
const server = require("../server")

chai.use(chaiHttp)


describe('/First test collection', () => {
    const user = {
        name: "Meepers",
        email: "meep@moop.mp",
        password: "12345678",
        personalBoards: []
    }

    it('Creates test user', (done) => {
        chai.request(server)
        .post('/api/auth/register/')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.be.equal(201)
            done()
        })
    })

    it('Email already in use test on creates user', (done) => {
        chai.request(server)
        .post('/api/auth/register/')
        .send(user)
        .end((err, res) => {
            chai.request(server)
            .post('/api/auth/register/')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(400)
                done()
            })
        })
    })

    it('Login test', (done) => {
        chai.request(server)
        .post('/api/auth/register/')
        .send(user)
        .end((err, res) => {
            chai.request(server)
            .post('/api/auth/login/')
            .send({
                email: "meep@moop.mp",
                password: "12345678"
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
    })

    it('Get all boards', (done) => {
        chai.request(server)
        .post('/api/auth/register/')
        .send(user)
        .end((err, res) => {
            chai.request(server)
            .post('/api/auth/login/')
            .send({
                email: "meep@moop.mp",
                password: "12345678"
            })
            .end((err, res) => {
                chai.request(server)
                .get('/api/boards/')
                .set('auth-token', res.body.data.token)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
            })
        })
    })

    it('Create a board', (done) => {
        chai.request(server)
        .post('/api/auth/register/')
        .send(user)
        .end((err, res) => {
            chai.request(server)
            .post('/api/auth/login/')
            .send({
                email: "meep@moop.mp",
                password: "12345678"
            })
            .end((err, resToken) => {
                chai.request(server)
                .post('/api/boards/')
                .send({
                    title: "Smoops",
                    board: []
                })
                .set('auth-token', resToken.body.data.token)
                .end((err, res) => {
                    res.should.have.status(200)
                    chai.request(server)
                    .get('/api/boards/')
                    .set('auth-token', resToken.body.data.token)
                    .end((err, res) => {
                        res.should.have.status(200)
                        expect(res.body.length).to.be.equal(1)
                        done()
                    })
                })
            })
        })
    })

    it('Cannot get all boards without logging in', (done) => {
        chai.request(server)
        .get('/api/boards/')
        .end((err, res) => {
            res.should.have.status(401)
            res.should.be.a('object')
            done()
        })
    })
})
