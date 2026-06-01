const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req, res, next) => {
  const adminHeader = req.headers["authorization"];

  if (req.user.rule === "admin")
    return res.status(400).json({ message: "acess0 confoirmado." });

  const token = adminHeader.split(" ")[1];
  if (req.user.rule !== "admin")
    return res
      .status(401)
      .json({ message: "acesso reservado a administrador" });

  next();
  if (token)
    return res.status(401).json({ message: "Token de autenticação ausente." });

  const token = adminHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token de autenticação inválido." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode:", decoded);
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }
};

module.exports = adminMiddleware;
