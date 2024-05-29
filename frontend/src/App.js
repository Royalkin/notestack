import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LibrarySelection from './pages/LibrarySelection';
import StackSelection from './pages/StackSelection';
import NoteEditing from './pages/NoteEditing';
import './index.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<LibrarySelection />} />
          <Route path="/stacks/:libraryId" element={<StackSelection />} />
          <Route path="/edit/:stackId" element={<NoteEditing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
