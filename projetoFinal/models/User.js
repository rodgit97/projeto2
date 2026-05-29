// const {DataTypes} = require('sequelize');
// // const sequelize = require('./index');

// const sequelize = require('../config/database');
module.exports = (sequelize, type) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: type.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50],
          notEmpty: true,
        },
      },
      email: {
        type: type.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: type.STRING(255),
        allowNull: false,
      },
      role: {
        type: type.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      paranoid: false,
    },
  );
};



/*
const User = sequelize.define('User', {
  id: {
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:    true,
  },
  username: {
    type:      DataTypes.STRING(50),
    allowNull: false,
    unique:    true,
    validate: {
      len:       [3, 50],
      notEmpty:  true,
    },
  },
  email: {
    type:      DataTypes.STRING(150),
    allowNull: false,
    unique:    true,
    validate: {
      isEmail:  true,
      notEmpty: true,
    },
  },
  password: {
    type:      DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type:         DataTypes.ENUM('user', 'admin'),
    allowNull:    false,
    defaultValue: 'user',
  },
}, {
  tableName:  'users',
  timestamps: true,           
  paranoid:   false,          
});

module.exports = User;
*/
