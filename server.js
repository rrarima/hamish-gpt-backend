const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./models/User')

const app = express();
app.use(express.json());

const sequelize = new Sequelize('hamishgpt', 'user', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


app.get('/', (req, res) => {
  res.send('Hello BlaJon');
})

app.get('/i-am-zebra', (req, res) => {
  res.send('I am Girraffe');
});

app.get('/test', (req, res) => {
  sequelize.query('SELECT 1 + 1 AS result', { type: sequelize.QueryTypes.SELECT})
  .then(results => {
    res.send(`Database test successful, result is: ${results[0].result}`);
  })
  .catch(error => {
    throw error;
  });
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

// createUser('eps', 'rarimar4@gmail.com', 'epsgpt');