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

// Log API routes and generate the frontend API client
logRoutes(app, "./routes.txt", "../client/src/frontendApiClient.js");

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
