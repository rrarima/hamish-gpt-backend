require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'db',
  dialect: 'mysql'
});

let User = sequelize.define('users', {
  userid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(40),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 3
    },
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      isLowercase: true,
      notEmpty: true
    },
    unique: {
      args: 'email',
      msg: 'The email is already taken!'
    }
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 20]
    }
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

module.exports = User;
