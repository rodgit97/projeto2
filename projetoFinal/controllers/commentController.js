require("../models/Comment");
const { Comment, User } = require("../models");

exports.getCommentsByTweetId = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { tweetId },
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "ASC"]],
    });
    res.json(comments);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ error: "Erro ao obter comentários" });
  }
}   ;

exports.createComment = async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  const userId = req.session.userId;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "O conteúdo do comentário não pode ser vazio" });
  }

  try {
    const newComment = await Comment.create({ content, tweetId, userId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ error: "Erro ao criar comentário" });
  }     
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    if (comment.userId !== userId) {
      return res.status(403).json({ error: "Apenas o autor do comentário pode deletá-lo" });
    }                           
    await comment.destroy();    
    res.json({ message: "Comentário deletado com sucesso" });
    }
    catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

