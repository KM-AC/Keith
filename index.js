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

const sqlite3 = require('sqlite3').verbose();

// the name of the database file e.g. ./mydb.sqlite
const db = new sqlite3.Database('./dbtests/mydb.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});
// select all
db.each('SELECT * FROM posts', (err, row) => {
  if (err) {
    throw err;
  }
  
  console.log(row);
}, () => {
  // called when all rows have been retrieved
});

// INSERT A RECORD
function createPost(db, title, content) {
  const stmt = db.prepare(`
    INSERT INTO posts (title, content) VALUES (?, ?)
  `);
  
  stmt.run(title, content);
  stmt.finalize();
}

// Usage:
createPost(db, 'testagain', 'brilliant'); 

db.close();

// Start server (only for local dev)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; // Export for Vercel