const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taksController");
const { auth } = require("../middleware/Auth");
// Define the route with middleware and handler
router.post(
  "/upload-file",
  auth,
  taskController.upload.single("file"),

  taskController.TaskUpload
);

router.post("/task-assign", auth, taskController.TaskAssign);
router.get("/", auth, taskController.getAllTask);
router.get("/assigned-task", auth, taskController.getAllTaskAssigned);

module.exports = router;
