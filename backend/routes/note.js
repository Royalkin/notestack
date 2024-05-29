const express = require('express');
const router = express.Router();
const db = require('../models/note');

// Get all notes in a stack
router.get('/stack/:stackId', (req, res) => {
  const stackId = req.params.stackId;
  db.all('SELECT * FROM Note WHERE stack_id = ?', [stackId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Create a new note
router.post('/', (req, res) => {
  const { stack_id, title, description, creation_date, last_edited_date, content } = req.body;
  const query = 'INSERT INTO Note (stack_id, title, description, creation_date, last_edited_date, content) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(query, [stack_id, title, description, creation_date, last_edited_date, content], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    // Return the newly created note object
    db.get('SELECT * FROM Note WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// Delete a note
router.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  db.run('DELETE FROM Note WHERE id = ?', noteId, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// Edit a note
router.put('/:id', (req, res) => {
  const noteId = req.params.id;
  const { title, description, last_edited_date, content } = req.body;
  const query = 'UPDATE Note SET title = ?, description = ?, last_edited_date = ?, content = ? WHERE id = ?';
  db.run(query, [title, description, last_edited_date, content, noteId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    db.get('SELECT * FROM Note WHERE id = ?', [noteId], (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

module.exports = router;
