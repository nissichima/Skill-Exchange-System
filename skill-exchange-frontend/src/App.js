import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import AuthPage from './components/AuthPage'; // The login/signup page
import ProfilePage from './components/ProfilePage';

function App() {
  const location = useLocation(); // Hook to get the current route

  return (
    <div>
      {/* Conditionally render the global header */}
      {location.pathname !== '/profile' && <Header />}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<ProfilePage />} /> {/* Home or Profile Page */}
        

      </Routes>
    </div>
  );
}

// Wrap the app with the Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
