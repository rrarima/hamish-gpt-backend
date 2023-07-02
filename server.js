require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const User = require('./models/User')
const Image = require('./models/Image')
const jwt = require('jsonwebtoken');
const config = require('./config');
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "./vision-ai-api-386409-1425ea3b1e7f.json" });
const bucket = storage.bucket("hamish-gpt-images");
const { format } = require('url');
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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}


app.post('/images', authenticateToken, upload.single('file'), async (req, res) => {

  console.log('Received file:', req.file);
  console.log('Received description:', req.body.description);
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).json({ error: 'Something is wrong! Unable to upload at the moment.' });
  });

  blobStream.on('finish', async () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    console.log('Image public URL:', publicUrl);
    console.log('Req.user:', req.user);

    try {
      const image = await Image.create({
        userid: req.user.userid, // you might want to authenticate and set req.user.id
        image_url: publicUrl,
        image_description: req.body.description,
      })

      if (image) {
        console.log('Image saved:', image);
        res.json({ status: 1, message: 'Image saved' });
      } else {
        res.json({ status: 0, message: 'Unable to save image' });
      }
    } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).json({ error: 'Error occurred during image saving process' });
    }
  });

  blobStream.end(req.file.buffer);
});



app.post('/registration', async (request, response) => {
  const { username, email, password } = request.body;
  if (username === null || username.length < 3) {
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

  console.log("User:", user);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ userid: user.userid }, config.JWT_KEY, { expiresIn: '1h' });

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

app.listen(8000, () => { });
