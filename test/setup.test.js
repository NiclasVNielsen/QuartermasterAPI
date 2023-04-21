process.env.NODE_ENV = 'test'

const Boards = require("../models/board")
const Users = require("../models/user")

beforeEach((done) => { 
    Boards.deleteMany({}).then(err => {});
    Users.deleteMany({}).then(err => {});
    done();
});

afterEach((done) => {
    Boards.deleteMany({}).then(err => {});
    Users.deleteMany({}).then(err => {});
    done();
});