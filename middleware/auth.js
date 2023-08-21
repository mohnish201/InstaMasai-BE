const jwt = require("jsonwebtoken");
const { BlistModel } = require("../model/BlacklistModel");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  const Blist = await BlistModel.findOne({ token });
  try {
    if (!Blist) {
      jwt.verify(token, "masai", (err, decoded) => {
        if (decoded) {
          req.body.userId = decoded.userId;
          next();
        } else {
          res.json("You are not Authorized");
        }
      });
    } else {
      res.json("Login to Your Account");
    }
  } catch (error) {
    res.json(error);
  }
};


module.exports={
    auth
}