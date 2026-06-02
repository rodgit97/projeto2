require("../models/Tweet");
const { Tweet, User } = require("../models");
const { Op } = require("sequelize");

const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      // include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(tweets);
  }
    catch (error) {
    console.error("Erro ao obter tweets:", error);
    res.status(500).json({ error: "Erro ao obter tweets" });
  }
};

exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      // include: [{ model: User, attributes: ["username"] }],
      // order: [["createdAt", "DESC"]],
    });
    res.json(tweets);
  } catch (error) {
    console.error("Erro ao obter tweets:", error);
    res.status(500).json({ error: "Erro ao obter tweets" });
  }
};

const getTweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findByPk(id, {
      // include: [{ model: User, attributes: ["username"] }],
      // order: [["createdAt", "DESC"]],
    });
    if (!tweet)      return res.status(404).json({ message: "Tweet não encontrado" });
    res.json(tweet);
  } catch (error) {
    console.error("Erro ao obter tweets:", error);
    res.status(500).json({ error: "Erro ao obter tweets" });
  }
};

exports.getTweetById = async (req, res) => {
  try {
    const { id } = req.params;

    const tweet = await Tweet.findById(id, {
      // include: [{ model: User, attributes: ["username"] }],
      // order: [["createdAt", "DESC"]],
    });

    if (!tweet)
      return res.status(404).json({ message: "Tweet não encontrado" });

    res.json(tweet);
  } catch (error) {
    console.error("Erro ao obter tweets:", error);
    res.status(500).json({ error: "Erro ao obter tweets" });
  }
};

const createTweet = async (req, res) => {
  const { userId, content } = req.body;
  // const userId = req.session.userId;
  if (!userId || !content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do tweet não pode ser vazio" });
  } try {
    const newTweet = await Tweet.create({ content, userId });
    res.status(201).json(newTweet);
  }
    catch (error) {
    console.error("Erro ao criar tweet:", error);
    res.status(500).json({ error: "Erro ao criar tweet" });
  }
};

exports.createTweet = async (req, res) => {
  const { userId, content } = req.body;
  // const userId = req.session.userId;

  if (!userId || !content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do tweet não pode ser vazio" });
  }

  try {
    const newTweet = await Tweet.create({ content, userId });
    res.status(201).json(newTweet);
  } catch (error) {
    console.error("Erro ao criar tweet:", error);
    res.status(500).json({ error: "Erro ao criar tweet" });
  }
};


const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.session.userId;
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do tweet não pode ser vazio" });
  } try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet não encontrado" });
    }    if (tweet.userId !== userId) {
      return res        .status(403)
        .json({ error: "Apenas o autor do tweet pode editá-lo" });
    }
    await tweet.update({ content });
    res.json(tweet);
  }
    catch (error) {
    console.error("Erro ao atualizar tweet:", error);
    res.status(500).json({ error: "Erro ao atualizar tweet" });
  }
};

exports.updateTweet = async (req, res) => {
  try {
    if (parseInt(req.params.id) !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Sem permissão." });

    const { bio, location, website } = req.body;
    const avatarUrl = req.file ? `uploads/${req.file.filename}` : undefined;

    const [profile] = await Profile.findOrCreate({
      where: { userId: req.params.id },
    });
    await profile.update({
      ...(bio !== undefined && { bio }),
      ...(location !== undefined && { location }),
      ...(website !== undefined && { website }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    });

    return res.status(200).json({ message: "Perfil atualizado.", profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar perfil." });
  }
};

const deleteTweet = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet não encontrado" });
    }    if (tweet.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Apenas o autor do tweet pode deletá-lo" });
    }
    await tweet.destroy();
    res.json({ message: "Tweet deletado com sucesso" });
  }
    catch (error) {
    console.error("Erro ao deletar tweet:", error);
    res.status(500).json({ error: "Erro ao deletar tweet" });
  }
};

exports.deleteTweet = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet não encontrado" });
    }
    if (tweet.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Apenas o autor do tweet pode deletá-lo" });
    }
    await tweet.destroy();
    res.json({ message: "Tweet deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar tweet:", error);
    res.status(500).json({ error: "Erro ao deletar tweet" });
  }
};




module.exports = {
  deleteTweet,
  updateTweet,
  createTweet,
  getTweetById,
  getAllTweets,
};






































// module.exports = {
//   deleteTweet,
//   updateTweet,
//   createTweet,
//   getTweetById,
//   getAllTweets,
// };
