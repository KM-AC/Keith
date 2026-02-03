// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Node.js on Vercel!");
});

// Example API route
app.get("/api/data", (req, res) => {
  res.json({ message: "This is API data from Vercel" });
});

// Start server (only for local dev)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; // Export for Vercel