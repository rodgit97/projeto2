require("../models/Tweet");
const { Tweet, User } = require("../models");

exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(tweets);
  } catch (error) {
    console.error("Erro ao obter tweets:", error);
    res.status(500).json({ error: "Erro ao obter tweets" });
  }
};

exports.createTweet = async (req, res) => {
  const { content } = req.body;
  const userId = req.session.userId;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "O conteúdo do tweet não pode ser vazio" });
  }

  try {
    const newTweet = await Tweet.create({ content, userId });
    res.status(201).json(newTweet);
  } catch (error) {
    console.error("Erro ao criar tweet:", error);
    res.status(500).json({ error: "Erro ao criar tweet" });
  }
}

exports.deleteTweet = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const tweet = await Tweet.findByPk(id);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet não encontrado" });
    }
    if (tweet.userId !== userId) {
      return res.status(403).json({ error: "Apenas o autor do tweet pode deletá-lo" });
    }
    await tweet.destroy();
    res.json({ message: "Tweet deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar tweet:", error);
    res.status(500).json({ error: "Erro ao deletar tweet" });
  }
};


