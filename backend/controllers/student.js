const Student = require("../models/student");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "all field are required" });
  }
  const emailvalidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailvalidation.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "email is not found" });
  }
  // console.log(user, 90909);
  // console.log(user.password, 808080);
  if (user.role === "student") {
    const validpassword = await bcrypt.compare(password, user.password);
    // console.log(validpassword, 999);

    if (!validpassword) {
      return res.status(401).json({ message: "invalidpassword" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        rollNumber: user.rollNumber,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

   return res.status(200).json({ message: "student login successfully", token });
  } else {
   return res.status(500).json({ message: "student invalid" });
  }
};

const me = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "authHeader is missing" });
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decoded.rollNumber, 77777);

      const Data = await Student.find({
        rollNumber: decoded.rollNumber,
      }).select("-_id");
      if (!Data) {
        res.status(401).json({ message: "no data student" });
      }
      // console.log(Data, 9);

     return res.status(200).json({ name: decoded.name, rollNumber: decoded.rollNumber, Data });
    } catch (error) {
      return res.status(500).json({ message: "invalid or expired token", error });
    }
  }
};



module.exports = { studentLogin, me };
