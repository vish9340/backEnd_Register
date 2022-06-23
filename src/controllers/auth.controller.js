const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.scret);
};

const register = async (req, res) => {
  try {
    const email = req.body.email;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "Email Already Exist" });
    }
    user = await User.create(req.body);

    const token = newToken(user);

    res.status(201).cookie("token", token).send({ user, token });
  } catch (error) {
    return res.status(400).send({ mgs: error.mgs });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    let user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).send("wrong email or password");
    }

    const password = req.body.password;
    const match = await user.matchPassword(password);
    if (!match) {
      return res.status(400).send({ msg: "wrong password" });
    }

    const token = newToken(user);

    res
    .status(200)
    .cookie("token", token)
    .json({ success: true, user, token });
    // res.status(201).cookie("token", token, options).send({ user, token });
  } catch (error) {
    return res.status(400).send({ mgs: error.mgs });
  }
};

module.exports = { register, login };
