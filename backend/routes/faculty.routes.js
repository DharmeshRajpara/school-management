const Router = require("express");
const { AddPresent, AllStudent, me } = require("../controllers/faculty");
const authJWT = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/me",authJWT, me);
router.post("/AddPresent",authJWT, AddPresent);
router.get("/allstudent", authJWT, AllStudent);

module.exports = router;
