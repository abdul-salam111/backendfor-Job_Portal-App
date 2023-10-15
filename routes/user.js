const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyAndAuthorizeToken, verifyToken,verifyAndAdmin } = require("../middlewares/verifytoken");

//router for updateUser
router.put("/:id",verifyAndAuthorizeToken ,userController.updateUser);

//routers for deleting user
router.delete("/:id",verifyAndAuthorizeToken,userController.deleteUser);

//routers for getting user
router.get("/:id",verifyAndAuthorizeToken,userController.getUsers);

//routers for getting all users
router.get("/",verifyAndAdmin,userController.getAllUsers);

module.exports = router;