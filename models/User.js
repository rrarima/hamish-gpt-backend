const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('hamishgpt', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  userid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt();
      user.password_hash = await bcrypt.hash(user.password, salt);
    }
  }
});

module.exports = User;
