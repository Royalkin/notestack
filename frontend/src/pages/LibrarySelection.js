import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateLibraryForm from '../components/CreateLibraryForm';
import EditLibraryForm from '../components/EditLibraryForm';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const LibrarySelection = () => {
  const [libraries, setLibraries] = useState([]);
  const [editingLibrary, setEditingLibrary] = useState(null);
  const [deletingLibrary, setDeletingLibrary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/libraries');
        const data = await response.json();
        console.log('Libraries fetched:', data);
        setLibraries(data.data);
      } catch (error) {
        console.error('Failed to fetch libraries:', error);
      }
    };
    fetchLibraries();
  }, []);

  const handleLibraryCreated = (newLibrary) => {
    console.log('New library created:', newLibrary);
    setLibraries((prevLibraries) => [...prevLibraries, newLibrary]);
  };

  const handleLibraryUpdated = (updatedLibrary) => {
    console.log('Library updated:', updatedLibrary);
    setLibraries((prevLibraries) =>
      prevLibraries.map(library => library.id === updatedLibrary.id ? updatedLibrary : library)
    );
    setEditingLibrary(null);
  };

  const handleLibraryDelete = async (libraryId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/libraries/${libraryId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLibraries((prevLibraries) => prevLibraries.filter(library => library.id !== libraryId));
        setDeletingLibrary(null);
      } else {
        console.error('Failed to delete library');
      }
    } catch (error) {
      console.error('Error deleting library:', error);
    }
  };

  const handleLibraryClick = (libraryId) => {
    navigate(`/stacks/${libraryId}`);
  };

  return (
    <div className="library-selection">
      <h1>Select or Create a Library</h1>
      <CreateLibraryForm onLibraryCreated={handleLibraryCreated} />
      <ul>
        {libraries.map((library) => (
          <li key={library.id}>
            {library.title || `Library ID: ${library.id}`}
            <button onClick={() => setEditingLibrary(library)}>Edit</button>
            <button onClick={() => setDeletingLibrary(library)}>Delete</button>
            <button onClick={() => handleLibraryClick(library.id)}>Open</button>
          </li>
        ))}
      </ul>
      {editingLibrary && (
        <EditLibraryForm
          library={editingLibrary}
          onLibraryUpdated={handleLibraryUpdated}
        />
      )}
      {deletingLibrary && (
        <ConfirmDeleteDialog
          itemName={deletingLibrary.title}
          onConfirm={() => handleLibraryDelete(deletingLibrary.id)}
          onCancel={() => setDeletingLibrary(null)}
        />
      )}
    </div>
  );
};

export default LibrarySelection;
