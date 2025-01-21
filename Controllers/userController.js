require("dotenv").config();

// const express = require("express");
// const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const models = require("../models");

// app.use(express.json());

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRED_TOKEN });
}

const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    let user = await models.User.create({
      name: req.body.name,
      email: req.body.email,
      roleId: req.body.roleId,
      password: hashPassword,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    });

    return res.status(200).json({
      status: "success",
      message: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  let request = req.body;
  try {
    if (!request) return res.sendStatus(204);
    else {
      let user = await models.User.findOne({
        where: {
          email: request.email,
        },
      });
      if (!user) return res.status(401).json({ message: "Invalid Email or Password" });
      let isCorrectpassword = bcrypt.compareSync(request.password, user.password); // bisa pake ini
      if (!isCorrectpassword) return res.status(401).json({ message: "Invalid Email or Password" });

      // bisa juga pake ini untuk compare password
      bcrypt.compare(request.password, user.password).then((isMatch) => {
        if (isMatch) {
          let token = generateAccessToken({
            name: user.name,
            email: user.email,
            roleId: user.roleId,
          });
          return res.status(200).json({
            token: token,
            message: "Login Success",
          });
        } else {
          return res.status(401).json({ message: "Invalid Email or Password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
