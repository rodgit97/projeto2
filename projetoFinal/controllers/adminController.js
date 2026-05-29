require("../models/User");
const { User , Comment, Tweet, Like, Follow, Profile} = require("../models");
// const { Comment } = require("../models");
// const { Tweet } = require("../models");
// const { Like } = require("../models");
// const { Follow } = require("../models");
// const { Profile } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"],
      include: [
        { model: Profile, as: "Profile", attributes: ["bio", "location"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "erro na obtecao de utilizadores" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ error: "Utilizador não encontrado" });
    const { username, email, role } = req.body;
    await user.update({
      ...(username && { username }),
      ...(email && { email }),
      ...(role && { role }),
    });
    return res
      .status(200)
      .json({ message: "Utilizador atualizado com sucesso", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar utilizador" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ error: "Utilizador não encontrado" });
    await user.destroy();
    return res.status(200).json({ message: "Utilizador deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar utilizador" });
  }
};

const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      include: [
        { model: User, as: "User", attributes: ["id", "username"] },
        { model: Comment, as: "Comments", attributes: ["id", "content"] },
        { model: Like, as: "Likes", attributes: ["id"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    const result = tweets.map((t) => {
      const j = t.toJSON();
      j.likeCount = j.Likes?.length || 0;
      j.commentCount = j.Comments?.length || 0;
      delete j.Likes;
      delete j.Comments;
      return j;
    });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao obter tweets" });
  }
};

const updateTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByPk(req.params.id);
    if (!tweet)
      return res.status(404).json({ message: "Tweet não encontrado." });

    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: "O conteudo é obrigatorio." });
    if (content.length > 280)
      return res.status(400).json({ message: "Maximo 280 caracteres." });

    await tweet.update({ content });
    return res.status(200).json({ message: "tweet atualizado.", tweet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "erro ao atualizar tweet." });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByPk(req.params.id);
    if (!tweet)
      return res.status(404).json({ message: "Tweet não encontrado." });
    await tweet.destroy();
    return res.status(200).json({ message: "Tweet eliminado." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "erro ao eliminar tweet." });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, as: "User", attributes: ["id", "username"] },
        { model: Tweet, as: "Tweet", attributes: ["id", "content"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "erro ao obter comentários." });
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getTweets,
  updateTweet,
  deleteTweet,
  getComments,
};
