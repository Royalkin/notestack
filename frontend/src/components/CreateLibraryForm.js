import React, { useState } from 'react';

const CreateLibraryForm = ({ onLibraryCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/libraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          creation_date: new Date().toISOString(),
          last_edited_date: new Date().toISOString(),
          num_stacks: 0,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Library created successfully:', data);
        onLibraryCreated(data); // Pass the full library object
        setTitle('');
        setDescription('');
      } else {
        console.error('Failed to create library:', data);
      }
    } catch (error) {
      console.error('Error creating library:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Library Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Library Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Library</button>
    </form>
  );
};

export default CreateLibraryForm;
