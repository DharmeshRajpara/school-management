const Router = require("express");
const { me } = require("../controllers/student");
const { AllStudent } = require("../controllers/faculty");
const authJWT = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/me", authJWT, me);
// router.get("/allstudent",authJWT,AllStudent)

module.exports = router;
