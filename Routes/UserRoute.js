const express = require("express");
const { BlistModel } = require("../model/BlacklistModel");
const { UserModel } = require("../model/Usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRoute = express.Router();

UserRoute.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, name });
    if (!user) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.json(err);
        } else {
          const NewUser = new UserModel({ ...req.body, password: hash });
          await NewUser.save();
          res.json("Registered Successfully");
        }
      });
    } else {
      res.json("User already Registered");
    }
  } catch (error) {
    res.json(error);
  }
});

UserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            "masai",
            { expiresIn: "7d" }
          );
          res.json({ msg: "Login Successfull", token });
          setTimeout(async () => {
            const Blist = new BlistModel({ token });
            await Blist.save();
          }, 7 * 24 * 60 * 60 * 1000);
        } else {
          res.json("Wrong Credentials");
        }
      });
    } else {
      res.json("Wrong Credentials");
    }
  } catch (error) {
    res.json(error);
  }
});

UserRoute.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const BlistToken = new BlistModel({ token });
    await BlistToken.save();
    res.json("Logout Successfully");
  } catch (error) {
    res.json(error);
  }
});
module.exports = {
  UserRoute,
};
