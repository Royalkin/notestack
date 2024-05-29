import React, { useState } from 'react';

const ConfirmDeleteDialog = ({ itemName, onConfirm, onCancel }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === itemName) {
      onConfirm();
    } else {
      alert('The entered name does not match.');
    }
  };

  return (
    <div className="confirm-delete-dialog">
      <h2>Confirm Deletion</h2>
      <p>Please enter the name <strong>{itemName}</strong> to confirm deletion:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">Confirm</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ConfirmDeleteDialog;

