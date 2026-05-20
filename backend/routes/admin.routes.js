const Router = require("express");
const {
  AllStudent,
  studentDataShow,
  adminLogin,
  me,
  facultyData,
  Allchartdeatil,
  nameandpasswordchange,
  register,
} = require("../controllers/admin");
const { studentLogin } = require("../controllers/student");
const { FacultyLogin, AddPresent } = require("../controllers/faculty");

const authJWT = require("../middlewares/auth.middlewares");

const router = Router();

router.post("/register", register);
router.get("/me", me);
router.get("/facultyData", facultyData);
router.post("/admin-login", adminLogin);
router.get("/chartData", Allchartdeatil);
router.post("/faculty-login", FacultyLogin);
router.post("/student-login", studentLogin);
router.get("/allstudent", AllStudent);
router.post("/AddPresent", AddPresent);
router.post("/changenamepassword", nameandpasswordchange);

module.exports = router;
