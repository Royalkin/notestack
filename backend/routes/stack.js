const express = require('express');
const router = express.Router();
const db = require('../models/stack');

// Get all stacks in a library
router.get('/library/:libraryId', (req, res) => {
  const libraryId = req.params.libraryId;
  db.all('SELECT * FROM Stack WHERE library_id = ?', [libraryId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Create a new stack
router.post('/', (req, res) => {
  const { library_id, title, description, creation_date, last_edited_date, num_notes } = req.body;
  const query = 'INSERT INTO Stack (library_id, title, description, creation_date, last_edited_date, num_notes) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(query, [library_id, title, description, creation_date, last_edited_date, num_notes], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    db.get('SELECT * FROM Stack WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// Edit a stack
router.put('/:id', (req, res) => {
  const stackId = req.params.id;
  const { title, description, last_edited_date } = req.body;
  const query = 'UPDATE Stack SET title = ?, description = ?, last_edited_date = ? WHERE id = ?';
  db.run(query, [title, description, last_edited_date, stackId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    db.get('SELECT * FROM Stack WHERE id = ?', [stackId], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// Delete a stack
router.delete('/:id', (req, res) => {
  const stackId = req.params.id;
  db.run('DELETE FROM Stack WHERE id = ?', stackId, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
