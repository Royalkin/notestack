import React, { useState } from 'react';

const CreateNoteForm = ({ stackId, onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stack_id: stackId,
          title,
          description,
          creation_date: new Date().toISOString(),
          last_edited_date: new Date().toISOString(),
          content,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Note created successfully:', data);
        onNoteCreated(data); // Pass the full note object
        setTitle('');
        setDescription('');
        setContent('');
      } else {
        console.error('Failed to create note:', data);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default CreateNoteForm;
