
// const sequelize = require('./index').sequelize;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Relação UM-PARA-UM com User
// Cada utilizador tem exactamente um perfil
const Profile = sequelize.define('Profile', {
  id: {
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:    true,
  },
  userId: {
    type:       DataTypes.INTEGER,
    allowNull:  false,
    unique:     true,           
    references: {
      model: 'users',
      key:   'id',
    },
  },
  bio: {
    type:         DataTypes.STRING(160),
    allowNull:    true,
    defaultValue: null,
    validate: {
      len: [0, 160],
    },
  },
  avatarUrl: {
    type:         DataTypes.STRING(255),
    allowNull:    true,
    defaultValue: null,
  },
  location: {
    type:         DataTypes.STRING(100),
    allowNull:    true,
    defaultValue: null,
  },
  website: {
    type:         DataTypes.STRING(255),
    allowNull:    true,
    defaultValue: null,
    validate: {
      isUrl: true,
    },
  },
}, {
  tableName:  'profiles',
  timestamps: true,
});

module.exports = Profile;