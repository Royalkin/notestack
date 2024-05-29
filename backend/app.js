const express = require('express');
const cors = require('cors'); // Import CORS
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure the database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Define the path to the database file
const dbPath = path.join(dbDir, 'notestack.db');

// Initialize the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.use(cors()); // Apply CORS middleware
app.use(express.json());

const libraryRoutes = require('./routes/library');
const stackRoutes = require('./routes/stack');
const noteRoutes = require('./routes/note');

app.use('/api/libraries', libraryRoutes);
app.use('/api/stacks', stackRoutes);
app.use('/api/notes', noteRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.get('/', (req, res) => {
  res.send('Notestack API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
