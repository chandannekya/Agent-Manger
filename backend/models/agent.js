const { default: mongoose, model } = require("mongoose");

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Please enter a valid email address",
    ],
  },

  mobile: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Agent = mongoose.model("Agent", AgentSchema);

module.exports = Agent;
