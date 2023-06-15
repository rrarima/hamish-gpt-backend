const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('hamishgpt', 'user', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Photo = sequelize.define('Photo', {
  imageid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userid',
    }
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = Photo;
