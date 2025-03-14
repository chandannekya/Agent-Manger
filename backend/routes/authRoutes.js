const { createUser, loginUser } = require("../controllers/authController");

const express = require("express");

const router = express.Router();

router.post("/signUp", createUser);
router.post("/login", loginUser);

module.exports = router;
