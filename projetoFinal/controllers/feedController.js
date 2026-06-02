// require("../models/Tweet");
// require("../models/Follow");
// const { Like, Tweet, Follow, User } = require("../models");

// const { Tweet, User, Follow, Like, Comment } = require("../models");
const { Tweet, User, Like } = require("../models");

const { Op } = require("sequelize");

// const getFeed = async (req, res) => {
//   try {
//     const followerId = req.user.id;
//     const followed = await Follow.findAll({
//       where: { followerId },
//       attributes: ["followedId"],
//     });
//     const followedIds = followed.map((f) => f.followedId);

//     if (!followedIds.length)
//       return res.status(200).json({ tweets: [], message: "Feed vazio." });

//     const tweets = await Tweet.findAll({
//       where: { userId: { [Op.in]: followedIds } },
//       include: [
//         { model: User, as: "author", attributes: ["username"] },
//         { model: Like, as: "likes", attributes: ["id"] },
//         { model: Comment, as: "comments", attributes: ["id"] },
//       ],
//       order: [["createdAt", "DESC"]],
//       limit: 20,
//       offset: req.query.offset || 0,
//     });

//     // Formata contagens e remove arrays pesados
//     const formatted = tweets.map((t) => {
//       const j = t.toJSON();
//       j.likeCount = j.likes?.length || 0;
//       j.commentCount = j.comments?.length || 0;
//       delete j.likes;
//       delete j.comments;
//       return j;
//     });

//     return res.status(200).json({ tweets: formatted });
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao gerar feed." });
//   }
// };

// exports.getFeed = async (req, res) => {
//   try {
//     const followerId = req.user.id;
//     const followed = await Follow.findAll({
//       where: { followerId },
//       attributes: ["followedId"],
//     });
//     const followedIds = followed.map((f) => f.followedId);

//     if (!followedIds.length)
//       return res.status(200).json({ tweets: [], message: "Feed vazio." });

//     const tweets = await Tweet.findAll({
//       where: { userId: { [Op.in]: followedIds } },
//       include: [
//         { model: User, as: "author", attributes: ["username"] },
//         { model: Like, as: "likes", attributes: ["id"] },
//         { model: Comment, as: "comments", attributes: ["id"] },
//       ],
//       order: [["createdAt", "DESC"]],
//       limit: 20,
//       offset: req.query.offset || 0,
//     });

//     // Formata contagens e remove arrays pesados
//     const formatted = tweets.map((t) => {
//       const j = t.toJSON();
//       j.likeCount = j.likes?.length || 0;
//       j.commentCount = j.comments?.length || 0;
//       delete j.likes;
//       delete j.comments;
//       return j;
//     });

//     return res.status(200).json({ tweets: formatted });
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao gerar feed." });
//   }
// };

// const getLikedTweets = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const likes = await Like.findAll({
//       where: { userId },
//       include: [
//         {
//           model: Tweet,
//           as: "tweet",
//           include: [{ model: User, as: "author", attributes: ["username"] }],
//         },
//       ],
//     });
//     const likedTweets = likes.map((l) => l.tweet);
//     return res.status(200).json({ likedTweets });
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao obter tweets liked." });
//   }
// };

// exports.getLikedTweets = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const likes = await Like.findAll({
//       where: { userId },
//       include: [
//         {
//           model: Tweet,
//           as: "tweet",
//           include: [{ model: User, as: "author", attributes: ["username"] }],
//         },
//       ],
//     });
//     const likedTweets = likes.map((l) => l.tweet);
//     return res.status(200).json({ likedTweets });
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao obter tweets liked." });
//   }
// };

// const getCommentedTweets = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const comments = await Comment.findAll({
//       where: { userId },
//       include: [
//         {
//           model: Tweet,
//           as: "tweet",
//           include: [{ model: User, as: "author", attributes: ["username"] }],
//         },
//       ],
//     });
//     const commentedTweets = comments.map((c) => c.tweet);
//     return res.status(200).json({ commentedTweets });
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao obter tweets comentados." });
//   }
// };

// exports.getCommentedTweets = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const comments = await Comment.findAll({
//       where: { userId },
//       include: [
//         {
//           model: Tweet,
//           as: "tweet",
//           include: [{ model: User, as: "author", attributes: ["username"] }],
//         },
//       ],
//     });
//     const commentedTweets = comments.map((c) => c.tweet);
//     return res.status(200).json({ commentedTweets });
//   }
//     catch (err) {
//     return res.status(500).json({ error: "Erro ao obter tweets comentados." });
//   }
// };

// const getTweetLikes = async (req, res) => {
//   try {
//     const { tweetId } = req.params;
//     const userId = req.user.id;
//     const like = await Like.findOne({ where: { userId, tweetId } });
//     if (like) {
//       return res.status(200).json({ liked: true });
//     } else {
//       return res.status(200).json({ liked: false });
//     }
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao verificar like." });
//   }
// };

// exports.getTweetLikes = async (req, res) => {
//   try {
//     const { tweetId } = req.params;
//     const userId = req.user.id;
//     const like = await Like.findOne({ where: { userId, tweetId } });
//     if (like) {
//       return res.status(200).json({ liked: true });
//     } else {
//       return res.status(200).json({ liked: false });
//     }
//   } catch (err) {
//     return res.status(500).json({ error: "Erro ao verificar like." });
//   }
// };

const getFeed = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followed = await Follow.findAll({
      where: { followerId },
      attributes: ["followedId"],
    });
    const followedIds = followed.map((f) => f.followedId);

    if (!followedIds.length)
      return res.status(200).json({ tweets: [], message: "Feed vazio." });

    const tweets = await Tweet.findAll({
      where: { userId: { [Op.in]: followedIds } },
      include: [
        { model: User, as: "author", attributes: ["username"] },
        { model: Like, as: "likes", attributes: ["id"] },
        { model: Comment, as: "comments", attributes: ["id"] },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
      offset: req.query.offset || 0,
    });

    const formatted = tweets.map((t) => {
      const j = t.toJSON();
      j.likeCount = j.likes?.length || 0;
      j.commentCount = j.comments?.length || 0;
      delete j.likes;
      delete j.comments;
      return j;
    });

    return res.status(200).json({ tweets: formatted });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao gerar feed." });
  }
};

const getLikedTweets = async (req, res) => {
  try {
    const userId = req.user.id;
    const likes = await Like.findAll({
      where: { userId },
      include: [
        {
          model: Tweet,
          as: "tweet",
          include: [{ model: User, as: "author", attributes: ["username"] }],
        },
      ],
    });
    const likedTweets = likes.map((l) => l.tweet);
    return res.status(200).json({ likedTweets });
  } catch (err) {
    console.error("Erro ao obter tweets liked:", err);

    return res.status(500).json({ error: "Erro ao obter tweets liked." });
  }
};

const getCommentedTweets = async (req, res) => {
  try {
    const userId = req.user.id;
    const comments = await Comment.findAll({
      where: { userId },
      include: [
        {
          model: Tweet,
          as: "tweet",
          include: [{ model: User, as: "author", attributes: ["username"] }],
        },
      ],
    });
    const commentedTweets = comments.map((c) => c.tweet);
    return res.status(200).json({ commentedTweets });
  } catch (err) {
    console.error("Erro real ao obter tweets comentados:", err); // ⬅️ ADICIONE ISTO

    return res.status(500).json({ error: "Erro ao obter tweets comentados." });
  }
};

const getTweetLikes = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user.id;
    const like = await Like.findOne({ where: { userId, tweetId } });
    if (like) {
      return res.status(200).json({ liked: true });
    } else {
      return res.status(200).json({ liked: false });
    }
  } catch (err) {
    return res.status(500).json({ error: "Erro ao verificar like." });
  }
};

module.exports = {
  getFeed,
  getLikedTweets,
  getCommentedTweets,
  getTweetLikes,
};
// module.exports = { getFeed, getLikedTweets, getCommentedTweets, getTweetLikes ,getTweetComments};
