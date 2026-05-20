const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(req,77676654321);
  // console.log(req.headers.authorization ,7);
  
  if (!authHeader) {


    return res.status(401).json({ message: "authHeader is missing" });

  } else {

    const token = authHeader.split(" ")[1];
    // console.log(token);
    
    if (!token || token === "null") {
      return res.status(401).json({ message: "token is missing" });
    }
// console.log(process.env.JWT_SECRET_KEY);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decoded ,667);
      
      next();
    } catch (error) {
      return res.status(500).json({ message: "invalid or expired token", error });
    }
  }
};

module.exports = authJWT;
