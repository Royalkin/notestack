import React, { useState } from 'react';

const CreateStackForm = ({ libraryId, onStackCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/stacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          library_id: libraryId,
          title,
          description,
          creation_date: new Date().toISOString(),
          last_edited_date: new Date().toISOString(),
          num_notes: 0,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Stack created successfully:', data);
        onStackCreated(data); // Pass the full stack object
        setTitle('');
        setDescription('');
      } else {
        console.error('Failed to create stack:', data);
      }
    } catch (error) {
      console.error('Error creating stack:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Stack Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Stack Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Stack</button>
    </form>
  );
};

export default CreateStackForm;
