import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoleSelection from './components/UserRoleSelection';
import Auth from './components/Auth';
import './styles/tailwind.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/auth/:role" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
