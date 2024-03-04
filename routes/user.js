const express = require("express");
const { handleSignUp, handleLoginPage } = require("../controllers/user");

const router = express.Router();

router.post("/", handleSignUp);
router.post("/login", handleLoginPage);

module.exports = router;
