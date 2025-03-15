const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/db"); // Import centralized DB
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const agentRoutes = require("./routes/agentRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://agent-manger.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

databaseConnection();
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/agent", agentRoutes);

app.listen(process.env.PORT || 5001, () =>
  console.log("🚀 Auth Service running on port 5001")
);
