const router = require("express").Router();
const {
  loginControler,
  registerControler,
  adminResponse,
  privateResponse,
  sendProfile,
} = require("../controler/login");
const { newUserValidator } = require("../middlewares/validatorUser");
const { isAuth } = require("../middlewares/auth");

router.post("/register", newUserValidator, registerControler);

router.post("/login", newUserValidator, loginControler);

router.get("/profile", isAuth, sendProfile);

module.exports = router;
