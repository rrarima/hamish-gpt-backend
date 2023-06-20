const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('hamishgpt', 'user', 'root', {
  host: 'db',
  dialect: 'mysql'
});

const Image = sequelize.define('images', {
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
  image_description: {
    type: DataTypes.STRING
  },
}, {
  timestamps: false,
});

module.exports = Image;
