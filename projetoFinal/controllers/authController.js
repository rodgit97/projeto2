require("../middleware/authMiddleware");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();