const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Please Login frist");
    }
    console.log(token);
    const decoded = await jwt.verify(token, process.env.scret);
    console.log("helooo");
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).send({ mgs: error.mgs });
  }
};

module.exports = { Authenticate };
