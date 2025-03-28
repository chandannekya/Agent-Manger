const fs = require("fs");
const Agent = require("../models/agent");
const Task = require("../models/task");
const csv = require("csv-parser");
const multer = require("multer");
const xlsx = require("xlsx");
const { Readable } = require("stream");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "text/csv" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only CSV and Excel files are allowed."));
    }
  },
});

const processAndSaveData = async (data) => {
  try {
    for (const row of data) {
      const task = new Task({
        name: row.name,
        number: row.number,
        note: row.note,
      });

      await task.save();
    }
    return true;
  } catch (error) {
    console.error("Error processing data:", error);
    throw error;
  }
};

const TaskUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const data = [];

    // Process CSV files
    if (req.file.mimetype === "text/csv") {
      const stream = Readable.from(req.file.buffer.toString());

      stream
        .pipe(csv())
        .on("data", (row) => {
          data.push(row);
        })
        .on("end", async () => {
          try {
            console.log("CSV data:", data);
            await processAndSaveData(data);
            res.json({ message: "Data processed successfully" });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
        })
        .on("error", (error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      // Process Excel files
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      try {
        console.log("Excel data:", sheetData);
        await processAndSaveData(sheetData);
        res.json({ message: "Data processed successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const TaskAssign = async (req, res) => {
  try {
    const tasks = await Task.find({ agentId: null });
    const agents = await Agent.find({});

    if (tasks.length === 0 || agents.length === 0) {
      return res.status(400).json({ message: "No tasks or agents available" });
    }

    for (let i = 0; i < tasks.length; i++) {
      const assignedAgent = agents[i % agents.length];

      await Task.findByIdAndUpdate(tasks[i]._id, {
        agentId: assignedAgent._id,
      });

      await Agent.findByIdAndUpdate(assignedAgent._id, {
        $push: { task: tasks[i]._id },
      });
    }

    res.status(200).json({ message: "Tasks assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all assigned tasks with agent details
const getAllTaskAssigned = async (req, res) => {
  try {
    const tasks = await Task.find({ agentId: { $ne: null } }).populate(
      "agentId",
      "name mobile"
    );

    res
      .status(200)
      .json({ success: true, message: "All assigned tasks", tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, message: "All tasks", tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload,
  TaskUpload,
  TaskAssign,
  getAllTaskAssigned,
  getAllTask,
};

