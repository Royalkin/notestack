import React, { useState } from 'react';

const EditLibraryForm = ({ library, onLibraryUpdated }) => {
  const [title, setTitle] = useState(library.title);
  const [description, setDescription] = useState(library.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/libraries/${library.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          last_edited_date: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Library updated successfully:', data);
        onLibraryUpdated(data);
      } else {
        console.error('Failed to update library:', data);
      }
    } catch (error) {
      console.error('Error updating library:', error);
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditLibraryForm;
