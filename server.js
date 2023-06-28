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

app.get('/ping', function(request, response) {
  response.send("pong");
});

app.post('/registration', async (request, response) => {
  const { username, email, password } = request.body;
  console.log(request.body);
  if (username === null || username.length < 3)  {
    return response.status(400).json({ error: 'Username is invalid' });
  }
  if (email === null || email.length < 1) {
    return response.status(400).json({ error: 'Email is invalid' });
  }
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    return response.status(400).json({ error: 'Invalid email address' });
  }
  if (password === null || password.length < 8 || password.length > 20) {
    return response.status(400).json({ error: 'Password is invalid' });
  }
  try {
    const user = await User.create({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password
    })
    if (user) {
      response.json(user);
    } else {
      return response.status(400).json({ error: 'Error in insert new record' });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json(error.errors[0].message);
  } 
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
      res.status(404).json({ error: 'Images not found for the user' });
      return;
    }
    res.json(images);
  } catch (error) {
    console.error('Error getting images:', error);
    res.status(500).json({ error: 'Internal server error' });
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