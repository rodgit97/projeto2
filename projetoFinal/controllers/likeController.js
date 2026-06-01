// require("../models/Like");
// const { Like, User } = require("../models");

// const likeTweet = async(req,res )=>{

// }

const { Tweet, Like } = require('../models');

/**
 * POST /tweets/:id/like
 * Adiciona um like ao tweet. Usa req.user.id (JWT) para segurança.
 */
const likeTweet = async (req, res) => {
  try {
    const tweetId = parseInt(req.params.id);
    const userId = req.user.id; // ⚠️ Vem do authMiddleware, nunca do req.body

    // 1. Validação de parâmetro
    if (isNaN(tweetId)) {
      return res.status(400).json({ error: "ID do tweet inválido." });
    }

    // 2. Verificar existência do tweet
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return res.status(404).json({ error: "Tweet não encontrado." });
    }

    // 3. Tentar criar ou encontrar o like
    // O teu modelo Like já tem índice único em [userId, tweetId], o que previne duplicados a nível de BD.
    const [like, created] = await Like.findOrCreate({
      where: { userId, tweetId }
    });

    // 4. Resposta conforme resultado
    if (created) {
      return res.status(201).json({ message: "Like adicionado com sucesso.", like });
    } else {
      return res.status(409).json({ message: "Já deste like neste tweet." });
    }
  } catch (error) {
    console.error("Erro ao adicionar like:", error);
    return res.status(500).json({ error: "Erro interno do servidor ao processar o like." });
  }
};

/**
 * DELETE /tweets/:id/like
 * Remove o like do utilizador autenticado ao tweet.
 */
const unlikeTweet = async (req, res) => {
  try {
    const tweetId = parseInt(req.params.id);
    const userId = req.user.id;

    if (isNaN(tweetId)) {
      return res.status(400).json({ error: "ID do tweet inválido." });
    }

    // 1. Tentar remover o like
    const deletedCount = await Like.destroy({
      where: { userId, tweetId }
    });

    // 2. Resposta conforme resultado
    if (deletedCount > 0) {
      return res.status(200).json({ message: "Like removido com sucesso." });
    } else {
      return res.status(404).json({ error: "Like não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao remover like:", error);
    return res.status(500).json({ error: "Erro interno do servidor ao remover o like." });
  }
};

module.exports = { likeTweet, unlikeTweet };