const router = require("express").Router();
const authController = require("../controllers/authController");
//router for registration
router.post("/register", authController.createUser)

//router for login
router.post("/login",authController.loginUser)

module.exports = router