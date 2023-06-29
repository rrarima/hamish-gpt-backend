require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const request = require('request');
const User = require('./models/User')
const Image = require('./models/Image')
const jwt = require('jsonwebtoken');
const config = require('./config');

const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  next();
});

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'db',
  dialect: 'mysql'
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, config.JWT_KEY, (err, user) => {
//     if (err) return res.sendStatus(403);

//     req.user = user;
//     next();
//   });
// }

app.post('/registration', async (request, response) => {
  const { username, email, password } = request.body;
  if (username === null || username.length < 3)  {
    return response.status(400).json({ error: 'Username is invalid' });
  }
  if (email === null || email.length < 1) {
    return response.status(400).json({ error: 'Email is invalid' });
  }
  var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    response.status(400).json({ error: error.errors[0].message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id }, config.JWT_KEY, { expiresIn: '1h' });

  res.json({
    message: 'Login successful',
    token: token,
  });
});


(async () => {
  try {
    await sequelize.authenticate();
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

app.listen(8000, () => {});
