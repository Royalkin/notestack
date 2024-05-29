import React, { useState } from 'react';

const EditStackForm = ({ stack, onStackUpdated }) => {
  const [title, setTitle] = useState(stack.title);
  const [description, setDescription] = useState(stack.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/stacks/${stack.id}`, {
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
        console.log('Stack updated successfully:', data);
        onStackUpdated(data);
      } else {
        console.error('Failed to update stack:', data);
      }
    } catch (error) {
      console.error('Error updating stack:', error);
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditStackForm;
