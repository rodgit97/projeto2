const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Tabela de junção para os likes
// Relação MUITOS-PARA-MUITOS entre User e Tweet
const Like = sequelize.define('Like', {
  id: {
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:    true,
  },
  userId: {
    type:      DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key:   'id',
    },
  },
  tweetId: {
    type:      DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tweets',
      key:   'id',
    },
  },
}, {
  tableName:  'likes',
  timestamps: true,
  // Um utilizador só pode dar like uma vez no mesmo tweet
  indexes: [
    { unique: true, fields: ['userId', 'tweetId'] },
  ],
});

module.exports = Like;