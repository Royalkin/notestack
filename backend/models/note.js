const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/notestack.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Note (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stack_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      creation_date TEXT,
      last_edited_date TEXT,
      tags TEXT,
      content TEXT,
      FOREIGN KEY (stack_id) REFERENCES Stack (id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;

