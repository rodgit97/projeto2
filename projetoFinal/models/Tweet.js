// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
module.exports = (sequelize, type) => {
  return sequelize.define(
    "Tweet",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: type.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      content: {
        type: type.STRING(280),
        allowNull: false,
        validate: {
          len: [1, 280],
          notEmpty: true,
        },
      },
      imageUrl: {
        type: type.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "tweets",
      timestamps: true,
    },
  );
};

/*
// Relação UM-PARA-MUITOS: User tem muitos Tweets
const Tweet = sequelize.define(
  "Tweet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING(280),
      allowNull: false,
      validate: {
        len: [1, 280],
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "tweets",
    timestamps: true,
  },
);

module.exports = Tweet;
*/
