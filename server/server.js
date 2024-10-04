const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { logRoutes } = require("./utils/logRoutes");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mock CRUD API Routes
app.use("/api/users", userRoutes);

// Log API routes
logRoutes(app, "./routes.txt"); // Logs to 'routes.txt'

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
