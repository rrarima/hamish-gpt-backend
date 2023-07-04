let chai = require("chai");
let chaiHttp = require("chai-http");
let {app, server} = require("../server");
require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const User = require('../models/User');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Tasks API", function() {
  this.beforeEach(async () => {
    const users = await User.findAll();
    for (let i = 0; i < users.length; i++) {
      await users[i].destroy();
    }
  });

  this.afterAll(async () => {
    server.close();
  })
  

  describe("POST /registration", function () {
    it("It should POST all the tasks", function(done) {
      chai.request(app)
          .post("/registration")
          .send({
            "username": "sdfdsf",
            "email": "ddsdszc@gmail.com",
            "password": "sdfsdfdsf"
          })
          .end(function (err, response) {
            response.should.have.status(200);
            done();
          })
    });

    it("It should fail when username is less than 3", function(done) {
      chai.request(app)
          .post("/registration")
          .send({
            "username": "pt",
            "email": "ddsdszc@gmail.com",
            "password": "sdfsdfdsf"
          })
          .end(function (err, response) {
            response.should.have.status(400);
            done();
          })
    });

    it("It should fail when email ends with number as type error", function(done) {
      chai.request(app)
          .post("/registration")
          .send({
            "username": "ur9",
            "email": "ddsdszc@gmail.com8",
            "password": "sdfsdfdsf"
          })
          .end(function (err, response) {
            response.should.have.status(400);
            done();
          })
    });
    
    it("It should fail when email ends with extra letters", function(done) {
      chai.request(app)
          .post("/registration")
          .send({
            "username": "ur9",
            "email": "ddsdszc@gmail.compq",
            "password": "sdfsdfdsf"
          })
          .end(function (err, response) {
            response.should.have.status(400);
            done();
          })
    });

    it("It should fail when password less than 8 characters", function(done) {
      chai.request(app)
          .post("/registration")
          .send({
            "username": "ur9",
            "email": "ddsdszc@gmail.com",
            "password": "sdfsdf"
          })
          .end(function (err, response) {
            response.should.have.status(400);
            done();
          })
    });

    it("It should fail when password more than 20 characters", function(done) {
      chai.request(app)
          .post("/registration")
          .send({
            "username": "ur9",
            "email": "ddsdszc@gmail.compq",
            "password": "sdfsdfdsfsdfsdfsdfsdfssfddsfsewsfsewweewwwfwewfwewfwwfw"
          })
          .end(function (err, response) {
            response.should.have.status(400);
            done();
          })
    });
  });
  
});