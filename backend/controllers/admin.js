const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");

const register = async (req, res) => {
  const { role, name, email, password, rollNumber } = req.body;

  if (!role && !name && !email && !password) {
    return res.status(401).json({ message: "all field are required" });
  }
  if (!role) {
    return res.status(401).json({ message: "select the role" });
  }
  if (!name) {
    return res.status(401).json({ message: "name is required" });
  }
  if (!email) {
    return res.status(401).json({ message: "email is required" });
  }
  if (!password) {
    return res.status(401).json({ message: "password is required" });
  }
  const emailvalidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailvalidation.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  const passwordvalidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordvalidation.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
    });
  }
  if (role === "student" && !rollNumber) {
    return res.json({ message: "rollnumber field is required" });
  }

  // console.log(rollNumber,88888866666)
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.status(401).json({ message: " email  already exists" });
  }

  if (role === "student") {
    const existedrollNumber = await User.findOne({ rollNumber });

    if (existedrollNumber) {
      // console.log(rollNumber)
      return res.status(401).json({ message: "rollnumber  already exists" });
    }
  }

  //co

  const hashPassword = await bcrypt.hash(password, 10);

  // console.log(hashPassword,11111);

  const user = await User.create({
    role: role,
    name: name,
    email: email,
    password: hashPassword,
    rollNumber: rollNumber,
  });

  // console.log(role, name, email, password,rollNumber);
  res.status(200).json({ message: "register successfully" });
};

const adminLogin = async (req, res) => {
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

  if (user.role === "admin") {
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
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({ message: " admin login successfully", token });
  } else {
    res.status(401).json({ message: "admin invalid" });
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

      const studentlastrollnumberandlength = await User.find({
        role: "student",
      });
      // console.log(totalstudents,777777);

      return res.json({
        students: studentsAll,
        totalStudents: studentlastrollnumberandlength.length,
        apdata: apdata,
        totalPages: Math.ceil(studentlastrollnumberandlength.length / limit),
        currentPage: page,
      });
    }

    const apdata = await Student.find();

    // const totalstudents = await User.countDocuments({
    //   role:"student"
    // });
    const studentlastrollnumberandlength = await User.find({
      role: "student",
    });

    const AllRollNumber = studentlastrollnumberandlength.map(
      (item) => item.rollNumber,
    );
    // console.log(studentlastrollnumberandlength,99899888);
    const lastRollNumber = Math.max(...AllRollNumber);

    // console.log(aa,22);

    // console.log(totalstudents,998998);

    return res.json({
      students: students,
      totalStudents: studentlastrollnumberandlength.length,
      apdata: apdata,
      totalPages: Math.ceil(studentlastrollnumberandlength.length / limit),
      currentPage: page,
      lastRollNumber: lastRollNumber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      // console.log(decoded);
     return res.status(200).json({ name: decoded.name, email: decoded.email });
    } catch (error) {
      return res.json({ message: "invalid or expired token", error });
    }
  }
};
const facultyData = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const q = req.query.q;

    // console.log(typeof q);

    const skip = (page - 1) * limit;

    const facultyAll = await User.find({ role: "faculty" })
      .select("-password -_id")
      .skip(skip)
      .limit(limit);

    // console.log(q);
    if (q) {
      const facultyAll = await User.find({
        role: "faculty",
        name: { $regex: q, $options: "i" },
      }).select("-password -_id");

      const apdata = await Student.find();

      const studentlastrollnumberandlength = await User.find({
        role: "faculty",
      });
      // console.log(totalstudents,777777);

      return res.json({
        faculty: facultyAll,
        totalStudents: studentlastrollnumberandlength.length,
        // apdata: apdata,
        totalPages: Math.ceil(studentlastrollnumberandlength.length / limit),
        currentPage: page,
      });
    }

    const apdata = await Student.find();

    // const totalstudents = await User.countDocuments({
    //   role:"student"
    // });
    const studentlastrollnumberandlength = await User.find({
      role: "faculty",
    });

    const AllRollNumber = studentlastrollnumberandlength.map(
      (item) => item.rollNumber,
    );
    // console.log(studentlastrollnumberandlength,99899888);
    const lastRollNumber = Math.max(...AllRollNumber);

    // console.log(aa,22);

    // console.log(totalstudents,998998);

    return res.json({
      faculty: facultyAll,
      totalStudents: studentlastrollnumberandlength.length,
      // apdata: apdata,
      totalPages: Math.ceil(studentlastrollnumberandlength.length / limit),
      currentPage: page,
      // lastRollNumber:lastRollNumber
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Allchartdeatil = async (req, res) => {
  // console.log(today);
  const unique = [];
  const presentStudents = await Student.find({});
  const date = new Date();
  const today =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  // console.log(today, 1);

  // last 7 days
  const lastWeek = new Date();
  lastWeek.setDate(date.getDate() - 6);

  const lastweekDate =
    lastWeek.getDate() +
    "-" +
    (lastWeek.getMonth() + 1) +
    "-" +
    lastWeek.getFullYear();
  // console.log(lastweekDate, 2);

  // filter last 7 days data
  const filterData = presentStudents.filter((item) => {
    return item.date >= lastweekDate && item.date <= today;
  });
  // console.log(filterData, 3);

  filterData.map((item) => {
    if (!unique.includes(item.date)) {
      unique.push(item.date);
    }
  });
  const a = unique.map((items) => {
    const data = filterData.filter((item) => item.date == items);
    // console.log(data,8777);
    return data;
  });
  // console.log(a,89);

  const b = a.map((item) => item.length);
  // console.log(b, 8);
  //   data.map((item)=>{
  //     if (!unique.includes(item)) {
  //  unique.push(item);
  //   }
  //   })

  const chartdata = unique.map((item, i) => {
    //  console.log( b[i])
    //  console.log( item)
    return { date: item, totalpresent: b[i] };
  });

  // console.log(chartdata);

  // console.log(unique,89);
  // const totalStudent = await User.find({ role: "student" });

  return res.status(200).json({ data: chartdata });
};

const nameandpasswordchange = async (req, res) => {
  const {name, password, rollNumber} = req.body;
  if (!name) {
    return res.status(401).json({ message: "name is required" });
  }
  if (!password) {
    return res.status(401).json({ message: "password is required" });
  }
  const passwordvalidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordvalidation.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    {
      rollNumber: rollNumber,
    },
    {
      name: name,
      password: hashPassword,
    },
  );


  return res.status(200).json({message:"name and password change successfully"})
};





module.exports = {
  register,
  Allchartdeatil,
  me,
  facultyData,
  AllStudent,
  adminLogin,nameandpasswordchange
};
