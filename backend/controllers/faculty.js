const Student = require("../models/student");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AddPresent = async (req, res) => {
  const { date, rollNumber } = req.body;

  try {
    const d = await Student.findOne({ date: date, rollNumber: rollNumber });
    if (d) {
      res.json({message:"allready present",status:404});
    } else {
      Student.create({ date: date, rollNumber: rollNumber });
      res.status(401).send({ message: "add present" });
    }
  } catch (error) {
    // console.log(error);
    res.status(404).json({message:"allready present"});
  }
};

const FacultyLogin = async (req, res) => {
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
    return res.status(401).json({ message: "email is not found" });
  }
  // console.log(user, 90909);
  // console.log(user.password, 808080);


  if (user.role === "faculty") {
    const validpassword = await bcrypt.compare(password, user.password);
    // console.log(validpassword, 999);

    if (!validpassword) {
      return res.status(401).json({ message: "unvalidpassword" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name:user.name
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({ message: " faculty login successfully", token });
  } else {
    res.status(500).json({ message: "faculty unvalid" });
  }
};

const AllStudent = async (req, res) => {
  try {
       const page = req.query.page || 1;
       const limit = req.query.limit || 5;
       const q = req.query.q;
   
       // console.log(typeof q);
   
       const skip = (page - 1) * limit;
   
       const students = await User.find({ role: "student" })
         .select("-password -_id")
         .skip(skip)
         .limit(limit);
   
       // console.log(q);
       if (q) {
         const studentsAll = await User.find({
           role: "student",
           name: { $regex: q, $options: "i" },
         }).select("-password -_id");
         const apdata = await Student.find();
   
         const totalstudents = await User.countDocuments({
           role: "student",
         });
        //  console.log(totalstudents,777777);
   
         return res.json({
           students: studentsAll,
           totalStudents: totalstudents,
           apdata: apdata,
           totalPages: Math.ceil(totalstudents / limit),
           currentPage: page,
         });
       }
   
       const apdata = await Student.find();
   
       const totalstudents = await User.countDocuments({
         role:"student"
       });
       // console.log(aa,22);
   
       // console.log(totalstudents,998998);
   
       return res.status(200).json({
         students: students,
         totalStudents: totalstudents,
         apdata: apdata,
         totalPages: Math.ceil(totalstudents / limit),
         currentPage: page,
       });
     } catch (error) {
      return res.status(500).json({ message: error.message });
     }
   };



const me = async(req,res)=>{

     const authHeader = req.headers.authorization;
      if (!authHeader) {
    
        return res.json({ message: "authHeader is missing" });
    
      } else {
    
        const token = authHeader.split(" ")[1];
        if (!token) {
          return res.json({ message: "token is missing" });
        }
    
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);
        return res.status(200).json({name:decoded.name})
        
        } catch (error) {
          return res.status(500).json({ message: "invalid or expired token", error });
        }
      }


}

module.exports = { AddPresent, FacultyLogin, AllStudent ,me};
