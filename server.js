const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const request = require('request');
const User = require('./models/User')
const Image = require('./models/Image')

const app = express();
app.use(cors())
app.use(express.json());

const sequelize = new Sequelize('hamishgpt', 'user', 'root', {
  host: 'db',
  dialect: 'mysql'
});

app.post('/registration', function (request, response) {
  return User.create({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  }).then(function (users) {
    if (users) {
      response.send(users);
    } else {
      response.status(400).send('Error in insert new record');
    }
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


app.get('/userimages/:userid', async (req, res) => {
  const userid = req.params.userid;
  try {
    const images = await Image.findAll({ where: { userid: userid } });
    if (!images.length) {
      res.status(404).send('Images not found for the user');
      return;
    }
    res.json(images);
  } catch (error) {
    console.error('Error getting images:', error);
    res.status(500).send('Internal server error');
  }
});

// const createUser = async (username, email, password) => {
//   try{
//     const newUser = await User.create({
//       username: username,
//       email: email,
//       password: password
//     });
//     console.log('User created!');
//   } catch (error){
//       console.error('Error creating user', error);
//   }
// };

app.listen(8000, () => {
  console.log('Server is running at http://localhost:8000');
});

// createUser('test1', 'rarimar1@outlook.com', 'epsgpt');