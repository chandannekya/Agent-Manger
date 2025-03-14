const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  note: {
    type: String,
    required: true,
  },

  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
