const Agent = require("../models/agent");

const Create_Agent = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // const admin = req.user.id;

    const agent = await Agent.create({
      name,
      email,
      password,
      mobile,
    });

    return res.status(200).json({
      success: true,
      message: "Agent created",
      agent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({});

    return res.status(200).json({
      success: true,
      message: "All Agents Fetched",
      data: agents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  Create_Agent,
  getAllAgents,
};
