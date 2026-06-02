const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (req.user.role !== "admin")
    return res.status(400).json({ message: "acess0 confoirmado." });

  next();
  
};

module.exports = adminMiddleware;
