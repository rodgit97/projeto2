// 'use strict';

// const fs = require('fs');
// const path = require('path');
const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User")(sequelize, DataTypes);
const Profile = require("./Profile")(sequelize, DataTypes);
const Tweet = require("./Tweet")(sequelize, DataTypes);
const Like = require("./Like")(sequelize, DataTypes);
const Follow = require("./Follow")(sequelize, DataTypes);

// const User = require("./models/User");
// const Profile = require("./models/Profile");
// const Tweet = require("./models/Tweet");
// const Like = require("./models");
// const Follow = require("./Follow");

User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Tweet, { foreignKey: "userId", as: "tweets" });
Tweet.belongsTo(User, { foreignKey: "userId", as: "author" });

User.belongsToMany(Tweet, {
  through: Like,
  as: "likedTweets",
  foreignKey: "userId",
});
Tweet.belongsToMany(User, {
  through: Like,
  as: "likedBy",
  foreignKey: "tweetId",
});

User.belongsToMany(User, {
  through: Follow,
  as: "followers",
  foreignKey: "followingId",
});
User.belongsToMany(User, {
  through: Follow,
  as: "following",
  foreignKey: "followerId",
});

Like.belongsTo(User, { foreignKey: "userId", as: "user" });
Like.belongsTo(Tweet, { foreignKey: "tweetId", as: "tweet" });

Follow.belongsTo(User, { foreignKey: "followerId", as: "follower" });
Follow.belongsTo(User, { foreignKey: "followedId", as: "followed" });

module.exports = {
  User,
  Profile,
  Tweet,
  Like,
  Follow,
  sequelize,
};
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

/*
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/
