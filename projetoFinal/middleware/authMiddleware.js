const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Token de autenticação ausente." });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Token de autenticação inválido." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode:",decoded);
    req.user = { id: decoded.id, username: decoded.username, role: decoded.role }; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }
};

module.exports = authMiddleware;
