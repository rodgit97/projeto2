require("../middleware/authMiddleware");
// const { User } = require("../models");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Profile } = require("../models");
// const { Profile } = require("../models");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos sao obrigatorios" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "A password deve conter pelo menos 6 caracteres" });
    }
    if (await User.findOne({ where: { username } })) {
      return res.status(409).json({ error: "nome de utilizador ja existe" });
    }
    if (await User.findOne({ where: { email } })) {
      return res.status(409).json({ error: "email ja esta registado" });
    }
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ username, email, password: hash });
    await Profile.create({ userId: user.id });
    return res.status(201).json({
      message: "conta do Utilizador criada com sucesso",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar conta do Utilizador" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Preenche os campos todos." });

    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Credenciais invalidas." });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    return res.status(200).json({
      message: "Login efetuado com sucesso!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao fazer login." });
  }
};

// POST /auth/logout
const logout = (req, res) =>
  res.status(200).json({ message: "daida da conta efeituada." });

module.exports = { signup, login, logout };
