import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreateStackForm from '../components/CreateStackForm';
import EditStackForm from '../components/EditStackForm';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const StackSelection = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const [stacks, setStacks] = useState([]);
  const [editingStack, setEditingStack] = useState(null);
  const [deletingStack, setDeletingStack] = useState(null);

  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/stacks/library/${libraryId}`);
        const data = await response.json();
        console.log('Stacks fetched:', data);
        setStacks(data.data);
      } catch (error) {
        console.error('Failed to fetch stacks:', error);
      }
    };
    fetchStacks();
  }, [libraryId]);

  const handleStackCreated = (newStack) => {
    console.log('New stack created:', newStack);
    setStacks((prevStacks) => [...prevStacks, newStack]);
  };

  const handleStackUpdated = (updatedStack) => {
    console.log('Stack updated:', updatedStack);
    setStacks((prevStacks) =>
      prevStacks.map(stack => stack.id === updatedStack.id ? updatedStack : stack)
    );
    setEditingStack(null);
  };

  const handleStackDelete = async (stackId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/stacks/${stackId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStacks((prevStacks) => prevStacks.filter(stack => stack.id !== stackId));
        setDeletingStack(null);
      } else {
        console.error('Failed to delete stack');
      }
    } catch (error) {
      console.error('Error deleting stack:', error);
    }
  };

  const handleStackClick = (stackId) => {
    navigate(`/edit/${stackId}`);
  };

  return (
    <div className="stack-selection">
      <h1>Select or Create a Stack</h1>
      <CreateStackForm libraryId={libraryId} onStackCreated={handleStackCreated} />
      <ul>
        {stacks.map((stack) => (
          <li key={stack.id}>
            {stack.title || `Stack ID: ${stack.id}`}
            <button onClick={() => setEditingStack(stack)}>Edit</button>
            <button onClick={() => setDeletingStack(stack)}>Delete</button>
            <button onClick={() => handleStackClick(stack.id)}>Open</button>
          </li>
        ))}
      </ul>
      {editingStack && (
        <EditStackForm
          stack={editingStack}
          onStackUpdated={handleStackUpdated}
        />
      )}
      {deletingStack && (
        <ConfirmDeleteDialog
          itemName={deletingStack.title}
          onConfirm={() => handleStackDelete(deletingStack.id)}
          onCancel={() => setDeletingStack(null)}
        />
      )}
    </div>
  );
};

export default StackSelection;
