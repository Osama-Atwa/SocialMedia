const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token,process.env.JWT);
    req.userData = {email : userData.email, userID: userData.userID};
    next();
  } catch  {
    res.status(401).json({message:"Auth Failed!"});
  }
}
