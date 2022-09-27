const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.CreateUser = (req, res, next) => {
  // console.log(req.body.password);
  // return;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created Successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "invalid Authantication Occurs",
        });
      });
  });
};

exports.UserLogin = (req, res, next) => {
  let Logeduser = new User();
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      Logeduser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      const token = jwt.sign(
        { email: Logeduser.email, userID: Logeduser._id },
        process.env.JWT,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "loged in successfully",
        token: token,
        expiresIn: 3600,
        userID: Logeduser._id,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Auth Failed",
      });
    });
};
