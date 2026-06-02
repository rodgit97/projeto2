// require("../models/Comment");
const { Comment, User } = require("../models");
const { Op } = require("sequelize");

const getCommentsByTweetId = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { tweetId: id },
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "ASC"]],
    });
    res.json(comments);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ error: "Erro ao obter comentários" });
  }
};

const createComment = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  const userId = req.session.userId;
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do comentário não pode ser vazio" });
  }
  try {
    const newComment = await Comment.create({ content, tweetId: id, userId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ error: "Erro ao criar comentário" });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Apenas o autor do comentário pode deletá-lo" });
    }
    await comment.destroy();
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    const result = comments.map((c) => {
      const j = c.toJSON();
      j.username = j.User.username;
      delete j.User;
      return j;
    });
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ error: "Erro ao obter comentários" });
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    const result = comment.toJSON();
    result.username = result.User.username;
    delete result.User;
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentário:", error);
    res.status(500).json({ error: "Erro ao obter comentário" });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.session.userId;
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do comentário não pode ser vazio" });
  }
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Apenas o autor do comentário pode editá-lo" });
    }
    await comment.update({ content });
    res.json({ message: "Comentário atualizado com sucesso", comment });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
};

const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, as: "User", attributes: ["id", "username"] },
        { model: Tweet, as: "Tweet", attributes: ["id", "content"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    const result = comments.map((c) => {
      const j = c.toJSON();
      j.username = j.User.username;
      j.tweetContent = j.Tweet.content;
      delete j.User;
      delete j.Tweet;
      return j;
    });
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ error: "Erro ao obter comentários" });
  }
};

const getCommentByIdAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, as: "User", attributes: ["id", "username"] },
        { model: Tweet, as: "Tweet", attributes: ["id", "content"] },
      ],
    });
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    const result = comment.toJSON();
    result.username = result.User.username;
    result.tweetContent = result.Tweet.content;
    delete result.User;
    delete result.Tweet;
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentário:", error);
    res.status(500).json({ error: "Erro ao obter comentário" });
  }
};

const deleteCommentAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    await comment.destroy();
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

const updateCommentAdmin = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do comentário não pode ser vazio" });
  }
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    await comment.update({ content });
    res.json({ message: "Comentário atualizado com sucesso", comment });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
};

///----------------------
/*
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
};

exports.createComment = async (req, res) => {
  const { content } = req.body;
  const { tweetId } = req.params;
  const userId = req.session.userId;

  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do comentário não pode ser vazio" });
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
      return res
        .status(403)
        .json({ error: "Apenas o autor do comentário pode deletá-lo" });
    }
    await comment.destroy();
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    const result = comments.map((c) => {
      const j = c.toJSON();
      j.username = j.User.username;
      delete j.User;
      return j;
    });
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ error: "Erro ao obter comentários" });
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    const result = comment.toJSON();
    result.username = result.User.username;
    delete result.User;
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentário:", error);
    res.status(500).json({ error: "Erro ao obter comentário" });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.session.userId;
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do comentário não pode ser vazio" });
  }
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Apenas o autor do comentário pode editá-lo" });
    }
    await comment.update({ content });
    res.json({ message: "Comentário atualizado com sucesso", comment });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
};

exports.getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, as: "User", attributes: ["id", "username"] },
        { model: Tweet, as: "Tweet", attributes: ["id", "content"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    const result = comments.map((c) => {
      const j = c.toJSON();
      j.username = j.User.username;
      j.tweetContent = j.Tweet.content;
      delete j.User;
      delete j.Tweet;
      return j;
    });
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ error: "Erro ao obter comentários" });
  }
};

exports.getCommentByIdAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, as: "User", attributes: ["id", "username"] },
        { model: Tweet, as: "Tweet", attributes: ["id", "content"] },
      ],
    });
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    const result = comment.toJSON();
    result.username = result.User.username;
    result.tweetContent = result.Tweet.content;
    delete result.User;
    delete result.Tweet;
    res.json(result);
  } catch (error) {
    console.error("Erro ao obter comentário:", error);
    res.status(500).json({ error: "Erro ao obter comentário" });
  }
};

exports.deleteCommentAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    await comment.destroy();
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

exports.updateCommentAdmin = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "O conteúdo do comentário não pode ser vazio" });
  }
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    await comment.update({ content });
    res.json({ message: "Comentário atualizado com sucesso", comment });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
};
*/
module.exports={
  createComment,
  getCommentsByTweetId,
  deleteComment,
  getAllComments,
  updateComment,
}