import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateNoteForm from '../components/CreateNoteForm';

const NoteEditing = () => {
  const { stackId } = useParams();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/notes/stack/${stackId}`);
        const data = await response.json();
        console.log('Notes fetched:', data);
        setNotes(data.data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    fetchNotes();
  }, [stackId]);

  const handleNoteCreated = (newNote) => {
    console.log('New note created:', newNote);
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteEdit = async (noteId) => {
    console.log('Editing note with ID:', noteId);
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingNote.title,
          description: editingNote.description,
          last_edited_date: new Date().toISOString(),
          content: editingContent,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Note updated successfully:', data);
        setNotes((prevNotes) => prevNotes.map(note => note.id === noteId ? data : note));
        setEditingNote(null);
        setEditingContent('');
      } else {
        console.error('Failed to edit note:', data);
      }
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleNoteDelete = async (noteId) => {
    console.log('Deleting note with ID:', noteId);
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteClick = (note) => {
    console.log('Clicked note:', note);
    setEditingNote(note);
    setEditingContent(note.content);
  };

  return (
    <div className="note-editing">
      <h1>Edit Notes</h1>
      <CreateNoteForm stackId={stackId} onNoteCreated={handleNoteCreated} />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title || `Note ID: ${note.id}`}
            <button onClick={(e) => { e.stopPropagation(); handleNoteDelete(note.id); }}>Delete</button>
            <button onClick={(e) => { e.stopPropagation(); handleNoteClick(note); }}>Edit</button>
          </li>
        ))}
      </ul>
      {editingNote && (
        <div>
          <h2>Edit Note: {editingNote.title}</h2>
          <textarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <button onClick={() => handleNoteEdit(editingNote.id)}>Save Changes</button>
          <button onClick={() => setEditingNote(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default NoteEditing;
