const express = require('express');
const router = express.Router();
const db = require('../models/library');

// Get all libraries
router.get('/', (req, res) => {
  db.all('SELECT * FROM Library', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Create a new library
router.post('/', (req, res) => {
  const { title, description, creation_date, last_edited_date, num_stacks } = req.body;
  const query = 'INSERT INTO Library (title, description, creation_date, last_edited_date, num_stacks) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [title, description, creation_date, last_edited_date, num_stacks], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    db.get('SELECT * FROM Library WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// Edit a library
router.put('/:id', (req, res) => {
  const libraryId = req.params.id;
  const { title, description, last_edited_date } = req.body;
  const query = 'UPDATE Library SET title = ?, description = ?, last_edited_date = ? WHERE id = ?';
  db.run(query, [title, description, last_edited_date, libraryId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    db.get('SELECT * FROM Library WHERE id = ?', [libraryId], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// Delete a library
router.delete('/:id', (req, res) => {
  const libraryId = req.params.id;
  db.run('DELETE FROM Library WHERE id = ?', libraryId, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
