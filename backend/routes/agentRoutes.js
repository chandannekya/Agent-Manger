const express = require("express");

const router = express.Router();

const {
  Create_Agent,
  getAllAgents,
} = require("../controllers/agentController");
const { auth } = require("../middleware/Auth");

router.post("/create-agent", auth, Create_Agent);
router.get("/", auth, getAllAgents);

module.exports = router;
