const { User, Profile, Tweet, Comment, Like, Follow } = require("../models");
const { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    const { search } = req.query;
    const where = search ? { username: { [Op.like]: `%${search}%` } } : {};
    const users = await User.findAll({
      where,
      attributes: ["id", "username", "email", "role", "createdAt"],
      include: [
        {
          model: Profile,
          as: "Profile",
          attributes: ["bio", "avatarUrl", "location"],
        },
      ],
    });

    const followedIds = req.user
      ? (await Follow.findAll({ where: { followerId: req.user.id } })).map(
          (f) => f.followedId,
        )
      : [];

    const result = users.map((u) => ({
      ...u.toJSON(),
      isFollowing: followedIds.includes(u.id),
    }));

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao obter utilizadores." });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "email", "role", "createdAt"],
      include: [{ model: Profile, as: "Profile" }],
    });
    if (!user)
      return res.status(404).json({ message: "utilizador nao encontrado." });

    const [tweetCount, followingCount, followersCount] = await Promise.all([
      Tweet.count({ where: { userId: user.id } }),
      Follow.count({ where: { followerId: user.id } }),
      Follow.count({ where: { followedId: user.id } }),
    ]);

    const isFollowing = req.user
      ? !!(await Follow.findOne({
          where: { followerId: req.user.id, followedId: user.id },
        }))
      : false;

    return res
      .status(200)
      .json({
        ...user.toJSON(),
        tweetCount,
        followingCount,
        followersCount,
        isFollowing,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao obter utilizador." });
  }
};

const getUserTweets = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      where: { userId: req.params.id },
      include: [
        { model: User, as: 'User', attributes: ['id','username'] },
        { model: Like, as: 'Likes', attributes: ['userId'] },
        { model: Comment, as: 'Comments', attributes: ['id'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    const result = tweets.map(t => {
      const j = t.toJSON();
      j.likeCount    = j.Likes?.length || 0;
      j.commentCount = j.Comments?.length || 0;
      j.likedByMe    = req.user ? j.Likes?.some(l => l.userId === req.user.id) : false;
      delete j.Likes; delete j.Comments;
      return j;
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao obter tweets do utilizador.' });
  }
};

const getUserLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { userId: req.params.id },
      include: [{
        model: Tweet, as: 'Tweet',
        include: [{ model: User, as: 'User', attributes: ['id','username'] }],
      }],
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json(likes.map(l => l.Tweet));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao obter gostos.' });
  }
};
 

const updateProfile = async (req, res) => {
  try {
    if (parseInt(req.params.id) !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Sem permissão.' });
 
    const { bio, location, website } = req.body;
    const avatarUrl = req.file ? `uploads/${req.file.filename}` : undefined;
 
    const [profile] = await Profile.findOrCreate({ where: { userId: req.params.id } });
    await profile.update({
      ...(bio       !== undefined && { bio }),
      ...(location  !== undefined && { location }),
      ...(website   !== undefined && { website }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    });
 
    return res.status(200).json({ message: 'Perfil atualizado.', profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao atualizar perfil.' });
  }
};
 
const follow = async (req, res) => {
  try {
    const followedId = parseInt(req.params.id);
    if (followedId === req.user.id)
      return res.status(400).json({ message: 'Não podes seguir-te a ti mesmo.' });
 
    const target = await User.findByPk(followedId);
    if (!target) return res.status(404).json({ message: 'Utilizador não encontrado.' });
 
    const [_, created] = await Follow.findOrCreate({
      where: { followerId: req.user.id, followedId },
    });
    if (!created) return res.status(409).json({ message: 'Já estás a seguir este utilizador.' });
 
    return res.status(201).json({ message: 'Agora estás a seguir!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao seguir.' });
  }
};

const unfollow = async (req, res) => {
  try {
    const deleted = await Follow.destroy({
      where: { followerId: req.user.id, followedId: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'Não estás a seguir este utilizador.' });
    return res.status(200).json({ message: 'Deixaste de seguir.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao deixar de seguir.' });
  }
};
 
module.exports = { index, show, getUserTweets, getUserLikes, updateProfile, follow, unfollow };