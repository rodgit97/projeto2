const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Auto-relação em User: um utilizador segue outros utilizadores
const Follow = sequelize.define('Follow', {
  id: {
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:    true,
  },
  followerId: {
    type:      DataTypes.INTEGER,
    allowNull: false,
    comment:   'Utilizador que segue',
    references: {
      model: 'users',
      key:   'id',
    },
  },
  followedId: {
    type:      DataTypes.INTEGER,
    allowNull: false,
    comment:   'Utilizador que é seguido',
    references: {
      model: 'users',
      key:   'id',
    },
  },
}, {
  tableName:  'follows',
  timestamps: true,

  indexes: [
    { unique: true, fields: ['followerId', 'followedId'] },
  ],
});

module.exports = Follow;