// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
module.exports = (sequelize, type) => {
    return sequelize.define('comments', {
      id: {
        type:          type.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
      },
      userId: {
        type:      type.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key:   'id',
        },
      },
      tweetId: {
        type:      type.INTEGER,
        allowNull: false,
        references: {
          model: 'tweets',
          key:   'id',
        },
      },
      content: {
        type:      type.STRING(280),
        allowNull: false,
        validate: {
          len:      [1, 280],
          notEmpty: true,
        },
      },
    });
  }

// // Relação UM-PARA-MUITOS: Tweet tem muitos Comments
// const Comment = sequelize.define('Comment', {
//   id: {
//     type:          DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey:    true,
//   },
//   userId: {
//     type:      DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users',
//       key:   'id',
//     },
//   },
//   tweetId: {
//     type:      DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'tweets',
//       key:   'id',
//     },
//   },
//   content: {
//     type:      DataTypes.STRING(280),
//     allowNull: false,
//     validate: {
//       len:      [1, 280],
//       notEmpty: true,
//     },
//   },
// }, {
//   tableName:  'comments',
//   timestamps: true,
// });

// module.exports = Comment;